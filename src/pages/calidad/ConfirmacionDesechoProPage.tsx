import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Navbar from "../../components/navbar/Navbar";
import {
  Box,
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import axios from "axios";

type RowData = {
  id: string | number;
  no: string | number;
  hc: string;
  desecho: string;
  causa_baja: string;
  componente: string;
};

export default function DesechosPro() {
  const [rows, setRows] = useState<RowData[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [openLiberarModal, setOpenLiberarModal] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState<string | number | null>(null);

  // Modal de éxito
  const [openSuccess, setOpenSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Cargar solo los componentes con estado_obtencion "baja"
  useEffect(() => {
  const fetchData = async () => {
    const response = await axios.get("http://localhost:3000/componentes-obtenidos/bajas?estado=baja");
  
    const bajas = Array.isArray(response.data)
      ? response.data.flatMap((item: any, idx: number) =>
          (item.componentes || [])
            .filter((comp: any) => comp.estado_obtencion === "baja")
            .map((comp: any, compIdx: number) => ({
              id: comp._id || `${item._id}_${compIdx}`,
              no: item.no_consecutivo ?? idx + 1,
              hc: item.registro_donacion?.historiaClinica?.no_hc ?? "",
              desecho: "Componente",
              causa_baja: item.causa_baja ?? comp.causa_baja ?? "",
              componente: comp.tipo ?? "",
            }))
        )
      : [];
    setRows(bajas);
  };
  fetchData();
}, []);

  const handleOpenModal = (id: string | number) => {
    setSelectedRowId(id);
    setOpenModal(true);
  };

  const handleOpenLiberarModal = (id: string | number) => {
    setSelectedRowId(id);
    setOpenLiberarModal(true);
  };

  // Cambia el estado a "desechada"
const handleDesechar = async () => {
  if (!selectedRowId) return;
  try {
    await axios.patch(`http://localhost:3000/componentes-obtenidos/${selectedRowId}/desechar`);
    // Actualiza la tabla después del cambio
    const response = await axios.get("http://localhost:3000/componentes-obtenidos/bajas?estado=baja");
    const bajas = Array.isArray(response.data)
      ? response.data.flatMap((item: any, idx: number) =>
          (item.componentes || [])
            .filter((comp: any) => comp.estado_obtencion === "baja")
            .map((comp: any, compIdx: number) => ({
              id: comp._id || `${item._id}_${compIdx}`,
              no: item.no_consecutivo ?? idx + 1,
              hc: item.registro_donacion?.historiaClinica?.no_hc ?? "",
              desecho: "Componente",
              causa_baja: item.causa_baja ?? comp.causa_baja ?? "",
              componente: comp.tipo ?? "",
            }))
        )
      : [];
    setRows(bajas);
    setOpenModal(false);
    setSelectedRowId(null);
    setSuccessMessage("Registro desechado correctamente");
    setOpenSuccess(true);
    setTimeout(() => setOpenSuccess(false), 3000);
  } catch (error) {
    alert("Error al actualizar el estado.");
  }
};
  

  // Cambia el estado a "liberado"
  const handleLiberar = async () => {
    if (!selectedRowId) return;
    try {
      await axios.patch(`http://localhost:3000/componentes-obtenidos/${selectedRowId}/liberar`);
      // Actualiza la tabla después del cambio
      const response = await axios.get("http://localhost:3000/componentes-obtenidos/bajas?estado=baja");
     const bajas = Array.isArray(response.data)
  ? response.data.flatMap((item: any, idx: number) =>
      (item.componentes || [])
        .filter((comp: any) => comp.estado_obtencion === "baja")
        .map((comp: any, compIdx: number) => ({
          id: comp._id || `${item._id}_${compIdx}`,
          no: item.no_consecutivo ?? idx + 1,
          hc: item.registro_donacion?.historiaClinica?.no_hc ?? "",
          desecho: "Componente",
          causa_baja: item.causa_baja ?? comp.causa_baja ?? "",
          componente: comp.tipo ?? "",
        }))
    )
  : [];
      setRows(bajas);
      setOpenLiberarModal(false);
      setSelectedRowId(null);
      setSuccessMessage("Registro liberado correctamente");
      setOpenSuccess(true);
      setTimeout(() => setOpenSuccess(false), 3000);
    } catch (error) {
      alert("Error al liberar el componente.");
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
            onClick={() => handleOpenLiberarModal(params.id)}
            color="success"
            variant="contained"
          >
            Liberar
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
      {/* Modal de confirmación para Liberar */}
      <Dialog open={openLiberarModal} onClose={() => setOpenLiberarModal(false)}>
        <DialogTitle>Confirmar acción</DialogTitle>
        <DialogContent>
          ¿Estás seguro que deseas liberar este registro?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenLiberarModal(false)}>Cancelar</Button>
          <Button onClick={handleLiberar} color="success" variant="contained">
            Liberar
          </Button>
        </DialogActions>
      </Dialog>
      {/* Modal de éxito para Desechar y Liberar */}
      <Dialog
        open={openSuccess}
        onClose={() => setOpenSuccess(false)}
        aria-labelledby="success-dialog-title"
        PaperProps={{
          sx: {
            borderRadius: 3,
            padding: 3,
            minWidth: 320,
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          },
        }}
      >
        <DialogTitle sx={{ textAlign: "center", pb: 0 }} id="success-dialog-title">
          <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
            <CheckCircleOutlineIcon sx={{ fontSize: 60, color: "success.main" }} />
            <Typography variant="h5" fontWeight="bold" color="success.main">
              ¡Éxito!
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" textAlign="center" sx={{ mt: 1, fontSize: "1.1rem" }}>
            {successMessage}
          </Typography>
        </DialogContent>
        </Dialog>
      </>
    );
  }