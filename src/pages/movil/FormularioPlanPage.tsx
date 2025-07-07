import * as React from "react";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Navbar from "../../components/navbar/Navbar";
import BotonPersonalizado from "../../components/Button";
import dayjs, { Dayjs } from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { useLocation, useNavigate, Location } from "react-router-dom";
import axios from "axios";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

type PlanData = {
  id?: number;
  areaSalud: string;
  consejoPopular: string;
  consultoriosAfectados: string | number;
  fechaHora: string;
  lugarDonacion: string;
  compromiso: string;
  responsableSalud: string;
  cdr: string;
};

type ModalType = "success" | "error";

const API_URL = "http://localhost:3000/plan-trabajo";

export default function Plan() {
  const location = useLocation() as Location & { state?: { data?: PlanData } };
  const navigate = useNavigate();

  const data = location.state?.data;
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [modalType, setModalType] = React.useState<ModalType>("success");
  const [errorMsg, setErrorMsg] = React.useState<string>("Hay campos vacíos, por favor complete todos los campos.");

  const [areaSalud, setAreaSalud] = React.useState<string>(data?.areaSalud || "");
  const [consejoPopular, setConsejoPopular] = React.useState<string>(data?.consejoPopular || "");
  const [consultoriosAfectados, setConsultoriosAfectados] = React.useState<string>(
    data?.consultoriosAfectados?.toString() || ""
  );
  const [selectedDateTime, setSelectedDateTime] = React.useState<Dayjs | null>(
    data?.fechaHora ? dayjs(data.fechaHora) : null
  );
  const fechaForzada =
    selectedDateTime &&
    selectedDateTime
      .hour(8)
      .minute(0)
      .second(0)
      .millisecond(0)
      .toISOString();
  const [lugarDonacion, setLugarDonacion] = React.useState<string>(data?.lugarDonacion || "");
  const [compromiso, setCompromiso] = React.useState<string>(data?.compromiso || "");
  const [responsableSalud, setResponsableSalud] = React.useState<string>(data?.responsableSalud || "");
  const [cdr, setCdr] = React.useState<string>(data?.cdr || "");
  const [loading, setLoading] = React.useState<boolean>(false);

  const areasSaludOptions: string[] = [
    "Turcios Lima",
    "Pedro Borras",
    "Raul Sanchez",
    "Hermanos Cruz",
  ];

  const consejosPopularesOptions: string[] = [
    "Hermanos Cruz",
    "Celso Maragoto",
    "Carlos Manuel",
    "Capitán San Luis",
    "Cuba Libre",
    "Hermanos Barcón",
    "Ceferino Fernández",
    "Diez de Octubre",
    "La Coloma",
    "Briones Montoto",
    "Las Ovas",
    "Jagüey Cuyují",
    "La Guabina",
    "La Conchita",
    "Las Taironas",
    "Aguas Claras",
    "San Vicente",
    "El Vizcaíno",
  ];

  // Calcula el primer y último día del mes siguiente
  const today = dayjs();
  const firstDayNextMonth = today.add(1, "month").startOf("month");
  const lastDayNextMonth = today.add(1, "month").endOf("month");

  const hayCamposVacios = (): boolean => {
    return (
      !areaSalud.trim() ||
      !consejoPopular.trim() ||
      !consultoriosAfectados.trim() ||
      !selectedDateTime ||
      !lugarDonacion.trim() ||
      !compromiso.trim() ||
      !responsableSalud.trim() ||
      !cdr.trim()
    );
  };

  const fechaValida = (): boolean => {
    if (!selectedDateTime || !selectedDateTime.isValid()) return false;
    // Solo permite fechas dentro del mes siguiente
    return (
      selectedDateTime.isSameOrAfter(firstDayNextMonth, "day") &&
      selectedDateTime.isSameOrBefore(lastDayNextMonth, "day")
    );
  };

  const compromisoValido = (): boolean => {
    return /^\d+$/.test(compromiso);
  };

  const handleCompromisoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompromiso(event.target.value);
  };

  const handleAceptar = async () => {
    if (hayCamposVacios()) {
      setErrorMsg("Hay campos vacíos, por favor complete todos los campos.");
      setModalType("error");
      setOpenModal(true);
    } else if (!fechaValida()) {
      setErrorMsg("Solo puede seleccionar días del mes siguiente.");
      setModalType("error");
      setOpenModal(true);
    } else if (!compromisoValido()) {
      setErrorMsg("El campo Compromiso solo debe contener números.");
      setModalType("error");
      setOpenModal(true);
    } else {
      setLoading(true);
      try {
        const payload = {
          fecha: fechaForzada,
          responsableDeSalud: responsableSalud,
          areasalud: areaSalud,
          consejopopular: consejoPopular,
          consultoriosafectados: consultoriosAfectados
            .toString()
            .split(",")
            .map((c) => c.trim()),
          lugarDonacion,
          compromiso,
          cdr,
        };

        if (data && data.id) {
          // Modificar plan existente (PATCH)
          await axios.patch(`${API_URL}/${data.id}`, payload);
        } else {
          // Crear nuevo plan (POST)
          await axios.post(API_URL, payload);
        }

        setModalType("success");
        setOpenModal(true);

        // Limpiar los campos después de enviar
        setAreaSalud("");
        setConsejoPopular("");
        setConsultoriosAfectados("");
        setSelectedDateTime(null);
        setLugarDonacion("");
        setCompromiso("");
        setResponsableSalud("");
        setCdr("");

        // Solo redirige si es edición (GUARDAR CAMBIOS)
        if (data && data.id) {
          setTimeout(() => {
            navigate("/planDonaciones");
          }, 1000);
        }

      } catch (error: any) {
        setErrorMsg(
          error?.response?.data?.message ||
            "Error al guardar el plan. Intente nuevamente."
        );
        setModalType("error");
        setOpenModal(true);
      } finally {
        setLoading(false);
      }
    }
  };

  React.useEffect(() => {
    if (openModal && modalType === "success") {
      const timer = setTimeout(() => {
        setOpenModal(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [openModal, modalType, navigate]);

  const inputStyle = { width: 255 };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <>
        <Navbar />
        <Box>
          <Typography
            variant="h4"
            component="h5"
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              backgroundColor: "primary.dark",
              color: "white",
              textAlign: "center",
              marginBlock: 5,
              mt: 8,
            }}
          >
            {data ? "Modificar Plan de Donaciones" : "Plan de Donaciones"}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              mb: 4,
              justifyContent: "center",
            }}
          >
            {/* Columna 1: Fecha y hora primero, luego Consejo Popular y Consultorios */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <DatePicker
                label="Fecha"
                value={selectedDateTime}
                onChange={(newValue) => setSelectedDateTime(newValue as Dayjs)}
                format="DD/MM/YYYY"
                minDate={firstDayNextMonth}
                maxDate={lastDayNextMonth}
              />

              <FormControl sx={inputStyle}>
                <InputLabel id="consejo-popular-label">Consejo Popular</InputLabel>
                <Select
                  labelId="consejo-popular-label"
                  id="consejo-popular-select"
                  value={consejoPopular}
                  label="Consejo Popular"
                  onChange={(e) => setConsejoPopular(e.target.value as string)}
                >
                  {consejosPopularesOptions.map((cp) => (
                    <MenuItem key={cp} value={cp}>
                      {cp}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Consultorios Afectados"
                variant="outlined"
                sx={inputStyle}
                value={consultoriosAfectados}
                onChange={(e) => setConsultoriosAfectados(e.target.value)}
              />

              <TextField
                label="Responsable de Salud"
                variant="outlined"
                sx={inputStyle}
                value={responsableSalud}
                onChange={(e) => setResponsableSalud(e.target.value)}
              />
            </Box>

            {/* Columna 2: Área de salud ahora aquí, luego el resto */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <FormControl sx={inputStyle}>
                <InputLabel id="area-salud-label">Área de salud</InputLabel>
                <Select
                  labelId="area-salud-label"
                  id="area-salud-select"
                  value={areaSalud}
                  label="Área de salud"
                  onChange={(e) => setAreaSalud(e.target.value as string)}
                >
                  {areasSaludOptions.map((area) => (
                    <MenuItem key={area} value={area}>
                      {area}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Lugar de la Donación"
                variant="outlined"
                sx={inputStyle}
                value={lugarDonacion}
                onChange={(e) => setLugarDonacion(e.target.value)}
              />

              <TextField
                label="Compromiso"
                variant="outlined"
                sx={inputStyle}
                value={compromiso}
                onChange={handleCompromisoChange}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />

              <TextField
                label="CDR"
                variant="outlined"
                sx={inputStyle}
                value={cdr}
                onChange={(e) => setCdr(e.target.value)}
              />
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <BotonPersonalizado onClick={handleAceptar} sx={{ width: 225 }} disabled={loading}>
            {loading
              ? "Enviando..."
              : data
              ? "GUARDAR CAMBIOS"
              : "ACEPTAR"}
          </BotonPersonalizado>
        </Box>

        <Dialog
          open={openModal}
          onClose={() => setOpenModal(false)}
          PaperProps={{
            sx: {
              borderRadius: 3,
              padding: 3,
              minWidth: 320,
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            },
          }}
        >
          <DialogTitle sx={{ textAlign: "center", pb: 0 }}>
            <Stack direction="column" alignItems="center" spacing={1}>
              {modalType === "success" ? (
                <>
                  <CheckCircleOutlineIcon sx={{ fontSize: 60, color: "success.main" }} />
                  <Typography variant="h5" fontWeight="bold" color="success.main">
                    ¡Éxito!
                  </Typography>
                </>
              ) : (
                <>
                  <ErrorOutlineIcon sx={{ fontSize: 60, color: "error.main" }} />
                  <Typography variant="h5" fontWeight="bold" color="error.main">
                    Atención
                  </Typography>
                </>
              )}
            </Stack>
          </DialogTitle>
          <DialogContent>
            <Typography
              variant="body1"
              textAlign="center"
              sx={{ mt: 1, fontSize: "1.1rem" }}
            >
              {modalType === "success"
                ? data
                  ? "Se modificó correctamente"
                  : "Se agregó correctamente"
                : errorMsg}
            </Typography>
          </DialogContent>
        </Dialog>
      </>
      </LocalizationProvider>
    );
  }