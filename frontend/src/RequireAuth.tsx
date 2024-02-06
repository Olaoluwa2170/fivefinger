import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "./context/AuthProvider";

const RequireAuth = () => {
  const { auth } = useAuthContext();
  const location = useLocation();
  return (
    <main>
      <p>Welcome !!!</p>
      {auth?.email ? (
        <Outlet />
      ) : (
        <Navigate to="/auth" state={{ from: location }} replace={true} />
      )}
    </main>
  );
};

export default RequireAuth;
