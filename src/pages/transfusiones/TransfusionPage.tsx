import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Navbar from "../../components/navbar/Navbar"
import { Button, Checkbox, Container, FormControl, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import React from "react";
import DataGridDemo from "../../components/DataGridStock";

const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: "id", headerName: "#", width: 70 },
  { field: "ci", headerName: "CI", width: 120 },
  { field: "Nombre", headerName: "Nombre", width: 120, editable: false, },
  { field: "PApellido", headerName: "Primer Apellido", width: 150, editable: false, },
  { field: "SApellido", headerName: "Segundo Apellido", width: 150, editable: false, },
  { field: "Sexo", headerName: "Sexo", width: 100, editable: false, },
  { field: "Edad", headerName: "Edad", type: "number", width: 100, editable: false, },
  { field: "peso", headerName: "Peso", type: "number", width: 100, editable: false, },
  { field: "talla", headerName: "Talla", type: "number", width: 100, editable: false, },
  { field: "Sala", headerName: "Sala", width: 100, editable: false, },
  { field: "Cama", headerName: "Cama", width: 100, editable: false, },
  { field: "grupo", headerName: "Grupo", width: 100, editable: false, },
  { field: "factor", headerName: "Factor", width: 100, editable: false, },
  { field: "NoHClinica", headerName: "No.HC", width: 120, editable: false, },
  { field: "lugar", headerName: "Lugar", width: 170, editable: false, },
];

const rows = [
  { id: 1, lastName: "Snow", blabla: "Jon", age: 14, phone: 444 },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </Box>
  );
}

export default function TransfusionPage() {

  const [opcionSeleccionada, setOpcionSeleccionada] = useState<string | null>(null);

  const handleChange = (opcion: string): void => {
    setOpcionSeleccionada(opcion === opcionSeleccionada ? null : opcion);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const [grupo, setGrupo] = React.useState('');
  const handleChange2 = (event: SelectChangeEvent) => {
    setGrupo(event.target.value as string);
  };

  const [factor, setFactor] = React.useState('');
  const handleChange3 = (event: SelectChangeEvent) => {
    setFactor(event.target.value as string);
  };

  const [tab, setTab] = useState<number>(0);
  const handleChange4 = (event: React.SyntheticEvent, newValue: number): void => {
    setTab(newValue);
  };

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
      <Typography
        variant="h4"
        component="h5"
        padding={1}
        mt={0}
        sx={{ width: "100%", fontSize: { xs: "1rem", md: "2rem" }, textAlign: "center", bgcolor: "white", color: "primary.dark" }}
      >
        Orden de Transfusión
      </Typography>
      <Box sx={{ marginTop: "5px", mb: "20px", width: "100%" }}>
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
      <Box sx={{ color: "primary.dark", pl: "10px", }}>
        <label style={{
          borderRadius: '12px', // Cambia el valor según tu preferencia
          border: '1px solid #ccc', // Opcional: para ver el borde
          padding: '15px'       // Opcional: para mejor apariencia
        }}>Confirmacion del Paciente:
          <label>
            <Checkbox
              name="opcion1"
              checked={opcionSeleccionada === "opcion1"}
              onChange={() => handleChange("opcion1")}
              color="primary" // Cambia a "primary", "secondary", etc.
            />
            Correcto
          </label>
          <label>
            <Checkbox
              name="opcion2"
              checked={opcionSeleccionada === "opcion2"}
              onChange={() => handleChange("opcion2")}
              color="primary" // Cambia a "primary", "secondary", etc.
            />
            Incorrecto
          </label>
        </label>
        <label style={{
          borderRadius: '12px', // Cambia el valor según tu preferencia
          border: '1px solid #ccc', // Opcional: para ver el borde
          padding: '15px',       // Opcional: para mejor apariencia
          marginLeft: '10px'
        }}>Consentimiento del Paciente:
          <Checkbox
            name="opcion3"
            checked={opcionSeleccionada === "opcion3"}
            onChange={() => handleChange("opcion3")}
            color="primary" />
        </label>
        <label style={{
          borderRadius: '12px', // Cambia el valor según tu preferencia
          border: '1px solid #ccc', // Opcional: para ver el borde
          padding: '15px',       // Opcional: para mejor apariencia
          marginLeft: '10px',
        }}>
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={handleOpen}
          >
            Resultados de Laboratorio
          </Button>
        </label>
        <label style={{
          borderRadius: '12px', // Cambia el valor según tu preferencia
          border: '1px solid #ccc', // Opcional: para ver el borde
          padding: '15px',       // Opcional: para mejor apariencia
          marginLeft: '10px'
        }}>
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={handleOpen2}
          >
            Seleccion de Componentes
          </Button>
        </label>
        <label style={{
          borderRadius: '12px', // Cambia el valor según tu preferencia
          border: '1px solid #ccc', // Opcional: para ver el borde
          padding: '15px',       // Opcional: para mejor apariencia
          marginLeft: '10px'
        }}>
          <Button
            variant="contained"
            size="small"
            color="error"
          >
            Finalizar
          </Button>
        </label>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Container sx={{
          width: "33%", height: "30%", display: 'revert',
          bgcolor: "white",
          padding: "16px",
        }}>
          <Typography
            padding={1}
            sx={{ width: "100%", fontSize: "20px", textAlign: "center", bgcolor: "primary.dark", color: "white" }}
          >
            Resultados de Laboratorio
          </Typography>
          <Box sx={{ marginTop: "20px", mb: "20px", width: "100%" }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Grupo</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={grupo}
                label="Grupo"
                onChange={handleChange2}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value={1}>A</MenuItem>
                <MenuItem value={2}>B</MenuItem>
                <MenuItem value={3}>AB</MenuItem>
                <MenuItem value={4}>O</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Factor</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={factor}
                label="factor"
                onChange={handleChange3}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value={1}>+</MenuItem>
                <MenuItem value={2}>-</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" size="small" color="primary" sx={{ m: 2.5 }}>
              Modificar
            </Button>
          </Box>
        </Container>
      </Modal>
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Container sx={{ marginTop: "65px" }}>
          <Box sx={{ width: "100%", bgcolor: "white", borderRadius: "10px" }}>
            <Tabs value={tab} onChange={handleChange4} aria-label="Tabs ejemplo">
              <Tab label="Neonato" />
              <Tab label="Materna" />
              <Tab label="Urgencia" />
              <Tab label="Servicio" />
            </Tabs>
            <TabPanel value={tab} index={0}>
              <Box sx={{ marginTop: "5px", mb: "20px", width: "100%" }}>
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
                  Stock de Neonato
                </Typography>
                <DataGridDemo/>
              </Box>
            </TabPanel>
            <TabPanel value={tab} index={1}>
              <Box sx={{ marginTop: "5px", mb: "20px", width: "100%" }}>
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
                  Stock de Materna
                </Typography>
                <DataGridDemo/>
              </Box>
            </TabPanel>
            <TabPanel value={tab} index={2}>
              <Box sx={{ marginTop: "5px", mb: "20px", width: "100%" }}>
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
                  Stock de Urgencia
                </Typography>
                <DataGridDemo/>
              </Box>
            </TabPanel>
            <TabPanel value={tab} index={3}>
              <Box sx={{ marginTop: "5px", mb: "20px", width: "100%" }}>
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
                  Stock de Servicio
                </Typography>
                <DataGridDemo/>
              </Box>
            </TabPanel>
          </Box>
        </Container>
      </Modal>
    </>
  );
}
