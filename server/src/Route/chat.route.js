import { Router } from "express";
import { addfriend, getAllMsg, userAllChats } from "../Controller/chat.controller.js";
import verifyJwt from '../Middleware/verifyJwt.middleware.js'
const router = Router()

router.route("/allUserChat").get(verifyJwt,userAllChats)
router.route("/addFriend").post(verifyJwt,addfriend)
router.route("/getAllMsg/:friendId").get(verifyJwt,getAllMsg)

export default router