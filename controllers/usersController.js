import bcrypt from "bcrypt"

import User from "../models/People.js"

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
    .render("users")
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

export { addUser, getRegisterView, getUsers }
