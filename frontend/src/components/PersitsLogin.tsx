import { useAppSelector } from "@/app/hooks/hooks";
import useRefreshToken from "@/hooks/useRefreshToken";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useLocalStorage from "@/hooks/useLocalStorage";

const PersitsLogin = () => {
  const refresh = useRefreshToken();
  const auth = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [persistStore] = useLocalStorage("persist", false);
  const persist =
    typeof persistStore === "string" ? JSON.parse(persistStore) : persistStore;
  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
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
