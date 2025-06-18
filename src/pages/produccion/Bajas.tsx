import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";

const columns: GridColDef[] = [
  { field: "no_consecutivo", headerName: "No", width: 120 },
   { field: "no_hc", headerName: "No HC", width: 170 }, // Elimina o comenta esta línea
  {
    field: "componente",
    headerName: "Componente",
    width: 170,
    type: "singleSelect",
    valueOptions: ['CEPL','CEAD','CE','CP','SP','SC','PC', 'PFC', 'CRIO'],
  },
  {
    field: "causa_baja",
    headerName: "Causa",
    width: 170,
    type: "singleSelect",
    valueOptions: ["Ictero", "Lipemia", "Hemolisis", "Rotura"],
  },
];

export default function Bajas() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
  axios.get("http://localhost:3000/componentes-obtenidos/bajas")
    .then(res => {
      console.log("Datos recibidos:", res.data);
 const data = Array.isArray(res.data)
  ? res.data.map((item: any, idx: number) => ({
      id: item._id || idx + 1,
     no_consecutivo: Number(item.no_consecutivo) || idx + 1,
      no_hc: item.historiaClinica?.no_hc ?? "",
      componente: item.componentes?.[0]?.tipo ?? "",
      causa_baja: item.causa_baja ?? "",
    }))
  : [];
setRows(data);
    })
    .catch(() => setRows([]));
}, []);

  return (
    <>
      <Navbar />
      <Box sx={{ marginTop: "25" }}>
        <Typography
          sx={{
            fontSize: { xs: "2rem", md: "3rem" },
            mt: 8,
            backgroundColor: "primary.dark",
            textAlign: "center",
            color: "white",
          }}
        >
          Registro de Bajas
        </Typography>

        <Box
          sx={{
            height: 450,
            width: "90%",
            mb: 2,
            marginBlockEnd: 1,
            marginLeft: 7,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <DataGrid
            sx={{
              height: 450,
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
            editMode="row"
            processRowUpdate={(newRow) => {
              const updatedRows = rows.map((row) =>
                row.id === newRow.id ? newRow : row
              );
              setRows(updatedRows);
              return newRow;
            }}
          />
        </Box>
      </Box>
    </>
  );
}