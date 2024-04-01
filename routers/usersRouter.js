import express from "express"
import { check } from "express-validator"

import { addUser, deleteUser, getRegisterView, getUsers } from "../controllers/usersController.js"
import decorateHtmlResponses from "../middlewares/common/decorateHtmlResponses.js"
import avatarUpload from "../middlewares/users/avatarUpload.js"
import { userValidation, userValidationHandler } from "../middlewares/users/userValidation.js"
import { checkLogin } from "../middlewares/common/checkLogin.js"

const router = express.Router()

router.get("/", decorateHtmlResponses("Users"), checkLogin, getUsers)
router.get("/register", decorateHtmlResponses("Register"), checkLogin, getRegisterView)
router.post("/register", checkLogin, avatarUpload, userValidation, userValidationHandler, addUser)
router.delete("/:id", checkLogin, deleteUser)

export default router
