"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = require("../controllers/postController");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
/* READ */
router.get("/", auth_1.default, postController_1.getFeedPosts);
router.get("/:userId/posts", auth_1.default, postController_1.getUserPosts);
router.post("/create", auth_1.default, postController_1.upload.single("postPhoto"), postController_1.createPost);
/* UPDATE */
router.patch("/:id/like", auth_1.default, postController_1.likePost);
router.patch("/:id/cmt", auth_1.default, postController_1.commentPost);
exports.default = router;
