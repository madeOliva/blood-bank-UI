import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridColumnVisibilityModel } from "@mui/x-data-grid";
import Navbar from "../../components/navbar/Navbar"
import { Button, Checkbox, Container, FormControl, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import React from "react";
import DataGridNeonato from "../../components/DataGridStockNeonato";
import CheckIcon from '@mui/icons-material/Check';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import { useNavigate } from "react-router-dom";
import DataGridMaterna from "../../components/DataGridStockMaterna";
import DataGridUrgencia from "../../components/DataGridStockUrgencia";
import DataGridServicio from "../../components/DataGridStockServicio";
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import { useLocation } from "react-router-dom";
import axios from "axios";
import DataGridComponentesTransfundidos from "../../components/DataGridComponentesTransfundidos";

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
  const location = useLocation();
  const id_orden = location.state?.id_orden;
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/transfusiones")
      .then(res => {
        const filtered = res.data.filter((item: any) => item.id_orden === id_orden);
        setRows(filtered.map((item: any, idx: number) => ({
          id: idx + 1,
          ci: item.ci,
          Nombre: item.nombre,
          PApellido: item.primerApellido,
          SApellido: item.segundoApellido,
          Sexo: item.sexo,
          Edad: item.edad,
          peso: item.peso,
          talla: item.talla,
          Sala: item.sala,
          Cama: item.cama,
          grupo: item.grupo,
          factor: item.factor,
          NoHClinica: item.NoHClinica,
          lugar: item.lugar_transf,
        })));
      });
  }, [id_orden]);

  const navigate = useNavigate();

  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState<GridColumnVisibilityModel>({
    id: false, // oculta la columna id inicialmente
  });

  const [correcto, setCorrecto] = useState(false);
  const [incorrecto, setIncorrecto] = useState(false);
  const [consentimiento, setConsentimiento] = useState(false);

  const handleCorrecto = () => {
    setCorrecto(!correcto);
    if (incorrecto) setIncorrecto(false);
  };

  const handleConsentimiento = () => {
    setConsentimiento(!consentimiento);
    if (incorrecto) setIncorrecto(false);
  };

  const handleIncorrecto = () => {
    const nuevoValor = !incorrecto;
    setIncorrecto(nuevoValor);
    if (nuevoValor) {
      setCorrecto(false);
      setConsentimiento(false);
    }
  };

  // Condiciones para mostrar botones
  const mostrarBotonesLaboratorioYComponentes = correcto && consentimiento && !incorrecto;
  const mostrarBotonFinalizar = incorrecto;

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
  const handleChange4 = (_: React.SyntheticEvent, newValue: number): void => {
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
          disableRowSelectionOnClick
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
        />
      </Box>
      <Box sx={{ color: "primary.dark", pl: "10px", }}>
        <label style={{ borderRadius: '12px', border: '1px solid #ccc', padding: '15px' }}>
          Confirmacion del Paciente:
          <label>
            <Checkbox
              checked={correcto}
              onChange={handleCorrecto}
              color="primary"
            />
            Correcto
          </label>
          <label>
            <Checkbox
              checked={incorrecto}
              onChange={handleIncorrecto}
              color="primary"
            />
            Incorrecto
          </label>
        </label>
        <label style={{ borderRadius: '12px', border: '1px solid #ccc', padding: '15px', marginLeft: '10px' }}>
          Consentimiento del Paciente:
          <Checkbox
            checked={consentimiento}
            onChange={handleConsentimiento}
            color="primary"
          />
        </label>
        {mostrarBotonesLaboratorioYComponentes && (
          <>
            <label style={{ borderRadius: '12px', border: '1px solid #ccc', padding: '15px', marginLeft: '10px' }}>
              <Button variant="contained" size="small" color="primary" onClick={handleOpen}>
                Resultados de Laboratorio
              </Button>
            </label>
            <label style={{ borderRadius: '12px', border: '1px solid #ccc', padding: '15px', marginLeft: '10px' }}>
              <Button variant="contained" size="small" color="primary" onClick={handleOpen2}>
                Seleccion de Componentes
              </Button>
            </label>
          </>
        )}
        {mostrarBotonFinalizar && (
          <label style={{ borderRadius: '12px', border: '1px solid #ccc', padding: '15px', marginLeft: '10px' }}>
            <Button variant="contained" size="small" color="error" onClick={() => navigate('/transfusiones')}>
              Finalizar
            </Button>
          </label>
        )}
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Container sx={{
          width: "39%",
          height: "30%",
          display: 'flex',
          bgcolor: "white",
          mt: "65px"
        }}>
          <Box sx={{ marginTop: "20px", mb: "20px", width: "100%" }}>
            <Typography
              padding={1}
              sx={{
                width: "100%",
                fontSize: "20px",
                textAlign: "center",
                bgcolor: "primary.dark",
                color: "white"
              }}
            >
              Resultados de Laboratorio
            </Typography>
            <FormControl sx={{ mt: "10px", minWidth: 120 }}>
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
            <FormControl sx={{ mt: "10px", ml: "10px", minWidth: 120 }}>
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
            <Button
              variant="contained"
              size="small"
              color="primary"
              sx={{ mt: "20px", ml: "10px", }}
              endIcon={<EditSquareIcon sx={{ marginLeft: 0, fontSize: "large" }} />}>
              Modificar
            </Button>
            <Button
              variant="contained"
              size="small"
              color='error'
              sx={{ mt: "20px", ml: "10px", }}
              onClick={handleClose}
              endIcon={<DisabledByDefaultRoundedIcon sx={{ marginLeft: 0, fontSize: "large" }} />}
            >
              Cancelar
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
        <Container sx={{
          display: 'flex',
          background: "white",
          mt: "65px",
          borderRadius: "10px",
        }}>
          <Box sx={{ width: "100%", bgcolor: "white", borderRadius: "10px" }}>
            <Tabs value={tab} onChange={handleChange4} aria-label="Tabs ejemplo">
              <Tab label="Neonato" />
              <Tab label="Materna" />
              <Tab label="Urgencia" />
              <Tab label="Servicio" />
            </Tabs>
            <TabPanel value={tab} index={0}>
              <Box sx={{ marginTop: "5px", width: "100%" }}>
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

                <DataGridNeonato />

              </Box>
            </TabPanel>
            <TabPanel value={tab} index={1}>
              <Box sx={{ marginTop: "5px", width: "100%" }}>
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
                <DataGridMaterna />
              </Box>
            </TabPanel>
            <TabPanel value={tab} index={2}>
              <Box sx={{ marginTop: "5px", width: "100%" }}>
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
                <DataGridUrgencia />
              </Box>
            </TabPanel>
            <TabPanel value={tab} index={3}>
              <Box sx={{ marginTop: "5px", width: "100%" }}>
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
                <DataGridServicio />
              </Box>
            </TabPanel>
            <Button
              variant="contained"
              size="small"
              sx={{ mb: "12px" }}
              endIcon={<CheckIcon sx={{ marginLeft: 0 }} />}
            >
              Aceptar
            </Button>
            <Button
              variant="contained"
              size="small"
              color='error'
              sx={{ mb: "12px", ml: "10px" }}
              onClick={handleClose2}
              endIcon={<DisabledByDefaultRoundedIcon sx={{ marginLeft: 0, fontSize: "large" }} />}
            >
              Cancelar
            </Button>
          </Box>
        </Container>
      </Modal>
      <Box sx={{ mt: "20px" }}>
        <Container><Typography
          padding={1}
          sx={{
            width: "100%",
            fontSize: "20px",
            textAlign: "center",
            bgcolor: "primary.dark",
            color: "white",
          }}
        >
          Componentes a Transfundir
        </Typography>
          <DataGridComponentesTransfundidos />
        </Container>
      </Box>
    </>
  );
}

