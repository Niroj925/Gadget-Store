import { Entity, JoinColumn, OneToOne } from "typeorm";
import { parentEntity } from ".";
import { productEntity } from "./product.entity";

@Entity('newArrival')
export class newArrivalEntity extends parentEntity{
    @OneToOne(() => productEntity, (product) => product.newArrival,{onDelete:'CASCADE'})
    @JoinColumn({ name: 'productId' })
    product: productEntity;
}