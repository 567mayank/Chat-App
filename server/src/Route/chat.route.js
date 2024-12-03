import { Router } from "express";
import { addfriend, userAllChats } from "../Controller/chat.controller.js";
import verifyJwt from '../Middleware/verifyJwt.middleware.js'
const router = Router()

router.route("/allUserChat").get(verifyJwt,userAllChats)
router.route("/addFriend").post(verifyJwt,addfriend)

export default router