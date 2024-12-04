import {Router} from 'express'
import { addFriend, getUser, login, register, removeSocketId, updateSocketId } from '../Controller/user.controller.js'
import verifyJwt from '../Middleware/verifyJwt.middleware.js'

const router = Router()

router.route("/login").post(login)
router.route("/register").post(register)
router.route("/getUserInfo/:username").get(getUser)
router.route("/addfriend").post(verifyJwt,addFriend)
router.route("/updateSocketId").put(verifyJwt,updateSocketId)
router.route("/removeSocketId").put(verifyJwt,removeSocketId)

export default router