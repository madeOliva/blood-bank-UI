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
  IconButton,
  TextField,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import SearchIcon from "@mui/icons-material/Search";

export default function LiberacionComponentes() {
  const [rows, setRows] = useState<any[]>([]);
  const [filteredRows, setFilteredRows] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [motivoDesecho, setMotivoDesecho] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchComponente, setSearchComponente] = useState("");

 useEffect(() => {
  fetch("http://localhost:3000/componentes-obtenidos/componentes_obtenidos")
    .then((res) => res.json())
    .then((data) => {
      const newRows = Array.isArray(data)
        ? data
            .filter(
              (item: any) =>
                Array.isArray(item.componentes) &&
                item.componentes.some(
                  (comp: any) =>
                    typeof comp.estado_obtencion === "string" &&
                    comp.estado_obtencion.trim().toLowerCase() === "obtenido"
                )
            )
            .flatMap((item: any, idx: number) =>
              item.componentes
                .filter(
                  (comp: any) =>
                    typeof comp.estado_obtencion === "string" &&
                    comp.estado_obtencion.trim().toLowerCase() === "obtenido"
                )
                .map((comp: any, compIdx: number) => ({
                  id: comp._id || `${item._id}_${compIdx}`,
                  no: item.no_consecutivo ?? idx + 1,
                  hc: item.registro_donacion?.historiaClinica?.no_hc ?? "",
                  nombre: item.registro_donacion?.historiaClinica?.nombre ?? "",
                  sexo:
                    typeof item.registro_donacion?.historiaClinica?.sexo === "object"
                      ? item.registro_donacion?.historiaClinica?.sexo?.nombre ?? ""
                      : item.registro_donacion?.historiaClinica?.sexo ?? "",
                  edad: item.registro_donacion?.historiaClinica?.edad ?? "",
                  grupo:
                    typeof item.registro_donacion?.historiaClinica?.grupo_sanguine === "object"
                      ? item.registro_donacion?.historiaClinica?.grupo_sanguine?.nombre ?? ""
                      : item.registro_donacion?.historiaClinica?.grupo_sanguine ?? "",
                  factor:
                    typeof item.registro_donacion?.historiaClinica?.factor === "object"
                      ? item.registro_donacion?.historiaClinica?.factor?.signo ?? ""
                      : item.registro_donacion?.historiaClinica?.factor ?? "",
                  volumen: comp.volumen ?? "",
                  componente: comp.componente ?? comp.tipo ?? "",
                  fecha_obtencion: comp.fecha_obtencion ?? comp.fechaObtencion ?? "",
                  estado_obtencion: comp.estado_obtencion ?? "",
                  causa_baja: item.causa_baja ?? "",
                  entidad: item.registro_donacion?.nombre_unidad ?? "",
                }))
            )
        : [];
      setRows(newRows);
      setFilteredRows(newRows);
    })
    .catch(() => {
      setRows([]);
      setFilteredRows([]);
    });
}, []);
  const handleOpenModal = (id: string) => {
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
    await actualizarEstadoComponente(selectedRowId.toString(), "desechada", motivoDesecho);
    setRows((rows) => rows.filter((row) => row.id !== selectedRowId));
    setFilteredRows((filteredRows) =>
      filteredRows.filter((row) => row.id !== selectedRowId)
    );
    setOpenModal(false);
    setSelectedRowId(null);
    setMotivoDesecho("");
    setSuccessMessage("Componente desechado exitosamente.");
    setOpenSuccess(true);
    setTimeout(() => setOpenSuccess(false), 3000);
  } catch (e) {
    alert("Error al desechar el componente");
  }
};
const actualizarEstadoComponente = async (componenteId: string, nuevoEstado: string, causa_baja?: string) => {
  try {
    const body: any = { estado_obtencion: nuevoEstado };
    if (causa_baja) body.causa_baja = causa_baja;

    const response =await fetch(`http://localhost:3000/componentes-obtenidos/${componenteId}/estado`, {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ estado_obtencion: nuevoEstado, causa_baja }),
});

    if (!response.ok) {
      throw new Error("Error al actualizar el estado del componente");
    }

    setRows((rows) => rows.filter((row) => row.id !== componenteId));
    setFilteredRows((filteredRows) => filteredRows.filter((row) => row.id !== componenteId));

    setSuccessMessage("Estado actualizado exitosamente.");
    setOpenSuccess(true);
    setTimeout(() => setOpenSuccess(false), 3000);
  } catch (error: any) {
    alert(error.message || "Error al actualizar el estado del componente");
  }
};
 const handleLiberar = async (id: string) => {
  try {
    await actualizarEstadoComponente(id, "liberado");
    setRows((rows) => rows.filter((row) => row.id !== id));
    setFilteredRows((filteredRows) =>
      filteredRows.filter((row) => row.id !== id)
    );
    setSuccessMessage("Componente liberado exitosamente.");
    setOpenSuccess(true);
    setTimeout(() => setOpenSuccess(false), 3000);
  } catch (e) {
    alert("Error al liberar el componente");
  }
};

  // Buscador por componente
  const handleSearch = () => {
    setFilteredRows(
      rows.filter((row) =>
        row.componente?.toLowerCase().includes(searchComponente.toLowerCase())
      )
    );
    setSearchOpen(false);
  };

  const handleClearSearch = () => {
    setFilteredRows(rows);
    setSearchComponente("");
    setSearchOpen(false);
  };

  const columns: GridColDef[] = [
    { field: "no", headerName: "NO", width: 90 },
    { field: "hc", headerName: "HC-donacion", width: 150, editable: false },
    { field: "sexo", headerName: "Sexo", width: 70, editable: false },
    {
      field: "edad",
      headerName: "Edad",
      type: "number",
      width: 70,
      editable: false,
    },
    {
      field: "volumen",
      headerName: "Volumen",
      type: "number",
      width: 90,
      editable: false,
    },
    { field: "grupo", headerName: "Grupo", width: 70, editable: false },
    { field: "factor", headerName: "Factor", width: 70, editable: false },
    { field: "fecha_obtencion", headerName: "Fecha Obtención", width: 140 },
    { field: "componente", headerName: "Componente", width: 130 },
    {
      field: "accion",
      headerName: "",
      width: 220,
      editable: false,
      renderCell: (params) => (
        <>
        <Button
  onClick={() => handleOpenModal(params.id as string)}
  color="error"
  variant="contained"
  sx={{ mr: 1 }}
>
  Desechar
</Button>
          <Button
            onClick={() => handleLiberar(params.id as string)}
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
      <Box sx={{ position: "relative", width: "100%" }}>
        {/* Buscador en la esquina superior derecha */}
        <IconButton
          color="primary"
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            zIndex: 1,
            backgroundColor: "white",
            boxShadow: 2,
            "&:hover": { backgroundColor: "#f0f0f0" },
          }}
          onClick={() => setSearchOpen(true)}
        >
          <SearchIcon />
        </IconButton>
      </Box>

      <Dialog open={searchOpen} onClose={() => setSearchOpen(false)}>
        <DialogTitle>Buscar por componente</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Componente"
              value={searchComponente}
              onChange={(e) => setSearchComponente(e.target.value)}
              fullWidth
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              disabled={!searchComponente}
            >
              Buscar
            </Button>
            <Button variant="outlined" onClick={handleClearSearch}>
              Limpiar búsqueda
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>

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
        <Box
          sx={{
            marginTop: "20px",
            width: "90%",
            marginBlockEnd: 1,
            marginLeft: 7,
          }}
        >
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
            rows={filteredRows}
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
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={1}
          >
            <CheckCircleOutlineIcon
              sx={{ fontSize: 50, color: "error.main" }}
            />
            <Typography variant="h6" fontWeight="bold" color="error.main">
              ¿Desea desechar el componente?
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ textAlign: "center" }}
          >
            <Accordion sx={{ mt: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>
                  Selecciona el motivo por el cual va a desechar el componente
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormControl component="fieldset">
                  <RadioGroup
                    value={motivoDesecho}
                    onChange={(e) => setMotivoDesecho(e.target.value)}
                  >
                    <FormControlLabel
                      value="Lipemia"
                      control={<Radio />}
                      label="Lipémia"
                    />
                    <FormControlLabel
                      value="Hemolisis"
                      control={<Radio />}
                      label="Hemólisis"
                    />
                    <FormControlLabel
                      value="Bajo Volumen"
                      control={<Radio />}
                      label="Bajo Volumen"
                    />
                    <FormControlLabel
                      value="Sobre Volumen"
                      control={<Radio />}
                      label="Sobre Volumen"
                    />
                    <FormControlLabel
                      value="Venipunción"
                      control={<Radio />}
                      label="Venipunción"
                    />
                    <FormControlLabel
                      value="Rotura"
                      control={<Radio />}
                      label="Rotura"
                    />
                    <FormControlLabel
                      value="No tener muestra(los dos tubos del laboratorio)"
                      control={<Radio />}
                      label="No tener muestra(los dos tubos del laboratorio)"
                    />
                    <FormControlLabel
                      value="Coloracion Inadecuada Verde"
                      control={<Radio />}
                      label="Coloración Inadecuada Verde"
                    />
                    <FormControlLabel
                      value="Coloración Inadecuada Naranja"
                      control={<Radio />}
                      label="Coloración Inadecuada Naranja"
                    />
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
        <DialogTitle
          sx={{ textAlign: "center", pb: 0 }}
          id="success-dialog-title"
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={1}
          >
            <CheckCircleOutlineIcon
              sx={{ fontSize: 60, color: "success.main" }}
            />
            <Typography variant="h5" fontWeight="bold" color="success.main">
              ¡Éxito!
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography
            variant="body1"
            textAlign="center"
            sx={{ mt: 1, fontSize: "1.1rem" }}
          >
            {successMessage}
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
}
