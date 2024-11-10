import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { orderEntity } from 'src/model/order.entity';
import { DataSource, Repository } from 'typeorm';
import { customerEntity } from 'src/model/customer.entity';
import { orderStatus } from 'src/helper/types/index.type';
import { orderProductEntity } from 'src/model/orderProduct.entity';
import { productEntity } from 'src/model/product.entity';

@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(orderEntity)
    private readonly orderRepository: Repository<orderEntity>,

    private readonly dataSource: DataSource,
  ) {}

async create(id: string, createOrderDto: CreateOrderDto) {
  const queryRunner = this.dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    const { orderInfo } = createOrderDto;

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

    await queryRunner.commitTransaction();
    return true;
  } catch (error) {
    console.log(error);
    await queryRunner.rollbackTransaction();
    throw new ForbiddenException(error.errorResponse);
  } finally {
    await queryRunner.release();
  }
}

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
