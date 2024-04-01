import { check, validationResult } from "express-validator";

const loginValidation = [
  check("username")
    .isLength({
      min: 1,
    })
    .withMessage("Email ID/Mobile number is required!"),
  check("password")
    .isLength({
      min: 1,
    })
    .withMessage("Password is required!")

]

const loginValidationHandler = function(req, res, next) {
  const errors = validationResult(req)
  const mappedErrors = errors.mapped()

  if(Object.keys(mappedErrors).length === 0) {
    next()
  } else {
    res.render("index", {
      data: {
        username: req.body.username,
      },
      errors: mappedErrors
    })
  }
}

export { loginValidation, loginValidationHandler }
