import * as React from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import Navbar from "../../components/navbar/Navbar";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Columnas base (las de la lista de espera, ajusta los nombres según tu backend)
const columnasBase: GridColDef[] = [
  { field: "noRegistro", headerName: "No. Registro", width: 120 },
  { field: "fechaD", headerName: "Fecha D", width: 140 },
  { field: "nombreTecnico", headerName: "Nombre Técnico", width: 180 },
  { field: "ci", headerName: "CI", width: 120 },
  { field: "nombre", headerName: "Nombre", width: 180 },
  { field: "sexo", headerName: "Sexo", width: 80 },
  { field: "edad", headerName: "Edad", width: 80 },
  { field: "grupo", headerName: "Grupo", width: 80 },
  { field: "rh", headerName: "Rh", width: 60 },
];

// Columnas específicas de sangre (incluyendo No.Tubuladura al principio)
const columnasSangre: GridColDef[] = [
  { field: "noTubuladura", headerName: "No.Tubuladura", width: 140 },
  { field: "noBolsa", headerName: "NO. Bolsa", width: 120 },
  { field: "tipoBolsa", headerName: "Tipo de Bolsa", width: 150 },
  { field: "volumen", headerName: "Volumen", width: 100 },
  { field: "reacciones", headerName: "Reacciones", width: 150 },
  { field: "otraReaccion", headerName: "Otra Reacción", width: 150 },
];

// Columnas específicas de plasma
const columnasPlasma: GridColDef[] = [
  { field: "tcm", headerName: "TCM", width: 80 },
  { field: "tp", headerName: "TP", width: 80 },
  { field: "tmin", headerName: "T(min)", width: 80 },
  { field: "ciclos", headerName: "Ciclos", width: 80 },
  { field: "acd", headerName: "ACD", width: 80 },
  { field: "loteAcd", headerName: "Lote Kit ACD", width: 150 },
  { field: "loteBach", headerName: "Lote Kit Bach", width: 150 },
  { field: "reaccionesPlasma", headerName: "Reacciones Plasma", width: 150 },
  { field: "otraReaccionPlasma", headerName: "Otra Reacción Plasma", width: 150 },
];

// Unimos todas las columnas
const columnas: GridColDef[] = [
  ...columnasBase,
  ...columnasSangre,
  ...columnasPlasma,
];

// Ejemplo de datos (ajusta los nombres de los campos según tu backend)
const rows: GridRowsProp = [
  {
    id: 1,
    noRegistro: "001",
    fechaD: "2024-06-15",
    nombreTecnico: "Lic. Pérez",
    ci: "99010112345",
    nombre: "Juan Pérez",
    sexo: "M",
    edad: 30,
    grupo: "A",
    rh: "+",
    noTubuladura: "TUB123",
    noBolsa: "12345",
    tipoBolsa: "Cuádruple",
    volumen: "450ml",
    reacciones: "Ninguna",
    otraReaccion: "",
    tcm: "10",
    tp: "12",
    tmin: "30",
    ciclos: "2",
    acd: "ACD1",
    loteAcd: "L123",
    loteBach: "B456",
    reaccionesPlasma: "Mareo",
    otraReaccionPlasma: "",
  },
  // ...más filas
];

export default function HojaCargoDonaciones() {
  const navigate = useNavigate();

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
            width: "98%",
          }}
        >
          <DataGrid
            rows={rows}
            columns={columnas}
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