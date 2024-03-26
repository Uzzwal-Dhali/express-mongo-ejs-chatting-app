import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import path from "path"
import cookieParser from "cookie-parser"

import { notFoundHandler, errorHandler } from "./middlewares/common/errorHandler.js"

const app = express()
dotenv.config()

// Database Connection
mongoose.connect(process.env.MONGO_CONNECTION_URL)
.then(() => console.log("Connection successfull!"))
.catch((err) => console.log(err))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")
app.use(express.static(path.dirname("public")))
app.use(cookieParser(process.env.COOKIE_SECRET))

// Errors Handling
app.use(notFoundHandler)
app.use(errorHandler)

app.listen(process.env.PORT,  () => {
  console.log(`App is listening to port ${ process.env.PORT }`)
})
