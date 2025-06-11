import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, MenuItem, Select, TextField, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Grid, Paper, Modal } from '@mui/material';
import Navbar from '../../components/navbar/Navbar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import axios from 'axios';
import BotonPersonalizado from '../../components/Button';
import { useParams } from 'react-router-dom';

// Estilos para modales
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  textAlign: 'center',
};

const successModalStyle = {
  ...modalStyle,
  borderTop: '4px solid #13b09e',
};

const errorModalStyle = {
  ...modalStyle,
  borderTop: '4px solid #b0170c',
};

// Datos iniciales vacíos para la historia clínica
const emptyHistoryData = {
  generalData: {
    ci: '',
    nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    edad: '',
    sexo: '',
    color_piel: '',
    no_hc: '',
    estado_civil: '',
    municipio: '',
    consejo_popular: '',
    no_consultorio: '',
    ocupacion: '',
    cat_ocupacional: '',
    telefono: '',
    centro_laboral: '',
    telefonoLaboral: '',
    otra_localizacion: '',
    grupo_sanguine: '',
    factor: '',
    estilo_vida: '',
    alimentacion: '',
    genero_vida: '',
    donante: '',
  },
  AntecedentesPersonales: [],
  apf: [],
  alergias: [],
  habitos: [],
  estanciaExtranjero: [],
  donacionesPrevias: [],
  transfusionesPrevias: [],
};

type HabitoToxico = {
  habito: string;
  intensidad: string;
};
type EstanciaExtranjero = {
  fecha: string;
  pais: string;
  estadia: string;
  motivo: string;
};

// Componente para los encabezados de sección con estilo
function SectionHeader({ title }) {
  return (
    <Box
      sx={{
        backgroundColor: '#009688',
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        py: 1,
        mb: 1,
        borderRadius: 1,
      }}
    >
      {title}
    </Box>
  );
}

