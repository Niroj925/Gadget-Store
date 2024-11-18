import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { parentEntity } from ".";
import { paymentMethod, paymentStatus } from "src/helper/types/index.type";
import { orderEntity } from "./order.entity";

@Entity('orderPayment')
export class paymentEntity extends parentEntity{
    @Column()
    amount:number;

    @Column({default:0})
    deliveryCharge:number;

    @Column()
    paymentMethod:paymentMethod;

    @Column()
    status:paymentStatus;

    @OneToOne(()=>orderEntity,(order)=>order.payment)
    @JoinColumn({name:'orderId'})
    order:orderEntity
}