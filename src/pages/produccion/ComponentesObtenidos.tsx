import { DataGrid, GridColDef, GridValueGetter } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";

const columns: GridColDef[] = [
  { field: "no_consecutivo", headerName: "No", width: 100 },

  { field: "no_hc", headerName: "No. HC", width: 150 },
  { field: "sexo", headerName: "Sexo", width: 60 },
  { field: "edad", headerName: "Edad", width: 60 },
{
  field: "fecha_donacion",
  headerName: "Fecha Donación",
  width: 150,
  renderCell: (params) => {
    const value = params.value;
    if (!value || typeof value !== "string") return "";
    // Forzar formato compatible con Date si es YYYY-MM-DD
    const date = new Date(value.includes("T") ? value : value.replace(/-/g, "/"));
    return isNaN(date.getTime()) ? "" : date.toLocaleDateString();
  }
},
  { field: "fecha_obtencion", headerName: "Fecha Obtención", width: 150, renderCell: (params) => params.value ? new Date(params.value).toLocaleDateString() : "" },
  { field: "volumen", headerName: "Volumen (ml)", width: 120 }
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
      const data = Array.isArray(res.data)
        ? res.data
            .filter((item: any) => item.estado_obtencion === "liberado")
            .flatMap((item: any, idx: number) =>
              (item.componentes || []).map((comp: any, compIdx: number) => ({
                id: `${item._id}_${compIdx}`,
                no_consecutivo: item.no_consecutivo ?? "",
                no_hc: item.registro_donacion?.historiaClinica?.no_hc ?? "",
                sexo: item.registro_donacion?.historiaClinica?.sexo ?? "",
                edad: item.registro_donacion?.historiaClinica?.edad ?? "",
                fecha_donacion: item.registro_donacion?.fechaD ?? "",
                fecha_obtencion: comp.fecha_obtencion ?? "",
                volumen: comp.volumen ?? ""
              }))
            )
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