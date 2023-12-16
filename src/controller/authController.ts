import jwt  from "jsonwebtoken";
import { Request, Response } from "express";
import { SECRET_KEY } from "../config/config.js";
import bcrypt from "bcryptjs"
import { IUser, IUserLogin } from "../interfaces/IUser";
import { User } from "../entity/User.js";

export const postRegister = async (req:Request, res:Response)=>{
    const {firstname, lastname, email, password}:IUser = req.body;
    try {
        const user = new User()
        user.firstname = firstname;
        user.lastname = lastname;
        user.email = email;
        user.password = await bcrypt.hash(password, 10);
        //
        const result = await user.save();
        if(!result) return res.status(500)
        //
        jwt.sign({id: result.id}, SECRET_KEY, {expiresIn: "1d"}, (error, token)=>{
            if(error) return res.status(500)
            //
            res.cookie("token", token)
            res.json({
                id: result.id,
                firstname: result.firstname,
                lastname: result.lastname,
                email: result.email,
                createdAt: result.createdAt,
                updatedAt: result.updatedAt
            })
        })
    } catch (error) {
        console.log(error)
    }
}

export const postLogin = async (req:Request, res:Response)=>{
    const {email, password}:IUserLogin = req.body;
    try {
        const result = await User.findOneBy({email:email});
        if(!result) return res.status(404).json({message:"Usuario no encontrado o inexistente"})
        //
        const isMatch = await bcrypt.compare(password, result.password);
        if(!isMatch) return res.status(401).json({message:"Contraseña incorrecta"})
        //
        jwt.sign({id: result.id}, SECRET_KEY, {expiresIn: "1d"}, (error, token)=>{
            if(error) return res.status(500)
            //
            res.cookie("token", token)
            res.json({
                id: result.id,
                firstname: result.firstname,
                lastname: result.lastname,
                email: result.email,
                createdAt: result.createdAt,
                updatedAt: result.updatedAt
            })
        })
    } catch (error) {
        console.log(error)
    }
}

export const postLogout = (req:Request, res:Response)=>{
    const {token} = req.cookies;
    res.cookie("token", "", {
        expires: new Date(0)
    })
    res.status(204)
}

export const postVerify = async (req:Request, res:Response)=>{
    const {token} = req.cookies;

    jwt.verify(token, SECRET_KEY, async (error: jwt.JsonWebTokenError | null, decoded:any)=>{
        if(error) return res.status(403).json({message:"Token inexistente"})
        //
        try {
            const result = await User.findOneBy({id: decoded.id})
            if(!result) return res.status(404).json({message:"Usuario no encontrado o inexistente"})
            //
            res.status(200).json({
                id: result.id,
                firstname: result.firstname,
                lastname: result.lastname,
                email: result.email,
                createdAt: result.createdAt,
                updatedAt: result.updatedAt
            })
        } catch (error) {
            console.log(error)
        }
    })
}