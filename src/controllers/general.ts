import { Request, Response } from 'express';
import User from '../models/User';

const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user
            = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export const generalController = {
    getUser,
};