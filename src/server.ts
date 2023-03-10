// create a basic express app using imports
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose, { connect } from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client";
import generalRoutes from "./routes/general";
import managementRoutes from "./routes/management";
import salesRoutes from "./routes/sales";

// data import
import User from "./models/User";
import Product from "./models/Product";
import ProductStats from "./models/ProductStats";
import Transaction from "./models/Transaction";
import OverallStat from "./models/OverallStat";
import { dataUser, dataProduct, dataProductStat, dataTransaction, dataOverallStat, dataAffiliateStat } from "./data";

// load env variables
dotenv.config();

// create a new express app instance
const app: express.Application = express();

// define PORT
const PORT = process.env.PORT || 5002;

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());

/* ROUTES */
app.use("/api/v1/client", clientRoutes);
app.use("/api/v1/general", generalRoutes);
app.use("/api/v1/management", managementRoutes);
app.use("/api/v1/sales", salesRoutes);

/** MONGOOSE SETUP */
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    // start the Express server
    app.listen(PORT, () => {
      console.log(`"🚀 ~ [server]: Server running on port ${PORT}"`);
    });

    /** ADD DATA ONCE */
    // User.insertMany(dataUser);
    // Product.insertMany(dataProduct);
    // ProductStats.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // OverallStat.insertMany(dataOverallStat);
  })
  .catch((err) => {
    `🚀 ~ [server]: Error connecting to database: ${err}`
  });
