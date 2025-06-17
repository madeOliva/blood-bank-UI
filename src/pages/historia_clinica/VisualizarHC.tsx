
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, MenuItem, Select, TextField, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Grid, Paper } from '@mui/material';
import Navbar from '../../components/navbar/Navbar';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
  antecedentesPersonales: [],
  antecedentesFamiliares: [],
  alergias: [],
  habitos: [],
  estanciaExtranjero: [],
  donacionesPrevias: [],
  transfusionesPrevias: [],
};


export default function VisualizarHC() {
  // Estado principal que contiene toda la historia clínica
  const [historyData, setHistoryData] = useState(emptyHistoryData);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  // Cargar datos del backend al montar el componente
  useEffect(() => {
    // Cambia el ID por el que corresponda o hazlo dinámico
    axios.get(`http://localhost:3000/historia-clinica/datos/${id}`)
      .then(res => {
        // Normaliza los datos para que tengan la estructura esperada por la vista
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
            provincia:d.provincia || '',
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
          antecedentesPersonales: (d.antecedentesPersonales || []).map((a, idx) => ({
            id: idx + 1,
            antecedente: a.antecedente || '',
            año: a.año || '',
          })),
          antecedentesFamiliares: (d.antecedentesFamiliares || []).map((a, idx) => ({
            id: idx + 1,
            antecedente: a.antecedente || '',
            parentesco: a.parentesco || '',
          })),
          alergias: (d.alergias || []).map((a, idx) => ({
            id: idx + 1,
            alergia: a.alergia || a || '',
          })),
          habitos: (d.habitos || []).map((h, idx) => ({
            id: idx + 1,
            habito: h.habito || '',
            intensidad: h.intensidad || 'Leve',
          })),
          estanciaExtranjero: (d.estanciaExtranjero || []).map((e, idx) => ({
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
            motivo: don.motivo || '',
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
  }, []);


  // Funciones para agregar nuevas filas (igual que antes, pero chequea que historyData exista)
  const addAppRow = () => {
    setHistoryData(prev => ({
      ...prev,
      antecedentesPersonales: [
        ...(prev.antecedentesPersonales || []),
        { id: (prev.antecedentesPersonales?.length || 0) + 1, antecedente: '', año: '' }
      ]
    }));
  };

  const addApfRow = () => {
    setHistoryData(prev => ({
      ...prev,
      antecedentesFamiliares: [
        ...(prev.antecedentesFamiliares || []),
        { id: (prev.antecedentesFamiliares?.length || 0) + 1, antecedente: '', parentesco: '' }
      ]
    }));
  };


  const addAlergiaRow = () => {
    setHistoryData(prev => ({
      ...prev,
      alergias: [
        ...(prev.alergias || []),
        { id: (prev.alergias?.length || 0) + 1, alergia: '' }
      ]
    }));
  };

  const addHabitoRow = () => {
    setHistoryData(prev => ({
      ...prev,
      habitos: [
        ...(prev.habitos || []),
        { id: (prev.habitos?.length || 0) + 1, habito: '', intensidad: 'Leve' }
      ]
    }));
  };

  const addEstanciaRow = () => {
    setHistoryData(prev => ({
      ...prev,
      estanciaExtranjero: [
        ...(prev.estanciaExtranjero || []),
        { id: (prev.estanciaExtranjero?.length || 0) + 1, fecha: '', pais: '', estadia: '', motivo: '' }
      ]
    }));
  };

  const addDonacionRow = () => {
    setHistoryData(prev => ({
      ...prev,
      donacionesPrevias: [
        ...(prev.donacionesPrevias || []),
        { id: (prev.donacionesPrevias?.length || 0) + 1, fecha: '', lugar: '', reaccion: '', motivo: '' }
      ]
    }));
  }

  const addTransfusionRow = () => {
    setHistoryData(prev => ({
      ...prev,
      transfusionesPrevias: [
        ...(prev.transfusionesPrevias || []),
        { id: (prev.transfusionesPrevias?.length || 0) + 1, fecha: '', lugar: '', diagnostico: '', reaccion: '', observaciones: '' }
      ]
    }));
  };

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

  // Maneja la edición en la tabla de Hábitos Tóxicos (intensidad editable)
  const handleHabitoEditCommit = (params) => {
    setHistoryData((prev) => ({
      ...prev,
      habitos: prev.habitos.map((row) =>
        row.id === params.id ? { ...row, [params.field]: params.value } : row
      ),
    }));
  };

  // Función para guardar los datos (puedes adaptar para enviar a backend)
  const handleGuardar = () => {
    alert('Historia clínica guardada correctamente');
    // Aquí puedes agregar lógica para enviar los datos a un servidor
    // console.log(historyData);
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
    { field: 'motivo', headerName: 'Motivo', flex: 1, editable: true },
  ];

  const transfusionesColumns = [
    { field: 'fecha', headerName: 'Fecha', flex: 1, editable: true },
    { field: 'lugar', headerName: 'Lugar', flex: 1, editable: true },
    { field: 'diagnostico', headerName: 'Diagnostico', flex: 1, editable: true },
    { field: 'reaccion', headerName: 'Reacción', flex: 1, editable: true },
    { field: 'observaciones', headerName: 'Observaciones', flex: 1, editable: true },
  ];

  // Componente para los encabezados de sección con estilo
  const SectionHeader = ({ title }) => (
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

  if (loading) {
    return (
      <>
        <Navbar />
        <Box sx={{ p: 3, maxWidth: 1100, margin: 'auto', mt: 8 }}>
          <Typography align="center">Cargando datos...</Typography>
        </Box>
      </>
    );
  }

  if (!historyData) {
    return (
      <>
        <Navbar />
        <Box sx={{ p: 3, maxWidth: 1100, margin: 'auto', mt: 8 }}>
          <Typography align="center" color="error">No se encontraron datos de la historia clínica.</Typography>
        </Box>
      </>
    );
  }

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
            {/*<Grid item xs={12} sm={3}>
              <TextField
                label="Color Piel"
                value={historyData.generalData.color_piel}
                onChange={(e) => handleGeneralChange('color_piel', e.target.value)}
                fullWidth
              />
            </Grid>*/}
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
                  name="categoria_ocupacional"
                  value={historyData.generalData.cat_ocupacional}
                  onChange={(e) => handleGeneralChange('cat_ocupacional', e.target.value)}
                >
                  {/* Opciones para que completes */}
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
                  {/* Opciones para que completes */}
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
          <Button variant="outlined" onClick={addAppRow}>Agregar Antecedente</Button>
        </Box>
        <Paper sx={{ height: 250, mb: 4 }}>
          <DataGrid
            rows={historyData.antecedentesPersonales}
            columns={appColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            hideFooterSelectedRowCount
          />
        </Paper>

        {/* Sección Antecedentes Patológicos Familiares (APF) */}
        <SectionHeader title="Antecdentes Patologicos Familiares (APF)" />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
          <Button variant="outlined" onClick={addApfRow}>Agregar Antecedente</Button>
        </Box>
        <Paper sx={{ height: 250, mb: 4 }}>
          <DataGrid
            rows={historyData.antecedentesFamiliares}
            columns={apfColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            hideFooterSelectedRowCount
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
          />
        </Paper>

        {/* Sección Hábitos Tóxicos */}
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

        {/*Sección Transfusiones Previas*/}
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


        {/* Botón Aceptar */}
        <Box sx={{
          display: 'flex', justifyContent: 'center',
          mt: 4,
          bottom: 20,
          zIndex: 1
        }}>
          <Button variant="contained" sx={{
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
          </Button>
        </Box>
      </Box>

    </>
  );
}
