import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Navbar from "../../components/navbar/Navbar";
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
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


export default function RecepciondiariasEntidad() {
  const [entidad, setEntidad] = useState("");
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState<string | number | null>(null);
  const [motivoDesecho, setMotivoDesecho] = useState("");

  const [openDeleteSuccess, setOpenDeleteSuccess] = useState(false);

  const [openSuccess, setOpenSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [openWarning, setOpenWarning] = useState(false);

  useEffect(() => {
  setLoading(true);
  fetch("http://localhost:3000/registro-donacion/donaciones-diarias")
    .then(res => res.json())
    .then(data => {
      setRows(
        Array.isArray(data)
          ? data
              .filter(row => !!row && (
                (typeof row.estado === "string" && row.estado.trim().toLowerCase() === "procesando") ||
                (row.estado && row.estado.nombre && row.estado.nombre.trim().toLowerCase() === "procesando")
              ))
              .map((row: any, idx: number) => ({
                ...row,
                id:
                  typeof row.id === "string" ? row.id
                  : typeof row._id === "string" ? row._id
                  : (row._id && typeof row._id === "object" && row._id.$oid) ? row._id.$oid
                  : String(idx),
                no: row.no ?? idx + 1,
                hc: row.hc ?? "",
                sexo: row.sexo ?? "",
                edad: row.edad ?? "",
                volumen: row.volumen ?? "",
                grupo: row.grupo ?? "",
                factor: row.factor ?? "",
                estado: row.estado ?? "",
              }))
          : []
      );
    })
    .catch(() => setRows([]))
    .finally(() => setLoading(false));
}, []);

  const handleChangeE = (event: SelectChangeEvent) => {
    setEntidad(event.target.value as string);
  };

  const handleOpenModal = (id: number | string | undefined) => {
    if (typeof id === "number" || typeof id === "string") {
      setSelectedRowId(id?.toString());
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRowId(null);
    setMotivoDesecho("");
  };

  const handleConfirmDesechar = async () => {
    if (!selectedRowId) return;
    try {
      const res = await fetch(`http://localhost:3000/registro-donacion/updatee/${selectedRowId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          motivo_desecho: motivoDesecho,
          estado: "desechada",
        }),
      });

      if (res.ok) {
        fetch("http://localhost:3000/registro-donacion/donaciones-diarias")
          .then(res => res.json())
          .then(data => {
            setRows(
              Array.isArray(data)
                ? data
                    .filter(row => !!row)
                    .map((row: any, idx: number) => ({
                      ...row,
                      id:
                        typeof row.id === "string" ? row.id
                        : typeof row._id === "string" ? row._id
                        : (row._id && typeof row._id === "object" && row._id.$oid) ? row._id.$oid
                        : String(idx),
                      no: row.no ?? idx + 1,
                      hc: row.hc ?? "",
                      sexo: row.sexo ?? "",
                      edad: row.edad ?? "",
                      volumen: row.volumen ?? "",
                      grupo: row.grupo ?? "",
                      factor: row.factor ?? "",
                      estado: row.estado ?? "",
                    }))
                : []
            );
          });
        setOpenDeleteSuccess(true);
        setTimeout(() => setOpenDeleteSuccess(false), 1500);
      } else {
        alert("Error al desechar la donación.");
      }
    } catch (error) {
      alert("Error de conexión con el backend.");
      console.error(error);
    }
    setSelectedRowId(null);
    setMotivoDesecho("");
    setOpenModal(false);
  };

  // FUNCIÓN PARA ENVIAR INDIVIDUAL Y OCULTAR LAS ACEPTADAS
  const handleEnviarIndividual = async (id: string | number) => {
    try {
      await fetch(`http://localhost:3000/registro-donacion/updatee/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          estado: "aceptada",
        }),
      });

      // Recarga los datos para actualizar la vista
      fetch("http://localhost:3000/registro-donacion/donaciones-diarias")
        .then(res => res.json())
        .then(data => {
          setRows(
            Array.isArray(data)
              ? data
                  .filter(row => !!row)
                  .map((row: any, idx: number) => ({
                    ...row,
                    id:
                      typeof row.id === "string" ? row.id
                      : typeof row._id === "string" ? row._id
                      : (row._id && typeof row._id === "object" && row._id.$oid) ? row._id.$oid
                      : String(idx),
                    no: row.no ?? idx + 1,
                    hc: row.hc ?? "",
                    sexo: row.sexo ?? "",
                    edad: row.edad ?? "",
                    volumen: row.volumen ?? "",
                    grupo: row.grupo ?? "",
                    factor: row.factor ?? "",
                    estado: row.estado ?? "",
                  }))
              : []
          );
        });

      setSuccessMessage("¡Donación enviada correctamente!");
      setOpenSuccess(true);
      setTimeout(() => setOpenSuccess(false), 2000);
    } catch (error) {
      setSuccessMessage("Error al enviar donación.");
      setOpenWarning(true);
      setTimeout(() => setOpenWarning(false), 2000);
    }
  };

  const columns: GridColDef<any>[] = [
    { field: "no", headerName: "NO", width: 90 },
    { field: "hc", headerName: "HC-donación", width: 150, editable: false },
    { field: "sexo", headerName: "Sexo", width: 70, editable: false },
    { field: "edad", headerName: "Edad", type: "number", width: 70, editable: false },
    { field: "volumen", headerName: "Volumen", type: "number", width: 90, editable: false },
    { field: "grupo", headerName: "Grupo", width: 70, editable: false },
    { field: "factor", headerName: "Factor", width: 70, editable: false },
    {
      field: "accion",
      headerName: "",
      width: 250,
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
            Enviar
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
        Recepción de Donaciones por Entidades
      </Typography>
      <Container >
        <Box sx={{ marginTop: "20px", width: "90%", marginBlockEnd: 1, marginLeft: 7 }}>
          <Box
            sx={{
              display: "flex",
              mb: 2,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <FormControl sx={{ minWidth: 220 }}>
              <InputLabel id="demo-simple-select-label">Entidad</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={entidad}
                label="Entidad"
                onChange={handleChangeE}
              >
                <MenuItem value={10}></MenuItem>
                <MenuItem value={20}>01-Sandino</MenuItem>
                <MenuItem value={30}>02-Mantua</MenuItem>
                <MenuItem value={40}>03-Las Minas</MenuItem>
                <MenuItem value={50}>04- Vinales</MenuItem>
                <MenuItem value={60}>05-La Palma</MenuItem>
                <MenuItem value={70}>09-Los Palacios</MenuItem>
                <MenuItem value={80}>10-Consolacion</MenuItem>
                <MenuItem value={90}>11-Movil de Pinar del Rio</MenuItem>
                <MenuItem value={100}>12-San Luis</MenuItem>
                <MenuItem value={110}>13-San Juan</MenuItem>
                <MenuItem value={120}>14-Guane</MenuItem>
                <MenuItem value={130}>15-Abel Santamaria</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <DataGrid
            sx={{
              height: 400,
              "& .MuiDataGrid-columnHeaderTitle": {
                fontFamily: '"Open Sans"',
                fontWeight: 600,
              },
              "& .MuiDataGrid-cellContent": {
                fontFamily: '"Open Sans"',
                color: "#000",
              },
            }}
            rows={rows.filter(row => row.estado !== "desechada" && row.estado !== "aceptada")}
            columns={columns}
            loading={loading}
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
              ¿Desea desechar la donacion?
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
                <Typography>Selecciona el motivo por el cual va a desechar la bolsa</Typography>
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

      {/* Modal Éxito Desecho */}
      <Dialog
        open={openDeleteSuccess}
        aria-labelledby="delete-success-dialog-title"
        PaperProps={{
          sx: {
            borderRadius: 3,
            padding: 3,
            minWidth: 320,
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          },
        }}
      >
        <DialogTitle sx={{ textAlign: "center", pb: 0 }} id="delete-success-dialog-title">
          <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
            <CheckCircleOutlineIcon sx={{ fontSize: 60, color: "success.main" }} />
            <Typography variant="h5" fontWeight="bold" color="success.main">
              ¡Éxito!
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" textAlign="center" sx={{ mt: 1, fontSize: "1.1rem" }}>
            Registro desechado correctamente
          </Typography>
        </DialogContent>
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

      {/* Modal Advertencia de selección */}
      <Dialog
        open={openWarning}
        aria-labelledby="warning-dialog-title"
        PaperProps={{
          sx: {
            borderRadius: 3,
            padding: 3,
            minWidth: 320,
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          },
        }}
      >
        <DialogTitle sx={{ textAlign: "center", pb: 0 }} id="warning-dialog-title">
          <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
            <CheckCircleOutlineIcon sx={{ fontSize: 60, color: "warning.main" }} />
            <Typography variant="h5" fontWeight="bold" color="warning.main">
              Atención
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" textAlign="center" sx={{ mt: 1, fontSize: "1.1rem" }}>
            Debe seleccionar al menos una bolsa.
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
}