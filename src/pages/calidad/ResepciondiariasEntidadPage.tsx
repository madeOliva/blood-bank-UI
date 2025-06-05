import { useNavigate } from "react-router-dom";
import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import BotonPersonalizado from "../../components/Button";
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
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// IMPORTS DEL CALENDARIO
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const rows = [
  { id: 1, sexo: "F", hc: "02022562246", edad: 14, volumen: 444, grupo: "A", factor: "+", no: "1" },
  { id: 2, sexo: "M", hc: "02022562246", edad: 31, volumen: 444, grupo: "A", factor: "+", no: "2" },
  { id: 3, sexo: "M", hc: "02022562246", edad: 31, volumen: 444, grupo: "A", factor: "+", no: "3" },
  { id: 4, sexo: "M", hc: "02022562246", edad: 31, volumen: 444, grupo: "A", factor: "+", no: "4" },
  { id: 5, sexo: "F", hc: "02022562246", edad: 11, volumen: 444, grupo: "A", factor: "+", no: "5" },
  { id: 6, hc: "02022562246", sexo: "F", edad: 23, volumen: 444, grupo: "A", factor: "+", no: "6" },
  { id: 7, hc: "02022562246", sexo: "F", edad: 150, volumen: 444, grupo: "A", factor: "+", no: "7" },
  { id: 8, hc: "02022562246", sexo: "M", edad: 44, volumen: 444, grupo: "A", factor: "+", no: "8" },
  { id: 9, hc: "02022562246", sexo: "M", edad: 36, volumen: 444, grupo: "A", factor: "+", no: "9" },
  { id: 10, hc: "02022562246", sexo: "F", edad: 65, volumen: 444, grupo: "A", factor: "+", no: "10" },
  { id: 11, hc: "02022562246", sexo: "F", edad: 65, volumen: 444, grupo: "A", factor: "+", no: "11" },
];

export default function RecepciondiariasEntidad() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/register", { replace: true }); // Redirige a la vista de Prechequeo
  };

  const [entidad, setEntidad] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(null);

  // Estado para el modal
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedRowId, setSelectedRowId] = React.useState<number | null>(null);

  // Estado para el acordeón (selección)
  const [motivoDesecho, setMotivoDesecho] = React.useState("");

  const handleChangeE = (event: SelectChangeEvent) => {
    setEntidad(event.target.value as string);
  };

  const handleOpenModal = (id: number) => {
    setSelectedRowId(id);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRowId(null);
    setMotivoDesecho("");
  };

  const handleConfirmDesechar = () => {
    // Aquí puedes poner la lógica para eliminar/desechar la fila
    alert(`Desechada la fila con ID: ${selectedRowId} por motivo: ${motivoDesecho}`);
    setOpenModal(false);
    setSelectedRowId(null);
    setMotivoDesecho("");
  };

  // Columnas con el botón que abre el modal
  const columns: GridColDef<(typeof rows)[number]>[] = [
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
      width: 150,
      editable: false,
      renderCell: (params) => (
       
        <Button
        onClick={() => handleOpenModal(params.id as number)}
        color="error"
        variant="contained"
        
      >
        Desechar
      </Button>
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
          sx={{ fontSize: { xs: "2rem", md: "3rem" },backgroundColor:"primary.dark", textAlign: "center", fontFamily:"sans-serif", color:"white"}}
        >
          Recepción de Donaciones por Entidades
        </Typography>
      <Container >
        

        <Box sx={{ marginTop: "20px", width: "90%", marginBlockEnd: 1, marginLeft: 7 }}>
          {/* Entidad a la izquierda, calendario a la derecha */}
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha"
                value={selectedDate}
                onChange ={setSelectedDate}
                slotProps={{ textField: { width: 200 } }}
              />
            </LocalizationProvider>
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
              //border: 1,
              //borderRadius: 2,
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
      </Container>

      {/* Modal de confirmación con Accordion */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
      >
        <DialogTitle>Confirmar acción</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro que deseas desechar la fila con ID: {selectedRowId}?
          </DialogContentText>
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
                  <FormControlLabel value="Return" control={<Radio />} label="Return"/>
                  <FormControlLabel value="No tener muestra(los dos tubos del laboratorio)" control={<Radio />} label="No tener muestra(los dos tubos del laboratorio)" />
                </RadioGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancelar</Button>
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

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BotonPersonalizado onClick={handleLogin} sx={{ width: 225, marginRight: 2 }}>
          ENVIAR
        </BotonPersonalizado>
      </Box>
    </>
  );
}
