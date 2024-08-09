import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/User";
import { verifyToken } from "../utils/jwt";

interface CustomRequest extends Request {
  user?: IUser;
}

const checkAuth = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res
      .status(401)
      .send({ error: "No token provided, authorization denied" });
  }

  try {
    const decoded = verifyToken(token);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).send({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    res.status(401).send({ error: "Token is not valid" });
  }
};

export { checkAuth, CustomRequest };
