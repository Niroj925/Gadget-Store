import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { parentEntity } from ".";
import {  roleType } from "src/helper/types/index.type";
import { adminEntity } from "./admin.entity";
import { deliveryEntity } from "./delivery.entity";

@Entity('auth')
export class authEntity extends parentEntity {
    @Column({unique:true})
    email: string;

    @Column()
    password: string;

    @Column()
    role:roleType;

    @Column({default:null})
    rToken: string;

    @OneToOne(()=>adminEntity,(Admin)=>Admin.auth)
    admin:adminEntity

    @OneToOne(()=>deliveryEntity,(deliver)=>deliver.auth)
    delivery:deliveryEntity;
}