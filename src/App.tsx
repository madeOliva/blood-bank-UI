import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/LoginPage";
import Prechequeo from "./pages/prechequeo/seleccion/Prechequeo";
import Register from "./pages/auth/RegisterPage";



export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/prechequeo" element={<Prechequeo />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
