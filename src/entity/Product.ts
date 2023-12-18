import {Entity, PrimaryGeneratedColumn, BaseEntity, Column} from "typeorm"

@Entity()
export class Product extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable:false, unique:true})
    img:string;

    @Column({nullable:false})
    name:string;

    @Column({nullable:false})
    stars: number;

    @Column({nullable:false})
    prevPrice: number;

    @Column({nullable:false})
    currentPrice: number;

    @Column({nullable:false})
    category:string;

    @Column({nullable:false})
    stock:boolean;
}