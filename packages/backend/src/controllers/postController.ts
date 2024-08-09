import { Request, Response } from "express";
import Post from "../models/Post";
import { verifyToken } from "../utils/jwt";
import { IUser } from "../models/User";
import mongoose, { ObjectId } from "mongoose";

const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find({}).populate("author");
    res.send(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching posts");
  }
};

const getPostById = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    res.sendStatus(400);
  }

  try {
    const post = await Post.findById(id);
    res.send(post);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching posts");
  }
};

const getAllPostsByUserId = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const posts = await Post.find({ author: userId });
  res.send(posts);
};

const createNewPost = async (req: Request, res: Response) => {
  const userToken = req.cookies.jwt;
  const { title, headerImg, body } = req.body;
  const verifiedToken = verifyToken(userToken);

  if (verifiedToken.id) {
    try {
      const newPost = await Post.create({
        title: title,
        headerImg: headerImg,
        body: body,
        author: verifiedToken.id,
      });
      res.status(201).send(newPost);
    } catch (err) {
      res.sendStatus(400);
      throw new Error(`Error creating a new post: ${err}`);
    }
  } else {
    res.sendStatus(401);
  }
};

const deletePostById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const userToken = req.cookies.jwt;
  const verifiedToken = verifyToken(userToken);

  if (!userToken || !verifiedToken) {
    return res.sendStatus(401);
  }

  const post = await Post.findById(id);

  if (!post) {
    return res.sendStatus(404);
  }

  const author = post?.author as IUser;
  const authorId = new mongoose.Types.ObjectId(author._id as string);

  if (!new mongoose.Types.ObjectId(verifiedToken.id).equals(authorId)) {
    return res.sendStatus(403);
  }

  try {
    await Post.findByIdAndDelete(id);
    return res.sendStatus(200);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
};

const patchPostById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const userToken = req.cookies.jwt;
  const verifiedToken = verifyToken(userToken);
  const body = req.body;

  if (!userToken || !verifiedToken) {
    return res.sendStatus(401);
  }

  const post = await Post.findById(id);

  if (!post) {
    return res.sendStatus(404);
  }

  const author = post?.author as IUser;
  const authorId = new mongoose.Types.ObjectId(author._id as string);

  if (!new mongoose.Types.ObjectId(verifiedToken.id).equals(authorId)) {
    return res.sendStatus(403);
  }

  try {
    const post = await Post.findByIdAndUpdate(id, body);
    return res.send(post);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
};

export {
  getAllPosts,
  getPostById,
  getAllPostsByUserId,
  createNewPost,
  deletePostById,
  patchPostById,
};
