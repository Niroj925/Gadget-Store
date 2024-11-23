import { Column, Entity, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { parentEntity } from ".";
import { orderStatus } from "src/helper/types/index.type";
import { orderDeliverEntity } from "./orderDeliver.entity";
import { productEntity } from "./product.entity";
import { customerEntity } from "./customer.entity";
import { orderProductEntity } from "./orderProduct.entity";
import { paymentEntity } from "./payment.entity";

@Entity('order')
export class orderEntity extends parentEntity{

    @Column()
    status:orderStatus;

    @Column({default:null})
    remarks:string;

    @OneToMany(()=>orderProductEntity,(product)=>product.order)
    orderProduct:orderProductEntity[];

    @OneToMany(()=>orderDeliverEntity,(orderDeliver)=>orderDeliver.order)
    deliver:orderDeliverEntity[];

    @ManyToOne(()=>customerEntity,(customer)=>customer.order)
    customer:customerEntity;

    @OneToOne(()=>paymentEntity,(payment)=>payment.order)
    payment:paymentEntity;
}