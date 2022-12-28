import { Request, Response } from "express";
import Product from "../models/Product";
import ProductStats from "../models/ProductStats";
import User from "../models/User";
import Transaction from "../models/Transaction";
import { getCountryISO3 } from "../utils/getCountryIso3";



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

const getCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");
    return res.status(200).json(customers);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

const getTransactions = async (req: Request, res: Response) => {
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;
    try {
        const generateSort = () => {
            const sortParsed = JSON.parse(sort as string);
            const sortFormatted = {
                [sortParsed.field]: sortParsed.order === "asc" ? 1 : -1,
            }
            return sortFormatted;
        }
        const sortFormatted = Boolean(sort) ? generateSort() : {  };
        const transactions = await Transaction.find({
            $or: [
                { cost : { $regex: new RegExp(search as string, "i") } },
                { userId : { $regex: new RegExp(search as string, "i") } },
            ],
        }).sort(`${sortFormatted}`).skip((Number(page)) * Number(pageSize)).limit(Number(pageSize));

        const total = await Transaction.countDocuments({
            name: { $regex: search, $options: "i"}
        });

        return res.status(200).json({transactions, total});
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

const getGeography = async (req: Request, res: Response) => {
    try {
        const customers = await User.find({ role: "user" }).select("-password");
        const mappedLocations = customers.reduce((acc: any, { country }) => {
            const countryISO3  = getCountryISO3(country);
            if (!acc[countryISO3]) {
                acc[countryISO3] = 0;
            }
            acc[countryISO3] += 1;
            return acc;
        }, {});

        const mappedLocationsArray = Object.entries(mappedLocations).map(([country, count]) => {
            return {
                id: country,
                value: count,
            }
        });
        
        return res.status(200).json(mappedLocationsArray);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export const clientController = {
    getProducts,
    getCustomers,
    getTransactions,
    getGeography,
};