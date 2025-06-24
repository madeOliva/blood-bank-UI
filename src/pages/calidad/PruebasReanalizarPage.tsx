import { useNavigate } from "react-router-dom";
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
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import axios from "axios";

export default function PruebasReanalizar() {
  const navigate = useNavigate();

  const [rows, setRows] = useState<any[]>([]);
  const [entidad, setEntidad] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  // Modal de desecho
  const [openModal, setOpenModal] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState<number | string | null>(null);
  const [motivoDesecho, setMotivoDesecho] = useState("");

  // Modal de enviar
  const [openEnviarModal, setOpenEnviarModal] = useState(false);
  const [selectedEnviarRowId, setSelectedEnviarRowId] = useState<number | string | null>(null);

  // Modal de revisada
  const [openRevisadaModal, setOpenRevisadaModal] = useState(false);
  const [selectedRevisadaRowId, setSelectedRevisadaRowId] = useState<number | string | null>(null);

  // Modal de éxito
  const [openSuccess, setOpenSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Cargar todos los datos desde el backend (sin filtro)
  useEffect(() => {
    axios.get('http://localhost:3000/registro-donacion/donaciones-diarias')
      .then(response => {
        setRows(
          response.data
           // ...dentro de cada .filter((item: any) => { ... })...
.filter((item: any) => {
  const estado = typeof item.estado === "string"
    ? item.estado.toLowerCase()
    : item.estado && item.estado.nombre
      ? item.estado.nombre.toLowerCase()
      : "";
  return estado === "analizada" || estado === "reanalizada";
})
            .map((item: any, idx: number) => ({
              id: item.id || item._id || idx,
              no: item.no ?? idx + 1,
              hc: item.hc ?? "",
              grupo: item.grupo ?? "",
              factor: item.factor ?? "",
              volumen: item.volumen ?? "",
              hiv: item.hiv ?? "",
              hbsag: item.hbsag ?? "",
              hcv: item.hcv ?? "",
              bdrl: item.bdrl ?? "",
              contratipaje: item.contratipaje ?? "",
              du: item.du ?? "",
            }))
        );
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Abrir modal de desecho
  const handleOpenModal = (id: number | string) => {
    setSelectedRowId(id);
    setOpenModal(true);
  };

  // Cerrar modal de desecho
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRowId(null);
    setMotivoDesecho("");
  };

  // Confirmar desecho
  const handleConfirmDesechar = async () => {
    if (!selectedRowId) return;
    try {
      await axios.put(`http://localhost:3000/registro-donacion/updatee/${selectedRowId}`, {
        motivo_desecho: motivoDesecho,
        estado: "desechada",
      });
      // Recarga los datos y filtra solo los de estado "analizada"
      const response = await axios.get('http://localhost:3000/registro-donacion/donaciones-diarias');
      setRows(
        response.data
          .filter((item: any) => {
            if (typeof item.estado === "string") {
              return item.estado.toLowerCase() === "analizada";
            }
            if (item.estado && item.estado.nombre) {
              return item.estado.nombre.toLowerCase() === "analizada";
            }
            return false;
          })
          .map((item: any, idx: number) => ({
            id: item.id || item._id || idx,
            no: item.no ?? idx + 1,
            hc: item.hc ?? "",
            grupo: item.grupo ?? "",
            factor: item.factor ?? "",
            volumen: item.volumen ?? "",
            hiv: item.hiv ?? "",
            hbsag: item.hbsag ?? "",
            hcv: item.hcv ?? "",
            bdrl: item.bdrl ?? "",
            contratipaje: item.contratipaje ?? "",
            du: item.du ?? "",
          }))
      );
      setSuccessMessage("La muestra fue desechada correctamente.");
      setOpenSuccess(true);
      setTimeout(() => setOpenSuccess(false), 3000);
    } catch (error) {
      alert("Error al desechar la muestra.");
    }
    setOpenModal(false);
    setSelectedRowId(null);
    setMotivoDesecho("");
  };

  // Abrir modal de enviar
  const handleOpenEnviarModal = (id: number | string) => {
    setSelectedEnviarRowId(id);
    setOpenEnviarModal(true);
  };

  // Cerrar modal de enviar
  const handleCloseEnviarModal = () => {
    setOpenEnviarModal(false);
    setSelectedEnviarRowId(null);
  };

  // Confirmar envío
  const handleConfirmEnviar = async () => {
    if (!selectedEnviarRowId) return;
    try {
      await axios.put(`http://localhost:3000/registro-donacion/updatee/${selectedEnviarRowId}`, {
        estado: "aceptada",
      });
      // Recarga los datos y filtra solo los de estado "analizada"
      const response = await axios.get('http://localhost:3000/registro-donacion/donaciones-diarias');
      setRows(
        response.data
          .filter((item: any) => {
            if (typeof item.estado === "string") {
              return item.estado.toLowerCase() === "analizada";
            }
            if (item.estado && item.estado.nombre) {
              return item.estado.nombre.toLowerCase() === "analizada";
            }
            return false;
          })
          .map((item: any, idx: number) => ({
            id: item.id || item._id || idx,
            no: item.no ?? idx + 1,
            hc: item.hc ?? "",
            grupo: item.grupo ?? "",
            factor: item.factor ?? "",
            volumen: item.volumen ?? "",
            hiv: item.hiv ?? "",
            hbsag: item.hbsag ?? "",
            hcv: item.hcv ?? "",
            bdrl: item.bdrl ?? "",
            contratipaje: item.contratipaje ?? "",
            du: item.du ?? "",
          }))
      );
      setSuccessMessage("La muestra fue enviada exitosamente.");
      setOpenSuccess(true);
      setTimeout(() => setOpenSuccess(false), 3000);
    } catch (error) {
      alert("Error al enviar la muestra.");
    }
    setOpenEnviarModal(false);
    setSelectedEnviarRowId(null);
  };

  // Modal y lógica para Revisada
  const handleOpenRevisadaModal = (id: number | string) => {
    setSelectedRevisadaRowId(id);
    setOpenRevisadaModal(true);
  };

  const handleCloseRevisadaModal = () => {
    setOpenRevisadaModal(false);
    setSelectedRevisadaRowId(null);
  };

  const handleConfirmRevisada = async () => {
    if (!selectedRevisadaRowId) return;
    try {
      await axios.put(`http://localhost:3000/registro-donacion/updatee/${selectedRevisadaRowId}`, {
        estado: "revisada",
      });
      const response = await axios.get('http://localhost:3000/registro-donacion/donaciones-diarias');
      setRows(
        response.data
          .filter((item: any) => {
            if (typeof item.estado === "string") {
              return item.estado.toLowerCase() === "analizada";
            }
            if (item.estado && item.estado.nombre) {
              return item.estado.nombre.toLowerCase() === "analizada";
            }
            return false;
          })
          .map((item: any, idx: number) => ({
            id: item.id || item._id || idx,
            no: item.no_consecutivo ?? idx + 1,
            hc: item.hc ?? "",
            grupo: item.grupo ?? "",
            factor: item.factor ?? "",
            volumen: item.volumen ?? "",
            hiv: item.hiv ?? "",
            hbsag: item.hbsag ?? "",
            hcv: item.hcv ?? "",
            bdrl: item.bdrl ?? "",
            contratipaje: item.contratipaje ?? "",
            du: item.du ?? "",
          }))
      );
      setSuccessMessage("La muestra fue marcada como revisada.");
      setOpenSuccess(true);
      setTimeout(() => setOpenSuccess(false), 3000);
    } catch (error) {
      alert("Error al marcar como revisada.");
    }
    setOpenRevisadaModal(false);
    setSelectedRevisadaRowId(null);
  };

  // Columnas con los botones y solo los datos solicitados
  const columns: GridColDef<any>[] = [
    { field: "no", headerName: "NO", width: 70 },
    { field: "hc", headerName: "Historia Clínica", width: 130 },
    { field: "grupo", headerName: "Grupo", width: 70 },
    { field: "factor", headerName: "Factor", width: 90 },
    { field: "volumen", headerName: "Volumen", width: 90 },
    { field: "hiv", headerName: "HIV", width: 90 },
    { field: "hbsag", headerName: "HBsAg", width: 90 },
    { field: "hcv", headerName: "HCV", width: 90 },
    { field: "bdrl", headerName: "BDRL", width: 90 },
    { field: "contratipaje", headerName: "Contratipaje", width: 120 },
    { field: "du", headerName: "DU", width: 90 },
    {
      field: "accion",
      headerName: "",
      width: 320,
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
            onClick={() => handleOpenEnviarModal(params.id)}
            color="success"
            variant="contained"
            sx={{ mr: 1 }}
          >
            Enviar
          </Button>
          <Button
            onClick={() => handleOpenRevisadaModal(params.id)}
            color="info"
            variant="contained"
          >
            Revisada
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
        sx={{
          fontSize: { xs: "2rem", md: "3rem" },
          backgroundColor: "primary.dark",
          color: "white",
          textAlign: "center",
          marginBlock: 5,
          mt: 8,
        }}
      >
        Muestras a Reanalizar
      </Typography>
      <Container maxWidth={false}>
        <Box sx={{ mb: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
          <DataGrid
            sx={{
              height: 450,
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

      {/* Modal de confirmación para Enviar */}
      <Dialog
        open={openEnviarModal}
        onClose={handleCloseEnviarModal}
      >
        <DialogTitle>Enviar muestra</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro que deseas enviar esta muestra?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEnviarModal} color="inherit">
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmEnviar}
            color="success"
            variant="contained"
          >
            Enviar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de confirmación para Revisada */}
      <Dialog
        open={openRevisadaModal}
        onClose={handleCloseRevisadaModal}
      >
        <DialogTitle>Marcar como revisada</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro que deseas marcar esta muestra como revisada?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRevisadaModal} color="inherit">
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmRevisada}
            color="info"
            variant="contained"
          >
            Revisada
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal Éxito */}
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