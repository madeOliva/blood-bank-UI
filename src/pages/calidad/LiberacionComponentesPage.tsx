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

export default function LiberacionComponentes() {
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
    alert(`Desechada la fila con ID: ${selectedRowId} por motivo: ${motivoDesecho}`);
    setOpenModal(false);
    setSelectedRowId(null);
    setMotivoDesecho("");
  };

  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "no", headerName: "NO", width: 90 },
    { field: "hc", headerName: "HC-donacion", width: 150, editable: false },
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
          sx={{ fontSize: { xs: "2rem", md: "3rem" },backgroundColor:"primary.dark", textAlign: "center", color:"white" }}
        >
          Liberación de Componentes
        </Typography>
      <Container>
        

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
          
            
          </Box>

          {/* ACORDEONES CON EL NUEVO DATAGRID */}
          {["Concentrado de Eritrocitos Pobres en Leucocitos(CEPL)", "Concentrados de Plaquetas(CP)"," Plasma Fresco Congelado(PFC)"," Crioprecipitado(Crio)"].map((nomb) => (
            <Accordion key={nomb} sx={{ mb: 2 , color:"primary.main"}}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontWeight: 600 }}>
                 {nomb}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
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
              </AccordionDetails>
            </Accordion>
          ))}
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
              <Typography>Selecciona el motivo de desecho</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl component="fieldset">
                <RadioGroup
                  value={motivoDesecho}
                  onChange={e => setMotivoDesecho(e.target.value)}
                >
                  <FormControlLabel value="Coloración inadecuada Verde" control={<Radio />} label="Coloración inadecuada Verde" />
                  <FormControlLabel value="Coloración inadecuada Naranja" control={<Radio />} label="Coloración inadecuada Naranja" />
                  <FormControlLabel value="Bajon Volumen" control={<Radio />} label="Bajon Volumen" />
                  <FormControlLabel value="Otro" control={<Radio />} label="Otro" />
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
          Liberar
        </BotonPersonalizado>
      </Box>
    </>
  );
}
