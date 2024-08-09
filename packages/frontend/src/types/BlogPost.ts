import { Author } from "./Author";

export type BlogPost = {
  title: string;
  headerImg: string;
  body: string;
  created_at: Date;
  author: Author;
  _id: string;
};
