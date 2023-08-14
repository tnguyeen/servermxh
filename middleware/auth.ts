import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import RequestWithUser from "../interfaces/requestWithUser.interface"

const verifyToken = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.header("Authorization")

    if (!token) {
      return res.status(403).send("Access Denied")
    }

    if (token.startsWith("Bearer ")) {
      token = token.replace("Bearer ", "")
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET!)

    req.user = verified
    next()
  } catch (err) {
    res.status(403).json({ error: err })
  }
}
export default verifyToken
