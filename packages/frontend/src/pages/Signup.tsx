import { FormEvent, useState } from "react";
import { useAuth } from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { user, signUp } = useAuth();

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  if (user) {
    navigate("/");
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signUp(username, email, password).catch((err) => console.error(err));
  };

  return (
    <div className="flex justify-center">
      <div className="container px-6">
        <h1 className="my-8 font-semibold font-serif text-3xl">Sign up</h1>
        <form onSubmit={handleSubmit} className="grid gap-8 max-w-96">
          <div className="grid">
            <label htmlFor="username" className="mb-2 font-serif">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="border border-slate-300 px-2 py-2 rounded-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="grid">
            <label htmlFor="email" className="mb-2 font-serif">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="border border-slate-300 px-2 py-2 rounded-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid">
            <label htmlFor="password" className="mb-2 font-serif">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="border border-slate-300 px-2 py-2 rounded-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="font-semibold rounded-sm border border-blue-600 bg-blue-600 text-white hover:bg-blue-800 px-4 py-2">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
