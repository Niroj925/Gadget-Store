import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { parentEntity } from '.';
import { orderStatus } from 'src/helper/types/index.type';
import { orderDeliverEntity } from './orderDeliver.entity';
import { productEntity } from './product.entity';
import { customerEntity } from './customer.entity';
import { orderEntity } from './order.entity';

@Entity('orderProduct')
export class orderProductEntity extends parentEntity {
  @Column()
  quantity: number;

  @ManyToOne(() => productEntity, (product) => product.order)
  product: productEntity;

  @ManyToOne(() => orderEntity, (order) => order.orderProduct)
  order: orderEntity;
}
