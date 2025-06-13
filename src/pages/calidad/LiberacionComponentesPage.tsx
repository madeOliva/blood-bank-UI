import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Navbar from "../../components/navbar/Navbar";
import {
  Box,
  Container,
  FormControl,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  RadioGroup,
  FormControlLabel,
  Radio,
  Slide,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";

export default function LiberacionComponentes() {
  const [rows, setRows] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [motivoDesecho, setMotivoDesecho] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

 useEffect(() => {
  fetch("http://localhost:3000/componentes-obtenidos/obtenidos")
    .then(res => res.json())
    .then(data => {
      setRows(
         Array.isArray(data)
    ? data.map((item: any, idx: number) => ({
        id: item._id || idx,
        no: item.no_consecutivo ?? idx + 1,
        hc: item.historia_clinica?.no_hc ?? "",
        sexo: item.historia_clinica?.sexo ?? "",
        edad: Number(item.historia_clinica?.edad) || 0,
        volumen: Number(item.componentes?.[0]?.volumen) || 0,
        grupo: item.historia_clinica?.grupo ?? "",
        factor: item.historia_clinica?.factor ?? "",
        fecha_obtencion: item.fecha_obtencion ?? "",
        componente: item.componentes?.[0]?.tipo ?? "",
      }))
    : []
);
    })
    .catch(() => setRows([]));
}, []);

  const handleOpenModal = (id: number) => {
    setSelectedRowId(id);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRowId(null);
    setMotivoDesecho("");
  };

  const handleSuccessClose = () => {
    setOpenSuccess(false);
    setSuccessMessage("");
  };

  const handleConfirmDesechar = async () => {
  if (!selectedRowId) return;
  try {
    await fetch(`http://localhost:3000/componentes-obtenidos/${selectedRowId}/desechar`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ motivo_desecho: motivoDesecho }),
    });
    setRows(rows => rows.filter(row => row.id !== selectedRowId));
    setOpenModal(false);
    setSelectedRowId(null);
    setMotivoDesecho("");
    setSuccessMessage("Componente desechado exitosamente.");
    setOpenSuccess(true);
    setTimeout(() => setOpenSuccess(false), 3000); // Oculta el modal a los 3 segundos
  } catch (e) {
    alert("Error al desechar el componente");
  }
};

const handleLiberar = async (id: number) => {
  try {
    await fetch(`http://localhost:3000/componentes-obtenidos/${id}/liberar`, {
      method: "PATCH",
    });
    setRows(rows => rows.filter(row => row.id !== id));
    setSuccessMessage("Componente liberado exitosamente.");
    setOpenSuccess(true);
    setTimeout(() => setOpenSuccess(false), 3000); // Oculta el modal a los 3 segundos
  } catch (e) {
    alert("Error al liberar el componente");
  }
};

  const columns: GridColDef[] = [
    { field: "no", headerName: "NO", width: 90 },
    { field: "hc", headerName: "HC-donacion", width: 150, editable: false },
    { field: "sexo", headerName: "Sexo", width: 70, editable: false },
    { field: "edad", headerName: "Edad", type: "number", width: 70, editable: false },
    { field: "volumen", headerName: "Volumen", type: "number", width: 90, editable: false },
    { field: "grupo", headerName: "Grupo", width: 70, editable: false },
    { field: "factor", headerName: "Factor", width: 70, editable: false },
    {
  field: "fecha_obtencion",
  headerName: "Fecha Obtención",
  width: 140,
},,
    { field: "componente", headerName: "Componente", width: 130 },
    {
      field: "accion",
      headerName: "",
      width: 220,
      editable: false,
      renderCell: (params) => (
        <>
          <Button
            onClick={() => handleOpenModal(params.id as number)}
            color="error"
            variant="contained"
            sx={{ mr: 1 }}
          >
            Desechar
          </Button>
          <Button
            onClick={() => handleLiberar(params.id as number)}
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
          color: "white",
        }}
      >
        Liberación de Componentes
      </Typography>
      <Container maxWidth={false}>
        <Box sx={{ marginTop: "20px", width: "90%", marginBlockEnd: 1, marginLeft: 7 }}>
          <DataGrid
            sx={{
              height: 500,
              "& .MuiDataGrid-columnHeaderTitle": {
                fontFamily: '"Open Sans"',
                fontWeight: 600,
              },
              "& .MuiDataGrid-cellContent": {
                fontFamily: '"Open Sans"',
                color: "#000",
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

      {/* Modal de desecho */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            borderRadius: 3,
            padding: 2,
            minWidth: 320,
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          },
        }}
        TransitionComponent={Slide}
        transitionDuration={400}
        keepMounted
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center" }}>
          <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
            <CheckCircleOutlineIcon sx={{ fontSize: 50, color: "error.main" }} />
            <Typography variant="h6" fontWeight="bold" color="error.main">
              ¿Desea desechar el componente?
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{ textAlign: "center" }}>
            <Accordion sx={{ mt: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Selecciona el motivo por el cual va a desechar el componente</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormControl component="fieldset">
                  <RadioGroup
                    value={motivoDesecho}
                    onChange={e => setMotivoDesecho(e.target.value)}
                  >
                    <FormControlLabel value="Lipemia" control={<Radio />} label="Lipemia" />
                    <FormControlLabel value="Hemolisis" control={<Radio />} label="Hemolisis" />
                    <FormControlLabel value="Bajo Volumen" control={<Radio />} label="Bajo Volumen" />
                    <FormControlLabel value="Sobre Volumen" control={<Radio />} label="Sobre Volumen" />
                    <FormControlLabel value="Venipunción" control={<Radio />} label="Venipunción" />
                    <FormControlLabel value="Return" control={<Radio />} label="Return" />
                    <FormControlLabel value="No tener muestra(los dos tubos del laboratorio)" control={<Radio />} label="No tener muestra(los dos tubos del laboratorio)" />
                  </RadioGroup>
                </FormControl>
              </AccordionDetails>
            </Accordion>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button onClick={handleCloseModal} variant="outlined">
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmDesechar}
            color="error"
            variant="contained"
            disabled={!motivoDesecho}
          >
            Desechar
          </Button>
        </DialogActions>
      </Dialog>

     {/* Modal Éxito Envío */}
<Dialog
  open={openSuccess}
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