import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { parentEntity } from '.';
import { productEntity } from './product.entity';

@Entity('productSpec')
export class productSpecEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  specification: string;

  @ManyToOne(() => productEntity, (product) => product.spec, {
    onDelete: 'CASCADE',
  })
  product: productEntity;
}
