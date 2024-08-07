import { Request, Response } from "express";
import Post from "../models/Post";
import { verifyToken } from "../utils/jwt";

const getAllPosts = async (req: Request, res: Response) => {
  const posts = await Post.find({});
  res.send(posts);
};

const getAllPostsByUserId = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const posts = await Post.find({ author: userId });
  res.send(posts);
};

const createNewPost = async (req: Request, res: Response) => {
    const userToken = req.cookies.jwt;
    const verifiedToken = verifyToken(userToken);

    if (verifiedToken) {
        console.log()
    }
}

export { getAllPosts };
