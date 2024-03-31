import express from "express"
import { getLogin } from "../controllers/loginController.js"
import decorateHtmlResponses from "../middlewares/common/decorateHtmlResponses.js"

const router = express.Router()
router.get("/", decorateHtmlResponses("Login"), getLogin)

export default router
