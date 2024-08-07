import { Router } from "express";
import {
  signupPost,
  loginPost,
  logoutGet,
} from "../controllers/userController";

const router = Router();

router.post("/signup", signupPost);
router.post("/login", loginPost);
router.get("/logout", logoutGet);

export default router;
