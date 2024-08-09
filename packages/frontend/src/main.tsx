import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./pages/Index.tsx";
import NewPost from "./pages/NewPost.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import BlogPost from "./pages/BlogPost.tsx";
import EditPost from "./pages/EditPost.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/new-post",
        element: <NewPost />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/post/:id",
        element: <BlogPost />,
      },
      {
        path: "/edit-post/:id",
        element: <EditPost />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
