import { DataGrid, GridColDef, GridRowParams, GridToolbar } from '@mui/x-data-grid';
import { Box, Typography, Paper, Button, Dialog, DialogTitle, DialogContent, DialogContentText, Stack, TextField, IconButton } from '@mui/material';
import Navbar from '../../components/navbar/Navbar';
import { useEffect, useState, useMemo, useCallback } from "react";
import BotonPersonalizado from '../../components/Button';
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

// Definición de interfaces
interface Componentes {
  componente: string;
  volumen: number | string;
  fecha_obtencion: string;
}

interface ActaRow {
  id: number;
  no_consecutivo: string;
  no_hc: string;
  grupo_acta: string;
  factor_acta: string;
  sexo: string;
  edad: number;
  volumen_acta: number;
  componente_a_obtener: string;
  no_centrifuga: number | null;
  temperatura: number | null;
  velocidad: number | null;
  estado_obtencion: string;
  causa_baja?: string;
  componentes: Componentes[];
}

interface SolicitudRow {
  id: number;
  componente: string;
  grupo: string;
  factor: string;
  cantidad: number;
  prioridad: string;
}

const solicitudColumns: GridColDef[] = [
  { field: 'componente', headerName: 'Componente', width: 150, valueOptions: ["CEPL", "CP", "PFC", "CRIO"], editable: false },
  { field: 'grupo', headerName: 'Grupo', width: 100, editable: false },
  { field: 'factor', headerName: 'Factor', width: 80, editable: false },
  { field: 'cantidad', headerName: 'Cantidad', type: 'number', width: 80, editable: false },
  { field: 'prioridad', headerName: 'Prioridad', width: 110, editable: false, valueOptions: ['Alta', 'Media', 'Baja'] }
];

const solicitudRows: SolicitudRow[] = [
  { id: 1, componente: 'CEPL', grupo: 'A', factor: '+', cantidad: 5, prioridad: 'Alta' },
  { id: 2, componente: 'CP', grupo: 'O', factor: '-', cantidad: 3, prioridad: 'Media' },
  { id: 3, componente: 'PFC', grupo: 'B', factor: '+', cantidad: 2, prioridad: 'Baja' },
  { id: 4, componente: 'CRIO', grupo: 'AB', factor: '+', cantidad: 1, prioridad: 'Alta' },
];

const initialActaRows: ActaRow[] = [
  {
    id: 1,
    no_consecutivo: "1",
    no_hc: 'TUB001',
    grupo_acta: 'A',
    factor_acta: '+',
    sexo: "M",
    edad: 35,
    volumen_acta: 450,
    componente_a_obtener: '',
    no_centrifuga: null,
    temperatura: null,
    velocidad: null,
    estado_obtencion: '',
    componentes: []
  },
  {
    id: 2,
    no_consecutivo: "2",
    no_hc: 'TUB002',
    grupo_acta: 'O',
    factor_acta: '-',
    sexo: "F",
    edad: 32,
    volumen_acta: 480,
    componente_a_obtener: '',
    no_centrifuga: null,
    temperatura: null,
    velocidad: null,
    estado_obtencion: '',
    componentes: []
  }
   
];

