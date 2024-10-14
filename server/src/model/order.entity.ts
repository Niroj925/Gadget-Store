import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { parentEntity } from ".";
import { orderStatus } from "src/helper/types/index.type";
import { orderDeliverEntity } from "./orderDeliver.entity";
import { productEntity } from "./product.entity";
import { customerEntity } from "./customer.entity";

@Entity('order')
export class orderEntity extends parentEntity{
    @Column()
    quantity:number;

    @Column()
    status:orderStatus;

    @ManyToOne(()=>productEntity,(product)=>product.order)
    product:productEntity;

    @OneToMany(()=>orderDeliverEntity,(orderDeliver)=>orderDeliver.order)
    deliver:orderDeliverEntity[];

    @ManyToOne(()=>customerEntity,(customer)=>customer.order)
    customer:customerEntity;
}