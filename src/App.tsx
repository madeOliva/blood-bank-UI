import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/LoginPage";
import Prechequeo from "./pages/prechequeo/seleccion/Prechequeo";
import Register from "./pages/auth/RegisterPage";
import FormularioInscripcion from "./pages/inscripcion/FormularioInscripcion";
import Citados from "./pages/inscripcion/ListaCitados";
import HojaCargo from "./pages/inscripcion/HojaCargoInscripcion";

import ListaEspera from "./pages/donaciones/ListaEspera";
import DonacionesSangre from "./pages/donaciones/DonacionesSangre";
import DonacionesPlasma from "./pages/donaciones/DonacionesPlasma";



export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/prechequeo" element={<Prechequeo />} />
      <Route path="/register" element={<Register />} />
      <Route path="/inscripcion" element={<FormularioInscripcion/>} />
      <Route path="/citados" element={<Citados/>} />
      <Route path="/hoja-cargo" element={<HojaCargo/>} />
      <Route path="/lista-espera" element={<ListaEspera/>} />
      <Route path="/donaciones-sangre" element={<DonacionesSangre/>} />
      <Route path="/donaciones-plasma" element={<DonacionesPlasma/>} />
    </Routes>
  );
}
