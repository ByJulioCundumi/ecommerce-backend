import Stripe from "stripe";
import { STRIPE_KEY } from "../config/config.js";
import { Request, Response } from "express";
import { IProduct } from "../interfaces/IProduct";

const stripe = new Stripe(STRIPE_KEY)

export const createSession = async (req:Request, res:Response)=>{
    const products:IProduct[] = req.body;
    if(!(products.length>0)) return res.status(400).json({message:"Productos requeridos para procesar el pago"})

    const lineItems = products.map((p)=>{
        return {
            price_data: {
                currency: "usd",
                unit_amount: p.currentPrice * 100,
                product_data:{
                    name: p.name,
                    images: [p.img.url]
                }
            },
            quantity: p.quantity
        }
    })

    try {
        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:5173/auth/dashboard/user",
            cancel_url: "http://localhost:5173/auth/dashboard/user"
        })
        return res.status(200).json(session)
    } catch (error) {
        console.log(error)
    }
}