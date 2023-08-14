"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const multer_1 = __importDefault(require("multer"));
const storage_1 = require("firebase/storage");
const firebaseConfig_1 = require("../firebase/firebaseConfig");
const node_fs_1 = require("node:fs");
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const metadata = {
            contentType: req.file.mimetype,
        };
        const avaPic = (0, storage_1.ref)(firebaseConfig_1.firebaseStorage, req.file.filename);
        // uploadBytesResumable(avaPic, req.file.buffer, metadata);
        (0, storage_1.uploadBytesResumable)(avaPic, (0, node_fs_1.readFileSync)(req.file.path), metadata);
        const newUser = new userModel_1.default({
            username: username,
            password: password,
            followers: [],
            following: [],
            profilePic: req.file.filename,
            posts: [],
        });
        const savedUser = yield newUser.save();
        res.status(201).json({
            status: "success",
            data: {
                user: savedUser,
            },
        });
    }
    catch (error) {
        res.status(400).json({
            status: "fail to regist",
            mess: `${error}`,
        });
    }
    next();
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield userModel_1.default.findOne({ username: username });
        if (!user)
            return res.status(400).json({ msg: "Ko co' username nay` " });
        if (password !== user.password) {
            res.status(400).json({ mee: `sai pass man` });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({ token, user });
    }
    catch (error) {
        res.status(400).json({
            status: "fail to login",
            mess: `${error}`,
        });
    }
});
exports.login = login;
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./abc");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + req.body.username + ".png");
    },
});
exports.upload = (0, multer_1.default)({ storage: storage });
// export const upload = multer({ storage: multer.memoryStorage() });
