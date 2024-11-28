import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
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

    @Column({default:paymentStatus.pending})
    status:paymentStatus;

    @Column({default:null})
    remarks:string;

    @ManyToOne(()=>orderEntity,(order)=>order.payment,{onDelete:'CASCADE'})
    order:orderEntity
}