import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { parentEntity } from ".";
import { customerEntity } from "./customer.entity";

@Entity('location')
export class locationEntity extends parentEntity{
    @Column('float')
    latitude:number;

    @Column('float')
    longitude:number;

    @Column({default:null})
    location:string;

    @OneToOne(()=>customerEntity,(customer)=>customer.location)
    @JoinColumn({name:'customerId'})
    customer:customerEntity;
}