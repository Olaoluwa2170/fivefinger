import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthProvider";
import { Button } from "./components/ui/button";
import useLogout from "./hooks/useLogout";

const RequireAuth = () => {
  const { auth } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  const logout = useLogout();
  const signOut = async () => {
    await logout();
    navigate("/");
  };
  return (
    <main>
      <p>Welcome !!!</p>
      <Button onClick={signOut}> Sign Out </Button>
      {auth?.accessToken ? (
        <Outlet />
      ) : (
        <Navigate to="/auth" state={{ from: location }} replace={true} />
      )}
    </main>
  );
};

export default RequireAuth;
