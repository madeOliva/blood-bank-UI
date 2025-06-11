// src/components/VisualizarHC.jsx
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {Box, Button, MenuItem, Select, TextField, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Grid, Paper} from '@mui/material';
import Navbar from '../../components/navbar/Navbar';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
//import api from '../../api/client';
import { AntecedentesPersonale } from '../../../../blood-bank-API/src/modules/antecedentes_personales/entities/antecedentes_personale.entity';
import { AntecedentesPersonales } from '../../../../blood-bank-API/src/modules/antecedentes_personales/schema/antecedentes_personales.schema';

// Datos iniciales ficticios para la historia clínica
const initialHistoryData = {
  generalData: {
    ci: '87051214567',
    nombre: 'Yudith',
    primer_apellido: 'Carbó',
    segundo_apellido: 'Fonte',
    edad: '38',
    sexo: 'F',
    color_piel: 'Blanca',
    no_hc: 'HC12345',
    estado_civil: 'Casada',
    municipio: 'Pinar del Rio',
    consejo_popular: 'Centro',
    no_consultorio: 'C-12',
    ocupacion: 'Ingeniera',
    cat_ocupacional: 'Docente',
    telefono: '55561234',
    centro_laboral: 'Universidad Hermanos Saiz',
    telefonoLaboral: '55585678',
    otra_localizacion: 'Sandino',
    grupo_sanguineo: 'A',
    factor: '+',
    estilo_vida: 'Activo',
    alimentacion: 'Buena',
    genero_vida: 'Vida Desordenada', 
    donante: 'Donante Controlado', // Radio seleccionado
  },

  // Antecedentes Patológicos Personales (APP)
  AntecedentesPersonales: [
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
  
  return (
     <>
    <Navbar/> 
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
                name="grupo_sanguineo"
                value={historyData.generalData.grupo_sanguineo}
                onChange={(e) => handleGeneralChange('grupo_sanguineo', e.target.value)}
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
          rows={historyData.AntecedentesPersonales}
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
      <Box sx={{ display: 'flex', justifyContent: 'center', 
          mt: 4,
          bottom: 20,
          zIndex: 1 }}>
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
            }}  onClick={handleGuardar}>
          Aceptar
        </Button>
      </Box>
     </Box>

    </>
  );
}
