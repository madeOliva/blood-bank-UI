import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button, Snackbar } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

const ListadoPacientes = () => {
  const navigate = useNavigate();
  type Paciente = {
    _id: string;
    ci: string;
    nombre: string;
    primer_apellido: string;
    segundo_apellido: string;
  };

  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [nuevoPaciente, setNuevoPaciente] = useState({
    ci: '',
    nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
  });

  const [busquedaCI, setBusquedaCI] = useState("");

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

  const handleBuscarPorCI = async () => {
    if (!busquedaCI.trim()) return;
    // Busca en la lista actual primero
    const encontrado = pacientes.find(p => p.ci === busquedaCI.trim());
    if (encontrado) {
      // Mueve el paciente al principio
      setPacientes(prev => [encontrado, ...prev.filter(p => p._id !== encontrado._id)]);
      setSnackbarMessage('Paciente encontrado y movido al inicio');
      setSnackbarOpen(true);
    } else {
      // Si no está, intenta buscar en el backend
      try {
        const res = await axios.get(`http://localhost:3000/historia-clinica/ci/${busquedaCI.trim()}`);
        if (res.data && res.data._id) {
          setPacientes(prev => [res.data, ...prev]);
          setSnackbarMessage('Paciente encontrado y agregado a la lista');
          setSnackbarOpen(true);
        } else {
          setSnackbarMessage('No existe un paciente con ese CI');
          setSnackbarOpen(true);
        }
      } catch {
        setSnackbarMessage('No existe un paciente con ese CI');
        setSnackbarOpen(true);
      }
    }
    setBusquedaCI("");
  };

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

  const soloLetras = (texto: string) => /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(texto);

  const validarCI = (ci: string): string => {
    if (!/^\d{11}$/.test(ci))
      return "El CI debe tener exactamente 11 dígitos numéricos.";
    const mes = parseInt(ci.slice(2, 4), 10);
    const dia = parseInt(ci.slice(4, 6), 10);
    if (mes < 1 || mes > 12) return "El mes en el CI no es válido.";
    if (dia < 1 || dia > 31) return "El día en el CI no es válido.";
    return "";
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

    // Validación de CI
    const ciError = validarCI(nuevoPaciente.ci.trim());
    if (ciError) {
      setSnackbarMessage(ciError);
      setSnackbarOpen(true);
      return;
    }

    // Validación de solo letras
    if (
      !soloLetras(nuevoPaciente.nombre) ||
      !soloLetras(nuevoPaciente.primer_apellido) ||
      !soloLetras(nuevoPaciente.segundo_apellido)
    ) {
      setSnackbarMessage('Nombre y apellidos solo deben contener letras');
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

        <Box sx={{ width: '90%', display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <TextField
            label="Buscar por CI"
            value={busquedaCI}
            onChange={e => setBusquedaCI(e.target.value.replace(/\D/g, '').slice(0, 11))}
            onKeyDown={e => { if (e.key === 'Enter') handleBuscarPorCI(); }}
            sx={{ width: 250, mr: 2 }}
            inputProps={{ maxLength: 11 }}
          />
          <IconButton
            onClick={handleBuscarPorCI}
            sx={{
              color: '#009688',
              ml: 1,
              '&:hover': {
                backgroundColor: '#e0f2f1',
              }
            }}
          >
            <SearchIcon />
          </IconButton>
        </Box>

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
            pageSize={5}                // Muestra 5 filas por página
            rowsPerPageOptions={[5, 10, 20]} // Opciones de filas por página
            pagination
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
              onChange={e => {
                // Solo permite números y máximo 11 caracteres
                const value = e.target.value.replace(/\D/g, '').slice(0, 11);
                setNuevoPaciente({ ...nuevoPaciente, ci: value });
              }}
              sx={{ mb: 2 }}
              inputProps={{ maxLength: 11 }}
              error={!!nuevoPaciente.ci && !!validarCI(nuevoPaciente.ci)}
              helperText={nuevoPaciente.ci ? validarCI(nuevoPaciente.ci) : ""}
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
              error={!!nuevoPaciente.nombre && !soloLetras(nuevoPaciente.nombre)}
              helperText={
                nuevoPaciente.nombre && !soloLetras(nuevoPaciente.nombre)
                  ? "Solo se permiten letras"
                  : ""
              }
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
              error={!!nuevoPaciente.primer_apellido && !soloLetras(nuevoPaciente.primer_apellido)}
              helperText={
                nuevoPaciente.primer_apellido && !soloLetras(nuevoPaciente.primer_apellido)
                  ? "Solo se permiten letras"
                  : ""
              }
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
              error={!!nuevoPaciente.segundo_apellido && !soloLetras(nuevoPaciente.segundo_apellido)}
              helperText={
                nuevoPaciente.segundo_apellido && !soloLetras(nuevoPaciente.segundo_apellido)
                  ? "Solo se permiten letras"
                  : ""
              }
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