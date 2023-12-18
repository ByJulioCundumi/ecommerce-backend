import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { SECRET_KEY } from "../config/config.js";
import bcrypt from "bcryptjs"
import { IUser, IUserLogin } from "../interfaces/IUser";
import { User } from "../entity/User.js";

export const postRegister = async (req: Request, res: Response) => {
    const { firstname, lastname, email, password }: IUser = req.body;
    try {
        const user = new User()
        user.firstname = firstname;
        user.lastname = lastname;
        user.email = email;
        user.password = await bcrypt.hash(password, 10);
        //
        const result = await user.save();
        if (!result.id) return res.status(500)
        //
        const token:IUser = {
            id: result.id,
            firstname: result.firstname,
            lastname: result.lastname,
            email: result.email,
            password: result.password,
            role: result.role,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt
        }
        //
        jwt.sign(token, SECRET_KEY, { expiresIn: "1d" }, (error, token) => {
            if (error) return res.status(500)
            //
            res.cookie("token", token)
            return res.status(200).json({
                id: result.id,
                firstname: result.firstname,
                lastname: result.lastname,
                email: result.email,
                role: result.role,
                createdAt: result.createdAt,
                updatedAt: result.updatedAt
            })
        })
    } catch (error) {
        console.log(error)
    }
}

export const postLogin = async (req: Request, res: Response) => {
    const { email, password }: IUserLogin = req.body;
    try {
        const result = await User.findOneBy({ email: email });
        if (!result?.id) return res.status(404).json({ message: "Usuario no encontrado o inexistente" })
        //
        const isMatch = await bcrypt.compare(password, result.password);
        if (!isMatch) return res.status(401).json({ message: "Contraseña incorrecta" })
        //
        const token:IUser = {
            id: result.id,
            firstname: result.firstname,
            lastname: result.lastname,
            email: result.email,
            password: result.password,
            role: result.role,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt
        }
        //
        jwt.sign(token, SECRET_KEY, { expiresIn: "1d" }, (error, token) => {
            if (error) return res.status(500)
            //
            res.cookie("token", token)
            return res.status(200).json({
                id: result.id,
                firstname: result.firstname,
                lastname: result.lastname,
                email: result.email,
                role: result.role,
                createdAt: result.createdAt,
                updatedAt: result.updatedAt
            })
        })
    } catch (error) {
        console.log(error)
    }
}

export const postLogout = (req: Request, res: Response) => {
    res.cookie("token", "", {
        expires: new Date(0)
    })
    return res.status(204).end()
}

export const postVerify = async (req: Request, res: Response) => {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: "Token inexistente" })

    jwt.verify(token, SECRET_KEY, async (error: jwt.JsonWebTokenError | null, decoded: any) => {
        if (error) return res.status(403).json({ message: "Token no valido" })
        //
        try {
            const result = await User.findOneBy({ id: decoded.id })
            if (!result) return res.status(404).json({ message: "Usuario no encontrado o inexistente" })
            //
            return res.status(200).json({
                id: result.id,
                firstname: result.firstname,
                lastname: result.lastname,
                email: result.email,
                role: result.role,
                createdAt: result.createdAt,
                updatedAt: result.updatedAt
            })
        } catch (error) {
            console.log(error)
        }
    })
}