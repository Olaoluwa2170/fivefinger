import { useAuthContext } from "@/context/AuthProvider";
import useRefreshToken from "@/hooks/useRefreshToken";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useLocalStorage from "@/hooks/useLocalStorage";

const PersitsLogin = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);
  const [persist] = useLocalStorage("persist", false);
  console.log(persist, "outeffect");
  useEffect(() => {
    let isMounted = true;
    console.log(persist, "ineffect");
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <div>
      {!persist ? <Outlet /> : isLoading ? <p>Loading ...</p> : <Outlet />}
    </div>
  );
};

export default PersitsLogin;
