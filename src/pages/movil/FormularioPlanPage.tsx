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
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Navbar from "../../components/navbar/Navbar";
import BotonPersonalizado from "../../components/Button";
import dayjs from "dayjs";
import { useLocation, useNavigate } from "react-router-dom";

export default function Plan() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state?.data;
  const [openModal, setOpenModal] = React.useState(false);
  const [modalType, setModalType] = React.useState<"success" | "error">("success");
  const [errorMsg, setErrorMsg] = React.useState("Hay campos vacíos, por favor complete todos los campos.");

  const [areaSalud, setAreaSalud] = React.useState(data?.areaSalud || "");
  const [consejoPopular, setConsejoPopular] = React.useState(data?.consejoPopular || "");
  const [consultoriosAfectados, setConsultoriosAfectados] = React.useState(
    data?.consultoriosAfectados?.toString() || ""
  );
  const [selectedDateTime, setSelectedDateTime] = React.useState(
    data?.fechaHora ? dayjs(data.fechaHora) : dayjs()
  );
  const [lugarDonacion, setLugarDonacion] = React.useState(data?.lugarDonacion || "");
  const [compromiso, setCompromiso] = React.useState(data?.compromiso || "");
  const [responsableSalud, setResponsableSalud] = React.useState(data?.responsableSalud || "");
  const [cdr, setCdr] = React.useState(data?.cdr || "");

  const areasSaludOptions = [
    "Cardiología",
    "Pediatría",
    "Neurología",
    "Oncología",
    "Medicina General",
  ];

  const hayCamposVacios = () => {
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

  const fechaValida = () => {
    if (!selectedDateTime || !selectedDateTime.isValid()) return false;
    const today = dayjs().startOf("day");
    const selectedDay = selectedDateTime.startOf("day");
    return selectedDay.isAfter(today);
  };

  const compromisoValido = () => {
    return /^\d+$/.test(compromiso);
  };

  const handleCompromisoChange = (event) => {
    setCompromiso(event.target.value);
  };

  const handleAceptar = () => {
    if (hayCamposVacios()) {
      setErrorMsg("Hay campos vacíos, por favor complete todos los campos.");
      setModalType("error");
      setOpenModal(true);
    } else if (!fechaValida()) {
      setErrorMsg("La fecha debe ser posterior al día de hoy.");
      setModalType("error");
      setOpenModal(true);
    } else if (!compromisoValido()) {
      setErrorMsg("El campo Compromiso solo debe contener números.");
      setModalType("error");
      setOpenModal(true);
    } else {
      setModalType("success");
      setOpenModal(true);
    }
  };

  React.useEffect(() => {
    if (openModal) {
      const timeoutDuration = modalType === "success" ? 1000 : 2000;
      const timer = setTimeout(() => {
        setOpenModal(false);
        if (modalType === "success") {
          if (data) {
            // Modificación
            navigate("/planDonaciones", {
              state: {
                updatedRow: {
                  ...data,
                  areaSalud,
                  consejoPopular,
                  consultoriosAfectados,
                  fechaHora: selectedDateTime.format("YYYY-MM-DD HH:mm"),
                  lugarDonacion,
                  compromiso,
                  responsableSalud,
                  cdr,
                },
              },
            });
          } else {
            // Alta
            navigate("/planDonaciones", {
              state: {
                newRow: {
                  id: Date.now(),
                  areaSalud,
                  consejoPopular,
                  consultoriosAfectados,
                  fechaHora: selectedDateTime.format("YYYY-MM-DD HH:mm"),
                  lugarDonacion,
                  compromiso,
                  responsableSalud,
                  cdr,
                },
              },
            });
          }
        }
      }, timeoutDuration);
      return () => clearTimeout(timer);
    }
  }, [
    openModal,
    modalType,
    data,
    areaSalud,
    consejoPopular,
    consultoriosAfectados,
    selectedDateTime,
    lugarDonacion,
    compromiso,
    responsableSalud,
    cdr,
    navigate,
  ]);

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
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <FormControl sx={inputStyle}>
                <InputLabel id="area-salud-label">Área de salud</InputLabel>
                <Select
                  labelId="area-salud-label"
                  id="area-salud-select"
                  value={areaSalud}
                  label="Área de salud"
                  onChange={(e) => setAreaSalud(e.target.value)}
                >
                  {areasSaludOptions.map((area) => (
                    <MenuItem key={area} value={area}>
                      {area}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Consejo popular"
                variant="outlined"
                sx={inputStyle}
                value={consejoPopular}
                onChange={(e) => setConsejoPopular(e.target.value)}
              />

              <TextField
                label="Consultorios Afectados"
                variant="outlined"
                sx={inputStyle}
                value={consultoriosAfectados}
                onChange={(e) => setConsultoriosAfectados(e.target.value)}
              />

              <DateTimePicker
                label="Fecha y Hora de Donación"
                value={selectedDateTime}
                onChange={(newValue) => setSelectedDateTime(newValue)}
                minDateTime={dayjs().add(1, "day").startOf("day")}
                slotProps={{
                  textField: {
                    sx: inputStyle,
                    variant: "outlined",
                  },
                }}
              />
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <TextField
                label="Lugar de la Donacion"
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
                label="Responsable de Salud"
                variant="outlined"
                sx={inputStyle}
                value={responsableSalud}
                onChange={(e) => setResponsableSalud(e.target.value)}
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
          <BotonPersonalizado onClick={handleAceptar} sx={{ width: 225 }}>
            {data ? "GUARDAR CAMBIOS" : "ACEPTAR"}
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
