import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import BotonPersonalizado from "../../components/Button";
import Box from "@mui/material/Box";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { Typography, Stack, Tooltip } from "@mui/material";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, DialogContentText } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { green } from "@mui/material/colors";


const API_URL = 'http://localhost:3000/registro-donacion';
// Función para verificar si un campo específico está fuera de rango
const isFieldInvalid = (field: string, value: any) => {
  if (value === undefined || value === '') return false;

  switch (field) {
    case 'resultado_hemoglobina':
      return value < 115 || value > 175;
    case 'resultado_hematocrito':
      return value < 36 || value > 50;
    case 'resultado_eritro':
      return value < 2 || value > 20;
    case 'resultado_proteinas_totales':
      return value < 65 || value > 82;
    case 'resultado_TGP':
      return value > 49;
    default:
      return false;
  }
  return false;
};

const isDateInvalid = (date: any) => {
  if (!date) return false;
  const today = new Date();
  today.setHours(0,0,0,0);
  const dateObj = new Date(date);
  dateObj.setHours(0,0,0,0);
  return dateObj < today;
};


const columns: GridColDef[] = [
  {
    field: "numero_consecutivo",
    headerName: "No Consecutivo",
    width: 150,
  },
  {
    field: "no_hc",
    headerName: "No Historia Clínica",
    width: 140,
    editable: false,
  },
  {
    field: "resultado_hemoglobina",
    headerName: "Hemoglobina",
    width: 180,
    editable: true,
    type: "number",
    renderCell: (params) => {
      const isInvalid = isFieldInvalid(params.field, params.value);
      return (
        <Tooltip title={isInvalid ? "Valor fuera de rango - Debe repetirse este examen" : ""}>
          <div className={isInvalid ? "celda-invalida" : ""} style={{ width: '100%', height: '100%' }}>
            {params.value}
          </div>
        </Tooltip>
      );
    },
  },
  
  {
    field: "resultado_TGP",
    headerName: "TGP",
    type: "number",
    width: 120,
    editable: true,
    renderCell: (params) => {
      const isInvalid = isFieldInvalid(params.field, params.value);
      return (
        <Tooltip title={isInvalid ? "Valor fuera de rango - Debe repetirse este examen" : ""}>
          <div className={isInvalid ? "celda-invalida" : ""} style={{ width: '100%', height: '100%' }}>
            {params.value}
          </div>
        </Tooltip>
      );
    },

  },
 
  {
    field: "resultado_eritro",
    headerName: "Eritro",
    type: "number",
    width: 140,
    editable: true,
    renderCell: (params) => {
      const isInvalid = isFieldInvalid(params.field, params.value);
      return (
        <Tooltip title={isInvalid ? "Valor fuera de rango - Debe repetirse este examen" : ""}>
          <div className={isInvalid ? "celda-invalida" : ""} style={{ width: '100%', height: '100%' }}>
            {params.value}
          </div>
        </Tooltip>
      );
    },

  },
  

  {
    field: "resultado_hematocrito",
    headerName: "Hematocrito",
    type: "number",
    width: 120,
    editable: true,
    renderCell: (params) => {
      const isInvalid = isFieldInvalid(params.field, params.value);
      return (
        <Tooltip title={isInvalid ? "Valor fuera de rango - Debe repetirse este examen" : ""}>
          <div className={isInvalid ? "celda-invalida" : ""} style={{ width: '100%', height: '100%' }}>
            {params.value}
          </div>
        </Tooltip>
      );
    },

  },
  
  {
    field: "resultado_proteinas_totales",
    headerName: "Proteínas Totales",
    type: "number",
    width: 120,
    editable: true,
    renderCell: (params) => {
      const isInvalid = isFieldInvalid(params.field, params.value);
      return (
        <Tooltip title={isInvalid ? "Valor fuera de rango - Debe repetirse este examen" : ""}>
          <div className={isInvalid ? "celda-invalida" : ""} style={{ width: '100%', height: '100%' }}>
            {params.value}
          </div>
        </Tooltip>
      );
    },

  },
  {
    field: "fecha_calidad",
    headerName: "Fecha ",
    type: "date",
    width: 120,
    editable: true,
    valueGetter: (params) => new Date(params),
    renderCell: (params) => {
          const invalid = isDateInvalid(params.value);
          return (
            <Tooltip title={invalid ? "No se permite una fecha anterior a hoy" : ""}>
              <div className={invalid ? "celda-invalida" : ""} style={{ width: '100%', height: '100%' }}>
                {params.value ? new Date(params.value).toLocaleDateString() : ""}
              </div>
            </Tooltip>
          );
        }
  },
  {
    field: "estado",
    headerName: "Estado",
    type: "singleSelect",
    width: 140,
    editable: true,
    valueOptions: ["Analizada", "Reanalizada", "Aceptada"],
  },

  {
    field: "analizada",
    headerName: "Analizada",
    width: 120,
    renderCell: (params) => {
      // Usa el valor calculado al cargar los datos, no los campos editables
      const isAnalyzed = params.row.yaAnalizada;
      return isAnalyzed ? (
        <Tooltip title="Muestra analizada">
          <CheckCircleOutlineIcon sx={{ color: green[500], fontSize: 28 }} />
        </Tooltip>
      ) : (
        <Tooltip title="Muestra no analizada">
          <ErrorOutlineIcon sx={{ color: "error.main", fontSize: 28 }} />
        </Tooltip>
      );
    },
  },


];



