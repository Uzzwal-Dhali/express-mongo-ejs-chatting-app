import express from "express"
import { check } from "express-validator"

import { addUser, deleteUser, getRegisterView, getUsers } from "../controllers/usersController.js"
import decorateHtmlResponses from "../middlewares/common/decorateHtmlResponses.js"
import avatarUpload from "../middlewares/users/avatarUpload.js"
import { userValidation, userValidationHandler } from "../middlewares/users/userValidation.js"

const router = express.Router()

router.get("/", decorateHtmlResponses("Users"), getUsers)
router.post("/")
router.get("/register", decorateHtmlResponses("Register"), getRegisterView)
router.post("/register", avatarUpload, userValidation, userValidationHandler, addUser)
router.delete("/:id", deleteUser)

export default router
