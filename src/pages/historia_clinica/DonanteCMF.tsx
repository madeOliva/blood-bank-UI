 import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Box, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import Navbar from '../../components/navbar/Navbar';
import axios from "axios";

// Interface para los donantes
interface Donante {
  id: number;
  nombre: string;
  no_hc: string;
  telefono: string;
  direccion: string;
  grupo: string;
  ultimaDonacion: string;
}


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

// Función para verificar si el último chequeo fue hace más de 3 meses
const isChequeoVencido = (fecha: string) => {
  const hoy = dayjs();
  const chequeo = dayjs(fecha);
  return hoy.diff(chequeo, "month") > 3;
};

const DonantesCMF: React.FC = () => {
  const [donantes, setDonantes] = useState<Donante[]>([]);

   useEffect(() => {
    // Llama al backend que ya devuelve solo los activos
    axios.get('http://localhost:3000/historia-clinica/donantes-activos')
      .then(res => {
        const activos = res.data.map((d: any, idx: number) => ({
          id: d._id || idx + 1,
          nombre: `${d.nombre} ${d.primer_apellido} ${d.segundo_apellido}`,
          no_hc: d.no_hc,
          no_consultorio: d.no_consultorio,
          telefono: d.telefono,
          direccion:`${d.municipio || ""}, ${d.provincia || ""}, ${d.consejo_popular || ""}, ${d.otra_localizacion || ""}`,
          grupo: `${d.grupo_sanguine || ""}${d.factor || ""}`,
          ultimaDonacion: d.fechaUltimaDonacion || "",
        }));
        setDonantes(activos);
      });
  }, []);

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
    { field: "nombre", headerName: "Nombre y Apellidos", width: 200 },
    { field: "no_hc", headerName: "No. HC", width: 100 },
    { field: "no_consultorio", headerName: "No Consultorio", width: 200 },
    { field: "telefono", headerName: "Teléfono", width: 120 },
    { field: "direccion", headerName: "Dirección", width: 320 },
    { field: "grupo", headerName: "Grupo/Factor", width: 120 },
    {
      field: "ultimaDonacion",
      headerName: "Última Donación",
      width: 140,
      valueFormatter: (params: any) => dayjs(params.value).format("DD-MM-YYYY"),
    },
  ];

  return (
    <>
      <Navbar/>
      <Box sx={{ margin: "auto", mt: 8 }}>
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
