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
import PageOne from "./pages/transfusiones/PageOne";
import TransfusionPage from "./pages/transfusiones/TransfusionPage";
import Plan from "./pages/movil/FormularioPlanPage";
import PlanDonaciones from "./pages/movil/PlanDonacionesPage";
import ResumenPlanDonaciones from "./pages/movil/ResumenPlanDonacionesPage";
import PedidosPage from "./pages/movil/PedidosPage";
import Desechos from "./pages/calidad/DesechoPage";
import PruebasReanalizar from "./pages/calidad/PruebasReanalizarPage";
import RecepciondiariasEntidad from "./pages/calidad/ResepciondiariasEntidadPage";
import VizualizarDonaciones from "./pages/calidad/VizualizarDonacionesPage";
import LiberacionComponentes from "./pages/calidad/LiberacionComponentesPage";
import Bajas from "./pages/produccion/Bajas";
import ComponentesObtenidos from "./pages/produccion/ComponentesObtenidos";
import PlasmaIndustria from "./pages/produccion/PlasmaIndustria";
import EntradaProduccion from "./pages/produccion/EntradaProducción";
import LabSuma from "./pages/laboratorio/LabSuma";
import LabInmuno from "./pages/laboratorio/LabInmuno";
import LabCCalidad from "./pages/laboratorio/LabCCalidad";
import PrincipalLab from "./pages/laboratorio/PrincipalLab";
import VisualizarHC from "./pages/historia_clinica/VisualizarHC";
import ListadoPacientes from "./pages/historia_clinica/ListadoPaciente";
import NuevaHistoriaClinica from "./pages/historia_clinica/CreaHC";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>} />
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

      <Route path="/pageone" element={<PageOne />} />
      <Route path="/transfusionpage" element={<TransfusionPage />} />

      <Route path="/formularioplan" element={<Plan />} />
      <Route path="/planDonaciones" element={<PlanDonaciones />} />
      <Route path="/resumenDonaciones" element={<ResumenPlanDonaciones />} />
      <Route path="/pedidos" element={<PedidosPage />} />

      <Route path="/calidad" element={<RecepciondiariasEntidad />} />
      <Route path="/vizualizar" element={<VizualizarDonaciones />} />
      <Route path="/reanalizar" element={<PruebasReanalizar/>} />
      <Route path="/liberacion" element={<LiberacionComponentes/>} />
      <Route path="/desechos" element={<Desechos/>} />

      

      <Route path="/bajas" element={<Bajas />} />
      <Route path="/plasma_industria" element={<PlasmaIndustria />} />
      <Route path="/componentes_obtenidos" element={<ComponentesObtenidos />} />
      <Route path="/entrada_produccion" element={<EntradaProduccion />} />

      <Route path="/suma_lab" element={<LabSuma />} />
      <Route path="/inmuno_lab" element={<LabInmuno />} />
      <Route path="/calidad_lab" element={<LabCCalidad />} />
      <Route path="/principal_lab" element={<PrincipalLab />} />

      <Route path="/listadop" element={<ListadoPacientes/>}/>
      <Route path="/visualizarhc" element={<VisualizarHC/>}/>
      <Route path="/crearhc" element={<NuevaHistoriaClinica/>}/>
      <Route path="/visualizarhc/:id" element={<VisualizarHC />} />

      
    </Routes>
  );
}
