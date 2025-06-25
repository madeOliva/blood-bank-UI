import { DataGrid, GridColDef, GridRowParams, GridToolbar } from '@mui/x-data-grid';
import { Box, Typography, Paper, Button, Dialog, DialogTitle, DialogContent, DialogContentText, Stack, TextField, IconButton } from '@mui/material';
import Navbar from '../../components/navbar/Navbar';
import { useEffect, useState, useCallback } from "react";
import BotonPersonalizado from '../../components/Button';
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

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
  registro_donacion?: any;
}

export default function EntradaProduccion() {
  const [rows, setRows] = useState<ActaRow[]>([]);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [openEmptyFieldsModal, setOpenEmptyFieldsModal] = useState(false);
  const [openComponentesModal, setOpenComponentesModal] = useState(false);
  const [componentesTemp, setComponentesTemp] = useState<Componentes[]>([]);
  const [componentesRowId, setComponentesRowId] = useState<number | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<number, string[]>>({});
  const [openNoElementsModal, setOpenNoElementsModal] = useState(false);

  // Cargar datos desde el backend con estado "aceptada"
  useEffect(() => {
    axios.get("http://localhost:3000/componentes-obtenidos/ids")
      .then(resIds => {
        const usados = resIds.data.map((u: any) => String(u));
        axios.get("http://localhost:3000/registro-donacion/donaciones-diarias")
          .then(response => {
            const aceptadas = Array.isArray(response.data)
              ? response.data
                  .filter((item: any) =>
                    item.estado?.toLowerCase() === "aceptada" &&
                    !usados.includes(String(item.id ?? item._id ?? ""))
                  )
              : [];
            setRows(
              aceptadas.map((item: any, idx: number) => ({
                id: item.id || item._id || idx,
                no_consecutivo: item.no_consecutivo ?? idx + 1,
                no_hc: item.historiaClinica?.no_hc ?? item.hc ?? "",
                grupo_acta: item.grupo ?? "",
                factor_acta: item.factor ?? "",
                sexo: item.sexo ?? "",
                edad: item.edad ?? "",
                volumen_acta: item.volumen ?? "",
                componente_a_obtener: "",
                no_centrifuga: null,
                temperatura: null,
                velocidad: null,
                estado_obtencion: item.estado_obtencion ?? "",
                causa_baja: "",
                componentes: [],
                registro_donacion: item.id || item._id,
              }))
            );
          })
          .catch(() => setRows([]));
      });
  }, []);

  useEffect(() => {
    if (openEmptyFieldsModal) {
      const timer = setTimeout(() => setOpenEmptyFieldsModal(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [openEmptyFieldsModal]);

  useEffect(() => {
    if (openNoElementsModal) {
      const timer = setTimeout(() => setOpenNoElementsModal(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [openNoElementsModal]);

  // Validaciones
  const isValidDate = (dateString: string): boolean => {
    return !isNaN(Date.parse(dateString));
  };

  // Permite seleccionar el día de hoy y fechas futuras
  const isTodayOrFutureDate = (dateString: string): boolean => {
    if (!isValidDate(dateString)) return false;
    // Forzar a solo fecha (YYYY-MM-DD)
    const [year, month, day] = dateString.split("T")[0].split("-");
    const inputDate = new Date(Number(year), Number(month) - 1, Number(day));
    const today = new Date();
    const normalizedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return inputDate.getTime() >= normalizedToday.getTime();
  };

  const isEmpty = (value: any) =>
    value === null || value === undefined || value === '';

  const validateRow = (row: ActaRow): string[] => {
    const errors: string[] = [];
    if (isEmpty(row.componente_a_obtener)) {
      errors.push("Componente a obtener es requerido");
    }
    if (isEmpty(row.no_centrifuga)) {
      errors.push("Número de centrífuga es requerido");
    }
    // Solo permite valores entre 1 y 10, ambos inclusive
    if (
      row.no_centrifuga !== null &&
      (Number(row.no_centrifuga) < 1 || Number(row.no_centrifuga) > 10)
    ) {
      errors.push("Número de centrífuga debe estar entre 1 y 10");
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
    if (row.temperatura !== null && !(Number(row.temperatura) === 4 || Number(row.temperatura) === 22)) {
      errors.push("Temperatura debe ser 4°C o 22°C");
    }
    if (row.velocidad !== null && !(Number(row.velocidad) === 2500 || Number(row.velocidad) === 3000)) {
      errors.push("Velocidad debe ser 2500 RPM o 3000 RPM");
    }
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
            errors.push(`Componente obtenido ${index + 1}: La fecha no puede ser anterior al día de hoy`);
          }
        });
      }
    }
    if (row.estado_obtencion === "Baja" && isEmpty(row.causa_baja)) {
      errors.push("Causa de baja es requerida");
    }
    return errors;
  };

  const handleProcessRowUpdate = useCallback((newRow: ActaRow) => {
    setRows(prevRows =>
      prevRows.map(row =>
        row.id === newRow.id ? { ...row, ...newRow } : row
      )
    );
    return newRow;
  }, []);

  // Guardar datos en backend
  const handleSave = async () => {
    if (rows.length === 0) {
      setOpenNoElementsModal(true);
      return;
    }
    try {
      let updatedRows = [...rows];
      let errors: Record<number, string[]> = {};
      let hasErrors = false;
      for (const row of rows) {
        const rowErrors = validateRow(row);
        if (rowErrors.length > 0) {
          errors[row.id] = rowErrors;
          hasErrors = true;
          continue;
        }
        await axios.put("http://localhost:3000/centrifugacion", {
          _id: row.id,
          no_consecutivo: row.no_consecutivo,
          no_hc: row.no_hc,
          grupo_acta: row.grupo_acta,
          factor_acta: row.factor_acta,
          sexo: row.sexo,
          edad: row.edad,
          volumen_acta: row.volumen_acta,
          componente_a_obtener: row.componente_a_obtener,
          no_centrifuga: row.no_centrifuga,
          temperatura: row.temperatura,
          velocidad: row.velocidad,
          estado_obtencion: row.estado_obtencion.toLowerCase(),
          ...(row.causa_baja ? { causa_baja: row.causa_baja } : {}),
          registro_donacion: row.registro_donacion,
        });
        if (
          row.estado_obtencion &&
          row.estado_obtencion.toLowerCase() === "obtenido" &&
          Array.isArray(row.componentes) &&
          row.componentes.length > 0
        ) {
          const data = {
            no_consecutivo: row.no_consecutivo,
            no_hc: row.no_hc,
            estado_obtencion: row.estado_obtencion.toLowerCase(),
            componentes: row.componentes,
            registro_donacion: row.registro_donacion,
          };
          await axios.post("http://localhost:3000/componentes-obtenidos", data);
        }
        if (
          row.estado_obtencion &&
          row.estado_obtencion.toLowerCase() === "baja" &&
          row.causa_baja
        ) {
          const data = {
            no_consecutivo: row.no_consecutivo,
            no_hc: row.no_hc,
            estado_obtencion: row.estado_obtencion.toLowerCase(),
            causa_baja: row.causa_baja,
            registro_donacion: row.registro_donacion,
            centrifugacion: row.id,
          };
          await axios.post("http://localhost:3000/componentes-obtenidos", data);
          updatedRows = updatedRows.filter(r => r.id !== row.id);
        }
        if (
          row.estado_obtencion &&
          row.estado_obtencion.toLowerCase() === "pendiente"
        ) {
          const data = {
            no_consecutivo: row.no_consecutivo,
            estado_obtencion: row.estado_obtencion.toLowerCase(),
            registro_donacion: row.registro_donacion,
          };
          await axios.post("http://localhost:3000/componentes-obtenidos", data);
        }
      }
      setValidationErrors(errors);
      setRows(updatedRows);
      if (Object.keys(errors).length > 0) {
        setOpenEmptyFieldsModal(true);
      } else {
        setOpenModal(true);
      }
    } catch (error) {
      alert("Error al guardar los datos.");
    }
  };

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

  const handleSaveComponentes = () => {
    if (componentesRowId === null) return;
    setRows(prevRows =>
      prevRows.map(row =>
        row.id === componentesRowId
          ? { ...row, componentes: [...componentesTemp] }
          : row
      )
    );
    setOpenComponentesModal(false);
  };

  const handleRowClick = useCallback((params: GridRowParams) => {
    setSelectedRow(params.id as number);
  }, []);

  const procesoColumns: GridColDef[] = [
    { field: "no_consecutivo", headerName: "No. Consecutivo", width: 130 },
    { field: "no_hc", headerName: "No. Historia Clínica", width: 160 },
    { field: "grupo_acta", headerName: "Grupo", width: 90 },
    { field: "factor_acta", headerName: "Factor", width: 90 },
    { field: "sexo", headerName: "Sexo", width: 90 },
    { field: "edad", headerName: "Edad", width: 90 },
    { field: "volumen_acta", headerName: "Volumen", width: 100 },
    {
      field: 'componente_a_obtener',
      headerName: 'Comp. a Obtener',
      width: 140,
      editable: false,
      renderCell: (params) => {
        const value = params.row.componente_a_obtener ?? "";
        const isError = value === "";
        return (
          <TextField
            select
            value={value}
            onClick={e => e.stopPropagation()}
            onChange={e => {
              const newValue = e.target.value;
              setRows(prevRows =>
                prevRows.map(row =>
                  row.id === params.row.id
                    ? { ...row, componente_a_obtener: newValue }
                    : row
                )
              );
            }}
            error={isError}
            helperText={isError ? "Requerido" : ""}
            size="small"
            sx={{ width: 120 }}
            SelectProps={{ native: true }}
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
        );
      },
    },
    {
      field: 'no_centrifuga',
      headerName: 'No. Centrífuga',
      width: 120,
      editable: false,
      renderCell: (params) => {
        const value = params.row.no_centrifuga ?? "";
        const isError = value === "" || value === null;
        return (
          <TextField
            type="number"
            value={value}
            onClick={e => e.stopPropagation()}
            onChange={e => {
              const inputValue = e.target.value;
              const newValue = inputValue === "" ? null : Number(inputValue);
              setRows(prevRows =>
                prevRows.map(row =>
                  row.id === params.row.id
                    ? { ...row, no_centrifuga: newValue }
                    : row
                )
              );
            }}
            error={isError}
            helperText={isError ? "Requerido" : ""}
            size="small"
            sx={{ width: 100 }}
            inputProps={{ min: 1, max: 10 }}
          />
        );
      },
    },
    {
      field: 'temperatura',
      headerName: 'Temperatura',
      width: 120,
      editable: false,
      renderCell: (params) => {
        const value = params.row.temperatura ?? "";
        const isError = value === "" || value === null;
        return (
          <TextField
            select
            value={value}
            onClick={e => e.stopPropagation()}
            onChange={e => {
              const newValue = e.target.value;
              setRows(prevRows =>
                prevRows.map(row =>
                  row.id === params.row.id
                    ? { ...row, temperatura: newValue === "" ? null : Number(newValue) }
                    : row
                )
              );
            }}
            error={isError}
            helperText={isError ? "Requerido" : ""}
            size="small"
            sx={{ width: 100 }}
            SelectProps={{ native: true }}
          >
            <option value=""></option>
            <option value={4}>4</option>
            <option value={22}>22</option>
          </TextField>
        );
      },
    },
    {
      field: 'velocidad',
      headerName: 'Velocidad',
      width: 120,
      editable: false,
      renderCell: (params) => {
        const value = params.row.velocidad ?? "";
        const isError = value === "" || value === null;
        return (
          <TextField
            select
            value={value}
            onClick={e => e.stopPropagation()}
            onChange={e => {
              const newValue = e.target.value;
              setRows(prevRows =>
                prevRows.map(row =>
                  row.id === params.row.id
                    ? { ...row, velocidad: newValue === "" ? null : Number(newValue) }
                    : row
                )
              );
            }}
            error={isError}
            helperText={isError ? "Requerido" : ""}
            size="small"
            sx={{ width: 100 }}
            SelectProps={{ native: true }}
          >
            <option value=""></option>
            <option value={2500}>2500</option>
            <option value={3000}>3000</option>
          </TextField>
        );
      },
    },
    {
      field: "estado_obtencion",
      headerName: "Estado Obtencion",
      width: 140,
      editable: false,
      renderCell: (params) => {
        const value = params.row.estado_obtencion ?? "";
        const isError = value === "";
        return (
          <TextField
            select
            value={value}
            onClick={e => e.stopPropagation()}
            onChange={e => {
              const newValue = e.target.value;
              setRows(prevRows =>
                prevRows.map(row =>
                  row.id === params.row.id
                    ? { ...row, estado_obtencion: newValue }
                    : row
                )
              );
            }}
            error={isError}
            helperText={isError ? "Requerido" : ""}
            size="small"
            sx={{ width: 130 }}
            SelectProps={{ native: true }}
          >
            <option value=""></option>
            <option value="Obtenido">Obtenido</option>
            <option value="Baja">Baja</option>
            <option value="Pendiente">Pendiente</option>
          </TextField>
        );
      },
    },
    {
      field: "detalles",
      headerName: "Detalles",
      width: 180,
      renderCell: (params) => {
        if (params.row.estado_obtencion === "Baja") {
          const value = params.row.causa_baja ?? "";
          const isError = value === "";
          return (
            <TextField
              select
              value={value}
              onClick={e => e.stopPropagation()}
              onChange={e => {
                const newValue = e.target.value;
                setRows(prevRows =>
                  prevRows.map(row =>
                    row.id === params.row.id
                      ? { ...row, causa_baja: newValue }
                      : row
                  )
                );
              }}
              error={isError}
              helperText={isError ? "Requerido" : ""}
              size="small"
              sx={{ width: 140 }}
              SelectProps={{ native: true }}
            >
              <option value=""></option>
              <option value="Ictero">Ictero</option>
              <option value="Lipemia">Lipemia</option>
              <option value="Hemolisis">Hemolisis</option>
              <option value="Rotura">Rotura</option>
            </TextField>
          );
        }
        if (params.row.estado_obtencion === "Obtenido") {
          return (
            <Button
              variant="outlined"
              size="small"
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => handleAddComponentesObtenidos(params.row.id)}
            >
              Agregar/Ver
            </Button>
          );
        }
        return null;
      },
    },
  ];
  const rowData = rows.find(row => row.id === selectedRow);

  return (
    <>
      <Navbar />
      <Box>
        <Typography
          sx={{
            fontSize: { xs: "2rem", md: "3rem" },
            mt: 8,
            backgroundColor: "primary.dark",
            textAlign: "center",
            color: "white",
          }}
        >
          Proceso de Componentes
        </Typography>
        <Paper
          sx={{
            overflow: "auto",
            width: "100%",
            minWidth: "fit-content",
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <DataGrid
              rows={rows}
              columns={procesoColumns}
              processRowUpdate={handleProcessRowUpdate}
              onRowClick={handleRowClick}
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                },
              }}
              initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
              }}
              pageSizeOptions={[10]}
              editMode="row"
              getRowClassName={(params) =>
                validationErrors[params.id as number]?.length > 0 ? "error-row" : ""
              }
              sx={{ flex: 1 }}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <BotonPersonalizado
              onClick={handleSave}
              sx={{ width: 225 }}
            >
              Guardar
            </BotonPersonalizado>
          </Box>
        </Paper>
      </Box>
      {/* Modal de éxito */}
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

      {/* Modal de advertencia de campos vacíos o inválidos */}
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
       <DialogTitle sx={{ textAlign: "center", pb: 0 }} id="error-dialog-title">
          <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
            <ErrorOutlineIcon sx={{ fontSize: 60, color: "error.main" }} />
            <Typography variant="h5" fontWeight="bold" color="error.main">
              Atención
            </Typography>
          </Box>
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
                onChange={e => handleComponentesChange(idx, 'componente', e.target.value)}
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
                      "La fecha no puede ser anterior al día de hoy" : ""
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
                  !comp.componente ||
                  !comp.volumen ||
                  !comp.fecha_obtencion ||
                  isNaN(Number(comp.volumen)) ||
                  Number(comp.volumen) <= 0 ||
                  !isTodayOrFutureDate(comp.fecha_obtencion)
                )
              }
            >
              Guardar
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Modal: No hay elementos para enviar */}
      <Dialog
        open={openNoElementsModal}
        onClose={() => setOpenNoElementsModal(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            padding: 3,
            minWidth: 320,
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          },
        }}
        aria-labelledby="no-elements-dialog-title"
        aria-describedby="no-elements-dialog-description"
      >
       <DialogTitle sx={{ textAlign: "center", pb: 0 }} id="error-dialog-title">
          <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
            <ErrorOutlineIcon sx={{ fontSize: 60, color: "error.main" }} />
            <Typography variant="h5" fontWeight="bold" color="error.main">
              Atención
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="no-elements-dialog-description"
            variant="body1"
            textAlign="center"
            sx={{ mt: 1, fontSize: "1.1rem" }}
          >
            No hay elementos para enviar.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}