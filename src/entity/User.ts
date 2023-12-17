import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable: false})
    firstname:string;

    @Column({nullable: false})
    lastname:string;

    @Column({unique: true, nullable: false})
    email:string;

    @Column({nullable: false})
    password:string;

    @Column({default: "user", nullable: false})
    role: string;

    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAt:Date;

}