export default function NuevaHistoriaClinica() {
  const [historyData, setHistoryData] = useState(emptyHistoryData);
  const { id } = useParams();
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/historia-clinica/${id}`);
        setHistoryData(prev => ({
          ...prev,
          generalData: {
            ...prev.generalData,
            nombre: res.data.nombre || "",
            primer_apellido: res.data.primer_apellido || "",
            segundo_apellido: res.data.segundo_apellido || "",
          }
        }));
      } catch (error) {
        setErrorMessage('Error al cargar los datos del paciente');
        setOpenErrorModal(true);
      }
    };
    if (id) fetchPaciente();
  }, [id]);

  // Función para verificar campos vacíos en datos generales
  const hasEmptyGeneralFields = () => {
    const gd = historyData.generalData;
    return (
      gd.ci.trim() === '' ||
      gd.nombre.trim() === '' ||
      gd.primer_apellido.trim() === '' ||
      gd.segundo_apellido.trim() === '' ||
      gd.edad.trim() === '' ||
      gd.sexo.trim() === '' ||
      gd.color_piel.trim() === '' ||
      gd.estado_civil.trim() === '' ||
      gd.consejo_popular.trim() === '' ||
      gd.no_consultorio.trim() === '' ||
      gd.ocupacion.trim() === '' ||
      gd.telefono.trim() === '' ||
      gd.municipio.trim() === '' ||
      gd.centro_laboral.trim() === '' ||
      gd.telefonoLaboral.trim() === '' ||
      gd.grupo_sanguine.trim() === '' ||
      gd.factor.trim() === '' ||
      gd.cat_ocupacional.trim() === '' ||
      gd.estilo_vida.trim() === '' ||
      gd.alimentacion.trim() === '' ||
      gd.genero_vida.trim() === '' ||
      gd.donante.trim() === ''
    );
  };

  // Función para validar filas incompletas en tablas
  const hasEmptyTableRows = () => {
    const tables = [
      { rows: historyData.AntecedentesPersonales, requiredFields: ['antecedente', 'año'] },
      { rows: historyData.apf, requiredFields: ['antecedente', 'parentesco'] },
      { rows: historyData.alergias, requiredFields: ['alergia'] },
      { rows: historyData.habitos, requiredFields: ['habito', 'intensidad'] },
      { rows: historyData.estanciaExtranjero, requiredFields: ['fecha', 'pais', 'estadia', 'motivo'] },
      { rows: historyData.donacionesPrevias, requiredFields: ['fecha', 'lugar', 'reaccion', 'motivo'] },
      { rows: historyData.transfusionesPrevias, requiredFields: ['fecha', 'lugar', 'diagnostico', 'reaccion', 'observaciones'] },
    ];

    return tables.some(({ rows, requiredFields }) =>
      rows.some(row =>
        requiredFields.some(field => {
          const value = row[field];
          if (value === null || value === undefined) return true;
          if (typeof value === 'string' && value.trim() === '') return true;
          return false;
        })
      )
    );
  };

  // Función para validar tablas vacías
  const hasEmptyTables = () => {
    const requiredTables = {
      AntecedentesPersonales: "Antecedentes Patológicos Personales (APP)",
      apf: "Antecedentes Patológicos Familiares (APF)",
      alergias: "Alergias",
      habitos: "Hábitos Tóxicos",
      estanciaExtranjero: "Estancia en el Extranjero",
      donacionesPrevias: "Donaciones Previas",
      transfusionesPrevias: "Transfusiones Previas"
    };

    return Object.entries(requiredTables).filter(([key, name]) => {
      return !Array.isArray(historyData[key]) || historyData[key].length === 0;
    }).map(([key, name]) => name);
  };

  // Función principal de validación
  const validateForm = () => {
    const errors = [];

    if (hasEmptyGeneralFields()) {
      errors.push("Existen campos vacíos en los Datos Generales");
    }

    const emptyTables = hasEmptyTables();
    if (emptyTables.length > 0) {
      errors.push(`Debe agregar al menos un registro en: ${emptyTables.join(', ')}`);
    }

    return errors;
  };

  // Función para guardar los hábitos tóxicos directamente
  const guardarHabitosToxicos = async (habitos: HabitoToxico[]) => {
    try {
      const cleanHabitos = habitos.map(({ id, ...rest }) => rest);
      if (cleanHabitos.length > 0) {
        await axios.post('http://localhost:3000/habitos-toxicos', cleanHabitos);
      }
    } catch (error) {
      setErrorMessage('Error al guardar los hábitos tóxicos');
      setOpenErrorModal(true);
      console.error(error);
    }
  };

  //Funcion para guardar la estancia en el extranjero
  const guardarEstanciasExtranjero = async (estancias: EstanciaExtranjero[]) => {
    try {
      const cleanEstancias = estancias.map(({ id, ...rest }) => rest);
      if (cleanEstancias.length > 0) {
        await axios.post('http://localhost:3000/estancia-extranjero', cleanEstancias);
      }
    } catch (error) {
      setErrorMessage('Error al guardar las estancias en el extranjero');
      setOpenErrorModal(true);
      console.error(error);
    }
  };

  // Función para guardar con validación y mostrar modales
  const handleGuardar = async () => {
    const errors = validateForm();
    if (errors.length > 0) {
      setErrorMessage(errors.join('\n'));
      setOpenErrorModal(true);
    } else {
      try {
        // Solo envía los datos que corresponden al esquema del backend
        const cleanHistoryData = {
          ...historyData.generalData,
          alergias: historyData.alergias.map(a => a.alergia),
          antecedentesPersonales: historyData.AntecedentesPersonales.map(a => a.antecedente),
          // Si tu backend espera apf como string[], agrega aquí: apf: historyData.apf.map(a => a.antecedente)
        };

        await guardarHabitosToxicos(historyData.habitos);
        await guardarEstanciasExtranjero(historyData.estanciaExtranjero);
        await axios.put(`http://localhost:3000/historia-clinica/${id}`, cleanHistoryData);
        setOpenSuccessModal(true);
        console.log('Historia clínica guardada:', cleanHistoryData);
      } catch (error) {
        setErrorMessage('Error al guardar la historia clínica');
        setOpenErrorModal(true);
        console.error('Error al guardar:', error.response?.data || error.message || error);
      }
    }
  };


  useEffect(() => {
    const fetchTransfusiones = async () => {
      try {
        const response = await axios.get('http://localhost:3000/transfusiones');
        setHistoryData(prev => ({
          ...prev,
          transfusionesPrevias: response.data.map((item: any, idx: number) => ({
            id: item.id ?? idx + 1,
            fecha: item.fecha ?? '',
            lugar: item.lugar ?? '',
            diagnostico: item.diagnostico ?? '',
            reaccion: item.reaccion ?? '',
            observaciones: item.observaciones ?? ''
          }))
        }));
      } catch (error) {
        setErrorMessage('Error al cargar las transfusiones previas');
        setOpenErrorModal(true);
      }
    };

    fetchTransfusiones();
  }, []);

  // Funciones para cerrar modales
  const handleCloseSuccessModal = () => setOpenSuccessModal(false);
  const handleCloseErrorModal = () => setOpenErrorModal(false);


  // Maneja cambios en los campos de texto y select en Datos Generales
  const handleGeneralChange = (field, value) => {
    setHistoryData((prev) => ({
      ...prev,
      generalData: { ...prev.generalData, [field]: value },
    }));
  };

  // Maneja el cambio en el radio group Donante
  const handleDonanteChange = (event) => {
    setHistoryData((prev) => ({
      ...prev,
      generalData: { ...prev.generalData, donante: event.target.value },
    }));
  };

  // Funciones para agregar nuevas filas (corregidas y optimizadas)
  const addAppRow = () => {
    setHistoryData(prev => {
      const newId = prev.AntecedentesPersonales.length > 0 ? Math.max(...prev.AntecedentesPersonales.map(r => r.id)) + 1 : 1;
      return {
        ...prev,
        AntecedentesPersonales: [...prev.AntecedentesPersonales, { id: newId, antecedente: '', año: '' }]
      };
    });
  };

  const addApfRow = () => {
    setHistoryData(prev => {
      const newId = prev.apf.length > 0 ? Math.max(...prev.apf.map(r => r.id)) + 1 : 1;
      return {
        ...prev,
        apf: [...prev.apf, { id: newId, antecedente: '', parentesco: '' }]
      };
    });
  };

  const addAlergiaRow = () => {
    setHistoryData(prev => {
      const newId = prev.alergias.length > 0 ? Math.max(...prev.alergias.map(r => r.id)) + 1 : 1;
      return {
        ...prev,
        alergias: [...prev.alergias, { id: newId, alergia: '' }]
      };
    });
  };

  const addHabitoRow = () => {
    setHistoryData(prev => {
      const newId = prev.habitos.length > 0 ? Math.max(...prev.habitos.map(r => r.id)) + 1 : 1;
      return {
        ...prev,
        habitos: [...prev.habitos, { id: newId, habito: '', intensidad: 'Leve' }]
      };
    });
  };

  const addEstanciaRow = () => {
    setHistoryData(prev => {
      const newId = prev.estanciaExtranjero.length > 0 ? Math.max(...prev.estanciaExtranjero.map(r => r.id)) + 1 : 1;
      return {
        ...prev,
        estanciaExtranjero: [...prev.estanciaExtranjero, { id: newId, fecha: '', pais: '', estadia: '', motivo: '' }]
      };
    });
  };

  const addDonacionRow = () => {
    setHistoryData(prev => {
      const newId = prev.donacionesPrevias.length > 0 ? Math.max(...prev.donacionesPrevias.map(r => r.id)) + 1 : 1;
      return {
        ...prev,
        donacionesPrevias: [...prev.donacionesPrevias, { id: newId, fecha: '', lugar: '', reaccion: '', motivo: '' }]
      };
    });
  };

  const addTransfusionRow = () => {
    setHistoryData(prev => {
      const newId = prev.transfusionesPrevias.length > 0 ? Math.max(...prev.transfusionesPrevias.map(r => r.id)) + 1 : 1;
      return {
        ...prev,
        transfusionesPrevias: [...prev.transfusionesPrevias, {
          id: newId,
          fecha: '',
          lugar: '',
          diagnostico: '',
          reaccion: '',
          observaciones: ''
        }]
      };
    });
  };

  // Maneja la edición en todas las tablas
  const handleTableEdit = (section, params) => {
    setHistoryData(prev => ({
      ...prev,
      [section]: prev[section].map(row =>
        row.id === params.id ? { ...row, [params.field]: params.value } : row
      )
    }));
  };


  // Columnas para las tablas DataGrid
  const appColumns = [
    { field: 'antecedente', headerName: 'Antecedente', flex: 1, editable: true },
    { field: 'año', headerName: 'Año', width: 120, editable: true },
  ];

  const apfColumns = [
    { field: 'antecedente', headerName: 'Antecedente', flex: 1, editable: true },
    { field: 'parentesco', headerName: 'Parentesco', flex: 1, editable: true },
  ];

  const alergiasColumns = [
    { field: 'alergia', headerName: 'Alergia', flex: 1, editable: true },
  ];

  const habitosColumns = [
    { field: 'habito', headerName: 'Hábito', flex: 1, editable: true },
    {
      field: 'intensidad',
      headerName: 'Intensidad',
      width: 150,
      editable: true,
      renderEditCell: (params) => (
        <Select
          value={params.value}
          onChange={(e) => {
            params.api.setEditCellValue({ id: params.id, field: params.field, value: e.target.value });
          }}
          autoFocus
          fullWidth
        >
          <MenuItem value="Leve">Leve</MenuItem>
          <MenuItem value="Moderado">Moderado</MenuItem>
          <MenuItem value="Severo">Severo</MenuItem>
        </Select>
      ),
    },
  ];

  const estanciaColumns = [
    { field: 'fecha', headerName: 'Fecha', width: 130, editable: true },
    { field: 'pais', headerName: 'País', flex: 1, editable: true },
    { field: 'estadia', headerName: 'Estadía', flex: 1, editable: true },
    { field: 'motivo', headerName: 'Motivo', flex: 1, editable: true },
  ];

  const donacionesColumns = [
    { field: 'fecha', headerName: 'Fecha', width: 130, editable: true },
    { field: 'lugar', headerName: 'Lugar', flex: 1, editable: true },
    { field: 'reaccion', headerName: 'Reacción', flex: 1, editable: true },
    { field: 'motivo', headerName: 'Motivo', flex: 1, editable: true },
  ];

  const transfusionesColumns = [
    { field: 'fecha', headerName: 'Fecha', width: 130, editable: true },
    { field: 'lugar', headerName: 'Lugar', flex: 1, editable: true },
    { field: 'diagnostico', headerName: 'Diagnóstico', flex: 1, editable: true },
    { field: 'reaccion', headerName: 'Reacción', flex: 1, editable: true },
    { field: 'observaciones', headerName: 'Observaciones', flex: 1, editable: true },
  ];


  return (
    <>
      <Navbar />
      <Box sx={{ p: 3, maxWidth: 1100, margin: 'auto', mt: 8 }}>
        {/* Título general */}
        <Typography variant="h4" align="center" gutterBottom sx={{ mb: 3, fontWeight: 'bold', color: '#13b09e' }}>
          Historia Clínica
        </Typography>

        {/* Sección Datos Generales */}
        <SectionHeader title="Datos Generales" />
        <Paper sx={{ p: 3, mb: 4 }}>
          <Grid container spacing={2}>
            {/* Campos de texto */}
            <Grid item xs={12} sm={3}>
              <TextField
                label="No. CI"
                value={historyData.generalData.ci}
                onChange={(e) => handleGeneralChange('ci', e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Nombre"
                value={historyData.generalData.nombre}
                onChange={(e) => handleGeneralChange('nombre', e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Primer Apellido"
                value={historyData.generalData.primer_apellido}
                onChange={(e) => handleGeneralChange('primer_apellido', e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Segundo Apellido"
                value={historyData.generalData.segundo_apellido}
                onChange={(e) => handleGeneralChange('segundo_apellido', e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Sexo"
                value={historyData.generalData.sexo}
                onChange={(e) => handleGeneralChange('sexo', e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Edad"
                value={historyData.generalData.edad}
                onChange={(e) => handleGeneralChange('edad', e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Color Piel"
                value={historyData.generalData.color_piel}
                onChange={(e) => handleGeneralChange('color_piel', e.target.value)}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                label="Consejo Popular"
                value={historyData.generalData.consejo_popular}
                onChange={(e) => handleGeneralChange('consejo_popular', e.target.value)}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                label="No. Consultorio"
                value={historyData.generalData.no_consultorio}
                onChange={(e) => handleGeneralChange('no_consultorio', e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Estado Civil"
                value={historyData.generalData.estado_civil}
                onChange={(e) => handleGeneralChange('estado_civil', e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Ocupación"
                value={historyData.generalData.ocupacion}
                onChange={(e) => handleGeneralChange('ocupacion', e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Teléfono"
                value={historyData.generalData.telefono}
                onChange={(e) => handleGeneralChange('telefono', e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Municipio"
                value={historyData.generalData.municipio}
                onChange={(e) => handleGeneralChange('municipio', e.target.value)}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                label="Centro Laboral"
                value={historyData.generalData.centro_laboral}
                onChange={(e) => handleGeneralChange('centro_laboral', e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Teléfono Laboral"
                value={historyData.generalData.telefonoLaboral}
                onChange={(e) => handleGeneralChange('telefonoLaboral', e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Otra Localizacion"
                value={historyData.generalData.otra_localizacion}
                onChange={(e) => handleGeneralChange('otra_localizacion', e.target.value)}
                fullWidth
              />
            </Grid>

            {/* Select Grupo Sanguíneo */}
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <FormLabel>Grupo Sanguíneo</FormLabel>
                <Select
                  name="grupo_sanguineo"
                  value={historyData.generalData.grupo_sanguine
                    
                   }
                  onChange={(e) => handleGeneralChange('grupo_sanguineo', e.target.value)}
                >
                  <MenuItem value="">Seleccione</MenuItem>
                  <MenuItem value="A">A</MenuItem>
                  <MenuItem value="B">B</MenuItem>
                  <MenuItem value="AB">AB</MenuItem>
                  <MenuItem value="O">O</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Select Factor */}
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <FormLabel>Factor</FormLabel>
                <Select
                  name="factor"
                  value={historyData.generalData.factor}
                  onChange={(e) => handleGeneralChange('factor', e.target.value)}
                >
                  <MenuItem value="">Seleccione</MenuItem>
                  <MenuItem value="+">+</MenuItem>
                  <MenuItem value="-">-</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Select Categoría Ocupacional */}
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <FormLabel>Categoría Ocupacional</FormLabel>
                <Select
                  name="cat_ocupacional"
                  value={historyData.generalData.cat_ocupacional}
                  onChange={(e) => handleGeneralChange('cat_ocupacional', e.target.value)}
                >
                  <MenuItem value="">Seleccione</MenuItem>
                  <MenuItem value="Empleador">Empleador</MenuItem>
                  <MenuItem value="Empleado">Empleado</MenuItem>
                  <MenuItem value="Trabajador por cuenta propia">Trabajador por cuenta propia</MenuItem>
                  <MenuItem value="Otro">Otro</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Select Estilo de Vida */}
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <FormLabel>Estilo de Vida</FormLabel>
                <Select
                  name="estilo_vida"
                  value={historyData.generalData.estilo_vida}
                  onChange={(e) => handleGeneralChange('estilo_vida', e.target.value)}
                >
                  <MenuItem value="">Seleccione</MenuItem>
                  <MenuItem value="Activo">Activo</MenuItem>
                  <MenuItem value="Sedentario">Sedentario</MenuItem>
                  <MenuItem value="Moderado">Moderado</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Select Alimentación */}
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <FormLabel>Alimentación</FormLabel>
                <Select
                  name="alimentacion"
                  value={historyData.generalData.alimentacion}
                  onChange={(e) => handleGeneralChange('alimentacion', e.target.value)}
                >
                  <MenuItem value="">Seleccione</MenuItem>
                  <MenuItem value="Buena">Buena</MenuItem>
                  <MenuItem value="Regular">Regular</MenuItem>
                  <MenuItem value="Mala">Mala</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Select Género de Vida */}
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <FormLabel>Género de Vida</FormLabel>
                <Select
                  name="genero_vida"
                  value={historyData.generalData.genero_vida}
                  onChange={(e) => handleGeneralChange('genero_vida', e.target.value)}
                >
                  <MenuItem value="">Seleccione</MenuItem>
                  <MenuItem value="Vida desordenada">Vida desordenada</MenuItem>
                  <MenuItem value="Abusa de sus fuerzas">Abusa de sus fuerzas</MenuItem>
                  <MenuItem value="Esfuerzo intenso">Esfuerzo intenso</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* RadioGroup Donante */}
            <Grid item xs={12} sm={6}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Donante</FormLabel>
                <RadioGroup
                  row
                  name="donante"
                  value={historyData.generalData.donante}
                  onChange={handleDonanteChange}
                >
                  <FormControlLabel value="Donante Controlado" control={<Radio />} label="Donante Controlado" />
                  <FormControlLabel value="Posible Donante" control={<Radio />} label="Posible Donante" />
                  <FormControlLabel value="Donante Activo" control={<Radio />} label="Donante Activo" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        {/* Sección APP con botón Agregar */}
        <SectionHeader title="Antecedentes Patologicos Personales (APP)" />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
          <Button variant="outlined" onClick={addAppRow}>Agregar Antecedente</Button>
        </Box>
        <Paper sx={{ height: 250, mb: 4 }}>
          <DataGrid
            rows={historyData.AntecedentesPersonales}
            columns={appColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            hideFooterSelectedRowCount
          />
        </Paper>

        {/* Sección APF con botón Agregar */}
        <SectionHeader title="Antecdentes Patologicos Familiares (APF)" />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
          <Button variant="outlined" onClick={addApfRow}>Agregar Antecedente</Button>
        </Box>
        <Paper sx={{ height: 250, mb: 4 }}>
          <DataGrid
            rows={historyData.apf}
            columns={apfColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            hideFooterSelectedRowCount
          />
        </Paper>

        {/* Sección Alergias con botón Agregar */}
        <SectionHeader title="Alergias" />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
          <Button variant="outlined" onClick={addAlergiaRow}>Agregar Alergia</Button>
        </Box>
        <Paper sx={{ height: 200, mb: 4 }}>
          <DataGrid
            rows={historyData.alergias}
            columns={alergiasColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            hideFooterSelectedRowCount
          />
        </Paper>

        {/* Sección Hábitos con botón Agregar */}
        <SectionHeader title="Habitos Toxicos" />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
          <Button variant="outlined" onClick={addHabitoRow}>Agregar Hábito</Button>
        </Box>
        <Paper sx={{ height: 250, mb: 4 }}>
          <DataGrid
            rows={historyData.habitos}
            columns={habitosColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            hideFooterSelectedRowCount
            editMode="cell"
            onCellEditCommit={(params) => handleTableEdit('habitos', params)}
          />
        </Paper>

        {/* Sección Estancia con botón Agregar */}
        <SectionHeader title="Estancia en el Extranjero" />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
          <Button variant="outlined" onClick={addEstanciaRow}>Agregar Estancia</Button>
        </Box>
        <Paper sx={{ height: 250, mb: 4 }}>
          <DataGrid
            rows={historyData.estanciaExtranjero}
            columns={estanciaColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            hideFooterSelectedRowCount
          />
        </Paper>

        {/* Sección Donaciones con botón Agregar */}
        <SectionHeader title="Donaciones Previas" />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
          <Button variant="outlined" onClick={addDonacionRow}>Agregar Donación</Button>
        </Box>
        <Paper sx={{ height: 250, mb: 4 }}>
          <DataGrid
            rows={historyData.donacionesPrevias}
            columns={donacionesColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            hideFooterSelectedRowCount
          />
        </Paper>

        {/* Sección Transfusiones con botón Agregar */}
        <SectionHeader title="Transfusiones Previas" />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
          <Button variant="outlined" onClick={addTransfusionRow}>Agregar Transfusión</Button>
        </Box>
        <Paper sx={{ height: 250, mb: 4 }}>
          <DataGrid
            rows={historyData.transfusionesPrevias}
            columns={transfusionesColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            hideFooterSelectedRowCount
          />
        </Paper>

        {/* Botón Guardar */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, bottom: 20, zIndex: 1 }}>
          <BotonPersonalizado variant="contained" sx={{
            background: '#009688',
            color: '#fff',
            fontWeight: 600,
            fontSize: '1.1rem',
            px: 6,
            py: 1.5,
            borderRadius: 2,
            boxShadow: 3,
            '&:hover': {
              background: '#00796b',
              transform: 'scale(1.05)',
              transition: 'transform 0.3s'
            },
          }} onClick={handleGuardar}>
            Aceptar
          </BotonPersonalizado>
        </Box>

        {/* Modal Éxito */}
        <Modal
          open={openSuccessModal}
          onClose={handleCloseSuccessModal}
          aria-labelledby="success-modal-title"
          aria-describedby="success-modal-description"
        >
          <Box sx={successModalStyle}>
            <CheckCircleIcon sx={{ fontSize: 60, color: '#009688', mb: 2 }} />
            <Typography id="success-modal-title" variant="h5" component="h2" gutterBottom>
              ¡Éxito!
            </Typography>
            <Typography id="success-modal-description" sx={{ mb: 3 }}>
              La historia clínica se ha guardado correctamente.
            </Typography>
            <BotonPersonalizado variant="contained"
              onClick={handleCloseSuccessModal}
              sx={{
                backgroundColor: '#009688', color: '#fff',
                fontWeight: 600,
                fontSize: '1rem',
                borderRadius: 1,
                boxShadow: 3,
                '&:hover': {
                  backgroundColor: '#00796b',
                  transform: 'scale(1.05)',
                  transition: 'transform 0.3s',
                },
              }}
            >
              Aceptar
            </BotonPersonalizado>
          </Box>
        </Modal>

        {/* Modal Error */}
        <Modal
          open={openErrorModal}
          onClose={handleCloseErrorModal}
          aria-labelledby="error-modal-title"
          aria-describedby="error-modal-description"
        >
          <Box sx={errorModalStyle}>
            <ErrorIcon sx={{ fontSize: 60, color: '#f44336', mb: 2 }} />
            <Typography id="error-modal-title" variant="h5" component="h2" gutterBottom>
              ¡Error!
            </Typography>
            <Typography
              id="error-modal-description"
              sx={{
                mb: 3,
                whiteSpace: 'pre-line',
                textAlign: 'left',
                backgroundColor: '#fff8f8',
                p: 2,
                borderRadius: 1,
              }}
            >
              {errorMessage}
            </Typography>
            <BotonPersonalizado variant="contained" color="error" onClick={handleCloseErrorModal}>
              Corregir
            </BotonPersonalizado>
          </Box>
        </Modal>
      </Box>
    </>
  );


}



