import dotenv from "dotenv"
import mongoose, { ConnectOptions } from "mongoose"
import app from "./app"
import http from "http"

dotenv.config({ path: "./config.env" })

const DB: string = process.env.DATABASE!
const port = process.env.PORT || 8000

const server = http.createServer(app)

mongoose
  .connect(DB!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => {
    server.listen(port, () => {
      console.log(`Server port : ${port}`)
    })
  })
  .catch((err) => {
    console.log(err)
  })
