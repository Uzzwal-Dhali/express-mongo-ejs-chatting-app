import express from "express"
import { getInbox } from "../controllers/inboxController.js"

const router = express.Router()
router.get('/inbox', getInbox)

export default router
