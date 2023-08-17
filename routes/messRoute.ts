import express from "express"
import { getChat, sendMess } from "../controllers/messController"
import verifyToken from "../middleware/auth"

const router = express.Router()

/* READ */
router.get("/", verifyToken, getChat)

router.post("/send", verifyToken, sendMess)

export default router
