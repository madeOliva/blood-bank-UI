import { DataGrid, GridColDef, GridRowParams, GridToolbar } from '@mui/x-data-grid';
  import { Box, Typography, Paper, styled } from '@mui/material';
  import Navbar from '../../components/navbar/Navbar';
  import { useState } from 'react';
import BotonPersonalizado from '../../components/Button';
  
  
  // Estilo optimizado para la tabla fija superior
const CompactTableContainer = styled(Paper)(({ theme }) => ({
    position: 'sticky',
    top: 0, // Pegado justo debajo del navbar
    zIndex: 2,
    margin: '0 auto',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    marginBottom: theme.spacing(1),
    width: 'fit-content', // Ancho ajustado al contenido
    maxWidth: '100%',
    overflow: 'hidden',
   
        
  }));
  
  
  // Columnas para la tabla de Solicitud de Componentes (solo lectura)
  const solicitudColumns: GridColDef[] = [
    { 
      field: 'componente', 
      headerName: 'Componente', 
      width: 120,
      valueOptions: ["CEPL", "CP", "PFC", "CRIO"],
      editable: false
    },
    { 
      field: 'grupo', 
      headerName: 'Grupo', 
      width: 80,
      editable: false
    },
    { 
      field: 'factor', 
      headerName: 'Factor', 
      width: 60,
      editable: false
    },
    { 
      field: 'cantidad', 
      headerName: 'Cantidad', 
      type: 'number',
      width: 90,
      editable: false
    },
    { 
      field: 'prioridad', 
      headerName: 'Prioridad', 
      width: 100,
      editable: false,
      valueOptions: ['Alta', 'Media', 'Baja']
    }
  ];

   // Datos de ejemplo para la tabla de Solicitud de Componentes
   const solicitudRows = [
    { id: 1, componente: 'CEPL', grupo: 'A', factor: '+', cantidad: 5, prioridad: 'Alta' },
    { id: 2, componente: 'CP', grupo: 'O', factor: '-', cantidad: 3, prioridad: 'Media' },
    { id: 3, componente: 'PFC', grupo: 'B', factor: '+', cantidad: 2, prioridad: 'Baja' },
    { id: 4, componente: 'CRIO', grupo: 'AB', factor: '+', cantidad: 1, prioridad: 'Alta' },
  ];
  
  // Columnas combinadas para Acta de Entrega + Centrifugación
  const actaCentrifugacionColumns: GridColDef[] = [
    // --- Datos del Acta de Entrega (no editables) ---
    
    { field: "no_consecutivo", 
        headerName: "No", 
        width: 50,
    },
    { 
      field: 'no_tubuladura', 
      headerName: 'No. Tubuladura', 
      width: 130,
      editable: false,
      // Este campo sirve como clave para relacionar ambas tablas
    },
    { 
      field: 'grupo_acta', 
      headerName: 'Grupo', 
      width: 60,
      editable: false
    },
    { 
      field: 'factor_acta', 
      headerName: 'Factor', 
      width: 60,
      editable: false
    },
    { field: "sexo", 
        headerName: "Sexo", 
        width: 60 
    },
    { field: "edad", 
        headerName: "Edad", 
        width: 60, 
        type: "number" 
    },
    { 
      field: 'volumen_acta', 
      headerName: 'Volumen (ml)', 
      type: 'number',
      width: 120,
      editable: false
    },
  
    
    // --- Datos de Centrifugación (editables) ---
    { 
      field: 'componente_a_obtener', 
      headerName: 'Componente a Obtener', 
      width: 180,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['CEPL', 'CP', 'PFC', 'CRIO']
    },
    { 
      field: 'no_centrifuga', 
      headerName: 'No. Centrífuga', 
      type: 'number',
      width: 120,
      editable: true
    },
    { 
      field: 'temperatura', 
      headerName: 'Temperatura (°C)', 
      type: 'number',
      width: 140,
      editable: true
    },
    { 
      field: 'velocidad', 
      headerName: 'Velocidad (RPM)', 
      type: 'number',
      width: 140,
      editable: true
    },
    {
        field: "fecha",
        headerName: "Fecha",
        type: "date",
        width: 120,
        editable: true,
        valueGetter: (params) => new Date(params),
      },
       {
      field: "es_desecho",
      headerName: "Desecho",
      type: "boolean",
      width: 100,
      editable: true,
    },
    {
      field: "causa",
      headerName: "Causa Desecho",
      width: 130,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Ictero", "Lipemia", "Hemolisis", "Otras"],
      renderCell: (params) => 
        params.row.es_desecho ? params.value : "---",
    },
    {
      field: "estado_componente",
      headerName: "Estado",
      width: 150,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Obtenido", "Baja"],
    },
  ];
  
 
  // Datos combinados para Acta de Entrega + Centrifugación
