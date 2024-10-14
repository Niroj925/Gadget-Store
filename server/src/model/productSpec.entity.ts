import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { parentEntity } from ".";
import { productEntity } from "./product.entity";

@Entity('productSpec')
export class productSpecEntity extends parentEntity{
    @Column()
    specification:string;

    @ManyToOne(()=>productEntity,(product)=>product.spec)
    product:productEntity;
}