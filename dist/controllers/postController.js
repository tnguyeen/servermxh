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
exports.upload = exports.commentPost = exports.likePost = exports.getUserPosts = exports.getFeedPosts = exports.createPost = void 0;
const postModel_1 = __importDefault(require("../models/postModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const multer_1 = __importDefault(require("multer"));
const storage_1 = require("firebase/storage");
const fs_1 = require("fs");
const firebaseConfig_1 = require("../firebase/firebaseConfig");
/* Create */
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, caption } = req.body;
        const metadata = {
            contentType: req.file.mimetype,
        };
        const avaPic = (0, storage_1.ref)(firebaseConfig_1.firebaseStorage, req.file.filename);
        (0, storage_1.uploadBytesResumable)(avaPic, (0, fs_1.readFileSync)(req.file.path), metadata);
        const user = yield userModel_1.default.findById(userId);
        const newPost = new postModel_1.default({
            userId: userId,
            username: user.username,
            profilePic: user.profilePic,
            caption: caption,
            image: req.file.filename,
            likes: [],
            comments: [],
        });
        const post = yield newPost.save();
        user.posts.push(post._id);
        yield user.save();
        res.status(201).json({
            status: "success",
            data: {
                post: post,
            },
        });
    }
    catch (error) {
        res.status(400).json({
            status: "fail",
            mess: error,
        });
    }
});
exports.createPost = createPost;
/* READ */
const getFeedPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield postModel_1.default.find();
        res.status(200).json(post);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
});
exports.getFeedPosts = getFeedPosts;
const getUserPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const post = yield postModel_1.default.find({ userId });
        res.status(200).json(post);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
});
exports.getUserPosts = getUserPosts;
/* UPDATE */
const likePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = yield postModel_1.default.findById(id);
        const user = yield userModel_1.default.findById(userId);
        if (!user || !post) {
            res.status(400).json({
                status: "no can do",
                mess: "ko co",
            });
            return;
        }
        const isLiked = post.likes.includes(user._id);
        if (isLiked) {
            post.likes = post.likes.filter((id) => {
                return id.toString() !== (user === null || user === void 0 ? void 0 : user._id.toString());
            });
        }
        else {
            post.likes.push(user._id);
        }
        // const target = await updatedPost(id, post.likes, { new: true })
        const target = yield postModel_1.default.findByIdAndUpdate(id, { likes: post.likes }, { new: true });
        res.status(200).json(target);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
});
exports.likePost = likePost;
const commentPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { userId, comment } = req.body;
        const post = yield postModel_1.default.findById(id);
        const user = yield userModel_1.default.findById(userId);
        if (!user || !post) {
            res.status(400).json({
                status: "no can do",
                mess: "ko co",
            });
            return;
        }
        post.comments.push({ username: user.username, comment: comment });
        const target = yield post.save();
        res.status(200).json(target);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
});
exports.commentPost = commentPost;
// Multer
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./abc");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + req.body.userId + "-" + Date.now() + ".png");
    },
});
exports.upload = (0, multer_1.default)({ storage: storage });
