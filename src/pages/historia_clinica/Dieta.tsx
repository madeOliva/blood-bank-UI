import React, { useEffect, useState } from 'react';
import { Box, Button, Snackbar, Typography, TextField, Paper, Modal } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import dayjs, { Dayjs } from 'dayjs';
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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

type PacienteDieta = {
  id: string;
  nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  fechaDieta: string;
  fechaActualizar: Dayjs;
};

export default function DietaPacientes() {
  const [rows, setRows] = useState<PacienteDieta[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);


  useEffect(() => {
    axios.get('http://localhost:3000/historia-clinica/donantes-activos')
      .then(res => {
        const pacientesConDieta = res.data
          .filter((p: any) => p.fechaDieta && p.fechaDieta.trim() !== '')
          .map((p: any, idx: number) => ({
            id: p._id,
            nombre: p.nombre,
            primer_apellido: p.primer_apellido,
            segundo_apellido: p.segundo_apellido,
            fechaDieta: p.fechaDieta,
            fechaActualizar: dayjs(),
          }));
        setRows(pacientesConDieta);
      });
  }, []);

  const handleGuardar = async () => {
    // Envía la actualización para cada paciente
    try {
      await Promise.all(
        rows.map(row =>
          axios.put(`http://localhost:3000/historia-clinica/${row.id}`, {
            fechaDieta: row.fechaActualizar.format('YYYY-MM-DD'),
          })
        )
      );
      setSnackbarOpen(true);
    } catch (error) {
      alert('Error al actualizar las fechas de dieta');
    }
  };

  // Manejador para cambiar la fecha
  const handleDateChange = (id: string, newDate: Dayjs | null) => {
    if (!newDate) return;
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, fechaActualizar: newDate } : row
      )
    );
  };

  // Columnas del DataGrid
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'No.',
      width: 70,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
    },
    {
      field: 'nombre',
      headerName: 'Nombre',
      flex: 1,
      minWidth: 250,
      headerAlign: 'center',
      align: 'left',
      sortable: true,
    },
    {
      field: 'primer_apellido',
      headerName: 'Primer Apellido',
      flex: 1,
      minWidth: 250,
      headerAlign: 'center',
      align: 'left',
      sortable: true,
    },
    {
      field: 'segundo_apellido',
      headerName: 'Segundo Apellido',
      flex: 1,
      minWidth: 250,
      headerAlign: 'center',
      align: 'left',
      sortable: true,
    },
    {
      field: 'fechaDieta',
      headerName: 'Fecha Última Dieta',
      flex: 1,
      minWidth: 180,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
    },
    {
      field: 'fechaActualizar',
      headerName: 'Actualizar Dieta',
      flex: 1,
      minWidth: 200,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      renderCell: (params) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={params.row.fechaActualizar}
            onChange={(newDate) => handleDateChange(params.row.id, newDate)}
            format="DD-MM-YYYY"
            slots={{
              openPickerIcon: CalendarTodayIcon,
            }}
            slotProps={{
              textField: {
                size: 'small',
                sx: { width: '150px', background: '#fff' },  // Aumentado el ancho
                inputProps: { style: { textAlign: 'center' } },
              },
            }}
          />
        </LocalizationProvider>
      ),
    },
  ];

  return (
    <>
      <Navbar />
      <Box sx={{
        width: '95%',  // Cambiado a 95% para más espacio
        maxWidth: 1400,  // Máximo ancho
        mx: 'auto',
        mt: 6,
        mb: 4
      }}>
        {/* Listón de título */}
        <Typography
          variant="h4"
          component="h5"
          sx={{
            fontSize: { xs: "2rem", md: "3rem" },
            backgroundColor: "primary.dark",
            color: "white",
            textAlign: "center",
            marginBlock: 5,
            mt: 8,
          }}
        >
          Listado de Pacientes con Dieta
        </Typography>

        {/* Tabla */}
        <Paper
          elevation={3}
          sx={{
            borderRadius: 2,
            overflow: 'hidden',
            height: 'calc(100vh - 340px)'  // Altura dinámica
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            autoHeight={false}  // Desactivado para usar altura fija
            hideFooter
            disableColumnMenu
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                background: '#f5f5f5',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                borderBottom: '2px solid #ddd'
              },
              '& .MuiDataGrid-cell': {
                fontSize: '1rem',
                padding: '8px 16px',
              },
              '& .MuiDataGrid-row': {
                minHeight: '70px !important',
                maxHeight: 'none !important',
                '&:nth-of-type(odd)': {
                  backgroundColor: '#fafafa',
                },
              },
              '& .MuiDataGrid-virtualScroller': {
                overflowX: 'hidden',  // Evita doble scroll
              }
            }}
            getRowId={(row) => row.id}
            initialState={{
              sorting: {
                sortModel: [{ field: 'nombre', sort: 'asc' }],
              },
            }}
          />
        </Paper>

        {/* Botón aceptar */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 4,
          bottom: 20,
          zIndex: 1
        }}>
          <Button
            variant="contained"
            sx={{
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
            }}
            onClick={handleGuardar}
          >
            Guardar
          </Button>
        </Box>

        <Modal
          open={snackbarOpen}
          onClose={() => setSnackbarOpen(false)}
        >
          <Box sx={modalStyle}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              ¡Las fechas de dieta se actualizaron correctamente!
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setSnackbarOpen(false)}
              sx={{ mt: 2 }}
            >
              Aceptar
            </Button>
          </Box>
        </Modal>
      </Box>
    </>
  );
}
