import mongoose, { Document } from "mongoose";
import { IUser } from "./User";

export interface IPost extends Document {
  title: string;
  headerImg: string;
  body: string;
  created_at: Date;
  author: IUser["_id"];
}

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter title"],
  },
  headerImg: {
    type: String,
    required: [true, "Please enter header image URL"],
  },
  body: {
    type: String,
    required: [true, "Please enter body content"],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Post = mongoose.model<IPost>("Post", postSchema);

export default Post;
