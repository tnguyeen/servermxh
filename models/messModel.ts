import mongoose, { Schema } from "mongoose"

const messSchema: Schema = new Schema(
  {
    room: {
      type: String,
      required: true,
    },
    senderId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)
const Mess = mongoose.model("Mess", messSchema)

export default Mess
