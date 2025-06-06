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
<<<<<<< HEAD
=======
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
import ProtectedRoute from "./components/ProtectedRoute";
>>>>>>> 4811e2ccb5b13a93a711a64dd20cd9f16b9f0f5d
import HojaCargoDonaciones from "./pages/donaciones/HojaCargoDonaciones";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/*Prechequeo y Seleccion*/}
      <Route path="/prechequeo" element={<ProtectedRoute allowedRoles={['tecnico_prechequeo']}>
        <Prechequeo />
      </ProtectedRoute>} />
      <Route path="/resultadosprechequeo" element={<ProtectedRoute allowedRoles={['medico']}>
        <ResultadosPrechequeo />
      </ProtectedRoute>
      } />
      <Route path="/registronoaptos" element={<ProtectedRoute allowedRoles={['medico']}>
        <DonantesNoAptos />
      </ProtectedRoute>
      } />

      {/*Inscripcion*/}
      <Route path="/inscripcion" element={<ProtectedRoute allowedRoles={['tecnico_inscripcion']}>
        <FormularioInscripcion />
      </ProtectedRoute>
      } />
      <Route path="/citados" element={<ProtectedRoute allowedRoles={['tecnico_inscripcion']}>
        <Citados />
      </ProtectedRoute>
      } />
      <Route path="/hoja-cargo" element={<ProtectedRoute allowedRoles={['tecnico_inscripcion']}>
        <HojaCargo />
      </ProtectedRoute>
      } />

      {/*Donacion*/}
      <Route path="/lista-espera" element={<ProtectedRoute allowedRoles={['tecnico_donacion']}>
        <ListaEspera />
      </ProtectedRoute>
      } />
      <Route path="/donaciones-sangre" element={<ProtectedRoute allowedRoles={['tecnico_donacion']}>
        <DonacionesSangre />
      </ProtectedRoute>
      } />
      <Route path="/donaciones-plasma" element={<ProtectedRoute allowedRoles={['tecnico_donacion']}>
        <DonacionesPlasma />
      </ProtectedRoute>
      } />
      <Route path="/hoja-cargo-donaciones" element={<ProtectedRoute allowedRoles={['tecnico_donacion']}>
        <HojaCargoDonaciones />
      </ProtectedRoute>
      } />

      <Route path="/historiadonante" element={<HistoriaDonante />} />
<<<<<<< HEAD
      <Route path="/registronoaptos" element={<DonantesNoAptos />} />
      <Route path="/hoja-cargo-donaciones" element={< HojaCargoDonaciones/>} />
      
=======

      {/*Transfusiones*/}
      <Route path="/pageone" element={<PageOne />} />
      <Route path="/transfusionpage" element={<TransfusionPage />} />

      {/*Centro Movil*/}
      <Route path="/formularioplan" element={<ProtectedRoute allowedRoles={['jefe_extraccion_movil', 'tecnico_movil']}>
        <Plan />
      </ProtectedRoute>
      } />
      <Route path="/planDonaciones" element={<ProtectedRoute allowedRoles={['jefe_extraccion_movil', 'tecnico_movil']}>
        <PlanDonaciones />
      </ProtectedRoute>
      } />
      <Route path="/resumenDonaciones" element={<ProtectedRoute allowedRoles={['jefe_extraccion_movil', 'tecnico_movil']}>
        <ResumenPlanDonaciones />
      </ProtectedRoute>
      } />
      <Route path="/pedidos" element={<ProtectedRoute allowedRoles={['jefe_extraccion_movil', 'tecnico_movil']}>
        <PedidosPage />
      </ProtectedRoute>
      } />

      {/*Calidad*/}
      <Route path="/calidad" element={<ProtectedRoute allowedRoles={['tecnico_aseguramiento_calidad']}>
        <RecepciondiariasEntidad />
      </ProtectedRoute>
      } />
      <Route path="/vizualizar" element={<ProtectedRoute allowedRoles={['tecnico_aseguramiento_calidad']}>
        <VizualizarDonaciones />
      </ProtectedRoute>
      } />
      <Route path="/reanalizar" element={<ProtectedRoute allowedRoles={['tecnico_aseguramiento_calidad']}>
        <PruebasReanalizar />
      </ProtectedRoute>
      } />
      <Route path="/liberacion" element={<ProtectedRoute allowedRoles={['tecnico_aseguramiento_calidad']}>
        <LiberacionComponentes />
      </ProtectedRoute>
      } />
      <Route path="/desechos" element={<ProtectedRoute allowedRoles={['tecnico_aseguramiento_calidad']}>
        <Desechos />
      </ProtectedRoute>
      } />

      {/*Produccion*/}
      <Route path="/bajas" element={<ProtectedRoute allowedRoles={['tecnico_produccion']}>
        <Bajas />
      </ProtectedRoute>
      } />
      <Route path="/plasma_industria" element={<ProtectedRoute allowedRoles={['tecnico_produccion']}>
        <PlasmaIndustria />
      </ProtectedRoute>
      } />
      <Route path="/componentes_obtenidos" element={<ProtectedRoute allowedRoles={['tecnico_produccion']}>
        <ComponentesObtenidos />
      </ProtectedRoute>
      } />
      <Route path="/entrada_produccion" element={<ProtectedRoute allowedRoles={['tecnico_produccion']}>
        <EntradaProduccion />
      </ProtectedRoute>
      } />

      {/*Laboratorio*/}
      <Route path="/suma_lab" element={<ProtectedRoute allowedRoles={['tecnico_laboratorio_suma']}>
        <LabSuma />
      </ProtectedRoute>
      } />
      <Route path="/inmuno_lab" element={<ProtectedRoute allowedRoles={['tecnico_laboratorio_inmuno']}>
        <LabInmuno />
      </ProtectedRoute>
      } />
      <Route path="/calidad_lab" element={<ProtectedRoute allowedRoles={['tecnico_laboratorio_calidad']}>
        <LabCCalidad />
      </ProtectedRoute>
      } />
      <Route path="/principal_lab" element={<ProtectedRoute allowedRoles={['tecnico_laboratorio_suma', 'tecnico_laboratorio_inmuno', 'tecnico_laboratorio_calidad']}>
        <PrincipalLab />
      </ProtectedRoute>
      } />

      {/*Historia Clinica*/}
      <Route path="/listadop" element={<ProtectedRoute allowedRoles={['medico_consultorio']}>
        <ListadoPacientes />
      </ProtectedRoute>
      } />
      <Route path="/visualizarhc" element={<ProtectedRoute allowedRoles={['medico_consultorio']}>
        <VisualizarHC />
      </ProtectedRoute>
      } />
      <Route path="/crearhc" element={<ProtectedRoute allowedRoles={['medico_consultorio']}>
        <NuevaHistoriaClinica />
      </ProtectedRoute>
      } />
      <Route path="/visualizarhc/:id" element={<ProtectedRoute allowedRoles={['medico_consultorio']}>
        <VisualizarHC />
      </ProtectedRoute>
      } />
>>>>>>> 4811e2ccb5b13a93a711a64dd20cd9f16b9f0f5d
    </Routes>
  );
}