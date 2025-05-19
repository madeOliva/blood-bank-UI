// import { Routes, Route } from "react-router-dom";
// import Login from "./pages/auth/LoginPage";
// import Prechequeo from "./pages/prechequeo_seleccion/Prechequeo";
// import Register from "./pages/auth/RegisterPage";
// <<<<<<< HEAD
// import FormularioInscripcion from "./pages/inscripcion/FormularioInscripcion";
// import Citados from "./pages/inscripcion/ListaCitados";
// import HojaCargo from "./pages/inscripcion/HojaCargoInscripcion";

// import ListaEspera from "./pages/donaciones/ListaEspera";
// import DonacionesSangre from "./pages/donaciones/DonacionesSangre";
// import DonacionesPlasma from "./pages/donaciones/DonacionesPlasma";
// =======
// import ResultadosPrechequeo from "./pages/prechequeo_seleccion/ResultadosPrechequeoPage";
// import HistoriaDonante from "./pages/prechequeo_seleccion/HistoriaDonantePage";
// import DonantesNoAptos from "./pages/prechequeo_seleccion/DonantesNoAptosPage";
// >>>>>>> 05698c6ece53dc741666ba7e084c9053df510a43



// export default function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Login />} />
//       <Route path="/prechequeo" element={<Prechequeo />} />
//       <Route path="/resultadosprechequeo" element={<ResultadosPrechequeo />} />
//       <Route path="/register" element={<Register />} />
// <<<<<<< HEAD
//       <Route path="/inscripcion" element={<FormularioInscripcion/>} />
//       <Route path="/citados" element={<Citados/>} />
//       <Route path="/hoja-cargo" element={<HojaCargo/>} />
//       <Route path="/lista-espera" element={<ListaEspera/>} />
//       <Route path="/donaciones-sangre" element={<DonacionesSangre/>} />
//       <Route path="/donaciones-plasma" element={<DonacionesPlasma/>} />
// =======
//       <Route path="/historiadonante" element={<HistoriaDonante />} />
//       <Route path="/registronoaptos" element={<DonantesNoAptos />} />
// >>>>>>> 05698c6ece53dc741666ba7e084c9053df510a43
//     </Routes>
//   );
// }

import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/LoginPage";
import Prechequeo from "./pages/prechequeo_seleccion/Prechequeo";
import Register from "./pages/auth/RegisterPage";
import FormularioInscripcion from "./pages/inscripcion/FormularioInscripcion";
import Citados from "./pages/inscripcion/ListaCitados";
import HojaCargo from "./pages/inscripcion/HojaCargoInscripcion";
import ListaEspera from "./pages/donaciones/ListaEspera";
import DonacionesSangre from "./pages/donaciones/DonacionesSangre";
import DonacionesPlasma from "./pages/donaciones/DonacionesPlasma";
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
      <Route path="/inscripcion" element={<FormularioInscripcion />} />
      <Route path="/citados" element={<Citados />} />
      <Route path="/hoja-cargo" element={<HojaCargo />} />
      <Route path="/lista-espera" element={<ListaEspera />} />
      <Route path="/donaciones-sangre" element={<DonacionesSangre />} />
      <Route path="/donaciones-plasma" element={<DonacionesPlasma />} />
      <Route path="/historiadonante" element={<HistoriaDonante />} />
      <Route path="/registronoaptos" element={<DonantesNoAptos />} />
    </Routes>
  );
}
