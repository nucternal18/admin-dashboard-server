import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    image: {
      type: String,
    },
    category: {
      type: String,
    },
    rating: {
      type: Number,
    },
    supply: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
