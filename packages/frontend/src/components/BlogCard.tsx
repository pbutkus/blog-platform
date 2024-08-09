import { Link } from "react-router-dom";
import { BlogPost } from "../types/BlogPost";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <Link
      to={`/post/${post._id}`}
      className="border rounded-sm shadow-sm overflow-hidden group"
    >
      <div className="overflow-hidden">
        <img
          src={post.headerImg}
          alt={post.title}
          className="w-full h-80 object-cover group-hover:scale-105 transition duration-500"
        />
      </div>
      <div className="p-2">
        <h2 className="font-bold text-3xl mb-1 font-serif">{post.title}</h2>
        <div className="flex justify-between items-center">
          <p>
            Author:{" "}
            <span className="font-semibold">{post.author.username}</span>
          </p>
          <p className="text-neutral-500">
            {new Date(post.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
