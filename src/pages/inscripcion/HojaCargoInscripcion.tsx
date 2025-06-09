import * as React from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import Navbar from "../../components/navbar/Navbar";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers";

// Datos de ejemplo
const rows: GridRowsProp = [
  {
    id: 1,
    ci: "05090263232",
    nombre: "Pedro Gonzalez Carballeda",
    edad: 19,
    sexo: "M",
    grupo: "O",
    rh: "+",
    donante: "Sangre",
  },
  // Puedes agregar más filas aquí
];

// Definición de las columnas
const columns: GridColDef[] = [
  { field: "ci", headerName: "CI", width: 200 },
  { field: "nombre", headerName: "Nombres y Apellidos", width: 300 },
  { field: "edad", headerName: "Edad", width: 100 },
  { field: "sexo", headerName: "Sexo", width: 100 },
  { field: "grupo", headerName: "Grupo", width: 100 },
  { field: "rh", headerName: "RH", width: 100 },
  { field: "donante", headerName: "Donante de", width: 150 },
];

export default function HojaCargo() {
  const navigate = useNavigate(); // Hook para navegar entre páginas
  const [fechaInicio, setFechaInicio] = React.useState<Dayjs | null>(null);
  const [fechaFin, setFechaFin] = React.useState<Dayjs | null>(null);
  const handleRowClick = () => {
    // Navega a otra página con el ID de la fila seleccionada
    navigate(`/inscripcion/`);
  };

  //   // Filtrar las filas según las fechas seleccionadas
  //   const filteredRows = rows.filter((row) => {
  //     const fecha = dayjs(row.fecha);
  //     if (fechaInicio && fecha.isBefore(fechaInicio, "day")) return false;
  //     if (fechaFin && fecha.isAfter(fechaFin, "day")) return false;
  //     return true;
  //   });

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
            width: "80%", // Ajusta el ancho según sea necesario
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            onRowClick={handleRowClick} // Maneja el clic en la fila
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                position: "sticky", // Hace que los encabezados sean fijos
                top: 0, // Los fija en la parte superior
                zIndex: 1, // Asegura que estén por encima de las filas
                backgroundColor: "#fff", // Fondo blanco para los encabezados
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
