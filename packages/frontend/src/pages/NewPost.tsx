import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { useNavigate } from "react-router-dom";

const NewPost = () => {
  const [body, setBody] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [headerImg, setHeaderImg] = useState<string>("");

  const navigate = useNavigate();

  const createPost = () => {
    fetch(`http://localhost:3000/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, headerImg, body }),
      credentials: "include",
    })
      .then((res) => {
        setBody("");
        setTitle("");
        setHeaderImg("");
        return res.json();
      })
      .then((json) => {
        return json._id;
      })
      .then((id) => navigate(`/post/${id}`))
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="flex justify-center">
      <div className="container px-6">
        <h1 className="my-8 font-semibold font-serif text-3xl">
          Create a new post
        </h1>
        <div data-color-mode="light" className="grid gap-8">
          <div className="grid">
            <label htmlFor="title" className="mb-2 font-serif">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="border border-slate-300 px-2 py-2 rounded-sm"
              value={title}
              onChange={(value) => setTitle(value.target.value)}
            />
          </div>
          <div className="grid">
            <label htmlFor="header-img" className="mb-2 font-serif">
              Header Image URL
            </label>
            <input
              type="text"
              name="header-img"
              id="header-img"
              className="border border-slate-300 px-2 py-2 rounded-sm"
              value={headerImg}
              onChange={(value) => setHeaderImg(value.target.value)}
            />
          </div>
          <div>
            <p className="mb-2 font-serif">Body</p>
            <MDEditor value={body} onChange={(value) => setBody(value!)} />
          </div>
          <button
            className="font-semibold rounded-sm border border-blue-600 bg-blue-600 text-white hover:bg-blue-800 px-4 py-2"
            onClick={createPost}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
