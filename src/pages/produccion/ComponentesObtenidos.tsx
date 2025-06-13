import { DataGrid, GridColDef, GridValueGetter } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";

const columns: GridColDef[] = [
  { field: "no_consecutivo", headerName: "No", width: 70 },
  { field: "no_hc", headerName: "No. HC", width: 120 },
  { field: "sexo", headerName: "Sexo", width: 70 },
  { field: "edad", headerName: "Edad", width: 70, type: "number" },
  { field: "grupo", headerName: "Grupo", width: 80 },
  { field: "factor", headerName: "Factor", width: 90 },
  {
    field: "tipo_componente",
    headerName: "Componente Obtenido",
    width: 170,
    type: "singleSelect",
    valueOptions: ['CEPL','CEAD','CE','CP','SP','SC','PC', 'PFC', 'CRIO'],
  },
  {
    field: "volumen",
    headerName: "Vol.(ml)",
    type: "number",
    width: 100,
  },
{
  field: "fecha_obtencion",
  headerName: "Fecha Obtención",
  width: 140,
},,
];

type ComponenteObtenidoRow = {
  id: number | string;
  no_consecutivo: number;
  no_hc: string;
  sexo: string;
  edad: number;
  grupo: string;
  factor: string;
  tipo_componente: string;
  volumen: number | string;
  fecha_obtencion: string | Date;
};

export default function ComponentesObtenidos() {
  const [rows, setRows] = useState<ComponenteObtenidoRow[]>([]);

 useEffect(() => {
  axios.get("http://localhost:3000/componentes-obtenidos/componentes_obtenidos")
    .then(res => {
      console.log("Respuesta backend:", res.data);
      // NO filtrar, solo mapear
const data = res.data.map((item: any, idx: number) => ({
  id: item._id || idx + 1,
  no_consecutivo: idx + 1,
  no_hc: item.historia_clinica?.no_hc || "",
  sexo: item.historia_clinica?.sexo || "",
  edad: item.historia_clinica?.edad || "",
  grupo: item.historia_clinica?.grupo || "",
  factor: item.historia_clinica?.factor || "",
  tipo_componente: item.componentes?.[0]?.tipo || "",
  volumen: item.componentes?.[0]?.volumen || "",
  fecha_obtencion: item.fecha_obtencion,
}));
      setRows(data);
    })
    .catch(() => setRows([]));
}, []);

  return (
    <>
      <Navbar />
      <Box sx={{ marginTop: "25" }}>
        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: "2rem", md: "3rem" },
            mt: 8,
            backgroundColor: "primary.dark",
            textAlign: "center",
            color: "white",
          }}
        >
          Componentes Obtenidos
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
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 },
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