export default function EntradaProduccion() {
  const [rows, setRows] = useState<ActaRow[]>(initialActaRows);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [openEmptyFieldsModal, setOpenEmptyFieldsModal] = useState(false);
  const [openComponentesModal, setOpenComponentesModal] = useState(false);
  const [componentesTemp, setComponentesTemp] = useState<Componentes[]>([]);
  const [componentesRowId, setComponentesRowId] = useState<number | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<number, string[]>>({});

  // Efectos para cerrar modales automáticamente
  useEffect(() => {
    if (openModal) {
      const timer = setTimeout(() => setOpenModal(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [openModal]);

  useEffect(() => {
    if (openEmptyFieldsModal) {
      const timer = setTimeout(() => setOpenEmptyFieldsModal(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [openEmptyFieldsModal]);

  // Funciones de validación
 // Función de validación de fecha
const isValidDate = (dateString: string): boolean => {
  return !isNaN(Date.parse(dateString));
};

// Función para validar que la fecha es hoy o en el futuro
const isTodayOrFutureDate = (dateString: string): boolean => {
  if (!isValidDate(dateString)) return false;
  
  const inputDate = new Date(dateString);
  const today = new Date();
  
  // Normalizamos las fechas para comparar solo día, mes y año
  const normalizedInput = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());
  const normalizedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  
  return normalizedInput.getTime() >= normalizedToday.getTime();
};

  const isEmpty = (value: any) => 
    value === null || value === undefined || value === '';

  const validateRow = (row: ActaRow): string[] => {
    const errors: string[] = [];

    // Validar campos obligatorios
    if (isEmpty(row.componente_a_obtener)) {
      errors.push("Componente a obtener es requerido");
    }
    if (isEmpty(row.no_centrifuga)) {
      errors.push("Número de centrífuga es requerido");
    }
    if (isEmpty(row.temperatura)) {
      errors.push("Temperatura es requerida");
    }
    if (isEmpty(row.velocidad)) {
      errors.push("Velocidad es requerida");
    }
    if (isEmpty(row.estado_obtencion)) {
      errors.push("Estado del componente es requerido");
    }

    // Validar rangos numéricos
    if (row.no_centrifuga !== null && (Number(row.no_centrifuga) < 1 || Number(row.no_centrifuga) > 10)) {
      errors.push("Número de centrífuga debe estar entre 1 y 10");
    }

    if (row.temperatura !== null && !(Number(row.temperatura) === 4 || Number(row.temperatura) === 22)) {
      errors.push("Temperatura debe ser 4°C o 22°C");
    }

    if (row.velocidad !== null && !(Number(row.velocidad) === 2500 || Number(row.velocidad) === 3000)) {
      errors.push("Velocidad debe ser 2500 RPM o 3000 RPM");
    }

    // Validar componentes obtenidos si estado es "Obtenido"
    if (row.estado_obtencion === "Obtenido") {
      if (!row.componentes || row.componentes.length === 0) {
        errors.push("Debe agregar al menos un componente obtenido");
      } else {
        row.componentes.forEach((comp, index) => {
          if (isEmpty(comp.componente)) {
            errors.push(`Componente obtenido ${index + 1}: Tipo es requerido`);
          }
          if (isEmpty(comp.volumen)) {
            errors.push(`Componente obtenido ${index + 1}: Volumen es requerido`);
          } else if (isNaN(Number(comp.volumen)) || Number(comp.volumen) <= 0) {
            errors.push(`Componente obtenido ${index + 1}: Volumen debe ser un número positivo`);
          }
          if (isEmpty(comp.fecha_obtencion)) {
          errors.push(`Componente obtenido ${index + 1}: Fecha es requerida`);
        } else if (!isTodayOrFutureDate(comp.fecha_obtencion)) {
          errors.push(`Componente obtenido ${index + 1}: La fecha no puede ser anterior al día actual`);
        }
      });
    }
  }
  
    // Validar causa si estado es "Baja"
    if (row.estado_obtencion === "Baja" && isEmpty(row.causa_baja)) {
      errors.push("Causa de baja es requerida");
    }

    return errors;
  };

  const hasInvalidFields = useCallback(() => {
    const errors: Record<number, string[]> = {};
    let hasErrors = false;

    rows.forEach(row => {
      const rowErrors = validateRow(row);
      if (rowErrors.length > 0) {
        errors[row.id] = rowErrors;
        hasErrors = true;
      }
    });

    setValidationErrors(errors);
    return hasErrors;
  }, [rows]);

  // Manejo de actualización de filas
  const handleProcessRowUpdate = useCallback((newRow: ActaRow) => {
    setRows(prevRows =>
      prevRows.map(row =>
        row.id === newRow.id ? { ...row, ...newRow } : row
      )
    );
    return newRow;
  }, []);

  // Guardar datos
  const handleSave = useCallback(() => {
    if (hasInvalidFields()) {
      setOpenEmptyFieldsModal(true);
    } else {
      // Lógica para guardar en la base de datos
      console.log("Componentes guardados:", rows);
      setOpenModal(true);
    }
  }, [hasInvalidFields, rows]);

  // Manejo de componentes obtenidos
  const handleAddComponentesObtenidos = useCallback((rowId: number) => {
    const row = rows.find(r => r.id === rowId);
    if (row) {
      setComponentesTemp(row.componentes ? [...row.componentes] : []);
      setComponentesRowId(rowId);
      setOpenComponentesModal(true);
    }
  }, [rows]);

  const handleComponentesChange = useCallback((idx: number, field: string, value: any) => {
    setComponentesTemp(prev => prev.map((comp, i) =>
      i === idx ? { ...comp, [field]: value } : comp
    ));
  }, []);

  const handleAddComponente = useCallback(() => {
    if (componentesTemp.length < 3) {
      setComponentesTemp(prev => [...prev, { componente: '', volumen: '', fecha_obtencion: '' }]);
    }
  }, [componentesTemp.length]);

  const handleRemoveComponente = useCallback((idx: number) => {
    setComponentesTemp(prev => prev.filter((_, i) => i !== idx));
  }, []);

  const handleSaveComponentes = useCallback(() => {
    if (componentesRowId === null) return;
    
    const row = rows.find(r => r.id === componentesRowId);
    if (!row || row.estado_obtencion !== "Obtenido") {
      // Mostrar error si el estado no es "Obtenido"
      return;
    }

    setRows(prevRows =>
      prevRows.map(row =>
        row.id === componentesRowId
          ? { ...row, componentes_obtenidos: [...componentesTemp] }
          : row
      )
    );
    setOpenComponentesModal(false);
  }, [componentesRowId, componentesTemp, rows]);

  const handleRowClick = useCallback((params: GridRowParams) => {
    setSelectedRow(params.id as number);
  }, []);

  // Memoizar las columnas para mejorar rendimiento
 const procesoColumns = useMemo(() => {
  const baseColumns: GridColDef[] = [
    { field: "no_consecutivo", headerName: "No", width: 70 },
    { field: 'no_hc', headerName: 'No. HC', width: 100, editable: false },
    { field: 'grupo_acta', headerName: 'Grupo', width: 60, editable: false },
    { field: 'factor_acta', headerName: 'Factor', width: 60, editable: false },
    { field: "sexo", headerName: "Sexo", width: 50 },
    { field: "edad", headerName: "Edad", width: 60, type: "number" },
    { field: 'volumen_acta', headerName: 'Vol.(ml)', width: 70, type: 'number', editable: false },
    { 
      field: 'componente_a_obtener', 
      headerName: 'Comp. a Obtener', 
      width: 140, 
      editable: true, 
      type: 'singleSelect', 
      valueOptions: ['CEPL','CEAD','CE','CP','SP','SC','PC', 'PFC', 'CRIO'] 
    },
    { field: 'no_centrifuga', headerName: 'No. Centrífuga', type: 'number', width: 120, editable: true },
    { field: 'temperatura', headerName: 'Temp.(°C)', type: 'number', width: 90, editable: true },
    { field: 'velocidad', headerName: 'Velocidad(rev)', type: 'number', width: 120, editable: true },
    { 
      field: "estado_obtencion", 
      headerName: "Estado Obtencion", 
      width: 140, 
      editable: true, 
      type: "singleSelect", 
      valueOptions: ["Obtenido", "Baja", "Pendiente"] 
    }
  ];

  if (!selectedRow) return baseColumns;

  const rowData = rows.find(row => row.id === selectedRow);

  // Columnas adicionales según el estado
  const additionalColumns: GridColDef[] = [];

  if (rowData?.estado_obtencion === "Baja") {
    additionalColumns.push({
      field: "causa_baja",
      headerName: "Causa Baja",
      width: 100,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Ictero", "Lipemia", "Hemolisis", "Rotura"]
    });
  }

  if (rowData?.estado_obtencion === "Obtenido") {
    additionalColumns.push({
      field: "acciones",
      headerName: "Comp. Obtenidos",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="outlined"
          size="small"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => handleAddComponentesObtenidos(params.row.id)}
        >
          Agregar/Ver
        </Button>
      )
    });
  }

  return [...baseColumns, ...additionalColumns];
}, [selectedRow, rows, handleAddComponentesObtenidos]);

  return (
    <>
      <Navbar />
      <Box sx={{
        p: 1,
        display: 'flex',
        flexDirection: 'column',
        //gap: 0,
        height: 'calc(100vh - 0px)',
        overflow: 'hidden'
      }}>
        {/* Contenedor para tabla solicitud y botón */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          minWidth: '1000px',
         zIndex: 2,
         backgroundColor: 'background.paper',
         pt: 1,
         pb: 0,
       
        }}>
          {/* Tabla Solicitud */}
          <Paper sx={{
            width: 'fit-content',
            ml: { xs: 1, md: 5 },
            flexShrink: 0,
            mb: 0,
            mt: 7,
          }}>
            <Typography
              variant="h6"
              sx={{
                p: 0.5,
                backgroundColor: 'primary.dark',
                textAlign: 'center',
                color: 'white'
              }}
            >
              Solicitud de Componentes
            </Typography>
            <Box sx={{  width: 'fit-content' }}>
              <DataGrid
                rows={solicitudRows}
                columns={solicitudColumns}
                disableRowSelectionOnClick
                sx={{
                  '& .MuiDataGrid-cell': { cursor: 'default' }
                }}
                initialState={{
                  pagination: { paginationModel: { pageSize: 3 } }
                }}
                pageSizeOptions={[10]}
              />
            </Box>
          </Paper>

          {/* Botón Guardar */}
          <BotonPersonalizado
            onClick={handleSave}
            sx={{
              width: 100,
              mt: { xs: 2, md: 0 },
              mr: { xs: 1, md: 7 },
              mb: 1,
              alignSelf: 'flex-end',
       
            }}
          >
            Guardar
          </BotonPersonalizado>
        </Box>
          
        {/* Tabla Proceso */}
        <Paper sx={{
           overflow: 'auto',
          width: '100%',
          minWidth: 'fit-content',
        
        }}>
          <Typography
            variant="h4"
            sx={{
              p: 0.5,
              backgroundColor: 'primary.dark',
              textAlign: 'center',
              color: 'white',
               position: 'sticky',
               top: 0,
               zIndex: 1
            }}
          >
            Proceso de Componentes
          </Typography>
          <Box>
            <DataGrid
               rows={rows}
                columns={procesoColumns} // Usamos las columnas memorizadas
                processRowUpdate={handleProcessRowUpdate}
                onRowClick={handleRowClick}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                toolbar: {
                showQuickFilter: true,
                }
             }}
               initialState={{
               pagination: { paginationModel: { pageSize: 10 } }
                }}
               pageSizeOptions={[10]}
               editMode="row"
               getRowClassName={(params) => 
               validationErrors[params.id as number]?.length > 0 ? 'error-row' : ''
               }
            />
          </Box>
        </Paper>
      
</Box>
      {/* Modal para agregar/ver componentes obtenidos */}
      <Dialog open={openComponentesModal} onClose={() => setOpenComponentesModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Componentes Obtenidos (máx. 3)</DialogTitle>
        <DialogContent>
          {componentesTemp.map((comp, idx) => (
            <Box key={idx} sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
              <TextField
                select
                label="Componente"
                value={comp.componente}
                onChange={e => handleComponentesChange(idx, 'componente_obtenido', e.target.value)}
                SelectProps={{ native: true }}
                sx={{ minWidth: 120 }}
                error={!comp.componente}
                helperText={!comp.componente ? "Requerido" : ""}
              >
                <option value=""></option>
                <option value="CEPL">CEPL</option>
                <option value="CEAD">CEAD</option>
                <option value="CE">CE</option>
                <option value="CP">CP</option>
                <option value="SP">SP</option>
                <option value="SC">SC</option>
                <option value="PC">PC</option>
                <option value="PFC">PFC</option>
                <option value="CRIO">CRIO</option>
              </TextField>
              <TextField
                label="Volumen(ml)"
                type="number"
                value={comp.volumen}
                onChange={e => handleComponentesChange(idx, 'volumen', e.target.value)}
                sx={{ minWidth: 120 }}
                error={!comp.volumen || isNaN(Number(comp.volumen)) || Number(comp.volumen) <= 0}
                helperText={
                  !comp.volumen ? "Requerido" : 
                  isNaN(Number(comp.volumen)) || Number(comp.volumen) <= 0 ? "Debe ser > 0" : ""
                }
              />
            <TextField
          label="Fecha Obtención"
          type="date"
          value={comp.fecha_obtencion}
          onChange={e => handleComponentesChange(idx, 'fecha_obtencion', e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ minWidth: 150 }}
          error={!comp.fecha_obtencion || !isTodayOrFutureDate(comp.fecha_obtencion)}
          helperText={
            !comp.fecha_obtencion ? "Requerido" : 
            !isTodayOrFutureDate(comp.fecha_obtencion) ? 
            "La fecha no puede ser anterior al día actual" : ""
          }
              />
              <IconButton color="error" onClick={() => handleRemoveComponente(idx)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Button
            variant="outlined"
            startIcon={<AddCircleOutlineIcon />}
            onClick={handleAddComponente}
            disabled={componentesTemp.length >= 3}
            sx={{ mt: 1 }}
          >
            Agregar Componente
          </Button>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button onClick={() => setOpenComponentesModal(false)} sx={{ mr: 2 }}>Cancelar</Button>
            <Button 
              variant="contained" 
              onClick={handleSaveComponentes}
              disabled={
                componentesTemp.length === 0 ||
                componentesTemp.some(comp => 
                  !comp.componente|| 
                  !comp.volumen || 
                  !comp.fecha_obtencion ||
                   isNaN(Number(comp.volumen)) || 
                   Number(comp.volumen) <= 0 ||
                  !isTodayOrFutureDate(comp.fecha_obtencion)
              )}
            >
              Guardar
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/*Modal de confirmacion*/}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            Padding: 3,
            minWidth: 320,
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          },
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center", pb: 0 }}>
          <Stack direction="column" alignItems="center" spacing={1}>
            <CheckCircleOutlineIcon sx={{ fontSize: 60, color: "success.main" }} />
            <Typography variant="h5" fontWeight="bold" color="success.main">
              ¡Éxito!
            </Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            variant="body1"
            textAlign="center"
            sx={{ mt: 1, fontSize: "1.1rem" }}
          >
            Se envió correctamente
          </DialogContentText>
        </DialogContent>
      </Dialog>

      {/*Modal de advertencia de campos vacios o inválidos*/}
      <Dialog
        open={openEmptyFieldsModal}
        onClose={() => setOpenEmptyFieldsModal(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            Padding: 3,
            minWidth: 320,
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          },
        }}
        aria-labelledby="empty-fields-dialog-title"
        aria-describedby="empty-fields-dialog-description"
      >
        <DialogTitle id="empty-fields-dialog-title" sx={{ textAlign: "center", pb: 0 }}>
          <Stack direction="column" alignItems="center" spacing={1}>
            <ErrorOutlineIcon sx={{ fontSize: 60, color: "error.main" }} />
            <Typography variant="h5" fontWeight="bold" color="error.main">
              ¡Error!
            </Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="empty-fields-dialog-description"
            variant="body1"
            textAlign="center"
            sx={{ mt: 1, fontSize: "1.1rem" }}
          >
            Existen campos vacíos o con valores inválidos. Por favor revise:
          </DialogContentText>
          <Box sx={{ mt: 2 }}>
            {Object.entries(validationErrors).map(([id, errors]) => (
              <Box key={id} sx={{ mb: 1 }}>
                <Typography fontWeight="bold">Fila ID: {id}</Typography>
                <ul style={{ marginTop: 4, marginBottom: 4, paddingLeft: 20 }}>
                  {errors.map((error, i) => (
                    <li key={i}>{error}</li>
                  ))}
                </ul>
              </Box>
            ))}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}