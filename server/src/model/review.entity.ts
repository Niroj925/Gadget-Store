import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { parentEntity } from ".";
import { productEntity } from "./product.entity";
import { customerEntity } from "./customer.entity";

@Entity('review')
export class reviewEntity extends parentEntity{
    @Column()
    review:string;

    @Column()
    rating:number;

    @ManyToOne(()=>productEntity,(product)=>product.review)
    product:productEntity;

    @ManyToOne(()=>customerEntity,(customer)=>customer.review)
    customer:customerEntity;

}