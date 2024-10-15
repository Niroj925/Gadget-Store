import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { parentEntity } from ".";
import { authEntity } from "./auth.entity";
import { categoryEntity } from "./category.entity";
@Entity('admin')
export class adminEntity extends parentEntity {
    @Column()
    name: string;

    @Column()
    location: string;

    @Column({default:null})
    photo: string;

    @OneToOne(() => authEntity, (restaurant) => restaurant.admin)
    @JoinColumn({name:'authId'})
    auth: authEntity;

    @OneToMany(()=>categoryEntity,(category)=>category.admin)
    category:categoryEntity[];
}