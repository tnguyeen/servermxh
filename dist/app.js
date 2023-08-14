"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const postRoute_1 = __importDefault(require("./routes/postRoute"));
const app = (0, express_1.default)();
app.set("view engine", "ejs");
dotenv_1.default.config({ path: "./config.env" });
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.send(`Hello`);
});
/* CAC THE LOAI ROUTE */
app.use("/auth", authRoute_1.default);
app.use("/user", userRoute_1.default);
app.use("/post", postRoute_1.default);
exports.default = app;
