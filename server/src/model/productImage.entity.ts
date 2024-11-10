import { Column, Entity, ManyToOne } from "typeorm";
import { parentEntity } from ".";
import { productEntity } from "./product.entity";

@Entity('productImage')
export class productImageEntity extends parentEntity{
    @Column({default:null})
    image:string;

    @ManyToOne(()=>productEntity,(product)=>product.image,{onDelete:'CASCADE'})
    product:productEntity;
}