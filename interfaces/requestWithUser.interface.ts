import { Request } from "express"
import { JwtPayload } from "jsonwebtoken"

interface RequestWithUser extends Request {
  user?: JwtPayload | string
}

export default RequestWithUser
