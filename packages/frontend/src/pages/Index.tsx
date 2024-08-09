import { useEffect, useState } from "react";
import { BlogPost } from "../types/BlogPost";
import BlogCard from "../components/BlogCard";

const Index = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Server error: ${response.statusText}`);
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return response.json();
        } else {
          throw new Error("Response is not JSON");
        }
      })
      .then((posts) => {
        setBlogPosts(posts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setError(error.message);
      });
  }, []);

  return (
    <>
      <div className="flex justify-center">
        <div className="container px-6">
          <h1 className="my-8 font-semibold font-serif text-3xl">
            Latest posts
          </h1>

          <div className="grid grid-cols-3 gap-4">
            {loading ? (
              <p>Loading...</p>
            ) : blogPosts.length > 0 ? (
              blogPosts.map((post) => <BlogCard key={post._id} post={post} />)
            ) : (
              <>
                <p>Currently there are no posts</p>
                <p>{error}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
