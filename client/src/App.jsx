import { Routes, Route } from "react-router";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/ProtctedRoute";

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
      </Routes>
    </>
  )
}

export default App;