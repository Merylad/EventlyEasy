import { Router } from "express";
import { register, login, contact } from "../controllers/usersControllers";

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/contact', contact)

export default router