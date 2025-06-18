 import React, { useState } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Box, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import Navbar from '../../components/navbar/Navbar';

// Interface para los donantes
interface Donante {
  id: number;
  estado: string;
  nombre: string;
  hc: string;
  telefono: string;
  direccion: string;
  grupo: string;
  ultimaDonacion: string;
}

// Datos de ejemplo
const initialDonantes: Donante[] = [
  {
    id: 1,
    estado: "Activo",
    nombre: "Yudith Carbó",
    hc: "HC-230",
    telefono: "48765521",
    direccion: "Calle 3era Reparto 26 julio Edif 26 Apartamento 4",
    grupo: "A+",
    ultimaDonacion: "2025-01-14",
  },
  {
    id: 2,
    estado: "Baja Temp",
    nombre: "Eddie Diaz",
    hc: "HC-320",
    telefono: "48789010",
    direccion: "Calle 5ta Reparto 26 julio Bloque 5 bajos",
    grupo: "O+",
    ultimaDonacion: "2025-02-06",
  },
];

// Estilo para el listón
const Ribbon = styled(Box)({
  background: "#009688",
  color: "#fff",
  textAlign: "center",
  fontSize: "2rem",
  padding: "24px 0",
  marginBottom: "32px",
  borderRadius: "5px",
  fontWeight: 500,
});

// Opciones de estado
const estadoOptions = [
  { value: "Activo", label: "Activo" },
  { value: "Baja Temp", label: "Baja Temp" },
];

// Función para verificar si el último chequeo fue hace más de 3 meses
const isChequeoVencido = (fecha: string) => {
  const hoy = dayjs();
  const chequeo = dayjs(fecha);
  return hoy.diff(chequeo, "month") > 3;
};

const DonantesCMF: React.FC = () => {
  const [donantes, setDonantes] = useState<Donante[]>(initialDonantes);

  // Manejar cambio de estado
  const handleEstadoChange = (id: number, nuevoEstado: string) => {
    setDonantes(prevDonantes => 
      prevDonantes.map(donante => 
        donante.id === id ? { ...donante, estado: nuevoEstado } : donante
      )
    );
  };

  // Definición de columnas
  const columns: GridColDef[] = [
    {
      field: "estado",
      headerName: "Estado",
      width: 140,
      renderCell: (params: GridRenderCellParams) => (
        <Select
          value={params.row.estado}
          size="small"
          variant="outlined"
          sx={{ width: "100%" }}
          onChange={(e: SelectChangeEvent) => 
            handleEstadoChange(params.row.id, e.target.value)
          }
        >
          {estadoOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      ),
    },
    { field: "nombre", headerName: "Nombre y Apellidos", width: 180 },
    { field: "hc", headerName: "No. HC", width: 100 },
    { field: "telefono", headerName: "Teléfono", width: 120 },
    { field: "direccion", headerName: "Dirección", width: 320 },
    { field: "grupo", headerName: "Grupo/Factor", width: 120 },
    {
      field: "ultimaDonacion",
      headerName: "Última Donación",
      width: 140,
      valueFormatter: (params) => dayjs(params.value).format("DD-MM-YYYY"),
    },
  ];

  return (
    <>
      <Navbar/>
      <Box sx={{ width: "85%", margin: "auto", mt: 8 }}>
      <Typography
        variant="h4"
        component="h5"
        sx={{fontSize: { xs: "2rem", md: "3rem" },
        backgroundColor: "primary.dark",
        color: "white",
        textAlign: "center",
        marginBlock: 5,
        mt: 8,
        }}
       >
        Listado de Donantes del CMF
      </Typography>
        <DataGrid
          autoHeight
          rows={donantes}
          columns={columns}
          pageSize={5}
          getRowClassName={(params) =>
            isChequeoVencido(params.row.ultimoChequeo) ? "row-vencida" : ""
          }
          sx={{
            "& .row-vencida": {
              bgcolor: "#e9a3a3",
            },
            "& .MuiDataGrid-cell, & .MuiDataGrid-columnHeaders": {
              fontSize: "1rem",
            },
          }}
        />
      </Box>
    </>
  );
};

export default DonantesCMF;
