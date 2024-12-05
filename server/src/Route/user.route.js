import {Router} from 'express'
import { addFriend, getUser, login, logout, register, removeSocketId, updateSocketId } from '../Controller/user.controller.js'
import verifyJwt from '../Middleware/verifyJwt.middleware.js'
import upload from '../Middleware/multer.middleware.js'

const router = Router()

router.route("/login").post(login)
router.route("/register").post(upload.single("avatar"),register)
router.route("/getUserInfo/:username").get(getUser)
router.route("/addfriend").post(verifyJwt,addFriend)
router.route("/updateSocketId").put(verifyJwt,updateSocketId)
router.route("/removeSocketId").put(verifyJwt,removeSocketId)
router.route("/logout").post(verifyJwt,logout)

export default router