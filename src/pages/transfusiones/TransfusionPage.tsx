import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridColumnVisibilityModel, GridRenderCellParams } from "@mui/x-data-grid";
import Navbar from "../../components/navbar/Navbar"
import { Alert, Button, Checkbox, Container, FormControl, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, Snackbar, Tab, Tabs, TextField, Typography } from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import React from "react";
import DataGridNeonato from "../../components/DataGridStockNeonato";
import EditSquareIcon from '@mui/icons-material/EditSquare';
import { useNavigate } from "react-router-dom";
import DataGridMaterna from "../../components/DataGridStockMaterna";
import DataGridUrgencia from "../../components/DataGridStockUrgencia";
import DataGridServicio from "../../components/DataGridStockServicio";
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ModalPruebasPreTransfusionalesGr, ModalPruebasPreTransfusionalesPCP } from "../../components/ModalPruebasPreTGR";
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentIcon from "@mui/icons-material/Assignment";

interface RowData {
  id: number;
  id_orden: string;
  ci: string;
  Nombre: string;
  PApellido: string;
  SApellido: string;
  Sexo: string;
  Edad: number;
  peso: number;
  talla: number;
  Sala: string;
  Cama: string;
  grupo: string;
  factor: string;
  NoHClinica: string;
  lugar: string;
  VolGlobulos: number;
  VolPlaquetas: number;
}

const columns: GridColDef<RowData>[] = [
  { field: "id", headerName: "#", width: 70 },
  { field: "id_orden", headerName: "No.Orden", width: 120 },
  { field: "ci", headerName: "CI", width: 120 },
  { field: "Nombre", headerName: "Nombre", width: 120, editable: false },
  { field: "PApellido", headerName: "Primer Apellido", width: 150, editable: false },
  { field: "SApellido", headerName: "Segundo Apellido", width: 150, editable: false },
  { field: "Sexo", headerName: "Sexo", width: 100, editable: false },
  { field: "Edad", headerName: "Edad", type: "number", width: 100, editable: false },
  { field: "peso", headerName: "Peso", type: "number", width: 100, editable: false },
  { field: "talla", headerName: "Talla", type: "number", width: 100, editable: false },
  { field: "Sala", headerName: "Sala", width: 100, editable: false },
  { field: "Cama", headerName: "Cama", width: 100, editable: false },
  { field: "grupo", headerName: "Grupo", width: 100, editable: false },
  { field: "factor", headerName: "Factor", width: 100, editable: false },
  { field: "NoHClinica", headerName: "No.Historia Clinica", width: 170, editable: false },
  { field: "lugar", headerName: "Lugar de la Transfusion", width: 180, editable: false },
  { field: "VolGlobulos", headerName: "Volumen de Globulos Rojos", width: 210, editable: false },
  { field: "VolPlaquetas", headerName: "Volumen de Plaquetas", width: 200, editable: false },
];

interface ComponenteTransfundir {
  codigo_bolsa: string;
  tipo_paciente: string;
  tipo_componente: string;
  tipo_componente_habitual: string;
  fecha_extraccion: Date | string;
  fecha_vencimiento: Date | string;
  grupo: string;
  factor: string;
  volumen_inicial: number;
  volumen_final: number;
  estado: string;
}

