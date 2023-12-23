import {Entity, PrimaryGeneratedColumn, BaseEntity, Column} from "typeorm"

@Entity()
export class Product extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable:false, type: "simple-json"})
    img:{
        public_id:string,
        url:string,
        path:string
    }

    @Column({nullable:false})
    name:string;

    @Column({nullable:false})
    stars: number;

    @Column({nullable:false, default:1})
    quantity: number;

    @Column({nullable:false})
    prevPrice: number;

    @Column({nullable:false})
    currentPrice: number;

    @Column({nullable:false})
    category:string;

    @Column({nullable:false})
    stock:string;
}