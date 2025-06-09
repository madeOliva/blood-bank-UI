import * as React from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import Navbar from "../../components/navbar/Navbar";
import { Box, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers";

// Columnas para donación de sangre
const columnasSangre: GridColDef[] = [
  { field: "noBolsa", headerName: "NO. Bolsa", width: 120 },
  { field: "tipoBolsa", headerName: "Tipo de Bolsa", width: 150 },
  { field: "volumen", headerName: "Volumen", width: 100 },
  { field: "reacciones", headerName: "Reacciones", width: 150 },
  { field: "otraReaccion", headerName: "Otra Reacción", width: 150 },
];

// Columnas para donación de plasma
const columnasPlasma: GridColDef[] = [
  { field: "tcm", headerName: "TCM", width: 80 },
  { field: "tp", headerName: "TP", width: 80 },
  { field: "tmin", headerName: "T(min)", width: 80 },
  { field: "ciclos", headerName: "Ciclos", width: 80 },
  { field: "acd", headerName: "ACD", width: 80 },
  { field: "loteAcd", headerName: "Lote Kit ACD", width: 150 },
  { field: "loteBach", headerName: "Lote Kit Bach", width: 150 },
  { field: "reacciones", headerName: "Reacciones", width: 150 },
  { field: "otraReaccion", headerName: "Otra Reacción", width: 150 },
];

// Ejemplo de datos registrados
const rowsSangre: GridRowsProp = [
  {
    id: 1,
    noBolsa: "12345",
    tipoBolsa: "Cuádruple",
    volumen: "450ml",
    reacciones: "Ninguna",
    otraReaccion: "",
  },
];

const rowsPlasma: GridRowsProp = [
  {
    id: 1,
    tcm: "10",
    tp: "12",
    tmin: "30",
    ciclos: "2",
    acd: "ACD1",
    loteAcd: "L123",
    loteBach: "B456",
    reacciones: "Mareo",
    otraReaccion: "",
  },
];

export default function HojaCargoDonaciones() {
  const navigate = useNavigate();
  const [fechaInicio, setFechaInicio] = React.useState<Dayjs | null>(null);
  const [fechaFin, setFechaFin] = React.useState<Dayjs | null>(null);
  const [tipoDonacion, setTipoDonacion] = React.useState<"sangre" | "plasma">("sangre");

  const handleRowClick = () => {
    navigate(`/inscripcion/`);
  };

  return (
    <>
      <Navbar />
      <Typography
        variant="h4"
        component="h5"
        mt={8}
        sx={{
          fontSize: { xs: "2rem", md: "3rem" },
          textAlign: "center",
          backgroundColor: "#00796B",
          color: "white",
          marginTop: 10,
          fontFamily: '"Open Sans"',
        }}
      >
        Hoja de Cargo
      </Typography>
      {/* Selector de tipo de donación */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Tipo de Donación</InputLabel>
          <Select
            value={tipoDonacion}
            label="Tipo de Donación"
            onChange={(e) => setTipoDonacion(e.target.value as "sangre" | "plasma")}
          >
            <MenuItem value="sangre">Sangre</MenuItem>
            <MenuItem value="plasma">Plasma</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {/* Contenedor para los campos de fecha */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          sx={{
            display: "flex",
            gap: 10,
            marginTop: 2,
            justifyContent: "center",
          }}
        >
          <DateTimePicker
            label="Fecha y Hora Inicio"
            value={fechaInicio}
            onChange={(newValue) => setFechaInicio(newValue)}
            slotProps={{
              textField: { sx: { width: 400 } },
            }}
          />
          <DateTimePicker
            label="Fecha y Hora Fin"
            value={fechaFin}
            onChange={(newValue) => setFechaFin(newValue)}
            slotProps={{
              textField: { sx: { width: 400 } },
            }}
          />
        </Box>
      </LocalizationProvider>
      {/* Contenedor para centrar el DataGrid */}
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Box
          style={{
            height: 450,
            width: "80%",
          }}
        >
          <DataGrid
            rows={tipoDonacion === "sangre" ? rowsSangre : rowsPlasma}
            columns={tipoDonacion === "sangre" ? columnasSangre : columnasPlasma}
            onRowClick={handleRowClick}
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                position: "sticky",
                top: 0,
                zIndex: 1,
                backgroundColor: "#fff",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                fontFamily: '"Open Sans"',
                fontWeight: 600,
              },
              "& .MuiDataGrid-cellContent": {
                fontFamily: '"Open Sans"',
                color: "#000",
              },
            }}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}
          />
        </Box>
      </Box>
    </>
  );
}