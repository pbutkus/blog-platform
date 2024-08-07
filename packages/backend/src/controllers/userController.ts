import User from "../models/User";
import { Request, Response } from "express";
import { signToken } from "../utils/jwt";

const maxAge = 3 * 24 * 60 * 60;

const signupPost = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = signToken(user._id as string);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err });
  }
};

const loginPost = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = signToken(user._id as string);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err });
  }
};

const logoutGet = async (req: Request, res: Response) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.sendStatus(200);
};

export { signupPost, loginPost, logoutGet };
