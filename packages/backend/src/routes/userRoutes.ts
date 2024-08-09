import { Response, Router } from "express";
import {
  signupPost,
  loginPost,
  logoutGet,
} from "../controllers/userController";
import { checkAuth, CustomRequest } from "../middleware/checkAuth";

const router = Router();

router.post("/user/signup", signupPost);
router.post("/user/login", loginPost);
router.get("/user/logout", logoutGet);

router.get(
  "/user/check-auth",
  checkAuth,
  (req: CustomRequest, res: Response) => {
    const user = req.user;

    if (!user) {
      res.sendStatus(401);
    }

    res.send(user);
  }
);

export default router;