const actaCentrifugacionRows = [
    {
      id: 1,
      // Datos del acta (no editables)
      no_consecutivo: "1",no_tubuladura: 'TUB001', grupo_acta: 'A',factor_acta: 'Positivo',sexo: "M", edad: 35,volumen_acta: 450,
      
      // Datos de centrifugación (editables)
      componente_a_obtener: '',no_centrifuga: null,temperatura: null,velocidad: null,fecha: null,estado_componente: '', es_desecho: false,
      causa: "",
    },
    {
      id: 2,no_consecutivo: "2",no_tubuladura: 'TUB002',grupo_acta: 'O',factor_acta: 'Negativo',sexo: "F", edad: 32,volumen_acta: 480,
     
      componente_a_obtener: '',no_centrifuga: null,temperatura: null,velocidad: null,fecha: null
    },
    {
      id: 2,no_consecutivo: "2",no_tubuladura: 'TUB002',grupo_acta: 'O',factor_acta: 'Negativo',sexo: "F", edad: 32,volumen_acta: 480,
     
      componente_a_obtener: '',no_centrifuga: null,temperatura: null,velocidad: null,fecha: null
    },
    {
      id: 2,no_consecutivo: "2",no_tubuladura: 'TUB002',grupo_acta: 'O',factor_acta: 'Negativo',sexo: "F", edad: 32,volumen_acta: 480,
     
      componente_a_obtener: '',no_centrifuga: null,temperatura: null,velocidad: null,fecha: null
    },
    {
      id: 2,no_consecutivo: "2",no_tubuladura: 'TUB002',grupo_acta: 'O',factor_acta: 'Negativo',sexo: "F", edad: 32,volumen_acta: 480,
     
      componente_a_obtener: '',no_centrifuga: null,temperatura: null,velocidad: null,fecha: null
    },
    {
      id: 2,no_consecutivo: "2",no_tubuladura: 'TUB002',grupo_acta: 'O',factor_acta: 'Negativo',sexo: "F", edad: 32,volumen_acta: 480,
     
      componente_a_obtener: '',no_centrifuga: null,temperatura: null,velocidad: null,fecha: null
    },
    {
      id: 2,no_consecutivo: "2",no_tubuladura: 'TUB002',grupo_acta: 'O',factor_acta: 'Negativo',sexo: "F", edad: 32,volumen_acta: 480,
     
      componente_a_obtener: '',no_centrifuga: null,temperatura: null,velocidad: null,fecha: null
    },
    {
      id: 2,no_consecutivo: "2",no_tubuladura: 'TUB002',grupo_acta: 'O',factor_acta: 'Negativo',sexo: "F", edad: 32,volumen_acta: 480,
     
      componente_a_obtener: '',no_centrifuga: null,temperatura: null,velocidad: null,fecha: null
    },
    {
      id: 2,no_consecutivo: "2",no_tubuladura: 'TUB002',grupo_acta: 'O',factor_acta: 'Negativo',sexo: "F", edad: 32,volumen_acta: 480,
     
      componente_a_obtener: '',no_centrifuga: null,temperatura: null,velocidad: null,fecha: null
    }
  ];
  
  export default function EntradaProduccion() {
   // const theme = useTheme();
    const [rows, setRows] = useState(actaCentrifugacionRows);
    const [selectedRow, setSelectedRow] = useState<GridRowParams | null>(null);
    
     // Manejador para actualizar filas editadas
    const handleProcessRowUpdate = (newRow: any) => {
      const updatedRows = rows.map((row) => 
        row.id === newRow.id ? newRow : row
      );
      setRows(updatedRows);
      
      return newRow;
    };
  
      // Manejador para guardar datos
    const handleSave = () => {
      console.log('Datos guardados:', rows);
      
      // Lógica para guardar
    };
  
    return (
      <>
        <Navbar />
        <Box sx={{ 
          pt: 0, // Sin padding top para pegar la tabla
          }}>
          {/* --- Tabla Superior Fija --- */}
         
          <CompactTableContainer>
          <Typography 
            variant="h6" 
            sx={{ 
              p: 1,
              backgroundColor: 'primary.dark',
              textAlign: 'center',
              color: 'white',
              mt:8
            }}
          >
            Solicitud de Componentes 
          </Typography>
            <Box sx={{ 
              height: 265, // Altura fija reducida
             // width: 'fit-content', // Ancho ajustado al contenido
              }}>
              <DataGrid
                rows={solicitudRows}
                columns={solicitudColumns}
                disableRowSelectionOnClick
                sx={{
                  '& .MuiDataGrid-cell': {
                    cursor: 'default'
                  }
                }}
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 3 } // Paginación compacta
                      }
                    }}
                    pageSizeOptions={[10]}
                    editMode="row"
                  />
                </Box>
              </CompactTableContainer>
              
              
              {/* --- Botón de Guardado (Posición fija) --- */}
        <Box sx={{ 
          position: 'sticky',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          pr: 10,
          mb: 1
        }}>
          <BotonPersonalizado 
            onClick={handleSave} 
            sx={{ 
              width: 200,
              boxShadow: 3,
            }}
          >
            Guardar Cambios
          </BotonPersonalizado>
        </Box>



              {/* --- Tabla Principal --- */}
              <Typography variant="h6"  sx={{fontSize: {xs: "2rem", md: "2rem"}, backgroundColor: "primary.dark",  color: "white", top: 100}}>
                Proceso de Componentes
              </Typography>
              
              <Paper elevation={1} sx={{ height: '55vh' }}>
              
                <DataGrid
                  rows={rows}
                  columns={actaCentrifugacionColumns}
                  processRowUpdate={handleProcessRowUpdate}
                  onRowClick={setSelectedRow}
                  slots={{ toolbar: GridToolbar }}
                  slotProps={{
                    toolbar: {
                      showQuickFilter: true,
                    },
                  }}
                 
                  initialState={{
                    pagination: {
                      paginationModel: { pageSize: 10 }
                    }
                  }}
                  pageSizeOptions={[10]}
                  editMode="row"
                />
              </Paper>
              </Box>
            </>
        );
      }