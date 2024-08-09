import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { checkAuthStatus, login, logout, signup } from "../utils/auth";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (username: string, email: string, password: string) => Promise<void>;
  logIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    checkAuthStatus()
      .then((user: User) => setUser(user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const signUp = async (username: string, email: string, password: string) => {
    const user = await signup(username, email, password);
    setUser(user);
  };

  const logIn = async (email: string, password: string) => {
    const user = await login(email, password);
    setUser(user);
    navigate("/");
  };

  const logOut = async () => {
    try {
      await logout();
      setUser(null);
      window.location.reload();
    } catch (err) {
      console.error("Logout failed:", err);
      setUser(null);
      window.location.reload();
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signUp,
    logIn,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider };
