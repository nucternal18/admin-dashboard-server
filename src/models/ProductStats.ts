import mongoose from "mongoose";

const ProductStatsSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    yearlySalesTotal: {
      type: Number,
    },
    yearlyTotalSoldUnits: {
      type: Number,
    },
    year: {
      type: Number,
    },
    monthlyData: [
      {
        month: {
          type: String,

        },
        totalSales: {
          type: Number,

        },
        totalSoldUnits: {
          type: Number,

        },
      },
    ],
    dailyData: [
      {
        date: {
          type: String,

        },
        totalSales: {
          type: Number,

        },
        totalSoldUnits: {
          type: Number,

        },
      },
    ],
  },
  { timestamps: true }
);

const ProductStats =
  mongoose.models.ProductStats ||
  mongoose.model("ProductStats", ProductStatsSchema);

export default ProductStats;
