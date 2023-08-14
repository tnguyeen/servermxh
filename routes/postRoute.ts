import express from "express";
import {
  commentPost,
  createPost,
  getFeedPosts,
  getUserPosts,
  likePost,
  upload,
} from "../controllers/postController";
import verifyToken from "../middleware/auth";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

router.post("/create", verifyToken, upload.single("postPhoto"), createPost);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/cmt", verifyToken, commentPost);

export default router;
