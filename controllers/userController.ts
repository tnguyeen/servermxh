import { Request, Response } from "express"
import { ObjectId } from "mongodb"
import User from "../models/userModel"

/*OK*/
export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne(req.params)

    if (!user) {
      res.status(201).json({
        status: "ko co'",
      })
      return
    }

    res.status(201).json({
      status: "success",
      data: {
        user: user,
      },
    })
  } catch (error) {
    res.status(400).json({
      status: "no can do",
      mess: `${error}`,
    })
  }
}

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const user = await User.find()

    res.status(201).json({
      status: "success",
      data: {
        users: user,
      },
    })
  } catch (error) {
    res.status(400).json({
      status: "no can do",
      mess: `${error}`,
    })
  }
}

export const userFollow = async (req: Request, res: Response) => {
  try {
    const { kobiet, target } = req.body

    let user = await User.findOne({ username: kobiet })
    let follow = await User.findOne({ username: target })

    if (!user || !follow) {
      res.status(400).json({
        status: "no can do",
        mess: "ko co",
      })
      return
    }

    if (user.following.includes(follow._id)) {
      follow.followers = follow.followers.filter((id: ObjectId) => {
        id.toString() !== user?._id!.toString()
      })
      user.following = user.following.filter((id: ObjectId) => {
        return id.toString() !== follow._id.toString()
      })
    } else {
      user.following.push(follow._id)
      follow.followers.push(user._id)
    }
    await user.save()
    await follow.save()

    res.status(200).json({
      status: "success",
      data: {
        user: user,
        follow: follow,
      },
    })
  } catch (error) {
    res.status(400).json({
      status: "no can do",
      mess: `${error}`,
    })
  }
}

/*chua he OK*/
export const getFollowers = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne(req.params)
    console.log(user!.followers)

    res.status(201).json({
      status: "success",
      data: {
        user: user,
      },
    })
  } catch (error) {
    res.status(400).json({
      status: "no can do",
      mess: `${error}`,
    })
  }
}

export const getFollowing = async (req: Request, res: Response) => {
  try {
    const user = await User.find()

    res.status(201).json({
      status: "success",
      data: {
        user: user,
      },
    })
  } catch (error) {
    res.status(400).json({
      status: "no can do",
      mess: `${error}`,
    })
  }
}
