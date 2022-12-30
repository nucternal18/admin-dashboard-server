"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// create a basic express app using imports
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const client_1 = __importDefault(require("./routes/client"));
const general_1 = __importDefault(require("./routes/general"));
const management_1 = __importDefault(require("./routes/management"));
const sales_1 = __importDefault(require("./routes/sales"));
// load env variables
dotenv_1.default.config();
// create a new express app instance
const app = (0, express_1.default)();
// define PORT
const PORT = process.env.PORT || 5001;
// configure the app to use bodyParser()
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((0, morgan_1.default)("common"));
app.use((0, cors_1.default)());
/* ROUTES */
app.use("/api/v1/client", client_1.default);
app.use("/api/v1/general", general_1.default);
app.use("/api/v1/management", management_1.default);
app.use("/api/v1/sales", sales_1.default);
/** MONGOOSE SETUP */
mongoose_1.default.set("strictQuery", false);
mongoose_1.default
    .connect(process.env.MONGO_URI)
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
    `🚀 ~ [server]: Error connecting to database: ${err}`;
});
//# sourceMappingURL=server.js.map