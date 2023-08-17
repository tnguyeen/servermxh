import { Request, Response } from "express"
import Mess from "../models/messModel"

/*OK*/
export const getChat = async (req: Request, res: Response) => {
  try {
    const { room } = req.query
    const chat = await Mess.find({ room: room })
    if (!chat) {
      res.status(201).json({
        status: "ko co'",
      })
      return
    }
    res.status(201).json({
      status: "success",
      data: {
        chat: chat,
      },
    })
  } catch (error) {
    res.status(400).json({
      status: "no can do",
      mess: `${error}`,
    })
  }
}

export const sendMess = async (req: Request, res: Response) => {
  try {
    const { room, senderId, message } = req.body

    const newMess = new Mess({
      room: room,
      senderId: senderId,
      message: message,
    })
    const mess = await newMess.save()
    res.status(201).json({
      status: "success",
      data: {
        mess: mess,
      },
    })
  } catch (error) {
    res.status(400).json({
      status: "fail to regist",
      mess: `${error}`,
    })
  }
}
