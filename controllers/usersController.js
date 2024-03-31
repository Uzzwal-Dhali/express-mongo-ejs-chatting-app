import bcrypt from "bcrypt"

import User from "../models/People.js"
import { unlink } from "fs"
import path from "path"
import { dirname } from "path"
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function getRegisterView(req, res, next) {
  res.render("register")
}

async function getUsers(req, res, next) {
  try {
    const users = await User.find()
    res.render("users", {
      users: users,
    })
  } catch(error) {
    next(error)
  }
}

async function addUser(req, res, next) {
  let newUser
  const hashedPassword = await bcrypt.hash(req.body.password, 10)

  if(req.files && req.files.length > 0) {
    newUser = new User({
      ...req.body,
      avatar: req.files[0].filename,
      password: hashedPassword
    })
  } else {
    newUser = new User({
      ...req.body,
      password: hashedPassword
    })
  }

  try {
    const result = await newUser.save()
    res.status(200).json({
      message: "User added successfull!"
    })
  } catch(err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Unknown error occured!"
        }
      }
    })
  }
}

async function deleteUser(req, res, next) {
  try {
    const user = await User.findByIdAndDelete({
      _id: req.params.id,
    })

    if(user.avatar) {
      unlink (
        path.join(__dirname, `/../public/uploads/avatars/${ user.avatar }`),
        (err) => {
          if(err) console.log(err)
        }
      )
    }

    res.status(200).json({
      message: "User deleted successfully!"
    })
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Oops! Could not delete!",
        }
      }
    })
  }
}

export { addUser, getRegisterView, getUsers, deleteUser }
