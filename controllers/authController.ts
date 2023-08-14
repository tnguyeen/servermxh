import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import multer from "multer";
import { ref, uploadBytesResumable } from "firebase/storage";
import { firebaseStorage } from "../firebase/firebaseConfig";
import { readFileSync } from "fs";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;
    const metadata = {
      contentType: req.file.mimetype,
    };
    const avaPic = ref(firebaseStorage, req.file.filename);
    // uploadBytesResumable(avaPic, req.file.buffer, metadata);
    uploadBytesResumable(avaPic, readFileSync(req.file.path), metadata);

    const newUser = new User({
      username: username,
      password: password,
      followers: [],
      following: [],
      profilePic: req.file.filename,
      posts: [],
    });
    const savedUser = await newUser.save();
    res.status(201).json({
      status: "success",
      data: {
        user: savedUser,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail to regist",
      mess: `${error}`,
    });
  }
  next();
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) return res.status(400).json({ msg: "Ko co' username nay` " });

    if (password !== user.password) {
      res.status(400).json({ mee: `sai pass man` });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(400).json({
      status: "fail to login",
      mess: `${error}`,
    });
  }
};

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + req.body.username + ".png");
  },
});

export const upload = multer({ storage: storage });
// export const upload = multer({ storage: multer.memoryStorage() });
