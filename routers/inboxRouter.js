import express from "express"
import { getInbox } from "../controllers/inboxController.js"
import decorateHtmlResponses from "../middlewares/common/decorateHtmlResponses.js"

const router = express.Router()
router.get('/', decorateHtmlResponses("Inbox"), getInbox)

export default router
