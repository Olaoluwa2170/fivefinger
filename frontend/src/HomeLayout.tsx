import { Outlet, Link } from "react-router-dom";

const HomeLayout = () => {
  return (
    <>
      <p>Nothing to see here</p>
      <div>
        <Outlet />
      </div>
      <Link to={"/users"}>users</Link>
      <Link to={"/"}>Home</Link>
    </>
  );
};

export default HomeLayout;
