import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/LoginPage";
import Register from "./pages/auth/RegisterPage";
import Prechequeo from "./pages/prechequeo_seleccion/Prechequeo";
import FormularioInscripcion from "./pages/inscripcion/FormularioInscripcion";
import Citados from "./pages/inscripcion/ListaCitados";
import HojaCargo from "./pages/inscripcion/HojaCargoInscripcion";
import ListaEspera from "./pages/donaciones/ListaEspera";
import DonacionesSangre from "./pages/donaciones/DonacionesSangre";
import DonacionesPlasma from "./pages/donaciones/DonacionesPlasma";
import HojaCargoDonaciones from "./pages/donaciones/HojaCargoDonaciones";
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
import LiberacionComponentes from "./pages/calidad/LiberacionComponentesPage";
import PruebasReanalizar from "./pages/calidad/PruebasReanalizarPage";
import RecepciondiariasEntidad from "./pages/calidad/ResepciondiariasEntidadPage";
import VizualizarDonaciones from "./pages/calidad/VizualizarDonacionesPage";
import ListadoPacientes from "./pages/historia_clinica/ListadoPaciente";
import VisualizarHC from "./pages/historia_clinica/VisualizarHC";
import LabCCalidad from "./pages/laboratorio/LabCCalidad";
import LabInmuno from "./pages/laboratorio/LabInmuno";
import LabSuma from "./pages/laboratorio/LabSuma";
import PrincipalLab from "./pages/laboratorio/PrincipalLab";
import Bajas from "./pages/produccion/Bajas";
import ComponentesObtenidos from "./pages/produccion/ComponentesObtenidos";
import EntradaProduccion from "./pages/produccion/EntradaProducción";
import PlasmaIndustria from "./pages/produccion/PlasmaIndustria";
import ProtectedRoute from "./components/ProtectedRoute";
import UsuarioActivo from "./pages/auth/Usuario";
import CitadosPS from "./pages/prechequeo_seleccion/CitadosPage";
import NuevaHistoriaClinica from "./pages/historia_clinica/CrearHC";
import DesechosPro from "./pages/calidad/ConfirmacionDesechoProPage";
import DietaPacientes from "./pages/historia_clinica/Dieta";
import DonantesCMF from "./pages/historia_clinica/DonanteCMF";
import ListadoHospital from "./pages/hospitalizacion/listadoHospital";
import CrearOrdenTransfusion from "./pages/hospitalizacion/crearOrden";
import ModficarOrdenTransfusion from "./pages/hospitalizacion/modificarOrden";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/usuario" element={<UsuarioActivo />} />

      {/* Prechequeo y Seleccion */}
      <Route
        path="/prechequeo"
        element={
          <ProtectedRoute allowedRoles={["Técnico de prechequeo"]}>
            <Prechequeo />
          </ProtectedRoute>
        }
      />

      <Route path="/citadosps" element={
        <ProtectedRoute allowedRoles={["Médico de selección"]}>
          <CitadosPS />
        </ProtectedRoute>} />

      <Route path="/historiadonante/:id" element={
        <ProtectedRoute allowedRoles={["Médico de selección"]}>
          <HistoriaDonante />
        </ProtectedRoute>} />

      <Route
        path="/resultadosprechequeo"
        element={
          <ProtectedRoute allowedRoles={["Médico de selección"]}>
            <ResultadosPrechequeo />
          </ProtectedRoute>
        }
      />
      <Route
        path="/registronoaptos"
        element={
          <ProtectedRoute allowedRoles={["Médico de selección"]}>
            <DonantesNoAptos />
          </ProtectedRoute>
        }
      />

      {/* Inscripcion */}
      <Route
        path="/inscripcion/:id"
        element={
          <ProtectedRoute allowedRoles={["Técnico de inscripción"]}>
            <FormularioInscripcion />
          </ProtectedRoute>
        }
      />
      <Route
        path="/inscripcion"
        element={
          <ProtectedRoute allowedRoles={["Técnico de inscripción"]}>
            <FormularioInscripcion />
          </ProtectedRoute>
        }
      />
      <Route
        path="/citados"
        element={
          <ProtectedRoute allowedRoles={["Técnico de inscripción"]}>
            <Citados />
          </ProtectedRoute>
        }
      />
      <Route
        path="/hoja-cargo"
        element={
          <ProtectedRoute allowedRoles={["Técnico de inscripción"]}>
            <HojaCargo />
          </ProtectedRoute>
        }
      />

      {/* Donacion */}
      <Route
        path="/lista-espera"
        element={
          <ProtectedRoute allowedRoles={["Técnico de donación"]}>
            <ListaEspera />
          </ProtectedRoute>
        }
      />
      <Route
        path="/donaciones-sangre"
        element={
          <ProtectedRoute allowedRoles={["Técnico de donación"]}>
            <DonacionesSangre />
          </ProtectedRoute>
        }
      />
      <Route
        path="/donaciones-plasma"
        element={
          <ProtectedRoute allowedRoles={["Técnico de donación"]}>
            <DonacionesPlasma />
          </ProtectedRoute>
        }
      />
      <Route
        path="/hoja-cargo-donaciones"
        element={
          <ProtectedRoute allowedRoles={["Técnico de donación"]}>
            <HojaCargoDonaciones />
          </ProtectedRoute>
        }
      />


      {/* Transfusiones */}
      <Route path="/pageone" element={<ProtectedRoute allowedRoles={["Técnico de transfusión"]}>
        <PageOne />
      </ProtectedRoute>} />
      <Route path="/transfusionpage" element={<ProtectedRoute allowedRoles={["Técnico de transfusión"]}>
        <TransfusionPage />
      </ProtectedRoute>} />

      {/* Centro Movil */}
      <Route
        path="/formularioplan"
        element={
          <ProtectedRoute allowedRoles={["Jefe de extracción móvil", "Técnico de móvil"]}>
            <Plan />
          </ProtectedRoute>
        }
      />
      <Route
        path="/planDonaciones"
        element={
          <ProtectedRoute allowedRoles={["Jefe de extracción móvil", "Técnico de móvil"]}>
            <PlanDonaciones />
          </ProtectedRoute>
        }
      />
      <Route
        path="/resumenDonaciones"
        element={
          <ProtectedRoute allowedRoles={["Jefe de extracción móvil", "Técnico de móvil"]}>
            <ResumenPlanDonaciones />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pedidos"
        element={
          <ProtectedRoute allowedRoles={["Jefe de extracción móvil", "Técnico de móvil"]}>
            <PedidosPage />
          </ProtectedRoute>
        }
      />

      {/* Calidad */}
      <Route
        path="/calidad"
        element={
          <ProtectedRoute allowedRoles={["Técnico de aseguramiento de calidad"]}>
            <RecepciondiariasEntidad />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vizualizar"
        element={
          <ProtectedRoute allowedRoles={["Técnico de aseguramiento de calidad"]}>
            <VizualizarDonaciones />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reanalizar"
        element={
          <ProtectedRoute allowedRoles={["Técnico de aseguramiento de calidad"]}>
            <PruebasReanalizar />
          </ProtectedRoute>
        }
      />
      <Route
        path="/liberacion"
        element={
          <ProtectedRoute allowedRoles={["Técnico de aseguramiento de calidad"]}>
            <LiberacionComponentes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/desechos"
        element={
          <ProtectedRoute allowedRoles={["Técnico de aseguramiento de calidad"]}>
            <Desechos />
          </ProtectedRoute>
        }
      />
      <Route
        path="/desechospro"
        element={
          <ProtectedRoute allowedRoles={["Técnico de aseguramiento de calidad"]}>
            <DesechosPro />
          </ProtectedRoute>
        }
      />

      {/* Produccion */}
      <Route
        path="/bajas"
        element={
          <ProtectedRoute allowedRoles={["Técnico de producción"]}>
            <Bajas />
          </ProtectedRoute>
        }
      />
      <Route
        path="/plasma_industria"
        element={
          <ProtectedRoute allowedRoles={["Técnico de producción"]}>
            <PlasmaIndustria />
          </ProtectedRoute>
        }
      />
      <Route
        path="/componentes_obtenidos"
        element={
          <ProtectedRoute allowedRoles={["Técnico de producción"]}>
            <ComponentesObtenidos />
          </ProtectedRoute>
        }
      />
      <Route
        path="/entrada_produccion"
        element={
          <ProtectedRoute allowedRoles={["Técnico de producción"]}>
            <EntradaProduccion />
          </ProtectedRoute>
        }
      />

      {/* Laboratorio */}
      <Route
        path="/suma_lab"
        element={
          <ProtectedRoute allowedRoles={["Técnico de laboratorio suma"]}>
            <LabSuma />
          </ProtectedRoute>
        }
      />
      <Route
        path="/inmuno_lab"
        element={
          <ProtectedRoute allowedRoles={["Técnico de laboratorio inmuno"]}>
            <LabInmuno />
          </ProtectedRoute>
        }
      />
      <Route
        path="/calidad_lab"
        element={
          <ProtectedRoute allowedRoles={["Técnico de laboratorio calidad"]}>
            <LabCCalidad />
          </ProtectedRoute>
        }
      />
      <Route
        path="/principal_lab"
        element={
          <ProtectedRoute
            allowedRoles={[
              "Técnico de laboratorio suma",
              "Técnico de laboratorio inmuno",
              "Técnico de laboratorio calidad",
            ]}
          >
            <PrincipalLab />
          </ProtectedRoute>
        }
      />

      {/* Historia Clinica */}
      <Route
        path="/listadop"
        element={
          <ProtectedRoute allowedRoles={["Médico del consultorio"]}>
            <ListadoPacientes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/visualizarhc"
        element={
          <ProtectedRoute allowedRoles={["Médico del consultorio"]}>
            <VisualizarHC />
          </ProtectedRoute>
        }
      />
      <Route
        path="/crearhc/:id"
        element={
          <ProtectedRoute allowedRoles={["Médico del consultorio"]}>
            <NuevaHistoriaClinica />
          </ProtectedRoute>
        }
      />
      <Route
        path="/visualizarhc/:id"
        element={
          <ProtectedRoute allowedRoles={["Médico del consultorio"]}>
            <VisualizarHC />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dieta"
        element={
          <ProtectedRoute allowedRoles={["Médico del consultorio"]}>
            <DietaPacientes />
          </ProtectedRoute>
        }
      />

      <Route
        path="/donantesCMF"
        element={
          <ProtectedRoute allowedRoles={["Médico del consultorio"]}>
            <DonantesCMF />
          </ProtectedRoute>
        }
      />

      { /* Hospitalizacion */}
      <Route
        path="/listadoPacientes"
        element={
          <ProtectedRoute allowedRoles={["Médico del hospital"]}>
            <ListadoHospital />
          </ProtectedRoute>
        }
      />

      <Route
        path="/crearOrden"
        element={
          <ProtectedRoute allowedRoles={["Médico del hospital"]}>
            <CrearOrdenTransfusion />
          </ProtectedRoute>
        }
      />

      <Route
        path="/modificarOrden"
        element={
          <ProtectedRoute allowedRoles={["Médico del hospital"]}>
            <ModficarOrdenTransfusion />
          </ProtectedRoute>
        }
      />


    </Routes >
  );
}