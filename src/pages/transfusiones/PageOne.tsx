import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar"
import { Button, Checkbox, Container, Modal, TextField, Typography } from "@mui/material";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useState } from "react";
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import SendIcon from '@mui/icons-material/Send';
import { useEffect } from "react";
import axios from "axios";

type RowData = {
  id: number;
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
  Estado: string;
  FHAceptada: string;
  VolumenPlanificado: string;
};

const columns: GridColDef<RowData>[] = [
  { field: "id", headerName: "#", width: 90 },
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
  { field: "Estado", headerName: "Estado", width: 110, editable: false, },
  { field: "FHAceptada", headerName: "Fecha/Hora Aceptada", width: 170, editable: false, },
  { field: "VolumenPlanificado", headerName: "Volumen Planificado", width: 170, editable: false, },
  {
    field: "Acciones", headerName: "Acciones", width: 380,
    renderCell: (params) => {
      const navigate = useNavigate();
      const [open, setOpen] = useState(false);
      const [open2, setOpen2] = useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);
      const handleOpen2 = () => setOpen2(true);
      const handleClose2 = () => setOpen2(false);
      const columns: GridColDef<(typeof rows)[number]>[] = [
        { field: "id", headerName: "ID", width: 90 },
        { field: "NoHClinica", headerName: "No.HC", width: 120, editable: false, },
        { field: "NoHCi", headerName: "No.CI", width: 120, editable: false, },
        { field: "Nombre", headerName: "Nombre", width: 120, editable: false, },
        { field: "PApellido", headerName: "Primer Apellido", width: 150, editable: false, },
        { field: "SApellido", headerName: "Segundo Apellido", width: 140, editable: false, },
        { field: "GrupoS", headerName: "Grupo Sanguineo", width: 140, editable: false, },
        { field: "ColorPiel", headerName: "Color de Piel", width: 140, editable: false, },
        { field: "Sexo", headerName: "Sexo", width: 100, editable: false, },
        { field: "Edad", headerName: "Edad", width: 100, editable: false, },
        { field: "EstadoCivil", headerName: "Estado Civil", width: 100, editable: false, },
        { field: "HorasDiariasTrabajo", headerName: "Horas Diarias de Trabajo", width: 100, editable: false, },
        { field: "HorasDiariasRecreacion", headerName: "Horas Diarias de Recreacion", width: 100, editable: false, },
        { field: "ocupacion", headerName: "Ocupacion", width: 100, editable: false, },
        { field: "EstiloVida", headerName: "Estilo de Vida", width: 100, editable: false, },
        { field: "CtgaOcupacional", headerName: "Categoria Ocupacional", width: 100, editable: false, },
        { field: "alimentacion", headerName: "Alimentacion", width: 100, editable: false, },
      ];
      const rows = [
        { id: 1234, NoOrden: 45678 },
      ];
      return (
        <>
          <Button
            variant="contained"
            size="small"
            endIcon={<AssignmentIcon sx={{ marginLeft: -1 }} />}
            sx={{ mr: 1 }}
            onClick={handleOpen}
          >
            Historia Clinica
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <Container sx={{
              width: "80%", height: "49%", display: 'flex',
              background: "white",
              mt: "65px",
              p: "0px",
            }}>
              <Box sx={{ marginTop: "20px", mb: "20px", width: "100%", height: "60%" }}>
                <Typography
                  padding={1}
                  sx={{
                    width: "100%",
                    fontSize: "20px",
                    textAlign: "center",
                    bgcolor: "primary.dark",
                    color: "white",
                  }}
                >
                  Historia Clínica
                </Typography>
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
                        pageSize: 1,
                      },
                    },
                  }}
                  pageSizeOptions={[1]}
                  checkboxSelection
                  disableRowSelectionOnClick
                />
                <Button
                  variant="contained"
                  size="small"
                  color='error'
                  endIcon={<DisabledByDefaultRoundedIcon sx={{ marginLeft: -1 }} />}
                  sx={{ mt: "10px" }}
                  onClick={handleClose}
                >
                  Cerrar
                </Button>
              </Box>
            </Container>
          </Modal>
          <Button
            variant="contained"
            size="small"
            endIcon={<AssignmentLateIcon sx={{ ml: -1 }} />}
            sx={{ mr: 1 }}
            onClick={handleOpen2}
          >
            Observaciones
          </Button>
          <Modal
            open={open2}
            onClose={handleClose2}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <Container sx={{
              width: "80%", height: "52%", display: 'flex',
              background: "white",
              mt: "65px",
              p: "0px",
            }}>
              <Box sx={{ marginTop: "20px", mb: "20px", width: "100%", height: "60%"}}>
                <Typography
                  padding={1}
                  sx={{
                    width: "100%",
                    fontSize: "20px",
                    textAlign: "center",
                    bgcolor: "primary.dark",
                    color: "white",
                  }}
                >
                  Observacion
                </Typography>
                <Box sx={{ mt: "10px", width: "100%" }}>
                  <TextField multiline minRows={7} maxRows={7} fullWidth id="outlined-basic" label="Observacion" variant="outlined" />
                </Box>
                <Button
                  variant="contained"
                  size="small"
                  endIcon={<SendIcon sx={{ marginLeft: -1 }} />}
                  sx={{ mt: "10px" }}
                  onClick={handleClose2}
                >
                  Enviar
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color='error'
                  endIcon={<DisabledByDefaultRoundedIcon sx={{ marginLeft: -1 }} />}
                  sx={{ mt: "10px", ml:"10px"}}
                  onClick={handleClose2}
                >
                  Cancelar
                </Button>
              </Box>
            </Container>
          </Modal>
          <Button
            variant="contained"
            size="small"
            color="error"
            endIcon={<WaterDropIcon sx={{ ml: -1 }} />}
            onClick={() => navigate('/transfusionpage', { state: { id_orden: params.row.NoOrden } })}
          >
            Enviar
          </Button>
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
          Estado: "Pendiente", // Ajusta según tu backend
          FHAceptada: "",      // Ajusta según tu backend
          VolumenPlanificado: "" // Ajusta según tu backend
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
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
}