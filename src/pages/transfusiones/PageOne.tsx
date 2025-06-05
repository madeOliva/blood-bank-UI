import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar"
import { Button, Container, Modal, Typography } from "@mui/material";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useState } from "react";

const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: "id", headerName: "#", width: 90 },
  { field: "NoOrden", headerName: "No.Orden", width: 120 },
  {
    field: "FechaHora",
    headerName: "Fecha/Hora",
    type: "number",
    width: 120,
    editable: false,
  },
  {
    field: "Urgente",
    headerName: "Urgente",
    width: 120,
    editable: false,
  },
  {
    field: "Reserva",
    headerName: "Reserva",
    width: 120,
    editable: false,
  },
  {
    field: "NoHClinica",
    headerName: "No.HC",
    width: 120,
    editable: false,
  },
  {
    field: "Nombre",
    headerName: "Nombre",
    width: 120,
    editable: false,
  },
  {
    field: "PApellido",
    headerName: "Primer Apellido",
    width: 150,
    editable: false,
  },
  {
    field: "SApellido",
    headerName: "Segundo Apellido",
    width: 140,
    editable: false,
  },
  {
    field: "Sala",
    headerName: "Sala",
    width: 100,
    editable: false,
  },
  {
    field: "Cama",
    headerName: "Cama",
    width: 100,
    editable: false,
  },
  {
    field: "Sexo",
    headerName: "Sexo",
    width: 100,
    editable: false,
  },
  {
    field: "Edad",
    headerName: "Edad",
    width: 100,
    editable: false,
  },
  {
    field: "Estado",
    headerName: "Estado",
    width: 110,
    editable: false,
  },
  {
    field: "FHAceptada",
    headerName: "Fecha/Hora Aceptada",
    width: 110,
    editable: false,
  },
  {
    field: "VolumenPlanificado",
    headerName: "Volumen Planificado",
    width: 170,
    editable: false,
  },
  {
    field: "VolumenAdmin",
    headerName: "Volumen Administrado",
    width: 180,
    editable: false,
  },
  {
    field: "Acciones",
    headerName: "Acciones",
    width: 190,
    renderCell: (params) => {
      const navigate = useNavigate();
      const [open, setOpen] = useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);
      const columns: GridColDef<(typeof rows)[number]>[] = [
        { field: "id", headerName: "ID", width: 90 },
        { field: "NoOrden", headerName: "No.Orden", width: 120 },
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
            Historia
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <Container sx={{
              width: "60%", height: "60%", display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Box sx={{ marginTop: "20px", mb: "20px", width: "100%", height: "45%" }}>
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
              </Box>
            </Container>
          </Modal>
          <Button
            variant="outlined"
            size="small"
            color="error"
            endIcon={<WaterDropIcon sx={{ ml: -1 }} />}
            onClick={() => navigate('/transfusionpage')}
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

const rows = [
  { id: 1, lastName: "Snow", blabla: "Jon", age: 14, phone: 444 },
  { id: 2, lastName: "Lannister", blabla: "Cersei", age: 31, phone: 444 },
  { id: 3, lastName: "Lannister", blabla: "Jaime", age: 31, phone: 444 },
  { id: 4, lastName: "Stark", blabla: "Arya", age: 11, phone: 444 },
  {
    id: 5,
    blabla: "Targaryen",
    firstName: "Daenerys",
    age: null,
    phone: 444,
  },
  { id: 6, blabla: "Melisandre", firstName: null, age: 150, phone: 444 },
  { id: 7, blabla: "Clifford", firstName: "Ferrara", age: 44, phone: 444 },
  { id: 8, blabla: "Frances", firstName: "Rossini", age: 36, phone: 444 },
  { id: 9, blabla: "Roxie", firstName: "Harvey", age: 65, phone: 444 },
  { id: 10, blabla: "Roxie", firstName: "Harvey", age: 65, phone: 444 },
];

export default function PageOne() {
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