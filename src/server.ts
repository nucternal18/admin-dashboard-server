// create a basic express app using imports
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { connect } from 'mongoose';
import helmet from 'helmet';
import morgan from 'morgan';
import clientRoutes from './routes/client';
import generalRoutes from './routes/general';
import managementRoutes from './routes/management';
import salesRoutes from './routes/sales';

// load env variables
dotenv.config();

// create a new express app instance
const app: express.Application = express();

// define PORT
const PORT = process.env.PORT || 3000;

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(cors());

 /* ROUTES */
 app.use("/api/v1/client", clientRoutes);
 app.use("/api/v1/general", generalRoutes);
 app.use("/api/v1/management", managementRoutes);
 app.use("/api/v1/sales", salesRoutes);


// start the Express server
app.listen(PORT, () => {
    console.log(`"🚀 ~ [server]: Server running on port ${PORT}"`)
});

