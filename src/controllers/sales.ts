import { Request, Response } from "express";
import OverallStat from "../models/OverallStat";

const getSales = async (req: Request, res: Response) => {
  try {
    const overallStats = await OverallStat.find();

    res.status(200).json(overallStats[0]);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const salesController = {
  getSales,
};