export default function LabCCalidad() {
  const [rows, setRows] = useState<any[]>([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [openEmptyFieldsModal, setOpenEmptyFieldsModal] = useState(false);

 const tieneDatosPrevios = (item: any) => {
    const tieneHemoglobina = Array.isArray(item.resultado_hemoglobina) && item.resultado_hemoglobina.some(val => val !== "");
    const tieneHematocrito = Array.isArray(item.resultado_hematocrito) && item.resultado_hematocrito.some(val => val !== "");
    const tieneEritro = Array.isArray(item.resultado_eritro) && item.resultado_eritro.some(val => val !== "");
    const tieneTgp = Array.isArray(item.resultado_TGP) && item.resultado_TGP.some(val => val !== "");
    const tienePt = Array.isArray(item.resultado_proteinas_totales) && item.resultado_proteinas_totales.some(val => val !== "");
    return tieneHemoglobina || tieneHematocrito || tieneEritro || tieneTgp || tienePt ;
  };

  useEffect(() => {
    const fetchInitialRows = async () => {
      try {
        const response = await axios.get(`${API_URL}/consecutivo-historia-aceptada-controlados`);
        console.log("Datos completos recibidos:", response.data);
  
        if (response.data && Array.isArray(response.data)) {
          const data = response.data.map((item: any) => {
            const yaAnalizada = tieneDatosPrevios(item);
            return {
              id: item._id,
              numero_consecutivo: item.numero_consecutivo,
              no_hc: item.historiaClinica?.no_hc,
              estado: item.estado || "",
              resultado_hemoglobina: "", // Inicializamos vacío para nuevos registros
              
              resultado_hematocrito: "",
             
              resultado_eritro: "",
             
              resultado_proteinas_totales: "",
              
              resultado_TGP: "",
              fecha_calidad: "",
              yaAnalizada, 
              _originalData: {
                Hemoglobina: item.resultado_hemoglobina,
                Hematocrito: item.resultado_hematocrito,
                Eritro: item.resultado_eritro,
                Proteinas: item.resultado_proteinas_totales,
                TGP: item.resultado_TGP,
              }
            };
          });
          setRows(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchInitialRows();
  }, []);
  

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

  const handleRowClick = (params: GridRowParams) => {
    setSelectedRow(params.row);
  }

  const handleProcessRowUpdate = (newRow: any) => {
    // Validación para permitir solo valores mayores que 0 si el campo tiene valor
    const invalidFields = [
      "resultado_hemoglobina",
      "resultado_TGP",
      "resultado_eritro",
      "resultado_hematocrito",
      "resultado_proteinas_totales",
    ].filter((field) => {
      const val = newRow[field];
      return val !== "" && val !== undefined && Number(val) <= 0;
    });
  
    if (invalidFields.length > 0) {
      setOpenEmptyFieldsModal(true);
      return rows.find((row) => row.id === newRow.id);
    }
  
    const updatedRows = rows.map((row) => (row.id === newRow.id ? newRow : row));
    setRows(updatedRows);
    return newRow;
  };
  
  const hasInvalidDates = () => {
    return rows.some(row => isDateInvalid(row.fecha_calidad));
  };

  const handleSave = async () => {
      try {
        for (const row of rows) {
          if (!row.id) {
            console.error("Error: ID del registro está vacío o no es válido:", row);
            continue;
          }
    
          // Construir el payload solo con los campos que tienen valor
          const payload = {};
          if (row.resultado_hemoglobina !== undefined && row.resultado_hemoglobina !== null && row.resultado_hemoglobina !== '' && (!Array.isArray(row.resultado_hemoglobina) || row.resultado_hemoglobina.length > 0)) {
            payload.resultado_hemoglobina = Array.isArray(row.resultado_hemoglobina) ? row.resultado_hemoglobina : [row.resultado_hemoglobina];
          }
          if (row.resultado_hematocrito !== undefined && row.resultado_hematocrito !== null && row.resultado_hematocrito !== '' && (!Array.isArray(row.resultado_hematocrito) || row.resultado_hepatitisB.length > 0)) {
            payload.resultado_hematocrito = Array.isArray(row.resultado_hematocrito) ? row.resultado_hematocrito : [row.resultado_hematocrito];
          }
          if (row.resultado_eritro !== undefined && row.resultado_eritro !== null && row.resultado_eritro !== '' && (!Array.isArray(row.resultado_eritro) || row.resultado_eritro.length > 0)) {
            payload.resultado_eritro = Array.isArray(row.resultado_eritro) ? row.resultado_eritro : [row.resultado_eritro];
          }
          if (row.resultado_proteinas_totales !== undefined && row.resultado_proteinas_totales !== null && row.resultado_proteinas_totales !== '' && (!Array.isArray(row.resultado_proteinas_totales) || row.resultado_proteinas_totales.length > 0)) {
            payload.resultado_proteinas_totales = Array.isArray(row.resultado_proteinas_totales) ? row.resultado_proteinas_totales : [row.resultado_proteinas_totales];
          }
          if (row.resultado_TGP !== undefined && row.resultado_TGP !== null && row.resultado_TGP !== '' && (!Array.isArray(row.resultado_TGP) || row.resultado_TGP.length > 0)) {
            payload.resultado_TGP = Array.isArray(row.resultado_TGP) ? row.resultado_TGP : [row.resultado_TGP];
          }
          if (row.fecha_calidad !== undefined && row.fecha_calidad !== null && row.fecha_calidad !== '' && (!Array.isArray(row.fecha_calidad) || row.fecha_calidad.length > 0)) {
            payload.fecha_calidad = Array.isArray(row.fecha_calidad) ? row.fecha_calidad : [row.fecha_calidad];
          }
          if (row.estado !== undefined && row.estado !== null && row.estado !== '') {
            payload.estado = row.estado;
          }
    
          // Si el payload está vacío, no envía nada
          if (Object.keys(payload).length === 0) {
            console.warn(`Fila con ID ${row.id} no tiene datos para actualizar.`);
            continue;
          }
    
          console.log(`Endpoint llamado: ${API_URL}/update-laboratorio-calidad/${row.id}`);
          console.log("Payload enviado:", payload);
    
          try {
            await axios.patch(`${API_URL}/update-laboratorio-calidad/${row.id}`, payload);
          } catch (error) {
            console.error(`Error al actualizar la fila con ID ${row.id}:`, error.response?.data || error.message);
          }
        }
    
        setOpenModal(true);
        navigate('/principal_lab');
      } catch (error) {
        console.error("Error general al actualizar los datos:", error.response?.data || error.message);
      }
    };

  //Función para cerrar el modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCloseEmptyFieldsModal = () => {
    setOpenEmptyFieldsModal(false);
  };





  return (
    <>
      <Navbar />
      <Box sx={{ marginTop: "60px", width: "100%" }}>
        <Typography variant="h4" gutterBottom
          sx={{ fontSize: { xs: "2 rem", md: "3rem" }, backgroundColor: "primary.dark", textAlign: "center", color: "white" }} >
          Laboratorio Control de Calidad
        </Typography>

        <Box sx={{
          height: 400,
          width: "100%",
          mb: 2,
          '& .celda-invalida': {
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
            '&:hover': {
              backgroundColor: 'rgba(255, 0, 0, 0.3)'
            }
          }
        }}>
          <DataGrid
            rows={rows}
            columns={columns}
            processRowUpdate={handleProcessRowUpdate}
            onRowClick={handleRowClick}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 },
              },
            }}
            pageSizeOptions={[10]}
            editMode="row"
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <BotonPersonalizado onClick={handleSave} sx={{ width: 200 }} disabled={hasInvalidDates()}>
            Guardar Cambios
          </BotonPersonalizado>
        </Box>
      </Box>

      {hasInvalidDates() && (
              <Typography
                variant="body2"
                color="error"
                sx={{ textAlign: "center", mt: 1 }}
              >
                Corrija las fechas inválidas (anteriores a hoy) para habilitar el guardado
              </Typography>
            )}

      {/* Modales existentes sin cambios */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        PaperProps={{
          sx: {
            borderRadius: 3,
            padding: 3,
            minWidth: 320,
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          },
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center", pb: 0 }} >
          <Stack direction="column" alignItems="center" spacing={1}>
            <CheckCircleOutlineIcon sx={{ fontSize: 60, color: "success.main" }} />
            <Typography variant="h5" fontWeight="bold" color="success.main">
              ¡Éxito!
            </Typography>
          </Stack>
        </DialogTitle>
        <DialogContent >
          <DialogContentText id="alert-dialog-description"
            variant="body1"
            textAlign="center"
            sx={{ mt: 1, fontSize: "1.1rem" }}>
            Los cambios se guardaron correctamente.
          </DialogContentText>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openEmptyFieldsModal}
        onClose={handleCloseEmptyFieldsModal}
        PaperProps={{
          sx: {
            borderRadius: 3,
            padding: 3,
            minWidth: 320,
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          }
        }}
        aria-labelledby="empty-fields-dialog-title"
        aria-describedby="empty-fields-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center", pb: 0 }} >
          <Stack direction="column" alignItems="center" spacing={1}>
            <ErrorOutlineIcon sx={{ fontSize: 60, color: "error.main" }} />
            <Typography variant="h5" fontWeight="bold" color="error.main">
              ¡Error!
            </Typography>
          </Stack>
        </DialogTitle>
        <DialogContent >
          <DialogContentText id="alert-dialog-description"
            variant="body1"
            textAlign="center"
            sx={{ mt: 1, fontSize: "1.1rem" }}>
            No pueden existir resultados con valores negativos.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}