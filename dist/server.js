"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// create a basic express app using imports
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
// create a new express app instance
const app = (0, express_1.default)();
// define PORT
const PORT = process.env.PORT || 3000;
// configure the app to use bodyParser()
app.use(body_parser_1.default.urlencoded({}));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
// define a route handler for the default home page
app.get('/', (req, res) => { });
// start the Express server
app.listen(PORT, () => {
    console.log(`"🚀 ~ [server]: Server running on port ${PORT}"`);
});
//# sourceMappingURL=server.js.map