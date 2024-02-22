import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./components/ui/button";
import useLogout from "./hooks/useLogout";
import { useAppSelector } from "./app/hooks/hooks";

const RequireAuth = () => {
  const auth = useAppSelector((state) => state.auth);
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
