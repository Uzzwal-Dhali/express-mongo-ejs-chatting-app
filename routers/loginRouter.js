import express from "express"
import { getLogin, login, logout } from "../controllers/loginController.js"
import decorateHtmlResponses from "../middlewares/common/decorateHtmlResponses.js"
import { loginValidation, loginValidationHandler } from "../middlewares/login/loginValidation.js"
import { redirectLoggedIn } from "../middlewares/common/checkLogin.js"

const router = express.Router()
router.get("/", decorateHtmlResponses("Login"), redirectLoggedIn, getLogin)
router.post("/", decorateHtmlResponses("Login"), loginValidation, loginValidationHandler, login)
router.delete("/", logout)

export default router
