import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/LoginPage";
import Prechequeo from "./pages/prechequeo_seleccion/Prechequeo";
import Register from "./pages/auth/RegisterPage";
import ResultadosPrechequeo from "./pages/prechequeo_seleccion/ResultadosPrechequeoPage";
import HistoriaDonante from "./pages/prechequeo_seleccion/HistoriaDonantePage";
import DonantesNoAptos from "./pages/prechequeo_seleccion/DonantesNoAptosPage";



export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/prechequeo" element={<Prechequeo />} />
      <Route path="/resultadosprechequeo" element={<ResultadosPrechequeo />} />
      <Route path="/register" element={<Register />} />
      <Route path="/historiadonante" element={<HistoriaDonante />} />
      <Route path="/registronoaptos" element={<DonantesNoAptos />} />
    </Routes>
  );
}
