import { Column, Entity, ManyToOne } from "typeorm";
import { parentEntity } from ".";
import { orderStatus } from "src/helper/types/index.type";
import { orderEntity } from "./order.entity";

@Entity('orderDeliver')
export class orderDeliverEntity extends parentEntity{
    @Column('float')
    distance:number;

    @Column()
    status:orderStatus;

    @ManyToOne(()=>orderEntity,(order)=>order.deliver,{onDelete:'CASCADE'})
    order:orderEntity;
}