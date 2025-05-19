// Importaciones necesarias de React, Material UI y React Router
import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';

// Clave para el localStorage
const LOCAL_STORAGE_KEY = 'pacientesData';

// Datos iniciales de ejemplo
const initialPacientes = [
  { id: 1, nombre: 'Albus Bryan Dumbledore' },
  { id: 2, nombre: 'Pathy Halliwell' },
  { id: 3, nombre: 'Fred Weasley' },
  { id: 4, nombre: 'Will Turner' },
  { id: 5, nombre: 'Maddie Buckley' },
];

// Componente principal
const ListadoPacientes = () => {
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState([]);

  // Cargar datos del localStorage al iniciar
  useEffect(() => {
    const savedPacientes = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedPacientes) {
      setPacientes(JSON.parse(savedPacientes));
    } else {
      setPacientes(initialPacientes);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialPacientes));
    }
  }, []);

  // Estado para el diálogo de nuevo paciente
  const [openDialog, setOpenDialog] = useState(false);
  const [nuevoPaciente, setNuevoPaciente] = useState({
    nombre: '',
  });

  // Función para guardar pacientes en el localStorage
  const savePacientes = (pacientesToSave) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(pacientesToSave));
  };

  // Función para navegar a la vista de historia clínica
  const handleVerHistoriaClinica = (idPaciente) => {
    navigate(`/visualizarhc/${idPaciente}`);
  };

  // Definición de las columnas para el DataGrid
  const columns = [
    {
      field: 'id',
      headerName: 'No.',
      width: 70,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'nombre',
      headerName: 'Nombre y Apellidos:',
      flex: 1,
      minWidth: 250,
    },
    {
      field: 'acciones',
      headerName: '',
      width: 80,
      sortable: false,
      filterable: false,
      align: 'center',
      renderCell: (params) => (
        <IconButton
          color="primary"
          onClick={() => handleVerHistoriaClinica(params.row.id)}
          title="Visualizar/VisualizarHC"
        >
          <EditIcon />
        </IconButton>
      ),
    },
  ];

  // Función para abrir el diálogo de nuevo paciente
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // Función para cerrar el diálogo
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNuevoPaciente({ nombre: '' });
  };

  // Función para manejar cambios en el input
  const handleInputChange = (e) => {
    setNuevoPaciente({
      ...nuevoPaciente,
      nombre: e.target.value,
    });
  };

  // Función para agregar nuevo paciente
  const agregarPaciente = () => {
    if (nuevoPaciente.nombre.trim() === '') return;

    const nuevoId = pacientes.length > 0 ? Math.max(...pacientes.map(p => p.id)) + 1 : 1;
    const nuevosPacientes = [
      ...pacientes,
      {
        id: nuevoId,
        nombre: nuevoPaciente.nombre,
      },
    ];

    setPacientes(nuevosPacientes);
    savePacientes(nuevosPacientes);
    handleCloseDialog();
  };

  return (
    <>
      <Navbar />

      <Typography
        variant="h4"
        component="h5"
        mt={8}
        sx={{ fontSize: { xs: "2rem", md: "3rem" }, backgroundColor: "primary.dark", textAlign: "center", fontFamily: "sans-serif", color: "white" }}
      >
        Listado de Pacientes
      </Typography>
      <Box
        sx={{
          width: '100vw',
          minHeight: '100vh',
          bgcolor: '',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: 4,
        }}
      >
        {/* Encabezado de la aplicación */}
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            bgcolor: '#fff',
            mb: 4,
            px: 2,
            py: 1,
            position: 'relative',
          }}
        >
          {/* Botón de agregar paciente en la esquina superior derecha */}
          <Box sx={{ position: 'absolute', right: 24, mt: 10 }}>
            <IconButton sx={{ color: "#009688" }}

              size="large"
              onClick={handleOpenDialog}
              title="Agregar nuevo paciente"
            >
              <AddIcon fontSize="large" />
            </IconButton>
          </Box>
        </Box>

        {/* Título de la tabla */}
        <Box
          sx={{
            width: 600,
            bgcolor: '#009688',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            px: 2,
            py: 1,
          }}
        >
          <Typography variant="h5" color="white" align="center">
            Pacientes
          </Typography>
        </Box>

        {/* Tabla de pacientes */}
        <Box
          sx={{
            width: 600,
            bgcolor: '#fff',
            border: '1px solid #ccc',
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            boxShadow: 2,
          }}
        >
          <DataGrid
            autoHeight
            rows={pacientes}
            columns={columns}
            hideFooter
            disableColumnMenu
            disableSelectionOnClick
            
            sx={{height: 400,
              border: 'none',
              '.MuiDataGrid-columnHeaders': {
                bgcolor: '#f5f5f5',
                fontWeight: 'bold',
                fontSize: 16,
              },
              '.MuiDataGrid-cell': {
                fontSize: 15,
              },
              '.MuiDataGrid-row': {
                minHeight: 48,
                maxHeight: 48,
              },
            }}
          />
        </Box>

        {/* Diálogo para agregar nuevo paciente */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Agregar nuevo paciente</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Nombre completo"
              type="text"
              fullWidth
              variant="standard"
              value={nuevoPaciente.nombre}
              onChange={handleInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button onClick={agregarPaciente}>Agregar</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>

  );
};

export default ListadoPacientes;

