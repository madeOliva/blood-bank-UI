// src/components/VisualizarHC.jsx
import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {Box, Button, MenuItem, Select, TextField, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Grid, Paper} from '@mui/material';

// Datos iniciales ficticios para la historia clínica
const initialHistoryData = {
  generalData: {
    ci: '87051214567',
    colorPiel: 'Blanca',
    noHC: 'HC12345',
    consejoPopular: 'Centro',
    noConsultorio: 'C-12',
    ocupacion: 'Ingeniera',
    telefono: '55561234',
    municipio: 'Pinar del Rio',
    centroLaboral: 'Universidad Hermanos Saiz',
    telefonoLaboral: '55585678',
    grupoSanguineo: 'A',
    factor: '+',
    categoriaOcupacional: 'Docente',
    estiloVida: 'Activo',
    alimentacion: 'Buena',
    generoVida: 'Vida Desordenada', 
    donante: 'Donante Controlado', // Radio seleccionado
  },

  // Antecedentes Patológicos Personales (APP)
  app: [
  { id: 1, antecedente: 'Hipertensión arterial', año: '2015' },
  { id: 2, antecedente: 'Diabetes', año: '2018' },
],


  // Antecedentes Patológicos Familiares (APF)
  apf: [
  { id: 1, antecedente: 'Asma', parentesco: 'Madre' },
  { id: 2, antecedente: 'Cardiopatía', parentesco: 'Padre' },
],

  // Alergias
  alergias: [
  { id: 1, alergia: 'Penicilina' },
  { id: 2, alergia: 'Polvo' },
],

  // Hábitos Tóxicos (editable intensidad)
  habitos: [
  { id: 1, habito: 'Fumar', intensidad: 'Moderado' },
  { id: 2, habito: 'Alcohol', intensidad: 'Leve' },
],

  // Estancia en el Extranjero
  estanciaExtranjero: [
  { id: 1, fecha: '2023-01-15', pais: 'España', estadia: '2 meses', motivo: 'Estudios' },
  { id: 2, fecha: '2022-08-10', pais: 'México', estadia: '1 mes', motivo: 'Trabajo' },
],

 // Donaciones Previas
  donacionesPrevias: [
  { id: 1, fecha: '2022-08-12', lugar: 'Banco de Sangre Provincial', reaccion: 'Ninguna', motivo: 'Voluntario' },
  ],

  // Transfusiones Previas
  transfusionesPrevias: [
  { id: 1, fecha: '2023-10-12', lugar: 'Hospital Isabel Rubio', diagnostico: 'Traumatismo grave por accidente	', reaccion: 'Reacción hemolítica', observaciones: 'Intervención inmediata del equipo de hematología' },
  ]

};

export default function VisualizarHC() {
  // Estado principal que contiene toda la historia clínica
  const [historyData, setHistoryData] = useState(initialHistoryData);

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
    {field: 'intensidad', headerName: 'Intensidad', width: 150, editable: true, renderEditCell: (params) => (
       <Select
          value={params.value}
          onChange={(e) => {params.api.setEditCellValue({ id: params.id, field: params.field, value: e.target.value });
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

  return (
    <Box sx={{ p: 3, maxWidth: 1100, margin: 'auto' }}>
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
              label="Color Piel"
              value={historyData.generalData.colorPiel}
              onChange={(e) => handleGeneralChange('colorPiel', e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField label="No. HC" value={historyData.generalData.noHC} disabled fullWidth />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Consejo Popular"
              value={historyData.generalData.consejoPopular}
              onChange={(e) => handleGeneralChange('consejoPopular', e.target.value)}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              label="No. Consultorio"
              value={historyData.generalData.noConsultorio}
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
              value={historyData.generalData.centroLaboral}
              onChange={(e) => handleGeneralChange('centroLaboral', e.target.value)}
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

          {/* Select Grupo Sanguíneo */}
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <FormLabel>Grupo Sanguíneo</FormLabel>
              <Select
                name="grupoSanguineo"
                value={historyData.generalData.grupoSanguineo}
                onChange={(e) => handleGeneralChange('grupoSanguineo', e.target.value)}
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
                name="categoriaOcupacional"
                value={historyData.generalData.categoriaOcupacional}
                onChange={(e) => handleGeneralChange('categoriaOcupacional', e.target.value)}
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
                name="estiloVida"
                value={historyData.generalData.estiloVida}
                onChange={(e) => handleGeneralChange('estiloVida', e.target.value)}
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
                name="generoVida"
                value={historyData.generalData.generoVida}
                onChange={(e) => handleGeneralChange('generoVida', e.target.value)}
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
      <Paper sx={{ height: 250, mb: 4 }}>
        <DataGrid
          rows={historyData.app}
          columns={appColumns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          hideFooterSelectedRowCount
        />
      </Paper>

      {/* Sección Antecedentes Patológicos Familiares (APF) */}
      <SectionHeader title="Antecdentes Patologicos Familiares (APF)" />
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

      {/* Sección Alergias */}
      <SectionHeader title="Alergias" />
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

      {/*Sección Transfusiones Previas*/}
      <SectionHeader title="Donaciones Previas" />
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
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
        <Button variant="contained" color="success" size="large" onClick={handleGuardar}>
          Aceptar
        </Button>
      </Box>
    </Box>
  );
}

// Componente para los encabezados de sección con estilo
function SectionHeader({ title }) {
  return (
    <Box
      sx={{
        backgroundColor: '#1db6a4',
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

 