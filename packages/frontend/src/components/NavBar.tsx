import { Link } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const NavBar = () => {
  const { user, logOut } = useAuth();

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="container px-6">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="font-serif font-bold text-xl md:text-4xl my-4"
          >
            An Awesome Blog
          </Link>
          <div className="flex gap-2 items-center">
            {user && (
              <>
                <p className="px-4">
                  Hello, <span className="font-bold">{user.username}</span>
                </p>
                <Link
                  to="/new-post"
                  className="font-semibold rounded-sm border border-blue-600 bg-blue-600 text-white hover:bg-blue-800 px-4 py-2"
                >
                  New Post
                </Link>
                <button
                  onClick={handleLogout}
                  className="hover:underline px-4 py-2"
                >
                  Log out
                </button>
              </>
            )}
            {!user && (
              <>
                <Link
                  to="/login"
                  className="font-semibold rounded-sm border border-blue-600 bg-blue-600 text-white hover:bg-blue-800 px-4 py-2"
                >
                  Log in
                </Link>
                <Link to={"/signup"} className="hover:underline px-4 py-2">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
