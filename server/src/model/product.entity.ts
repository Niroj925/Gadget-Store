import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { parentEntity } from '.';
import strict from 'assert/strict';
import { ProductStatus } from 'src/helper/types/index.type';
import { categoryEntity } from './category.entity';
import { productImageEntity } from './productImage.entity';
import { productSpecEntity } from './productSpec.entity';
import { reviewEntity } from './review.entity';
import { orderEntity } from './order.entity';
import { productColorEntity } from './productColor.entity';
import { newArrivalEntity } from './newArrival.entity';

@Entity('product')
export class productEntity extends parentEntity {
  @Column()
  name: string;

  @Column()
  price: number;

  @Column({ default: 0 })
  discount: number;

  @Column()
  description: string;

  @Column()
  brand: string;

  @Column({ default: ProductStatus.available })
  status: ProductStatus;

  @OneToMany(() => orderEntity, (order) => order.product)
  order: orderEntity[];

  @ManyToOne(() => categoryEntity, (category) => category.product)
  category: categoryEntity;

  @OneToMany(() => productImageEntity, (image) => image.product)
  image: productImageEntity[];

  @OneToMany(() => productSpecEntity, (spec) => spec.product, {
    onDelete: 'CASCADE',
  })
  spec: productSpecEntity[];

  @OneToMany(() => reviewEntity, (review) => review.product)
  review: reviewEntity[];

  @OneToMany(() => productColorEntity, (color) => color.product)
  color: productColorEntity[];

  @OneToOne(() => newArrivalEntity, (newArrival) => newArrival.product)
  @JoinColumn({ name: 'productId' })
  newArrival: newArrivalEntity;
}
