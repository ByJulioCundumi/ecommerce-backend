export interface IUser{
    id?:number,
    firstname:string,
    lastname:string,
    email:string,
    password:string,
    createdAt?:Date,
    updatedAt?:Date
}

export interface IUserDTO extends Omit<IUser, "password">{}
export interface IUserLogin extends Pick<IUser, "email" | "password">{}