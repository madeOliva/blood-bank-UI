
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Navbar from "../../components/navbar/Navbar";
import { Box, Container, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import axios from "axios";

export default function DesechosPro() {

  const [rows, setRows] = useState<RowData[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState<string | number | null>(null);

  // Cargar solo los componentes con estado_obtencion "baja"
  useEffect(() => {
  axios.get("http://localhost:3000/componentes-obtenidos/bajas")
    .then(response => {
       console.log("DATOS RECIBIDOS:", response.data); // <-- AGREGA ESTO
      const bajas = Array.isArray(response.data)
  ? response.data.map((item: any, idx: number) => ({
      id: item._id || idx,
      no: item.no_consecutivo ?? idx + 1,
      hc: item.historia_clinica?.no_hc ?? "",
      desecho: "Componente",
      causa_baja: item.causa_baja ?? "",
      componente: item.componentes?.[0]?.tipo ?? "",
    }))
  : [];
      setRows(bajas);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
}, []);

  const handleOpenModal = (id: string | number) => {
    setSelectedRowId(id);
    setOpenModal(true);
  };

  // Cambia el estado a "desechada"
  const handleDesechar = async () => {
    if (!selectedRowId) return;
    try {
      await axios.put(`http://localhost:3000/componentes-obtenidos/${selectedRowId}`, {
        estado_obtencion: "desechada",
      });
      // Actualiza la tabla después del cambio
      const response = await axios.get("http://localhost:3000/componentes-obtenidos/bajas");
      const bajas = Array.isArray(response.data)
        ? response.data.map((item: any, idx: number) => ({
            id: item.id || item._id || idx,
            no: item.no ?? idx + 1,
            hc: item.no_hc ?? "",
            desecho: item.desecho ?? "",
            motivo: item.causa_baja ?? "",
            componente:
              item.nombre_componente
              ?? (item.componentes && Array.isArray(item.componentes) && item.componentes[0] && item.componentes[0].tipo)
              ?? "",
          }))
        : [];
      setRows(bajas);
      setOpenModal(false);
      setSelectedRowId(null);
    } catch (error) {
      alert("Error al actualizar el estado.");
    }
  };

  // Cambia el estado a "reenviada"
  const handleEnviarIndividual = async (id: string | number) => {
    try {
      await axios.put(`http://localhost:3000/componentes-obtenidos/${id}`, {
        estado_obtencion: "reenviada",
      });
      // Actualiza la tabla después del cambio
      const response = await axios.get("http://localhost:3000/componentes-obtenidos/bajas");
     const bajas = Array.isArray(response.data)
  ? response.data.map((item: any, idx: number) => ({
      id: item._id || idx,
      no: item.no_consecutivo ?? idx + 1,
      hc: item.historia_clinica?.no_hc ?? "",
      desecho: "Componente",
      causa_baja: item.causa_baja ?? "",
      componente: item.componentes?.[0]?.tipo ?? "",
    }))
  : [];
      setRows(bajas);
    } catch (error) {
      alert("Error al actualizar el estado.");
    }
  };

  const columns: GridColDef[] = [
    { field: "no", headerName: "NO", width: 90 },
    { field: "hc", headerName: "HC-donación", width: 150 },
    { field: "desecho", headerName: "Desecho", width: 150 },
    { field: "causa_baja", headerName: "Causa de baja", width: 180 },
 
    {
      field: "accion",
      headerName: "",
      width: 220,
      editable: false,
      renderCell: (params) => (
        <>
          <Button
            onClick={() => handleOpenModal(params.id)}
            color="error"
            variant="contained"
            sx={{ mr: 1 }}
          >
            Desechar
          </Button>
          <Button
            onClick={() => handleEnviarIndividual(params.id)}
            color="success"
            variant="contained"
          >
            Reenviar
          </Button>
        </>
      ),
    },
  ];

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
        Confirmacion de Desechos de Produccion
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
      {/* Modal de confirmación para Desechar */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Confirmar acción</DialogTitle>
        <DialogContent>
          ¿Estás seguro que deseas desechar este registro?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancelar</Button>
          <Button onClick={handleDesechar} color="error" variant="contained">
            Desechar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}