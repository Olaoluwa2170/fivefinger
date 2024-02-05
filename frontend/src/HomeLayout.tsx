import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthProvider";

const HomeLayout = () => {
  const { auth } = useAuthContext();
  return (
    <main>
      <p>Welcome !!!</p>
      {auth ? <Outlet /> : <Navigate to="/auth" replace={true} />}
    </main>
  );
};

export default HomeLayout;
