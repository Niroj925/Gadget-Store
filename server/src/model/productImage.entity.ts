import { Column, Entity, ManyToOne } from "typeorm";
import { parentEntity } from ".";
import { productEntity } from "./product.entity";

@Entity('productImage')
export class productImageEntity extends parentEntity{
    @Column()
    image:string;

    @ManyToOne(()=>productEntity,(product)=>product.image)
    product:productEntity;
}