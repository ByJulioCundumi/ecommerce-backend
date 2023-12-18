import { Request } from "express"

export interface IUser{
    id?:number,
    firstname:string,
    lastname:string,
    email:string,
    password:string,
    role: string,
    createdAt?:Date,
    updatedAt?:Date
}

export interface IUserDTO extends Omit<IUser, "password">{}
export interface IUserLogin extends Pick<IUser, "email" | "password">{}