import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { parentEntity } from '.';
import { productEntity } from './product.entity';
import { orderEntity } from './order.entity';

@Entity('orderProduct')
export class orderProductEntity extends parentEntity {
  @Column()
  quantity: number;

  @ManyToOne(() => productEntity, (product) => product.order,{onDelete:'CASCADE'})
  product: productEntity;

  @ManyToOne(() => orderEntity, (order) => order.orderProduct,{onDelete:'CASCADE'})
  order: orderEntity;
}
