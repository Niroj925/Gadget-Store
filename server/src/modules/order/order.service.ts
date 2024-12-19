import { ForbiddenException, Injectable } from '@nestjs/common';
import {
  CreateOrderDto,
  CreateRemarkDto,
  orderProductDto,
} from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { orderEntity } from 'src/model/order.entity';
import { DataSource, Repository } from 'typeorm';
import { customerEntity } from 'src/model/customer.entity';
import {
  orderStatus,
  paymentMethod,
  paymentStatus,
} from 'src/helper/types/index.type';
import { orderProductEntity } from 'src/model/orderProduct.entity';
import { productEntity } from 'src/model/product.entity';
import { paymentEntity } from 'src/model/payment.entity';
import { ProductService } from '../product/product.service';
import { PaginationDto } from 'src/helper/utils/pagination.dto';
import { PaymentService } from '../payment/payment.service';
import { locationEntity } from 'src/model/location.entity';
import { sendMail } from 'src/config/mail.config';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(orderEntity)
    private readonly orderRepository: Repository<orderEntity>,

    @InjectRepository(paymentEntity)
    private readonly paymentRepository: Repository<paymentEntity>,

    @InjectRepository(productEntity)
    private readonly productRepository: Repository<productEntity>,

    @InjectRepository(customerEntity)
    private readonly customerRepository: Repository<customerEntity>,

    @InjectRepository(locationEntity)
    private readonly locationRepository: Repository<locationEntity>,

    private readonly dataSource: DataSource,

    private readonly productService: ProductService,

    private readonly paymentService: PaymentService,
  ) {}

  async create(
    id: string,
    paymentMethod: paymentMethod,
    createOrderDto: CreateOrderDto,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const {latitude,longitude, location,customerContact, deliveryCharge, orderInfo } = createOrderDto;

      const order = new orderEntity();
      order.customer = { id } as customerEntity;
      order.status = orderStatus.pending;

      await queryRunner.manager.save(order);

      const orderProducts = orderInfo.map((item) => {
        const orderProduct = new orderProductEntity();
        orderProduct.product = { id: item.product } as productEntity;
        orderProduct.order = order;
        orderProduct.quantity = item.quantity;
        return orderProduct;
      });

      await queryRunner.manager.save(orderProducts);

      await this.customerRepository.update({ id }, { phone: customerContact });
      await this.locationRepository.update({customer:{id}},{latitude,longitude,location});
      const totalAmount = await this.totalAmount(orderInfo);

      const payment = new paymentEntity();
      payment.amount = totalAmount;
      payment.deliveryCharge = deliveryCharge ?? 0;
      payment.paymentMethod = paymentMethod;
      payment.status = paymentStatus.pending;
      payment.order = order;

      await queryRunner.manager.save(payment);
      const paymentInitate = await this.paymentService.getEsewaPaymentHash({
        amount: totalAmount,
        transaction_uuid: payment.id,
      });

      await queryRunner.commitTransaction();

      return {
        success: true,
        payment: paymentInitate,
        order: payment,
      };
      return true;
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
      throw new ForbiddenException(error.errorResponse);
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(id: string) {
    const customerOrder = await this.orderRepository.find({
      where: { customer: { id } },
      relations: ['customer.location', 'orderProduct.product'],
      select: {
        customer: {
          id: true,
          name: true,
          location: {
            id: true,
            location: true,
            latitude: true,
            longitude: true,
          },
        },
        orderProduct: {
          id: true,
          quantity: true,
          product: {
            id: true,
            name: true,
            price: true,
          },
        },
      },
    });
    return customerOrder;
  }

  async findByStatus(status: orderStatus, paginationDto: PaginationDto) {
    const { page, pageSize } = paginationDto;
    const [customerOrder, orderCount] = await this.orderRepository.findAndCount(
      {
        where: { status },
        skip: (page - 1) * pageSize,
        take: pageSize,
        relations: ['customer.location', 'orderProduct.product', 'payment'],
        order: {
          createdAt: 'DESC',
        },
        select: {
          id: true,
          status: true,
          createdAt: true,
          customer: {
            id: true,
            name: true,
            phone:true,
            location: {
              id: true,
              location: true,
              latitude: true,
              longitude: true,
            },
          },
          orderProduct: {
            id: true,
            quantity: true,
            product: {
              id: true,
              name: true,
              price: true,
            },
          },
        },
      },
    );
    return { customerOrder, orderCount };
  }

  async orderCount() {
    return {
      pending: await this.countByStatus(orderStatus.pending),
      accepted: await this.countByStatus(orderStatus.accepted),
      processing: await this.countByStatus(orderStatus.shipped),
      delivered: await this.countByStatus(orderStatus.delivered),
      cancel: await this.countByStatus(orderStatus.cancel),
    };
  }

  async pendingOrder() {
    return { count: await this.countByStatus(orderStatus.pending) };
  }

  async countByStatus(status: orderStatus): Promise<Number> {
    return await this.orderRepository.count({ where: { status } });
  }

  async totalSales() {
    const order = await this.orderRepository.find({
      where: { status: orderStatus.delivered },
      relations: ['orderProduct.product'],
      select:{
        id:true,
        orderProduct:{
          id:true,
          product:{
            id:true,
            price:true
          }
        }
      }
    });
    const calculateTotalPrice = (orders: typeof order) => {
      return orders.reduce((total, order) => {
        const orderTotal = order.orderProduct.reduce((orderSum, orderProduct) => {
          return orderSum + (orderProduct.product.price || 0); 
        }, 0);
    
        return total + orderTotal;
      }, 0); 
    };

    return {
      totalSales:calculateTotalPrice(order),
      customers:await this.customerRepository.count(),
      product:await this.productRepository.count()
    }
  }

  async findOne(id: string) {
    const customerOrder = await this.orderRepository.findOne({
      where: { id },
      relations: ['customer.location', 'payment', 'orderProduct.product'],
      select: {
        customer: {
          id: true,
          name: true,
          location: {
            id: true,
            location: true,
            latitude: true,
            longitude: true,
          },
        },
        orderProduct: {
          id: true,
          quantity: true,
          product: {
            id: true,
            name: true,
            price: true,
          },
        },
      },
    });
    return customerOrder;
  }

  async updateOrderStatus(id: string, query: any) {
    const { status, remarks } = query;
    if (status != orderStatus.delivered) {
      await this.orderRepository.update(
        { id },
        { status, remarks: remarks ?? null },
      );
      return true;
    } else {
      const orders = await this.orderRepository.findOne({
        where: { id },
        relations: ['orderProduct.product','customer'],
      });

      orders.orderProduct.forEach(async (order) => {
        if (orders.status !== orderStatus.delivered) {
          await this.productRepository.increment(
            { id: order.product.id },
            'soldQuantity',
            order.quantity,
          );
        }
      });
      await this.orderRepository.update(
        { id },
        { status, remarks: remarks ?? null },
      );
      if(status==orderStatus.delivered){
        const url=`${process.env.CUSTOMER_URL}?productId=${orders.orderProduct[0].product.id}&customerId=${orders.customer.id}`
        sendMail(orders.customer.email,"Order Delivered",this.productReviewTemplate(orders.customer.name,url))
      }
      return true;
    }
  }

  async updatePaymentStatus(
    id: string,
    status: paymentStatus,
    createRemarkDto: CreateRemarkDto,
  ) {
    const { remarks } = createRemarkDto;
    await this.paymentRepository.update(
      { id },
      { status, remarks: remarks ?? null },
    );
    return true;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  async remove(id: string) {
    await this.orderRepository.delete({ id });
    return true;
  }

  async totalAmount(products: orderProductDto[]): Promise<number> {
    let t_amount = 0;
    for (const product of products) {
      const productInfo = await this.productService.findPrice(product.product);
      t_amount += productInfo.price * product.quantity;
    }
    return t_amount;
  }

  productReviewTemplate(customerName:string, reviewUrl:string) {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product Review Request</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 500px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        h1 {
            color: #333;
            margin-bottom: 20px;
        }
        p {
            font-size: 16px;
            color: #555;
            margin-bottom: 20px;
        }
        .button {
            display: inline-block;
            width: 80%;
            padding: 12px;
            background-color: #28a745;
            color: #ffffff;
            text-align: center;
            border-radius: 5px;
            font-size: 16px;
            text-decoration: none;
            transition: background-color 0.3s;
        }
        .button:hover {
            background-color: #218838;
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>We Value Your Feedback!</h1>
         <p>Dear, <strong>${customerName}</strong>,</p>
        <p>Thank you for purchasing the recent product.</p>
        <p>We would love to hear your thoughts about the product. Please take a moment to leave a review:</p>
        <a href="${reviewUrl}" class="button" style="color: white; text-decoration: none;">Leave a Review</a>
        <p>Your feedback helps us improve and serves other customers like you!</p>
        <p class="footer">© 2024 Hamro Shop. All rights reserved.</p>
    </div>
</body>
</html>
    `;
}

}
