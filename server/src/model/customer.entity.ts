import { Column, Entity, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { parentEntity } from ".";
import { locationEntity } from "./location.entity";
import { reviewEntity } from "./review.entity";
import { orderEntity } from "./order.entity";

@Entity('customer')
export class customerEntity extends parentEntity{
    @Column()
    name:string;

    @Column()
    email:string;

    @Column()
    profile:string;

    @Column('bigint',{default:null})
    phone:number;

    @OneToOne(()=>locationEntity,(location)=>location.customer)
    location:locationEntity;

    @OneToMany(()=>orderEntity,(order)=>order.customer)
    order:orderEntity[];

    @OneToMany(()=>reviewEntity,(review)=>review.customer)
    review:reviewEntity[];
}