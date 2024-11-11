import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { parentEntity } from ".";
import { authEntity } from "./auth.entity";

@Entity('delivery')
export class deliveryEntity extends parentEntity{
    @Column()
    name:string;

    @Column('bigint')
    phone:number;

    @Column({default:null})
    photo:string;

    @OneToOne(()=>authEntity,(auth)=>auth.delivery)
    @JoinColumn({name:'authId'})
    auth:authEntity;
}