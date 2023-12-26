import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../config/config.js";

export const adminAuthRequired = (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: "Token inexistente, acceso denegado" })
    //
    jwt.verify(token, SECRET_KEY, (error: jwt.JsonWebTokenError | null, decoded: any) => {
        if (error) return res.status(403).json({ message: "Token invalido, acceso denegado" })
        if(!(decoded.role === "admin")) return res.status(401).json({ message: "Acceso valido solo para administradores" }) 
    })
    return next();
};

export const paymentAuthRequired = (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: "Token inexistente, acceso denegado" })
    //
    jwt.verify(token, SECRET_KEY, (error: jwt.JsonWebTokenError | null, decoded: any) => {
        if (error) return res.status(403).json({ message: "Token invalido, acceso denegado" })
        if(!(decoded.role === "user")) return res.status(401).json({ message: "Acceso valido solo para administradores" }) 
    })
    return next();
};