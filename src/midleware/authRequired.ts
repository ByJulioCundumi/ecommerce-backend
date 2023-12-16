import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../config/config.js";
import { IUserRequest } from "../interfaces/IUser.js";

export const authRequired = async (req:IUserRequest, res:Response, next:NextFunction)=>{
    const {token} = req.cookies;
    if(!token) return res.status(401).json({message: "Token inexistente, acceso denegado"})
    //
    jwt.verify(token, SECRET_KEY, (error:jwt.JsonWebTokenError | null, decoded:any)=>{
        if(error) return res.status(403).json({message: "Token invalido, acceso denegado"})
        //
        req.userId = decoded.id;
    })
    next();
}