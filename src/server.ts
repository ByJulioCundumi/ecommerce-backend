import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Request, Response } from "express";

//Server
const app = express()
app.use(morgan("dev"))
app.use(cors({origin:"", credentials:true}))
app.use(express.json())
app.use(cookieParser())

// Routes
app.get("/api", (req:Request, res:Response)=>{res.json({message:"The server is working correctly"})})

export default app;