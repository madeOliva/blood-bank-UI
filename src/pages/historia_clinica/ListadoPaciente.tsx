import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button, Snackbar } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';

const ListadoPacientes = () => {
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [nuevoPaciente, setNuevoPaciente] = useState({
    ci: '',
    nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
  });

  // Cargar pacientes desde el backend
  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const res = await axios.get("http://localhost:3000/historia-clinica");
        setPacientes(res.data);
      } catch (error) {
        setSnackbarMessage('Error al cargar pacientes');
        setSnackbarOpen(true);
      }
    };
    fetchPacientes();
  }, []);

  // Navegar a la vista de historia clínica
  const handleVerHistoriaClinica = (idPaciente) => {
    navigate(`/visualizarhc/${idPaciente}`);
  };

  // Navegar a la creación de historia clínica
  const handleCrearHistoriaClinica = (idPaciente) => {
    navigate(`/crearhc/${idPaciente}`);
  };

  // Abrir diálogo
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // Cerrar diálogo
  const handleCloseDialog = () => {
  setOpenDialog(false);
  setNuevoPaciente({ ci: '', nombre: '', primer_apellido: '', segundo_apellido: '' });
};

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    setNuevoPaciente({
      ...nuevoPaciente,
      [e.target.name]: e.target.value,
    });
  };

  // Agregar paciente al backend
  const agregarPaciente = async () => {
    if (
      nuevoPaciente.ci.trim() === '' ||
      nuevoPaciente.nombre.trim() === '' ||
      nuevoPaciente.primer_apellido.trim() === '' ||
      nuevoPaciente.segundo_apellido.trim() === ''
    ) {
      setSnackbarMessage('Todos los campos son obligatorios');
      setSnackbarOpen(true);
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/historia-clinica", {
        nombre: nuevoPaciente.nombre,
        primer_apellido: nuevoPaciente.primer_apellido,
        segundo_apellido: nuevoPaciente.segundo_apellido,
        ci: nuevoPaciente.ci,
      });
      setPacientes([...pacientes, res.data]);
      handleCloseDialog();
      handleCrearHistoriaClinica(res.data._id); // Navega usando el id real del backend
    } catch (error) {
       if (error.response?.status === 409) {
      setSnackbarMessage('El CI ya existe. No se puede repetir.');
    } else {
      setSnackbarMessage('Error al agregar paciente');
    }
      setSnackbarOpen(true);
    }
  };

  // Eliminar paciente del backend
  const eliminarPaciente = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/historia-clinica/${id}`);
      setPacientes(pacientes.filter(p => p._id !== id));
      setSnackbarMessage('Paciente eliminado correctamente');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('Error al eliminar paciente');
      setSnackbarOpen(true);
    }
  };

  // Columnas del DataGrid
  const columns = [
    {
      field: 'nombre',
      headerName: 'Nombre',
      width: 200,
      renderCell: (params) => (
        <Typography fontWeight={500} sx={{ fontSize: '1.1rem' }}>
          {params.row.nombre}
        </Typography>
      ),
    },
    {
      field: 'primer_apellido',
      headerName: 'Primer Apellido',
      width: 200,
      renderCell: (params) => (
        <Typography fontWeight={500} sx={{ fontSize: '1.1rem' }}>
          {params.row.primer_apellido}
        </Typography>
      ),
    },
    {
      field: 'segundo_apellido',
      headerName: 'Segundo Apellido',
      width: 200,
      renderCell: (params) => (
        <Typography fontWeight={500} sx={{ fontSize: '1.1rem' }}>
          {params.row.segundo_apellido}
        </Typography>
      ),
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 200,
      sortable: false,
      filterable: false,
      align: 'center',
      renderCell: (params) => (
        <Box>
          <IconButton
            color="primary"
            onClick={() => handleVerHistoriaClinica(params.row._id)}
            title="Ver historia clínica"
            sx={{ mr: 1 }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => eliminarPaciente(params.row._id)}
            title="Eliminar paciente"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <>
      <Navbar />

      <Typography
        variant="h4"
        component="h5"
        mt={8}
        sx={{
          fontSize: { xs: "2rem", md: "3rem" },
          backgroundColor: "#009688",
          textAlign: "center",
          fontFamily: "sans-serif",
          color: "white",
          py: 2
        }}
      >
        Listado de Pacientes
      </Typography>

      <Box
        sx={{
          width: '100vw',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: 4,
        }}
      >
        {/* Botón de agregar paciente */}
        <Box sx={{
          width: '90%',
          display: 'flex',
          justifyContent: 'flex-end',
          mb: 2
        }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenDialog}
            sx={{
              backgroundColor: '#009688',
              color: 'white',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#00796b',
              }
            }}
          >
            Nuevo Paciente
          </Button>
        </Box>

        {/* Tabla de pacientes */}
        <Box
          sx={{
            width: '90%',
            maxWidth: 900,
            bgcolor: '#eed4d4',
            borderRadius: 2,
            boxShadow: 3,
            overflow: 'hidden'
          }}
        >
          <DataGrid
            autoHeight
            rows={pacientes}
            columns={columns}
            getRowId={(row) => row._id}
            hideFooter
            disableColumnMenu
            disableSelectionOnClick
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                bgcolor: '#009688',
                color: '#009688',
                fontWeight: 'bold',
                fontSize: '1.1rem',
              },
              '& .MuiDataGrid-cell': {
                fontSize: '1rem',
              },
              '& .MuiDataGrid-row': {
                minHeight: 60,
                maxHeight: 60,
                '&:nth-of-type(even)': {
                  backgroundColor: '#f9f9f9',
                },
                '&:hover': {
                  backgroundColor: '#e0f7fa',
                }
              },
            }}
          />
        </Box>

        {/* Diálogo para agregar nuevo paciente */}
        <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
          <DialogTitle sx={{ bgcolor: '#009688', color: '#fff' }}>
            Agregar nuevo paciente
          </DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
            <TextField
              margin="dense"
              label="CI"
              name="ci"
              type="text"
              fullWidth
              variant="outlined"
              value={nuevoPaciente.ci}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Nombre"
              name="nombre"
              type="text"
              fullWidth
              variant="outlined"
              value={nuevoPaciente.nombre}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Primer Apellido"
              name="primer_apellido"
              type="text"
              fullWidth
              variant="outlined"
              value={nuevoPaciente.primer_apellido}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Segundo Apellido"
              name="segundo_apellido"
              type="text"
              fullWidth
              variant="outlined"
              value={nuevoPaciente.segundo_apellido}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button
              onClick={handleCloseDialog}
              variant="outlined"
              sx={{ color: '#009688', borderColor: '#009688' }}
            >
              Cancelar
            </Button>
            <Button
              onClick={agregarPaciente}
              variant="contained"
              sx={{
                backgroundColor: '#009688',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#00796b',
                }
              }}
            >
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>

        {/* Mensajes de snackbar */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          sx={{
            '& .MuiSnackbarContent-root': {
              backgroundColor: '#009688',
              color: 'white',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              borderRadius: 2
            }
          }}
        />
      </Box>
    </>
  );
};

export default ListadoPacientes;