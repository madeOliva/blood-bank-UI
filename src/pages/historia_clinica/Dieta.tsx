import React, { useState } from 'react';
import { Box, Button, Snackbar, Typography, TextField, Paper } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import dayjs, { Dayjs } from 'dayjs';
import Navbar from '../../components/navbar/Navbar';

interface Paciente {
  id: number;
  nombre: string;
  fechaUltimaDieta: string;
  fechaActualizar: Dayjs;
}

const pacientesIniciales: Paciente[] = [
  { id: 1, nombre: 'Maddie Buckley', fechaUltimaDieta: '22-11-2024', fechaActualizar: dayjs() },
  { id: 2, nombre: 'Fred Weasley', fechaUltimaDieta: '14-10-2024', fechaActualizar: dayjs() },
  { id: 3, nombre: 'Will Turner', fechaUltimaDieta: '2-10-2024', fechaActualizar: dayjs() },
  { id: 4, nombre: 'Yudith Carbó', fechaUltimaDieta: '7-8-2024', fechaActualizar: dayjs() },
  { id: 5, nombre: 'Eddie Diaz', fechaUltimaDieta: '16-9-2024', fechaActualizar: dayjs() },
];

export default function DietaPacientes() {
  const [rows, setRows] = useState<Paciente[]>(pacientesIniciales);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Manejador para cambiar la fecha
  const handleDateChange = (id: number, newDate: Dayjs | null) => {
    if (!newDate) return;
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, fechaActualizar: newDate } : row
      )
    );
  };

  // Manejador para el botón aceptar
  const handleGuardar = () => {
    setSnackbarOpen(true);
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
    },
    {
      field: 'nombre',
      headerName: 'Nombre y Apellidos',
      flex: 1,
      minWidth: 250,  // Aumentado para mostrar nombres completos
      headerAlign: 'center',
      align: 'left',
      sortable: true,
      renderCell: (params) => (
        <Typography fontWeight={700} sx={{ whiteSpace: 'normal', lineHeight: '1.2' }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'fechaUltimaDieta',
      headerName: 'Fecha Última Dieta',
      flex: 1,
      minWidth: 180,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      renderCell: (params) => (
        <Typography fontWeight={700}>{params.value}</Typography>
      ),
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
            maxDate={dayjs()}
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
      <Navbar/>
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
        
        {/* Mensaje de guardado */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2500}
          onClose={() => setSnackbarOpen(false)}
          message="¡Las fechas de dieta se actualizaron correctamente!"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          sx={{ 
            '& .MuiSnackbarContent-root': {
              fontSize: '1.1rem',
              padding: '12px 24px',
              borderRadius: 2
            } 
          }}
        />
      </Box>
    </>
  );
}
