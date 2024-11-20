import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateOrderDto, CreateRemarkDto, orderProductDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { orderEntity } from 'src/model/order.entity';
import { DataSource, Repository } from 'typeorm';
import { customerEntity } from 'src/model/customer.entity';
import { orderStatus, paymentMethod, paymentStatus } from 'src/helper/types/index.type';
import { orderProductEntity } from 'src/model/orderProduct.entity';
import { productEntity } from 'src/model/product.entity';
import { paymentEntity } from 'src/model/payment.entity';
import { ProductService } from '../product/product.service';
import { PaginationDto } from 'src/helper/utils/pagination.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(orderEntity)
    private readonly orderRepository: Repository<orderEntity>,

    @InjectRepository(paymentEntity)
    private readonly paymentRepository: Repository<paymentEntity>,

    private readonly dataSource: DataSource,

    private readonly productService:ProductService
  ) {}

  async create(id: string,paymentMethod:paymentMethod,createOrderDto: CreateOrderDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { deliveryCharge, orderInfo } = createOrderDto;
    
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
    
      const payment = new paymentEntity();
      payment.amount = await this.totalAmount(orderInfo) ;
      payment.deliveryCharge= deliveryCharge ?? 0;
      payment.paymentMethod = paymentMethod;
      payment.status = paymentStatus.pending;
      payment.order = order;
    
      await queryRunner.manager.save(payment); 
    
      await queryRunner.commitTransaction();
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
      relations: ['customer.location','orderProduct.product'],
      select:{
        customer:{
          id:true,
          name:true,
          location:{
            id:true,
            location:true,
            latitude:true,
            longitude:true
          }
        },
        orderProduct:{
          id:true,
          quantity:true,
          product:{
            id:true,
            name:true,
            price:true
          }
        }
      }
    });
    return customerOrder;
  }

  async findByStatus(status:orderStatus,paginationDto:PaginationDto){
    const {page,pageSize}=paginationDto;
    const customerOrder = await this.orderRepository.find({
      where: { status},
      skip: (page - 1) * pageSize,
      take: pageSize,
      relations: ['customer.location','orderProduct.product'],
      order:{
        createdAt:'DESC'
      },
      select:{
        id:true,
        status:true,
        createdAt:true,
        customer:{
          id:true,
          name:true,
          location:{
            id:true,
            location:true,
            latitude:true,
            longitude:true
          }
        },
        orderProduct:{
          id:true,
          quantity:true,
          product:{
            id:true,
            name:true,
            price:true
          }
        },
      }
    });
    return customerOrder;
  }

  async findOne(id: string) {
    const customerOrder = await this.orderRepository.findOne({
      where: {  id },
      relations: ['customer.location','payment','orderProduct.product'],
      select:{
        customer:{
          id:true,
          name:true,
          location:{
            id:true,
            location:true,
            latitude:true,
            longitude:true
          }
        },
        orderProduct:{
          id:true,
          quantity:true,
          product:{
            id:true,
            name:true,
            price:true
          }
        }
      }
    });
    return customerOrder;
  }

 async updateOrderStatus(id:string,status:orderStatus){
    await this.orderRepository.update({id},{status});
    return true;
  }

  async updatePaymentStatus(id:string,status:paymentStatus,createRemarkDto:CreateRemarkDto){
    const {remarks}=createRemarkDto;
    await this.paymentRepository.update({id},{status,remarks:remarks??null});
    return true;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

 async remove(id: string) {
  await this.orderRepository.delete({id});
    return true;
  }

  async totalAmount(products:orderProductDto[]):Promise<number>{
    let t_amount=0;
    for (const product of products) {
      const productInfo = await this.productService.findPrice(product.product);
      t_amount += productInfo.price * product.quantity;
    }
    return t_amount;
  }
}
