import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BlogPost as BlogPostType } from "../types/BlogPost";
import MDEditor from "@uiw/react-md-editor";
import { useAuth } from "../components/AuthProvider";

const BlogPost = () => {
  const { user } = useAuth();

  const { id } = useParams();
  const [post, setPost] = useState<BlogPostType>();
  const [isUserOwner, setIsUserOwner] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/posts/${id}`)
      .then((res) => res.json())
      .then((json) => {
        if (user && user.id === json.author) {
          setIsUserOwner(true);
        }

        return setPost(json);
      })
      .catch((err) => console.error(err));
  }, [id, user]);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      fetch(`http://localhost:3000/posts/${id}`, {
        method: "DELETE",
        credentials: "include",
      })
        .then(() => navigate("/"))
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="flex flex-col items-center">
      {post && (
        <div className="relative w-full h-48 overflow-hidden">
          <img
            src={post.headerImg}
            alt={post.title}
            className="w-full h-48 object-cover"
          />
          <div className="container absolute z-20 bottom-0 px-6">
            <p className="py-2 my-2 px-4 font-semibold font-serif text-3xl bg-white w-fit">
              {post.title}
            </p>
          </div>
        </div>
      )}
      <div className="container px-6 mt-6" data-color-mode="light">
        {isUserOwner && (
          <div className="flex gap-2">
            <Link
              to={`/edit-post/${id}`}
              className="font-semibold rounded-sm border border-blue-600 bg-blue-600 text-white hover:bg-blue-800 px-4 py-2"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="font-semibold rounded-sm border border-red-600 bg-red-600 text-white hover:bg-red-800 px-4 py-2"
            >
              Delete
            </button>
          </div>
        )}
        <MDEditor.Markdown source={post?.body} className="py-2" />
      </div>
    </div>
  );
};

export default BlogPost;
