"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
// router.post("/login", login)
router.route("/login").post(authController_1.login);
router.route("/register").post(authController_1.upload.single("profilepic"), authController_1.register);
exports.default = router;
