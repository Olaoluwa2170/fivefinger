import Register from "./Register";
import Login from "./Login";
import { Routes, Route } from "react-router-dom";
import HomeLayout from "./HomeLayout";
import DashBoard from "./DashBoard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route path="/" element={<DashBoard />} />
          <Route path="/auth" element={<Login />} />
          <Route path="/auth/signup" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
