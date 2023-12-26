import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Request, Response } from "express";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

//Server
const app = express()
app.use(morgan("dev"))
app.use(cors({origin:"http://localhost:5173", credentials:true}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

// Routes
app.get("/api", (req:Request, res:Response)=>{res.json({message:"The server is working correctly"})})
app.use("/api", authRoutes)
app.use("/api", productRoutes)
app.use("/api", paymentRoutes)

//
export default app;