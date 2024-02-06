import { useState, useEffect } from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

type Users = {
  username: string;
  email: string;
  password: string;
  createdAt?: string;
  role?: "ADMIN" | "GUEST" | "USER";
  updatedAt?: string;
  refreshToken: string;
};

const Users = () => {
  const [users, setUsers] = useState<Array<Users>>();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h2 className="text-2xl font-black"> Users List </h2>
      <ul>
        {users?.map((user, i) => {
          return (
            <li key={i}>
              {user.username} {user.email}
            </li>
          );
        })}
      </ul>
    </article>
  );
};

export default Users;
