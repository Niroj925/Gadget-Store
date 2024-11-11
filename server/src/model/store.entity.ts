import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { parentEntity } from ".";
import { customerEntity } from "./customer.entity";
import { adminEntity } from "./admin.entity";

@Entity('store')
export class storeEntity extends parentEntity{
    @Column('float')
    latitude:number;

    @Column('float')
    longitude:number;

    @Column({default:null})
    location:string;

    @OneToOne(()=>adminEntity,(customer)=>customer.store)
    @JoinColumn({name:'adminId'})
    admin:adminEntity;
}