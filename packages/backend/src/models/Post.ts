import mongoose, { Document } from "mongoose";

interface IPost extends Document {
  title: string;
  headerImg: string;
  body: string;
  author: string;
}

const postSchema = new mongoose.Schema({
  author: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
  },
  title: {
    type: String,
    required: [true, "Please enter title"],
  },
  headerImg: {
    type: String,
    required: [true, "Please enter header image url"],
  },
  body: {
    type: String,
    required: [true, "Please enter body content"],
  },
});

const Post = mongoose.model<IPost & Document>("Post", postSchema);

export default Post;
