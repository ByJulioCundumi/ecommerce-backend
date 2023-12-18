import { Request, Response } from "express";
import { Product } from "../entity/Product.js";
import { IProduct } from '../interfaces/IProduct';

export const findOneProductById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const result = await Product.findOneBy({ id: id })
        if (!result?.id) return res.status(404).json({ message: "Producto no encontrado o inexistente" })
        //
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
    }
}

export const findAllProducts = async (req: Request, res: Response) => {
    try {
        const result = await Product.find()
        if (!(result.length > 0)) return res.status(404).json({ message: "No hay productos registrados" })
        //
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
    }
}

export const postProduct = async (req: Request, res: Response) => {
    const product:IProduct = req.body

    try {
        const newProduct = new Product()
        newProduct.img = product.img;
        newProduct.name = product.name;
        newProduct.stars = product.stars;
        newProduct.prevPrice = product.prevPrice;
        newProduct.currentPrice = product.currentPrice;
        newProduct.category = product.category;
        newProduct.stock = product.stock;
        //
        const result = await newProduct.save()
        if (!result.id) return res.status(500).json({ message: "Ocurrio un error al guardar el producto" })
        //
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
    }
}

export const putProduct = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const product:IProduct = req.body

    try {
        const found = await Product.findOneBy({id:id})
        if (!found?.id) return res.status(404).json({ message: "Producto no encontrado o inexistente" })
        //
        found.img = product.img;
        found.name = product.name;
        found.stars = product.stars;
        found.prevPrice = product.prevPrice;
        found.currentPrice = product.currentPrice;
        found.category = product.category;
        found.stock = product.stock;
        //
        const result = await found.save()
        if (!result.id) return res.status(500).json({ message: "Ocurrio un error al actualizar el producto" })
        //
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
    }
}

export const deleteOneProductById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const result = await Product.delete(id)
        if(!(result.affected != 0)) return res.status(404).json({ message: "Producto no encontrado o inexistente" })
        //
        return res.status(204).end()
    } catch (error) {
        console.log(error)
    }
}