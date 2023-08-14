import Post from "../models/postModel"
import { Request, Response } from "express"
import User from "../models/userModel"
import { ObjectId } from "mongodb"
import multer from "multer"
import { ref, uploadBytesResumable } from "firebase/storage"
import { readFileSync } from "fs"
import { firebaseStorage } from "../firebase/firebaseConfig"

/* Create */
export const createPost = async (req: Request, res: Response) => {
  try {
    const { userId, caption } = req.body
    const metadata = {
      contentType: req.file.mimetype,
    }
    const avaPic = ref(firebaseStorage, req.file.filename)
    uploadBytesResumable(avaPic, readFileSync(req.file.path), metadata)

    const user = await User.findById(userId)
    const newPost = new Post({
      userId: userId,
      username: user.username,
      profilePic: user.profilePic,
      caption: caption,
      image: req.file.filename,
      likes: [],
      comments: [],
    })
    const post = await newPost.save()
    user.posts.push(post._id)
    await user.save()
    res.status(201).json({
      status: "success",
      data: {
        post: post,
      },
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      mess: error,
    })
  }
}

/* READ */
export const getFeedPosts = async (req: Request, res: Response) => {
  try {
    const post = await Post.find()
    res.status(200).json(post)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

export const getUserPosts = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const post = await Post.find({ userId })
    res.status(200).json(post)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

/* UPDATE */

export const likePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { userId } = req.body
    const post = await Post.findById(id)
    const user = await User.findById(userId)

    if (!user || !post) {
      res.status(400).json({
        status: "no can do",
        mess: "ko co",
      })
      return
    }

    const isLiked = post.likes.includes(user._id)

    if (isLiked) {
      post.likes = post.likes.filter((id: ObjectId) => {
        return id.toString() !== user?._id!.toString()
      })
    } else {
      post.likes.push(user._id)
    }

    // const target = await updatedPost(id, post.likes, { new: true })
    const target = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    )

    res.status(200).json(target)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

export const commentPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { userId, comment } = req.body
    const post = await Post.findById(id)
    const user = await User.findById(userId)

    if (!user || !post) {
      res.status(400).json({
        status: "no can do",
        mess: "ko co",
      })
      return
    }

    post.comments.push({ username: user.username, comment: comment })
    const target = await post.save()

    res.status(200).json(target)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

// Multer
const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb) {
    cb(null, "./abc")
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + req.body.userId + "-" + Date.now() + ".png")
  },
})

export const upload = multer({ storage: storage })
