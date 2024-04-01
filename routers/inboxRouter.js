import express from "express"
import { getInbox } from "../controllers/inboxController.js"
import decorateHtmlResponses from "../middlewares/common/decorateHtmlResponses.js"
import { checkLogin } from "../middlewares/common/checkLogin.js"

const router = express.Router()
router.get('/', decorateHtmlResponses("Inbox"), checkLogin, getInbox)

export default router
