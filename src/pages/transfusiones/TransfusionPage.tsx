import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridColumnVisibilityModel, GridRenderCellParams } from "@mui/x-data-grid";
import Navbar from "../../components/navbar/Navbar"
import { Button, Checkbox, Container, FormControl, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, Tab, Tabs, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
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
import ModalPersonalizado from "../../components/ModalPersonalizado";

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
  lugar: string;
  VolGlobulos: number;
  VolPlaquetas: number;
  resultado_laboratorio_grupo: string;
  resultado_laboratorio_factor: string;
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
  { field: "lugar", headerName: "Lugar de la Transfusion", width: 180, editable: false },
  { field: "VolGlobulos", headerName: "Volumen de Globulos Rojos", width: 210, editable: false },
  { field: "VolPlaquetas", headerName: "Volumen de Plaquetas", width: 200, editable: false },
  { field: "resultado_laboratorio_grupo", headerName: "Resultado Laboratorio Grupo", width: 120 },
  { field: "resultado_laboratorio_factor", headerName: "Resultado Laboratorio Factor", width: 120 },
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
  pruebaregrupo?: string;
  pruebaprefactor?: string;
  pruebaprehemolisis?: string;
  pruebaprecruzadamenor?: string;
  pruebaprecruzadamayor?: string;
}

