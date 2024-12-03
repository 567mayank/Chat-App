import {Router} from 'express'
import { addFriend, login, register } from '../Controller/user.controller.js'
import verifyJwt from '../Middleware/verifyJwt.middleware.js'

const router = Router()

router.route("/login").post(login)
router.route("/register").post(register)
router.route("/addfriend").post(verifyJwt,addFriend)

export default router