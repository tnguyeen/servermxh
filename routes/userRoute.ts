import express, { Response } from "express";
import {
  getUser,
  getAllUsers,
  userFollow,
} from "../controllers/userController";
import auth from "./../middleware/auth";
import RequestWithUser from "../interfaces/requestWithUser.interface";
import verifyToken from "./../middleware/auth";

const router = express.Router();

router.route("/").get(getAllUsers);
router.route("/:username").get(verifyToken, getUser);
router.route("/follow").post(userFollow);

router.get("/users/me", auth, async (req: RequestWithUser, res: Response) => {
  res.send(req.user);
});

export default router;
