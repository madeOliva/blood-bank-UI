import * as React from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import Navbar from "../../components/navbar/Navbar";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BotonPersonalizado from "../../components/Button";

const rows: GridRowsProp = [
  {
    id: 1,
    ci: "123456789",
    "nombres y aplelidos": "Juan Pérez",
    edad: 25,
    sexo: "Masculino",
    grupo: "A",
    rh: "+",
    "donante de": "Voluntario",
  },
  {
    id: 2,
    ci: "987654321",
    "nombres y aplelidos": "María López",
    edad: 30,
    sexo: "Femenino",
    grupo: "B",
    rh: "-",
    "donante de": "Reposición",
  },
  {
    id: 3,
    ci: "456789123",
    "nombres y aplelidos": "Carlos García",
    edad: 40,
    sexo: "Masculino",
    grupo: "O",
    rh: "+",
    "donante de": "Voluntario",
  },
  {
    id: 4,
    ci: "789123456",
    "nombres y aplelidos": "Ana Martínez",
    edad: 35,
    sexo: "Femenino",
    grupo: "AB",
    rh: "-",
    "donante de": "Reposición",
  },
  {
    id: 5,
    ci: "321654987",
    "nombres y aplelidos": "Luis Fernández",
    edad: 28,
    sexo: "Masculino",
    grupo: "A",
    rh: "+",
    "donante de": "Voluntario",
  },
  {
    id: 6,
    ci: "654987321",
    "nombres y aplelidos": "Sofía Ramírez",
    edad: 22,
    sexo: "Femenino",
    grupo: "B",
    rh: "-",
    "donante de": "Reposición",
  },
  {
    id: 7,
    ci: "147258369",
    "nombres y aplelidos": "Miguel Torres",
    edad: 45,
    sexo: "Masculino",
    grupo: "O",
    rh: "+",
    "donante de": "Voluntario",
  },
  {
    id: 8,
    ci: "369258147",
    "nombres y aplelidos": "Laura Gómez",
    edad: 29,
    sexo: "Femenino",
    grupo: "AB",
    rh: "-",
    "donante de": "Reposición",
  },
  {
    id: 9,
    ci: "258369147",
    "nombres y aplelidos": "Pedro Sánchez",
    edad: 33,
    sexo: "Masculino",
    grupo: "A",
    rh: "+",
    "donante de": "Voluntario",
  },
  {
    id: 10,
    ci: "963852741",
    "nombres y aplelidos": "Elena Ruiz",
    edad: 27,
    sexo: "Femenino",
    grupo: "B",
    rh: "-",
    "donante de": "Reposición",
  },
];

const columns: GridColDef[] = [
  { field: "ci", headerName: "CI", width: 200 },
  {
    field: "nombres y aplelidos",
    headerName: "Nombres y Apellidos",
    width: 300,
  },
  { field: "edad", headerName: "Edad", width: 100 },
  { field: "sexo", headerName: "Sexo", width: 100 },
  { field: "grupo", headerName: "Grupo", width: 100 },
  { field: "rh", headerName: "Rh", width: 100 },
  { field: "donante de", headerName: "Donante de", width: 100 },
];

export default function ListaCitados() {
  const navigate = useNavigate(); // Hook para navegar entre páginas

  const handleRowClick = () => {
    // Navega a otra página con el ID de la fila seleccionada
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
          paddingTop: 2,
          fontFamily: '"Open Sans"',
        }}
      >
        Citados del Dia
      </Typography>
      {/* Contenedor para centrar el DataGrid */}
      <Box
        style={{ display: "flex", justifyContent: "center", marginTop: "20px",flexDirection:"column",alignItems:"center" }}
      >
        <Box
          style={{
            height: 450,
            width: "80%" /* Ajusta el ancho según sea necesario */,
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
              
              // border: 1,
              // borderRadius: 2,
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
        <Box sx={ { marginTop: 2 } }>
          <BotonPersonalizado onClick={() => navigate("/inscripcion/")}>
            Agregar Nuevo
          </BotonPersonalizado>
        </Box>
      </Box>
    </>
  );
}
