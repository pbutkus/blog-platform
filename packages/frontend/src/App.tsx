import { AuthProvider } from "./components/AuthProvider";
import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <AuthProvider>
        <NavBar />
        <Outlet />
      </AuthProvider>
    </>
  );
}

export default App;
