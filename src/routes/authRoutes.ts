import { Router } from "express";
import { postLogin, postLogout, postRegister, postVerify } from "../controller/authController.js";

const router = Router();

router.post("/register", postRegister)
router.post("/login", postLogin)
router.post("/logout", postLogout)
router.post("/verify", postVerify)

export default router;