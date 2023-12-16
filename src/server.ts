import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Request, Response } from "express";
import authRoutes from "./routes/authRoutes.js";

//Server
const app = express()
app.use(morgan("dev"))
app.use(cors({origin:"", credentials:true}))
app.use(express.json())
app.use(cookieParser())

// Routes
app.get("/api", (req:Request, res:Response)=>{res.json({message:"The server is working correctly"})})
app.use("/api/auth", authRoutes)

export default app;