// Componente para la columna "Acciones"
const AccionesCell = (params: GridRenderCellParams<ComponenteTransfundir> & {
  onOpenModal: (tipoComponente: string, codigoBolsa: string) => void;
  refreshRows: () => void;
  orden: RowData;
  correcto: boolean;
  consentimiento: boolean;
}) => {

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [open4, setOpen4] = useState(false);
  const handleOpen4 = () => setOpen4(true);
  const handleClose4 = () => setOpen4(false);

  const handleSnackbarClose = () => setSnackbarOpen(false);

  const handleAceptar = async () => {
    setLoading(true);
    setError(null);

    const dataToSend: ComponenteTransfundir = {
      codigo_bolsa: params.row.codigo_bolsa,
      tipo_paciente: params.row.tipo_paciente,
      tipo_componente: params.row.tipo_componente,
      tipo_componente_habitual: params.row.tipo_componente_habitual,
      fecha_extraccion: params.row.fecha_extraccion,
      fecha_vencimiento: params.row.fecha_vencimiento,
      grupo: params.row.grupo,
      factor: params.row.factor,
      volumen_inicial: params.row.volumen_inicial,
      volumen_final: params.row.volumen_final,
      estado: params.row.estado,
    };

    try {
      await axios.post('http://localhost:3000/stockdelbancodelhas', dataToSend);
      // Eliminar el registro original del stock
      await axios.delete(
        `http://localhost:3000/componentesatransfundir/${params.row.codigo_bolsa}`
      );
      // Eliminar pruebas pretransfusionales según el tipo de componente
      if (params.row.tipo_componente === 'Globulos Rojos') {
        await axios.delete(
          `http://localhost:3000/pruebaspretransfusionalesgr/${params.row.codigo_bolsa}`
        );
      } else {
        await axios.delete(
          `http://localhost:3000/pruebaspretransfusionalespcp/${params.row.codigo_bolsa}`
        );
      }
      setSuccess(true);
      setSnackbarOpen(true);
      params.refreshRows();
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Error desconocido');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const alertContent: ReactElement | undefined = success && !error ? (
    <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
      Datos enviados correctamente
    </Alert>
  ) : error ? (
    <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
      {error}
    </Alert>
  ) : undefined;

  return (
    <>
      <Button
        variant="contained"
        size="small"
        endIcon={<DeleteIcon />}
        onClick={handleAceptar}
        disabled={loading}
      >
        {loading ? 'Enviando...' : 'Devolver al Stock'}
      </Button>
      <Button
        variant="contained"
        size="small"
        endIcon={<AssignmentIcon />}
        sx={{ ml: 1 }}
        onClick={() => params.onOpenModal(params.row.tipo_componente, params.row.codigo_bolsa)}
        disabled={loading}
      >
        Pruebas Pre Transfusionales
      </Button>
      <Button
        variant="contained"
        size="small"
        color="error"
        endIcon={<SendIcon />}
        sx={{ ml: 1 }}
        onClick={handleOpen4}
        disabled={loading}
      >
        Transfundir
      </Button>
      <Modal
        open={open4}
        onClose={handleClose4}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box>
          <Container sx={{ p: 3, background: "white" }}>
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
              Guardar Transfusion
            </Typography>

            <TextField
              label="Carnet de Identidad"
              id="outlined-start-adornment"
              sx={{ m: 1, width: '25ch' }}
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="Numero de Orden"
              id="outlined-start-adornment"
              sx={{ m: 1, width: '25ch' }}
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="Consentimiento"
              id="outlined-start-adornment"
              sx={{ m: 1, width: '25ch' }}
            />
            <TextField
              label="Confirmacion"
              id="outlined-start-adornment"
              sx={{ m: 1, width: '25ch' }}
            />
            <TextField
              label="Resultado de Laboratorio Grupo"
              id="outlined-start-adornment"
              sx={{ m: 1, width: '25ch' }}
            />
            <TextField
              label="Resultado de Laboratorio Factor"
              id="outlined-start-adornment"
              sx={{ m: 1, width: '25ch' }}
            />
            <TextField
              label="Componente"
              id="outlined-start-adornment"
              sx={{ m: 1, width: '25ch' }}
            />
            <TextField
              label="Componente Habitual"
              id="outlined-start-adornment"
              sx={{ m: 1, width: '25ch' }}
            />
            <TextField
              label="Fecha y Hora"
              id="outlined-start-adornment"
              sx={{ m: 1, width: '25ch' }}
            />
          </Container>
        </Box>
      </Modal>
      <Snackbar
        open={snackbarOpen && alertContent !== undefined}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        {alertContent}
      </Snackbar>
    </>
  );
};

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

  const [rows2, setRows2] = useState<RowData[]>([]);
  const [rows, setRows] = useState<RowData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:3000/transfusiones?id_orden=${id_orden}`)
      .then(res => {
        const filtered = res.data.filter((item: any) => item.id_orden === id_orden);
        setRows2(filtered.map((item: any, idx: number) => ({
          id: idx + 1,
          id_orden: item.id_orden,
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
          VolGlobulos: item.cant_gr || 0,
          VolPlaquetas: item.cant_cp || 0,
        })));
      });
  }, [id_orden]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'GR' | 'PCP' | ''>('');
  const [codigoBolsa, setCodigoBolsa] = useState('');

  const fetchPruebasPreTransfusionales = async (tipo_componente: string, codigo_bolsa: string) => {
    let url = '';
    if (tipo_componente === 'Globulos Rojos') {
      url = `http://localhost:3000/pruebaspretransfusionalesgr/${codigo_bolsa}`;
    } else {
      url = `http://localhost:3000/pruebaspretransfusionalespcp/${codigo_bolsa}`;
    }
    const response = await axios.get(url);
    return response.data;
  };

  const refreshRows = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/componentesatransfundir');
      const baseRows = response.data;

      // Obtener datos de pruebas pretransfusionales para cada fila
      const rowsWithPruebas = await Promise.all(
        baseRows.map(async (item: any, index: number) => {
          let pruebas = {};
          try {
            pruebas = await fetchPruebasPreTransfusionales(item.tipo_componente, item.codigo_bolsa);
          } catch (e) {
            pruebas = {
              pruebaregrupo: '',
              pruebaprefactor: '',
              pruebaprehemolisis: '',
              pruebaprecruzadamenor: '',
              pruebaprecruzadamayor: ''
            };
          }
          return {
            id: index + 1,
            ...item,
            ...pruebas
          };
        })
      );
      setRows(rowsWithPruebas);
    } catch (error) {
      // Manejo de error
    }
    setLoading(false);
  };

  useEffect(() => {
    refreshRows();
  }, []);

  const handleOpenModal = (tipoComponente: string, codigoBolsa: string) => {
    if (tipoComponente === 'Globulos Rojos') {
      setModalType('GR');
    } else {
      setModalType('PCP');
    }
    setCodigoBolsa(codigoBolsa);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalType('');
    setCodigoBolsa('');
  };

  const columns2: GridColDef[] = [
    { field: 'id', headerName: 'Id', width: 90 }, // id incremental
    { field: 'codigo_bolsa', headerName: 'Código de Bolsa', width: 150 },
    { field: 'tipo_paciente', headerName: 'Tipo Paciente', width: 150 },
    { field: 'tipo_componente', headerName: 'Tipo Componente', width: 180 },
    { field: 'tipo_componente_habitual', headerName: 'Tipo Componente Habitual', width: 200 },
    { field: 'fecha_extraccion', headerName: 'Fecha de Extracción', width: 180, },
    { field: 'fecha_vencimiento', headerName: 'Fecha de Vencimiento', width: 180, },
    { field: 'grupo', headerName: 'Grupo', width: 100 },
    { field: 'factor', headerName: 'Factor', width: 100 },
    { field: 'volumen_inicial', headerName: 'Volumen Inicial', width: 150, type: 'number' },
    { field: 'volumen_final', headerName: 'Volumen Final', width: 150, type: 'number' },
    { field: 'estado', headerName: 'Estado', width: 130 },
    { field: 'pruebaregrupo', headerName: 'PPT de Grupo', width: 130 },
    { field: 'pruebaprefactor', headerName: 'PPT de Factor', width: 130 },
    { field: 'pruebaprehemolisis', headerName: 'PPT de Hemolisis', width: 150 },
    { field: 'pruebaprecruzadamenor', headerName: 'PPT de Cruzada Menor', width: 170 },
    { field: 'pruebaprecruzadamayor', headerName: 'PPT de Cruzada Mayor', width: 170 },
    {
      field: "Acciones",
      headerName: "Acciones",
      width: 530,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <AccionesCell
            {...params}
            onOpenModal={handleOpenModal}
            refreshRows={refreshRows}
            orden={rows2[0]} // Pasa la orden actual
            correcto={correcto}
            consentimiento={consentimiento}
          />
        );
      },
      sortable: false,
      filterable: false,
      editable: false,
    },
  ];

  /*interface RowData {
    id: number;
    ci: string;
    Nombre: string;
    PApellido: string;
    SApellido: string;
    Sexo: string;
    Edad: number;
    peso: number;
    talla: number;
    Sala: string;
    Cama: string;
    grupo: string;
    factor: string;
    NoHClinica: string;
    lugar: string;
    resulLabGrupo: string;
    resulLabFactor: string;
  }*/

  const handleModificar = () => {
    const fila = rows2[0]; // O la fila seleccionada

    if (!fila || !fila.ci || !fila.id_orden) {
      alert("Faltan datos de paciente u orden.");
      return;
    }

    const dataToSend = {
      id_orden: fila.id_orden,
      ci: fila.ci,
      resultado_laboratorio_grupo: grupo,
      resultado_laboratorio_factor: factor,
    };

    console.log("Enviando a resultadosdelaboratorio:", dataToSend);

    axios.post('http://localhost:3000/resultadosdelaboratorio', dataToSend)
      .then(() => {
        // Éxito
      })
      .catch((error) => {
        console.error(error);
      });

    handleClose();
  };

  const navigate = useNavigate();

  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState<GridColumnVisibilityModel>({
    id: false, // oculta la columna id inicialmente
  });

  /*const [correcto, setCorrecto] = useState(() => {
    const guardado = localStorage.getItem('checkbox_correcto');
    try {
      return guardado !== null && guardado !== "undefined" ? JSON.parse(guardado) : false;
    } catch {
      return false;
    }
  });
  const [incorrecto, setIncorrecto] = useState(() => {
    const guardado = localStorage.getItem('checkbox_incorrecto');
    try {
      return guardado !== null && guardado !== "undefined" ? JSON.parse(guardado) : false;
    } catch {
      return false;
    }
  });
  const [consentimiento, setConsentimiento] = useState(() => {
    const guardado = localStorage.getItem('checkbox_consentimiento');
    try {
      return guardado !== null && guardado !== "undefined" ? JSON.parse(guardado) : false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem('checkbox_correcto', JSON.stringify(correcto));
  }, [correcto]);

  useEffect(() => {
    localStorage.setItem('checkbox_incorrecto', JSON.stringify(incorrecto));
  }, [incorrecto]);

  useEffect(() => {
    localStorage.setItem('checkbox_consentimiento', JSON.stringify(consentimiento));
  }, [consentimiento]);

  useEffect(() => {
    const correctoGuardado = localStorage.getItem('checkbox_correcto');
    const incorrectoGuardado = localStorage.getItem('checkbox_incorrecto');
    const consentimientoGuardado = localStorage.getItem('checkbox_consentimiento');
    if (correctoGuardado !== null) setCorrecto(JSON.parse(correctoGuardado));
    if (incorrectoGuardado !== null) setIncorrecto(JSON.parse(incorrectoGuardado));
    if (consentimientoGuardado !== null) setConsentimiento(JSON.parse(consentimientoGuardado));
  }, []);*/

  const [correcto, setCorrecto] = useState<boolean>(false);
  const [incorrecto, setIncorrecto] = useState<boolean>(false);
  const [consentimiento, setConsentimiento] = useState<boolean>(false);

  // Condiciones para mostrar botones
  const mostrarBotonesLaboratorioYComponentes = correcto && consentimiento && !incorrecto;
  const mostrarBotonFinalizar = incorrecto;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const [open3, setOpen3] = useState(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);

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

  // 1. Estado para saber si hay datos
  //const [hayComponentes, setHayComponentes] = useState(false);

  // 2. Función para consultar la API
  /*const verificarComponentes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/componentesatransfundir');
      setHayComponentes(Array.isArray(response.data) && response.data.length > 0);
    } catch {
      setHayComponentes(false);
    }
  };

  // 3. Llama a la función cuando sea necesario (por ejemplo, al montar el componente o después de insertar datos)
  useEffect(() => {
    verificarComponentes();
  }, []);*/

  //const [botonesHabilitados, setBotonesHabilitados] = useState(false);

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
          rows={rows2}
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
      <Box sx={{ color: "primary.dark" }}>
        <label style={{ border: '1px solid #ccc', padding: '10px' }}>
          Confirmacion del Paciente:
          <label>
            <Checkbox
              checked={correcto}
              onChange={e => {
                setCorrecto(e.target.checked);
                if (e.target.checked) {
                  setIncorrecto(false);
                }
              }}
              color="primary"
            />
            Correcto
          </label>
          <label>
            <Checkbox
              checked={incorrecto}
              onChange={e => {
                setIncorrecto(e.target.checked);
                if (e.target.checked) {
                  setCorrecto(false);
                  setConsentimiento(false);
                }
              }}
              color="primary"
            />
            Incorrecto
          </label>
        </label>
        <label style={{ border: '1px solid #ccc', padding: '10px', marginLeft: 1 }}>
          Consentimiento del Paciente:
          <Checkbox
            checked={consentimiento}
            onChange={e => {
              setConsentimiento(e.target.checked);
              if (e.target.checked) {
                setIncorrecto(false);
              }
            }}
            color="primary"
          />
        </label>
        {mostrarBotonesLaboratorioYComponentes && (
          <>
            <Button sx={{ ml: 2 }} variant="contained" size="small" color="primary" onClick={handleOpen}>
              Resultados de Laboratorio
            </Button>
            <Button sx={{ ml: 2 }} variant="contained" size="small" color="primary" onClick={handleOpen2}>
              Seleccion de Componentes
            </Button>
            <Button sx={{ ml: 2 }} variant="contained" size="small" color="primary" onClick={handleOpen3}>
              Componentes a Transfundir
            </Button>
          </>
        )}
        {mostrarBotonFinalizar && (
          <Button sx={{ ml: 2 }} variant="contained" size="small" color="error" onClick={() => navigate('/pageone')}>
            Finalizar
          </Button>
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
                <MenuItem value={"A"}>A</MenuItem>
                <MenuItem value={"B"}>B</MenuItem>
                <MenuItem value={"AB"}>AB</MenuItem>
                <MenuItem value={"O"}>O</MenuItem>
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
                <MenuItem value={"+"}>+</MenuItem>
                <MenuItem value={"-"}>-</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              size="small"
              color="primary"
              sx={{ mt: "20px", ml: "10px", }}
              endIcon={<EditSquareIcon sx={{ marginLeft: 0, fontSize: "large" }} />}
              onClick={() => {
                handleModificar();
                //setBotonesHabilitados(true); // Habilita los botones
              }}
            >
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
            <Box sx={{ position: "relative", minHeight: 40, ml: 30 }}>
              <Button
                variant="contained"
                size="small"
                color='error'
                sx={{ position: "absolute", bottom: 16, right: 16 }}
                onClick={handleClose2}
                endIcon={<DisabledByDefaultRoundedIcon sx={{ marginLeft: 0, fontSize: "large" }} />}
              >
                Cerrar
              </Button>
            </Box>
          </Box>
        </Container>
      </Modal>
      <Modal
        open={open3}
        onClose={handleClose3}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{ mt: "20px" }}>
          <Container sx={{ p: 3, background: "white" }}>
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
              Componentes a Transfundir
            </Typography>
            <>
              <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                  rows={rows}
                  columns={columns2}
                  loading={loading}
                  pageSizeOptions={[5]}
                  initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
                  disableRowSelectionOnClick
                />
              </Box>

              {modalType === 'GR' && (
                <ModalPruebasPreTransfusionalesGr open={modalOpen} onClose={handleCloseModal} codigoBolsa={codigoBolsa} />
              )}
              {modalType === 'PCP' && (
                <ModalPruebasPreTransfusionalesPCP open={modalOpen} onClose={handleCloseModal} codigoBolsa={codigoBolsa} />
              )}
            </>
          </Container>
        </Box>
      </Modal>
    </>
  );
}

