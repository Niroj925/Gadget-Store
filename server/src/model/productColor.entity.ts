import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { productEntity } from './product.entity';
import { ProductStatus } from 'src/helper/types/index.type';

@Entity('productColor')
export class productColorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  color: string;

  @Column({default:ProductStatus.available})
  status:ProductStatus

  @ManyToOne(() => productEntity, (product) => product.color,{onDelete:'CASCADE'})
  product: productEntity;
}
