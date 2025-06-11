import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Navbar from "../../components/navbar/Navbar";
import { Box, Container, Typography } from "@mui/material";
import axios from "axios";

const columns: GridColDef[] = [
  { field: "no", headerName: "NO", width: 90 },
  { field: "hc", headerName: "HC-donación", width: 150 },
  { field: "desecho", headerName: "Desecho", width: 150 },
  { field: "motivo", headerName: "Motivo", width: 250 },
];

export default function Desechos() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/registro-donacion/donaciones-diarias")
      .then(response => {
        // Filtra solo los registros con estado "desechada"
     const desechadas = response.data
  .filter((item: any) => item.estado === "desechada")
  .map((item: any, idx: number) => ({
    id: item.id || idx,
    no: item.no,
    hc: item.hc,
    desecho: item.desecho, // <-- solo usa el valor que viene del backend
    motivo: item.motivo_desecho || "Sin motivo"
  }));
        setRows(desechadas);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
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
        Desechos
      </Typography>
      <Container>
        <Box sx={{ marginTop: "20px", width: "90%", marginBlockEnd: 1, marginLeft: 7 }}>
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