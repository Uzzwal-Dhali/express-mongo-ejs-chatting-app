import User from "../models/People.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import createError from "http-errors"

function getLogin(req, res, next) {
  res.render("index")
}

async function login(req, res, next) {
  try {
    const user = await User.findOne({
      $or: [
        { email: req.body.username },
        { mobile: req.body.username },
      ]
    })

    if(user && user._id) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      )

      if(isValidPassword) {
        const userObject = {
          username: user.name,
          mobile: user.mobile,
          email: user.email,
          role: "user"
        }

        const token = jwt.sign(userObject, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRY
        })

        // setting up cookies
        res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: process.env.JWT_EXPIRY,
          httpOnly: true,
          signed:true,
        })

        res.locals.loggedInUser = userObject

        // Redirect to inbox
        res.render("inbox")
      } else {
        throw createError("Login failed!")
      }
    } else {
        throw createError("Login failed!")
    }
  } catch (error) {
    res.render("index", {
      data: {
        username: req.body.username,
      },
      errors: {
        common: {
          msg: error.message
        }
      }
    })
  }
}

// Logout functionality
function logout(req, res) {
  res.clearCookie(process.env.COOKIE_NAME)
  res.send("You are logged out!")
}

export { getLogin, login, logout }
