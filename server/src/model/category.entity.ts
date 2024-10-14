import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { parentEntity } from ".";
import { adminEntity } from "./admin.entity";
import { productEntity } from "./product.entity";

@Entity('category')
export class categoryEntity extends parentEntity{
    @Column()
    name:string;

    @ManyToOne(()=>adminEntity,(admin)=>admin.category)
    admin:adminEntity;

    @OneToMany(()=>productEntity,(product)=>product.category)
    product:productEntity[];
}