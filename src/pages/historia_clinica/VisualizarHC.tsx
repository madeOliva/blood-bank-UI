
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, MenuItem, Select, TextField, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Grid, Paper, Modal } from '@mui/material';
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BotonPersonalizado from '../../components/Button';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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
    provincia: '',
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
  antecedentesPersonales: [] as { id: number; antecedente: string; año: string }[],
  antecedentesFamiliares: [] as { id: number; antecedente: string; parentesco: string }[],
  alergias: [] as { id: number; alergia: string }[],
  habitosToxicos: [] as { id: number; habito: string; intensidad: string }[],
  estanciaExtranjero: [] as { id: number; fecha: string; pais: string; estadia: string; motivo: string }[],
  donacionesPrevias: [] as { id: number; fecha: string; lugar: string; reaccion: string }[],
  transfusionesPrevias: [] as { id: number; fecha: string; lugar: string; diagnostico: string; reaccion: string; observaciones: string }[],
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


export default function VisualizarHC() {
  // Estado principal que contiene toda la historia clínica
  const [historyData, setHistoryData] = useState(emptyHistoryData);
  const [loading, setLoading] = useState(true);
  const [donacionesPrevias, setDonacionesPrevias] = useState([]);

  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { id } = useParams();

  // Cargar datos del backend al montar el componente
  useEffect(() => {
    axios.get(`http://localhost:3000/historia-clinica/datos/${id}`)
      .then(res => {
        const d = res.data;
        setHistoryData({
          generalData: {
            ci: d.ci || '',
            nombre: d.nombre || '',
            primer_apellido: d.primer_apellido || '',
            segundo_apellido: d.segundo_apellido || '',
            edad: d.edad || '',
            sexo: d.sexo || '',
            color_piel: d.color_piel || '',
            no_hc: d.no_hc || '',
            estado_civil: d.estado_civil || '',
            municipio: d.municipio || '',
            consejo_popular: d.consejo_popular || '',
            no_consultorio: d.no_consultorio || '',
            ocupacion: d.ocupacion || '',
            cat_ocupacional: d.cat_ocupacional || '',
            telefono: d.telefono || '',
            provincia: d.provincia || '',
            centro_laboral: d.centro_laboral || '',
            telefonoLaboral: d.telefonoLaboral || '',
            otra_localizacion: d.otra_localizacion || '',
            grupo_sanguine: d.grupo_sanguine || '',
            factor: d.factor || '',
            estilo_vida: d.estilo_vida || '',
            alimentacion: d.alimentacion || '',
            genero_vida: d.genero_vida || '',
            donante: d.es_donanteControlado
              ? 'Donante Controlado'
              : d.es_posibleDonante
                ? 'Posible Donante'
                : d.es_donanteActivo
                  ? 'Donante Activo'
                  : '',
          },
          antecedentesPersonales: (d.antecedentesPersonales || []).map((a: any, idx: number) => ({
            id: idx + 1,
            antecedente: a.antecedente || '',
            año: a.año || '',
          })),
          antecedentesFamiliares: (d.antecedentesFamiliares || []).map((a: any, idx: number) => ({
            id: idx + 1,
            antecedente: a.antecedente || '',
            parentesco: a.parentesco || '',
          })),
          alergias: (d.alergias || []).map((a: any, idx: number) => ({
            id: idx + 1,
            alergia: a.alergia || a || '',
          })),
          habitosToxicos: (d.habitosToxicos || []).map((h: any, idx: number) => ({
            id: idx + 1,
            habito: h.habito || '',
            intensidad: h.intensidad || 'Leve',
          })),
          estanciaExtranjero: (d.estanciaExtranjero || []).map((e: any, idx: number) => ({
            id: idx + 1,
            fecha: e.fecha || '',
            pais: e.pais || '',
            estadia: e.estadia || '',
            motivo: e.motivo || '',
          })),
          donacionesPrevias: (d.donacionesPrevias || []).map((don, idx) => ({
            id: idx + 1,
            fecha: don.fecha || '',
            lugar: don.lugar || '',
            reaccion: don.reaccion || '',
            /*motivo: don.motivo || '',*/
          })),
          transfusionesPrevias: (d.transfusionesPrevias || []).map((t, idx) => ({
            id: idx + 1,
            fecha: t.fecha || '',
            lugar: t.lugar || '',
            diagnostico: t.diagnostico || '',
            reaccion: t.reaccion || '',
            observaciones: t.observaciones || '',
          })),
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
    axios.get(`http://localhost:3000/registro-donacion/historia-clinica/${id}`)
      .then(res => {
        // Mapea los datos para el DataGrid
        const donaciones = (res.data || []).map((don, idx) => ({
          id: idx + 1,
          fecha: don.fechaD ? new Date(don.fechaD).toLocaleDateString() : '',
          lugar: don.lugar || '',
          reaccion: don.reaccion || '',
          /* motivo: don.motivo || '', // si tienes motivo en el backend*/
        }));
        setDonacionesPrevias(donaciones);
      });
  }, [id]);



  // Maneja cambios en los campos de texto y select en Datos Generales
  const handleGeneralChange = (field, value) => {
    setHistoryData((prev) => ({
      ...prev,
      generalData: { ...prev.generalData, [field]: value },
    }));
  };



  // Maneja la edición en la tabla de Hábitos Tóxicos (intensidad editable)
  const handleHabitoEditCommit = (params) => {
    setHistoryData((prev) => ({
      ...prev,
      habitosToxicos: prev.habitosToxicos.map((row) =>
        row.id === params.id ? { ...row, [params.field]: params.value } : row
      ),
    }));
  };

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
      gd.no_hc.trim() === '' ||
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
      { rows: historyData.antecedentesPersonales, requiredFields: ['antecedente', 'año'] },
      { rows: historyData.antecedentesFamiliares, requiredFields: ['antecedente', 'parentesco'] },
      { rows: historyData.alergias, requiredFields: ['alergia'] },
      { rows: historyData.habitosToxicos, requiredFields: ['habito', 'intensidad'] },
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
      antecedentesPersonales: "Antecedentes Patológicos Personales (APP)",
      antecedentesFamiliares: "Antecedentes Patológicos Familiares (APF)",
      alergias: "Alergias",
      habitosToxicos: "Hábitos Tóxicos",
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


  const handleGuardar = async () => {
    const errors = validateForm();
    if (errors.length > 0) {
      setErrorMessage(errors.join('\n'));
      setOpenErrorModal(true);
      return;
    }

    try {
      // Validación adicional para la edad
      const edad = parseInt(historyData.generalData.edad);
      if (isNaN(edad)) {
        throw new Error('La edad debe ser un número válido');
      }

      const dataToSend = {
        ci: historyData.generalData.ci,
        nombre: historyData.generalData.nombre,
        primer_apellido: historyData.generalData.primer_apellido,
        segundo_apellido: historyData.generalData.segundo_apellido,
        sexo: historyData.generalData.sexo,
        edad: edad,
        estado_civil: historyData.generalData.estado_civil,
        municipio: historyData.generalData.municipio,
        provincia: historyData.generalData.provincia,
        color_piel: historyData.generalData.color_piel,
        no_hc: historyData.generalData.no_hc,
        grupo_sanguine: historyData.generalData.grupo_sanguine,
        factor: historyData.generalData.factor,
        consejo_popular: historyData.generalData.consejo_popular,
        no_consultorio: historyData.generalData.no_consultorio,
        ocupacion: historyData.generalData.ocupacion,
        telefono: historyData.generalData.telefono,
        telefonoLaboral: historyData.generalData.telefonoLaboral,
        centro_laboral: historyData.generalData.centro_laboral,
        otra_localizacion: historyData.generalData.otra_localizacion,
        cat_ocupacional: historyData.generalData.cat_ocupacional,
        estilo_vida: historyData.generalData.estilo_vida,
        alimentacion: historyData.generalData.alimentacion,
        genero_vida: historyData.generalData.genero_vida,
        es_donanteControlado: historyData.generalData.donante === 'Donante Controlado',
        es_posibleDonante: historyData.generalData.donante === 'Posible Donante',
        es_donanteActivo: historyData.generalData.donante === 'Donante Activo',
        alergias: historyData.alergias
          .filter(item => item.alergia && item.alergia.trim() !== '')
          .map(item => item.alergia),

        antecedentesPersonales: historyData.antecedentesPersonales
          .filter(ap => ap.antecedente && ap.año)
          .map(ap => ({
            antecedente: ap.antecedente,
            año: ap.año
          })),

        antecedentesFamiliares: historyData.antecedentesFamiliares
          .filter(af => af.antecedente && af.parentesco)
          .map(af => ({
            antecedente: af.antecedente,
            parentesco: af.parentesco
          })),
        habitosToxicos: historyData.habitosToxicos
          .filter(ht => ht.habito && ht.intensidad)
          .map(ht => ({
            habito: ht.habito,
            intensidad: ht.intensidad
          })),
        estanciaExtranjero: historyData.estanciaExtranjero
          .filter(ee => ee.fecha && ee.pais && ee.estadia && ee.motivo)
          .map(ee => ({
            fecha: ee.fecha,
            pais: ee.pais,
            estadia: ee.estadia,
            motivo: ee.motivo
          }))
      };

      console.log("Datos a enviar:", JSON.stringify(dataToSend, null, 2));

      const response = await axios.put(`http://localhost:3000/historia-clinica/${id}`, dataToSend);
      console.log('Respuesta del servidor:', response.data);
      setOpenSuccessModal(true);
    } catch (error) {
      console.error('Error detallado:', error.response?.data || error.message || error);
      setErrorMessage(error.response?.data?.message || 'Error al guardar la historia clínica');
      setOpenErrorModal(true);
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


  // Función para validar nombres (solo letras y espacios)
  const validateName = (value) => {
    return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value);
  };

  // Modificar los campos de nombre, apellidos:
  <TextField
    label="Nombre"
    value={historyData.generalData.nombre}
    onChange={(e) => {
      if (validateName(e.target.value) || e.target.value === '') {
        handleGeneralChange('nombre', e.target.value);
      }
    }}
    fullWidth
    error={historyData.generalData.nombre && !validateName(historyData.generalData.nombre)}
    helperText={historyData.generalData.nombre && !validateName(historyData.generalData.nombre) ? "Solo se permiten letras" : ""}
  />

  // Maneja el cambio en el radio group Donante
  const handleDonanteChange = (event) => {
    setHistoryData((prev) => ({
      ...prev,
      generalData: { ...prev.generalData, donante: event.target.value },
    }));
  };

  // Generador de IDs únicos
  const generateUniqueId = () => Date.now() + Math.floor(Math.random() * 10000);

  // Antecedentes personales
  const addAntecedentePersonalRow = () => {
    setHistoryData(prev => ({
      ...prev,
      antecedentesPersonales: [
        ...(Array.isArray(prev.antecedentesPersonales) ? prev.antecedentesPersonales : []),
        { id: generateUniqueId(), antecedente: '', año: '' }
      ]
    }));
  };

  // Antecedentes familiares
  const addAntecedenteFRow = () => {
    setHistoryData(prev => ({
      ...prev,
      antecedentesFamiliares: [
        ...(Array.isArray(prev.antecedentesFamiliares) ? prev.antecedentesFamiliares : []),
        { id: generateUniqueId(), antecedente: '', parentesco: '' }
      ]
    }));
  };

  // Alergias
  const addAlergiaRow = () => {
    setHistoryData(prev => ({
      ...prev,
      alergias: [
        ...(Array.isArray(prev.alergias) ? prev.alergias : []),
        { id: generateUniqueId(), alergia: '' }
      ]
    }));
  };

  // Hábitos tóxicos (corregido)
  const addHabitoRow = () => {
    setHistoryData(prev => ({
      ...prev,
      habitosToxicos: [
        ...(Array.isArray(prev.habitosToxicos) ? prev.habitosToxicos : []),
        { id: generateUniqueId(), habito: '', intensidad: 'Leve' }
      ]
    }));
  };

  // Estancia en el extranjero
  const addEstanciaRow = () => {
    setHistoryData(prev => ({
      ...prev,
      estanciaExtranjero: [
        ...(Array.isArray(prev.estanciaExtranjero) ? prev.estanciaExtranjero : []),
        { id: generateUniqueId(), fecha: '', pais: '', estadia: '', motivo: '' }
      ]
    }));
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
      field: 'intensidad', headerName: 'Intensidad', width: 150, editable: true, renderEditCell: (params) => (
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
    { field: 'pais', headerName: 'País', flex: 1, editable: true },
    { field: 'estadia', headerName: 'Estadía', flex: 1, editable: true },
    { field: 'motivo', headerName: 'Motivo', flex: 1, editable: true },
  ];

  const donacionesColumns = [
    { field: 'fecha', headerName: 'Fecha', flex: 1, editable: true },
    { field: 'lugar', headerName: 'Lugar', flex: 1, editable: true },
    { field: 'reaccion', headerName: 'Reacción', flex: 1, editable: true },
    /*{ field: 'motivo', headerName: 'Motivo', flex: 1, editable: true },*/
  ];

  const transfusionesColumns = [
    { field: 'fecha', headerName: 'Fecha', flex: 1, editable: true },
    { field: 'lugar', headerName: 'Lugar', flex: 1, editable: true },
    { field: 'diagnostico', headerName: 'Diagnostico', flex: 1, editable: true },
    { field: 'reaccion', headerName: 'Reacción', flex: 1, editable: true },
    { field: 'observaciones', headerName: 'Observaciones', flex: 1, editable: true },
  ];



  return (
    <>
      <Navbar />
      <Box sx={{ p: 3, maxWidth: 1900, margin: 'auto', mt: 8 }}>
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
              <FormControl fullWidth>
                <FormLabel>Sexo</FormLabel>
                <Select
                  name="sexo"
                  value={historyData.generalData.sexo}
                  onChange={(e) => handleGeneralChange('sexo', e.target.value)}
                >
                  <MenuItem value="F">F</MenuItem>
                  <MenuItem value="M">M</MenuItem>
                </Select>
              </FormControl>
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
                label="Estado Civil"
                value={historyData.generalData.estado_civil}
                onChange={(e) => handleGeneralChange('estado_civil', e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="No. HC"
                value={historyData.generalData.no_hc}
                onChange={(e) => handleGeneralChange('no_hc', e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <FormLabel>Color Piel</FormLabel>
                <Select
                  name="color_piel"
                  value={historyData.generalData.color_piel}
                  onChange={(e) => handleGeneralChange('color_piel', e.target.value)}
                >
                  <MenuItem value="negro">negro</MenuItem>
                  <MenuItem value="blanco">blanco</MenuItem>
                  <MenuItem value="mestizo">mestizo</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Consejo Popular"
                value={historyData.generalData.consejo_popular}
                onChange={(e) => handleGeneralChange('consejo_Popular', e.target.value)}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                label="No. Consultorio"
                value={historyData.generalData.no_consultorio}
                onChange={(e) => handleGeneralChange('noConsultorio', e.target.value)}
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
              <FormControl fullWidth>
                <FormLabel>Provincia</FormLabel>
                <Select
                  name="Provincia"
                  value={historyData.generalData.provincia}
                  onChange={(e) => handleGeneralChange('provincia', e.target.value)}
                >
                  <MenuItem value="Pinar">Pinar</MenuItem>
                  <MenuItem value="Habana">Habana</MenuItem>
                </Select>
              </FormControl>
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
                label="Otra Localización"
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
                  name="grupo_sanguine"
                  value={historyData.generalData.grupo_sanguine}
                  onChange={(e) => handleGeneralChange('grupo_sanguine', e.target.value)}
                >
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
                  {/* Opciones para que completes */}
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

        {/* Sección Antecedentes Patológicos Personales (APP) */}
        <SectionHeader title="Antecedentes Patologicos Personales (APP)" />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
          <Button variant="outlined" onClick={addAntecedentePersonalRow}>Agregar Antecedente</Button>
        </Box>
        <Paper sx={{ height: 250, mb: 4 }}>
          <DataGrid
            rows={historyData.antecedentesPersonales}
            columns={appColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            hideFooterSelectedRowCount
            editMode="cell"
            onCellEditCommit={(params) => handleTableEdit('antecedentesPersonales', params)}
          />
        </Paper>

        {/* Sección Antecedentes Patológicos Familiares (APF) */}
        <SectionHeader title="Antecdentes Patologicos Familiares (APF)" />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
          <Button variant="outlined" onClick={addAntecedenteFRow}>Agregar Antecedente</Button>
        </Box>
        <Paper sx={{ height: 250, mb: 4 }}>
          <DataGrid
            rows={historyData.antecedentesFamiliares}
            columns={apfColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            hideFooterSelectedRowCount
            editMode="cell"
            onCellEditCommit={(params) => handleTableEdit('antecedentesFamiliares', params)}
          />
        </Paper>

        {/* Sección Alergias */}
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
            editMode="cell"
            onCellEditCommit={(params) => handleTableEdit('alergias', params)}
          />
        </Paper>

        {/* Sección Hábitos Tóxicos */}
        <SectionHeader title="Habitos Toxicos" />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
          <Button variant="outlined" onClick={addHabitoRow}>Agregar Hábito</Button>
        </Box>
        <Paper sx={{ height: 250, mb: 4 }}>
          <DataGrid
            rows={historyData.habitosToxicos}
            columns={habitosColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            hideFooterSelectedRowCount
            editMode="cell"
            onCellEditCommit={handleHabitoEditCommit}
          />
        </Paper>

        {/* Sección Estancia en el Extranjero */}
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

        {/*Sección Donaciones Previas*/}
        <SectionHeader title="Donaciones Previas" />
        <Paper sx={{ height: 250, mb: 4 }}>
          <DataGrid
            rows={donacionesPrevias}
            columns={donacionesColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            hideFooterSelectedRowCount
          />
        </Paper>

        {/*Sección Transfusiones Previas*/}
        <SectionHeader title="Transfusiones Previas" />
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
