import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar"
import { Button, Checkbox, Typography } from "@mui/material";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

type RowData = {
  id: number;
  ci: string
  NoOrden: string | number;
  FechaHora: string;
  Urgente: string | boolean;
  Reserva: string | boolean;
  NoHClinica: string | number;
  Nombre: string;
  PApellido: string;
  SApellido: string;
  Sala: string;
  Cama: string;
  Sexo: string;
  Edad: string | number;
  VolGlobulos: number;
};

const columns: GridColDef<RowData>[] = [
  { field: "id", headerName: "#", width: 90 },
  { field: "ci", headerName: "CI", width: 120 },
  { field: "NoOrden", headerName: "No.Orden", width: 120 },
  { field: "FechaHora", headerName: "Fecha/Hora", type: "number", width: 150, editable: false, },
  {
    field: "Urgente", headerName: "Urgente", width: 120, editable: false,
    renderCell: (params) => (
      <Checkbox color="primary" checked={params.value === "Sí" || params.value === true} />
    ),
  },
  {
    field: "Reserva", headerName: "Reserva", width: 120, editable: false,
    renderCell: (params) => (
      <Checkbox color="primary" checked={params.value === "Sí" || params.value === true} />
    ),
  },
  { field: "NoHClinica", headerName: "No.HC", width: 120, editable: false, },
  { field: "Nombre", headerName: "Nombre", width: 120, editable: false, },
  { field: "PApellido", headerName: "Primer Apellido", width: 150, editable: false, },
  { field: "SApellido", headerName: "Segundo Apellido", width: 140, editable: false, },
  { field: "Sala", headerName: "Sala", width: 100, editable: false, },
  { field: "Cama", headerName: "Cama", width: 100, editable: false, },
  { field: "Sexo", headerName: "Sexo", width: 100, editable: false, },
  { field: "Edad", headerName: "Edad", width: 100, editable: false, },
  { field: "VolGlobulos", headerName: "Volumen a Transfundir", width: 210, editable: false, },
  {
    field: "Acciones", headerName: "Acciones", width: 130,
    renderCell: (params) => {
      const navigate = useNavigate();
      const [rows, setRows] = useState<RowData[]>([]);

      return (
        <>

          <Button
            variant="contained"
            size="small"
            color="error"
            endIcon={<WaterDropIcon sx={{ ml: -1 }} />}
            onClick={() => {
              setRows(prevRows =>
                prevRows.map(rows =>
                  rows.id === params.row.id ? { ...rows, Estado: "Activa" } : rows
                )
              );
              navigate('/transfusionpage', { state: { id_orden: params.row.NoOrden } });
            }}
          >
            Enviar
          </Button >
        </>
      );
    },
    sortable: false,
    filterable: false,
    editable: false,
  },
];

export default function PageOne() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/transfusiones")
      .then(res => {
        const rowsWithId = res.data.map((item: any, index: number) => ({
          id: index + 1,
          NoOrden: item.id_orden,
          ci: item.ci,
          FechaHora: `${item.fecha_orden?.slice(0, 10)} ${item.hora_orden?.slice(11, 16)}`,
          Urgente: item.caracter ? "Sí" : "No",
          Reserva: item.reserva_gr || item.reserva_cp ? "Sí" : "No",
          NoHClinica: item.id_orden,
          Nombre: item.nombre,
          PApellido: item.primerApellido,
          SApellido: item.segundoApellido,
          Sala: item.sala,
          Cama: item.cama,
          Sexo: item.sexo,
          Edad: item.edad,
          VolGlobulos: item.cant_gr,
        }));
        setRows(rowsWithId);
      });
  }, []);
  
  return (
    <>
      <Navbar />
      <Typography
        variant="h4"
        component="h5"
        padding={1}
        mt={8}
        sx={{ width: "100%", fontSize: { xs: "1rem", md: "2rem" }, textAlign: "center", bgcolor: "primary.dark", color: "white" }}
      >
        Servicio de Transfusiones
      </Typography>
      <Box sx={{ marginTop: "20px", mb: "20px", width: "100%" }}>
        <DataGrid
          sx={{
            "& .MuiDataGrid-columnHeaderTitle": {
              fontFamily: '"Open Sans"',
              fontWeight: 600,
            },
            "& .MuiDataGrid-cellContent": {
              fontFamily: '"Open Sans"',
              color: "#000"
            },
            width: "100%",
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
    </>
  );
}