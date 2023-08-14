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
exports.getFollowing = exports.getFollowers = exports.userFollow = exports.getAllUsers = exports.getUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
/*OK*/
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findOne(req.params);
        if (!user) {
            res.status(201).json({
                status: "ko co'",
            });
            return;
        }
        res.status(201).json({
            status: "success",
            data: {
                user: user,
            },
        });
    }
    catch (error) {
        res.status(400).json({
            status: "no can do",
            mess: `${error}`,
        });
    }
});
exports.getUser = getUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.find();
        res.status(201).json({
            status: "success",
            data: {
                users: user,
            },
        });
    }
    catch (error) {
        res.status(400).json({
            status: "no can do",
            mess: `${error}`,
        });
    }
});
exports.getAllUsers = getAllUsers;
const userFollow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { kobiet, target } = req.body;
        let user = yield userModel_1.default.findOne({ username: kobiet });
        let follow = yield userModel_1.default.findOne({ username: target });
        if (!user || !follow) {
            res.status(400).json({
                status: "no can do",
                mess: "ko co",
            });
            return;
        }
        if (user.following.includes(follow._id)) {
            follow.followers = follow.followers.filter((id) => {
                id.toString() !== (user === null || user === void 0 ? void 0 : user._id.toString());
            });
            user.following = user.following.filter((id) => {
                return id.toString() !== follow._id.toString();
            });
        }
        else {
            user.following.push(follow._id);
            follow.followers.push(user._id);
        }
        yield user.save();
        yield follow.save();
        res.status(200).json({
            status: "success",
            data: {
                user: user,
                follow: follow,
            },
        });
    }
    catch (error) {
        res.status(400).json({
            status: "no can do",
            mess: `${error}`,
        });
    }
});
exports.userFollow = userFollow;
/*chua he OK*/
const getFollowers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.findOne(req.params);
        console.log(user.followers);
        res.status(201).json({
            status: "success",
            data: {
                user: user,
            },
        });
    }
    catch (error) {
        res.status(400).json({
            status: "no can do",
            mess: `${error}`,
        });
    }
});
exports.getFollowers = getFollowers;
const getFollowing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.find();
        res.status(201).json({
            status: "success",
            data: {
                user: user,
            },
        });
    }
    catch (error) {
        res.status(400).json({
            status: "no can do",
            mess: `${error}`,
        });
    }
});
exports.getFollowing = getFollowing;