// Componente para la columna "Acciones"
const AccionesCell = (params: GridRenderCellParams<ComponenteTransfundir> & {
  onOpenModal: (tipoComponente: string, codigoBolsa: string) => void;
  refreshRows: () => void;
  orden: RowData;
  correcto: boolean;
  consentimiento: boolean;
  rows2: RowData[]; // <-- agrégalo aquí
}) => {

  const [loading, setLoading] = useState(false);


  const [modalNotifOpen, setModalNotifOpen] = useState(false);
  const [notifType, setNotifType] = useState<'success' | 'error'>('success');
  const [notifTitle, setNotifTitle] = useState('');
  const [notifMessage, setNotifMessage] = useState('');
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [modalInfoOpen, setModalInfoOpen] = useState(false);

  const [open4, setOpen4] = useState(false);
  const handleOpen4 = () => {
    // Validar campos de pruebas pretransfusionales
    const {
      pruebaregrupo,
      pruebaprefactor,
      pruebaprehemolisis,
      pruebaprecruzadamenor,
      pruebaprecruzadamayor
    } = params.row;

    if (
      !pruebaregrupo ||
      !pruebaprefactor ||
      !pruebaprehemolisis ||
      !pruebaprecruzadamenor ||
      !pruebaprecruzadamayor
    ) {
      setModalInfoOpen(true);
      return;
    }
    // Validación para Globulos Rojos
    if (params.row.tipo_componente === 'Globulos Rojos') {
      if (
        pruebaregrupo !== params.row.grupo ||
        pruebaprefactor !== params.row.factor ||
        pruebaprehemolisis === 'Positiva' ||
        pruebaprecruzadamenor === 'Incompatible' ||
        pruebaprecruzadamayor === 'Incompatible'
      ) {
        setNotifType('error');
        setNotifTitle('Error');
        setNotifMessage('No se puede transfundir la bolsa por incompatibilidad');
        setModalNotifOpen(true);
        return;
      }
    } else {
      // Validación para otros componentes (sin pruebaprehemolisis)
      if (
        pruebaregrupo !== params.row.grupo ||
        pruebaprefactor !== params.row.factor ||
        pruebaprecruzadamenor === 'Incompatible' ||
        pruebaprecruzadamayor === 'Incompatible'
      ) {
        setNotifType('error');
        setNotifTitle('Error');
        setNotifMessage('No se puede transfundir la bolsa por incompatibilidad');
        setModalNotifOpen(true);
        return;
      }
    }

    // Validar campos vacíos (puedes mantener tu validación actual aquí si lo deseas)
    if (
      !pruebaregrupo ||
      !pruebaprefactor ||
      (params.row.tipo_componente === 'Globulos Rojos' && !pruebaprehemolisis) ||
      !pruebaprecruzadamenor ||
      !pruebaprecruzadamayor
    ) {
      setModalInfoOpen(true);
      return;
    }

    setOpen4(true);
    setOpen4(true);
  };
  const handleClose4 = () => setOpen4(false);

  const handleAceptar = async () => {
    setLoading(true);

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
      // CIERRA EL MODAL DE COMPONENTE A TRANSFUNDIR
      await new Promise(res => setTimeout(res, 200)); // 200 ms de espera

      setNotifType('success');
      setNotifTitle('Bolsa devuelta al stock');
      setNotifMessage('La bolsa fue devuelta correctamente al stock.');
      params.refreshRows(); // <-- Refresca los datos inmediatamente
      setModalNotifOpen(true);
    } catch (err: any) {
      setNotifType('error');
      setNotifTitle('Error');
      setNotifMessage(err.response?.data?.message || err.message || 'Error desconocido');
      setModalNotifOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate(); // Asegúrate de tener esto en el scope de AccionesCell o pásalo como prop

  const handleGuardarTransfusion = async () => {
    setLoading(true);

    try {
      // 1. POST a procesodetransfusion
      await axios.post('http://localhost:3000/procesodetransfusion', {
        ci: params.rows2[0]?.ci,
        no_orden: params.rows2[0]?.id_orden,
        confirmacion_paciente: params.correcto ? "Correcto" : "Incorrecto",
        consentimiento_paciente: params.consentimiento ? "Otorgado" : "No otorgado",
        resultado_lab_grupo: params.rows2[0]?.resultado_laboratorio_grupo,
        resultado_lab_factor: params.rows2[0]?.resultado_laboratorio_factor,
        tipo_componente_transfundido: params.row.tipo_componente,
        tipo_componenteHabitual_transfundido: params.row.tipo_componente_habitual,
        fecha_hora_transfusion: new Date().toISOString(),
      });

      // 2. DELETE a componentesatransfundir por codigo_bolsa
      await axios.delete(`http://localhost:3000/componentesatransfundir/${params.row.codigo_bolsa}`);

      // 3. DELETE a pruebaspretransfusionales según tipo_componente
      if (params.row.tipo_componente === "Globulos Rojos") {
        await axios.delete(`http://localhost:3000/pruebaspretransfusionalesgr/${params.row.codigo_bolsa}`);
      } else {
        await axios.delete(`http://localhost:3000/pruebaspretransfusionalespcp/${params.row.codigo_bolsa}`);
      }

      // 4. DELETE a resultadosdelaboratorio por id_orden
      await axios.delete(`http://localhost:3000/resultadosdelaboratorio/${params.rows2[0]?.id_orden}`);

      // 5. DELETE a transfusiones por id_orden
      await axios.delete(`http://localhost:3000/transfusiones/by-orden/${params.rows2[0]?.id_orden}`);

      // 6. Cierra el modal y navega a PageOne
      setNotifType('success');
      setNotifTitle('Transfusión Guardada');
      setNotifMessage('La transfusión se guardó correctamente.');
      setModalNotifOpen(true);
    } catch (err: any) {
      setNotifType('error');
      setNotifTitle('Error');
      setNotifMessage(err.response?.data?.message || err.message || 'Error desconocido');
      setModalNotifOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ModalPersonalizado
        open={modalNotifOpen}
        onClose={() => {
          setModalNotifOpen(false);
          params.refreshRows(); // <-- Llama a la función aquí
        }}
        title={notifTitle}
        message={notifMessage}
        type={notifType}
      />
      <ModalPersonalizado
        open={modalSuccessOpen}
        onClose={() => {
          setModalSuccessOpen(false);
          navigate('/pageone');
        }}
        title="Transfusión Guardada"
        message="La transfusión se guardó correctamente."
        type="success"
      />
      <ModalPersonalizado
        open={modalInfoOpen}
        onClose={() => setModalInfoOpen(false)}
        title="Atención"
        message="Realice las pruebas pre transfusionales"
        type="info"
      />
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
              value={params.rows2[0]?.ci || ""}
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="Numero de Orden"
              id="outlined-start-adornment"
              sx={{ m: 1, width: '25ch' }}
              value={params.rows2[0]?.id_orden || ""}
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="Consentimiento"
              id="outlined-start-adornment"
              sx={{ m: 1, width: '25ch' }}
              value={params.consentimiento ? "Otorgado" : "No otorgado"}
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="Confirmacion"
              id="outlined-start-adornment"
              sx={{ m: 1, width: '25ch' }}
              value={params.correcto ? "Correcto" : "Incorrecto"}
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="Resultado de Laboratorio Grupo"
              id="outlined-start-adornment"
              sx={{ m: 1, width: '25ch' }}
              value={params.rows2[0]?.resultado_laboratorio_grupo || ""}
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="Resultado de Laboratorio Factor"
              id="outlined-start-adornment"
              sx={{ m: 1, width: '25ch' }}
              value={params.rows2[0]?.resultado_laboratorio_factor || ""}
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="Componente"
              id="outlined-start-adornment"
              sx={{ m: 1, width: '25ch' }}
              value={params.row.tipo_componente || ""}
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="Componente Habitual"
              id="outlined-start-adornment"
              sx={{ m: 1, width: '25ch' }}
              value={params.row.tipo_componente_habitual || ""}
              InputProps={{ readOnly: true }}
            />
            <Button
              variant="contained"
              size="small"
              color="error"
              endIcon={<SendIcon />}
              sx={{ ml: 1 }}
              onClick={handleGuardarTransfusion}
              disabled={loading}
            >
              Guardar
            </Button>
          </Container>
        </Box>
      </Modal>
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

  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Obtén las transfusiones de la orden
      const transfusionesRes = await axios.get(`http://localhost:3000/transfusiones?id_orden=${id_orden}`);
      const transfusiones = transfusionesRes.data.filter((item: any) => item.id_orden === id_orden);

      // 2. Obtén los resultados de laboratorio de la orden (puede estar vacío)
      let resultados: any[] = [];
      try {
        const resultadosRes = await axios.get('http://localhost:3000/resultadosdelaboratorio');
        resultados = resultadosRes.data.filter((item: any) => item.id_orden === id_orden);
      } catch {
        resultados = [];
      }

      // 3. Combina ambos por ci
      const rowsWithAll = transfusiones.map((item: any, idx: number) => {
        const resultado = resultados.find((r: any) => r.ci === item.ci);
        return {
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
          lugar: item.lugar_transf,
          VolGlobulos: item.cant_gr || 0,
          VolPlaquetas: item.cant_cp || 0,
          resultado_laboratorio_grupo: resultado?.resultado_laboratorio_grupo || "",
          resultado_laboratorio_factor: resultado?.resultado_laboratorio_factor || "",
        };
      });

      setRows2(rowsWithAll);
    } catch (error) {
      setRows2([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
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
          type PruebasType = {
            pruebaregrupo?: string;
            pruebaprefactor?: string;
            pruebaprehemolisis?: string;
            pruebaprecruzadamenor?: string;
            pruebaprecruzadamayor?: string;
          };
          let pruebas: PruebasType = {};
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
          // Si no es Globulos Rojos, pruebaprehemolisis debe ser '-'
          return {
            id: index + 1,
            ...item,
            ...pruebas,
            pruebaprehemolisis: item.tipo_componente !== 'Globulos Rojos'
              ? '-'
              : (pruebas.pruebaprehemolisis ?? ''),
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
            orden={rows2[0]} // o la fila que corresponda
            correcto={correcto}
            consentimiento={consentimiento}
            rows2={rows2} // <-- AGREGA ESTA LÍNEA
          />
        );
      },
      sortable: false,
      filterable: false,
      editable: false,
    },
  ];

  const handleModificar = async () => {
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

    try {
      await axios.post('http://localhost:3000/resultadosdelaboratorio', dataToSend);
      await fetchData(); // <-- Recarga los datos después de modificar
    } catch (error) {
      console.error(error);
    }

    handleClose();
  };

  const navigate = useNavigate();

  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState<GridColumnVisibilityModel>({
    id: false, // oculta la columna id inicialmente
  });

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
            <Button sx={{ ml: 2 }} variant="contained" size="small" color="primary" onClick={() => {
              refreshRows(); // Recarga los datos
              handleOpen3(); // Abre el modal
            }}>
              Componente a Transfundir
            </Button>
          </>
        )}
        {mostrarBotonFinalizar && (
          <Button
            sx={{ ml: 2 }}
            variant="contained"
            size="small"
            color="error"
            onClick={async () => {
              try {
                await axios.delete(`http://localhost:3000/transfusiones/by-orden/${rows2[0]?.id_orden}`);
                // 4. DELETE a resultadosdelaboratorio por id_orden
                await axios.delete(`http://localhost:3000/resultadosdelaboratorio/${rows2[0]?.id_orden}`);
              } catch (error) {
                // Puedes mostrar una notificación de error si lo deseas
                console.error(error);
              }
              navigate('/pageone');
            }}
          >
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
              onClick={async () => {
                await handleModificar();
                fetchData(); // <-- Recarga los datos
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
              Componente a Transfundir
            </Typography>
            <>
              {rows.length > 0 && (
                <Box sx={{ height: 400, width: '100%' }}>
                  <DataGrid
                    rows={rows}
                    columns={columns2}
                    loading={loading}
                    pageSizeOptions={[1]}
                    initialState={{ pagination: { paginationModel: { pageSize: 1 } } }}
                    disableRowSelectionOnClick
                  />
                </Box>
              )}

              {modalType === 'GR' && (
                <ModalPruebasPreTransfusionalesGr open={modalOpen} onClose={handleCloseModal} codigoBolsa={codigoBolsa} refreshRows={refreshRows} />
              )}
              {modalType === 'PCP' && (
                <ModalPruebasPreTransfusionalesPCP open={modalOpen} onClose={handleCloseModal} codigoBolsa={codigoBolsa} refreshRows={refreshRows} />
              )}
            </>
          </Container>
        </Box>
      </Modal>
    </>
  );
}

