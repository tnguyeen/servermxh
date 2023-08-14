"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const http_1 = __importDefault(require("http"));
dotenv_1.default.config({ path: "./config.env" });
const DB = process.env.DATABASE;
const port = process.env.PORT || 8000;
const server = http_1.default.createServer(app_1.default);
mongoose_1.default
    .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
    server.listen(port, () => {
        console.log(`Server port : ${port}`);
    });
})
    .catch((err) => {
    console.log(err);
});
