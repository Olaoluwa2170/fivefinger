import { useState, useEffect } from "react";
import axios from "../api/axios";
// type Props = {};

const Users = () => {
  const [users, setUsers] = useState<any>();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axios.get("/users", {
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
        {users.map((user: string, i: number) => {
          <li key={i}>{user}</li>;
        })}
      </ul>
    </article>
  );
};

export default Users;
