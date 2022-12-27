import { Request, Response } from "express";
import Product from "../models/Product";
import ProductStats from "../models/ProductStats";


const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();

        const productsWithStats = await Promise.all(
            products.map(async (product) => {
                const productStats = await ProductStats.findOne({
                    productId: product._id,
                });
                return {
                    ...product._doc,
                    stats: productStats,
                };
            })
        )
        
        res.status(200).json(productsWithStats);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};


export const clientController = {
    getProducts,
};