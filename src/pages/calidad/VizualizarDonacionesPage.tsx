import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Navbar from "../../components/navbar/Navbar";
import { Box, Container, Typography } from "@mui/material";
import axios from "axios";

const columns: GridColDef[] = [
  { field: "no", headerName: "NO", width: 90 },
  { field: "hc", headerName: "HC-donación", width: 150 },
  { field: "sexo", headerName: "Sexo", width: 70 },
  { field: "edad", headerName: "Edad", width: 70 },
  { field: "grupo", headerName: "Grupo", width: 70 },
  { field: "factor", headerName: "Factor", width: 70 },
  { field: "volumen", headerName: "Volumen", width: 90 },
  { field: "estado", headerName: "Estado", width: 100 },
  { field: "entidad", headerName: "Entidad", width: 150 },
];

function isToday(fecha: string | Date) {
  if (!fecha) return false;
  const todayStr = new Date().toISOString().slice(0, 10);
  const dateStr = new Date(fecha).toISOString().slice(0, 10);
  return todayStr === dateStr;
}
export default function VizualizarDonaciones() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);

useEffect(() => {
  axios.get('http://localhost:3000/registro-donacion/donaciones-diarias')
    .then(response => {
      console.log("DATA RECIBIDA:", response.data);
      setRows(
        response.data
          .filter((item: any) => {
            const fecha = item.fechaD?.$date ?? item.fechaD;
            if (!fecha) {
              console.log("Sin fechaD:", item);
              return false;
            }
            return isToday(fecha);
          })
         .map((item: any, idx: number) => ({
  id: item.id || item._id || item.no_consecutivo || idx,
  no: item.no_consecutivo ?? idx + 1,
  hc: item.hc,
  sexo: item.sexo,
  edad: item.edad,
  grupo: item.grupo,
  factor: item.factor,
  volumen: item.volumen,
  estado: item.estado,
  entidad: item.entidad,
  fechaD: item.fechaD?.$date ?? item.fechaD ?? "",
}))
      );
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}, []);

  return (
    <>
      <Navbar />
      <Typography
        variant="h4"
        component="h5"
        mt={8}
        sx={{
          fontSize: { xs: "2rem", md: "3rem" },
          backgroundColor: "primary.dark",
          textAlign: "center",
          fontFamily: "sans-serif",
          color: "white"
        }}
      >
        Donaciones Diarias
      </Typography>
      <Container>
        <Box sx={{ marginTop: "20px", width: "90%", marginBlockEnd: 1, marginLeft: 7 }}>
          <Box sx={{ minWidth: 220, width: 120, minHeight: 40, position: 'revert-layer' }}></Box>
          <DataGrid
            sx={{
              height: 400,
              "& .MuiDataGrid-columnHeaderTitle": {
                fontFamily: '"Open Sans"',
                fontWeight: 600,
              },
              "& .MuiDataGrid-cellContent": {
                fontFamily: '"Open Sans"',
                color: "#000"
              },
            }}
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}
            disableRowSelectionOnClick
          />
        </Box>
      </Container>
    </>
  );
}