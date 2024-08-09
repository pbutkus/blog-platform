import { Router } from "express";
import {
  createNewPost,
  deletePostById,
  getAllPosts,
  getPostById,
  patchPostById,
} from "../controllers/postController";

const router = Router();

router.get("/posts", getAllPosts);
router.get("/posts/:id", getPostById);
router.post("/posts", createNewPost);
router.delete("/posts/:id", deletePostById);
router.patch("/posts/:id", patchPostById);

export default router;
