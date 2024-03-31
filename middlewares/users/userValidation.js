import { check, validationResult } from "express-validator";
import createError from "http-errors"
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { unlink } from "fs";

import User from "../../models/People.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const userValidation = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Only characters are accepted")
    .trim(),
  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .custom(async(value) => {
      try {
        const user = await User.findOne({ email: value })
        if(user) {
          throw createError("Email is already used!")
        }
      } catch (error) {
        throw createError(error.message)
      }
    }),
  check("mobile")
    .isMobilePhone("bn-BD", {
      strictMode: true,
    })
    .withMessage("Provide a valid Bangladeshi Mobile Number!")
    .custom(async (value) => {
      try {
        const user = await User.findOne({ mobile: value })
        if(user) {
          throw createError("Mobile already exist!")
        }
      } catch (err) {
        throw createError(err.message)
      }
    }),
  check("password")
    .isStrongPassword()
    .withMessage("Password should be strong!"),
]

const userValidationHandler = function(req, res, next) {
  const errors = validationResult(req)
  const mappedErrors = errors.mapped()
  if(Object.keys(mappedErrors).length === 0) {
    next()
  } else {
    if(req.files.length > 0) {
      const { filename } = req.files[0]
      unlink(
        path.join(__dirname, `/../../public/uploads/avatars/${ filename }`),
        (err) => {
          if(err) console.log(err)
        }
      )
    }
    res.status(500).json({
      errors: mappedErrors,
    })
  }
}

export { userValidation, userValidationHandler }
