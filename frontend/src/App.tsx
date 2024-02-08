import Register from "./Register";
import Login from "./Login";
import { Routes, Route } from "react-router-dom";
import HomeLayout from "./HomeLayout";
import Users from "./components/Users";
import RequireAuth from "./RequireAuth";
import PersitsLogin from "./components/PersitsLogin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route path="/auth" element={<Login />} />
          <Route path="/auth/signup" element={<Register />} />
          <Route element={<PersitsLogin />}>
            <Route element={<RequireAuth />}>
              <Route path="/users" element={<Users />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
