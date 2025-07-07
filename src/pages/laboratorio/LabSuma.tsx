import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import BotonPersonalizado from "../../components/Button";
import Box from "@mui/material/Box";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Typography, Stack, Tooltip } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
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
    case 'resultado_VIH':
    case 'resultado_hepatitisB':
    case 'resultado_hepatitisC':
      return value === "Positivo"; // Devuelve true solo si el valor es "Positivo"
    default:
      return false;
  }
};

const isDateInvalid = (date: any) => {
  if (!date) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dateObj = new Date(date);
  dateObj.setHours(0, 0, 0, 0);
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
    width: 150,
    editable: false,
  },
  {
    field: "resultado_VIH",
    headerName: "HIV",
    width: 180,
    editable: true,
    type: "singleSelect",
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
    valueOptions: ["Positivo", "Negativo"],
  },

  {
    field: "resultado_hepatitisB",
    headerName: "HBsAg",
    type: "singleSelect",
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
    width: 120,
    editable: true,
    valueOptions: ["Positivo", "Negativo"],
  },

  {
    field: "resultado_hepatitisC",
    headerName: "HCV",
    type: "singleSelect",
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
    width: 140,
    editable: true,
    valueOptions: ["Positivo", "Negativo"],
  },
  {
    field: "fecha_suma",
    headerName: "Fecha",
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
    valueOptions: ["Analizada", "Reanalizada", "Aceptada"], // agrega "aceptada" si quieres verla como opción
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

export default function LabSuma() {
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [openEmptyFieldsModal, setOpenEmptyFieldsModal] = useState(false);

  const tieneDatosPrevios = (item: any) => {
    const tieneVIH = Array.isArray(item.resultado_VIH) && item.resultado_VIH.some(val => val !== "");
    const tieneHepatitisB = Array.isArray(item.resultado_hepatitisB) && item.resultado_hepatitisB.some(val => val !== "");
    const tieneHepatitisC = Array.isArray(item.resultado_hepatitisC) && item.resultado_hepatitisC.some(val => val !== "");
    return tieneVIH || tieneHepatitisB || tieneHepatitisC;
  };



  // Modificación en fetchInitialRows
  useEffect(() => {
    const fetchInitialRows = async () => {
      try {
        const response = await axios.get(`${API_URL}/consecutivo-historia-aceptada`);
        console.log("Datos completos recibidos:", response.data);

        if (response.data && Array.isArray(response.data)) {
          const data = response.data.map((item: any) => {
            const yaAnalizada = tieneDatosPrevios(item);
            return {
              id: item._id,
              numero_consecutivo: item.numero_consecutivo,
              no_hc: item.historiaClinica?.no_hc,
              estado: item.estado || "",
              resultado_VIH: "", // Inicializamos vacío para nuevos registros

              resultado_hepatitisB: "",

              resultado_hepatitisC: "",


              fecha_suma: "",
              yaAnalizada,
              _originalData: {
                VIH: item.resultado_VIH,
                HepatitisB: item.resultado_hepatitisB,
                HepatitisC: item.resultado_hepatitisC,

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

  const handleMarkAllNegative = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    const updatedRows = rows.map((row) => ({
      ...row,
      resultado_VIH: isChecked ? "Negativo" : "",
      resultado_hepatitisB: isChecked ? "Negativo" : "",
      resultado_hepatitisC: isChecked ? "Negativo" : "",
    }));
    setRows(updatedRows);
  };

  const allNegative = rows.every(
    (row) =>
      row.resultado_VIH === "Negativo" &&
      row.resultado_hepatitisB === "Negativo" &&
      row.resultado_hepatitisC === "Negativo"
  );

  const handleRowClick = (params: GridRowParams) => {
    setSelectedRow(params.row);
  };

  const handleProcessRowUpdate = (newRow: any) => {

    const updatedRows = rows.map((row) => (row.id === newRow.id ? newRow : row));
    setRows(updatedRows);
    return newRow;
  };
  const campos = [
    "resultado_VIH",

    "resultado_hepatitisB",

    "resultado_hepatitisC",
    "fecha_suma",
  ];
  const hasInvalidDates = () => {
    return rows.some(row => isDateInvalid(row.fecha_suma));
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
        if (row.resultado_VIH !== undefined && row.resultado_VIH !== null && row.resultado_VIH !== '' && (!Array.isArray(row.resultado_VIH) || row.resultado_VIH.length > 0)) {
          payload.resultado_VIH = Array.isArray(row.resultado_VIH) ? row.resultado_VIH : [row.resultado_VIH];
        }
        if (row.resultado_hepatitisB !== undefined && row.resultado_hepatitisB !== null && row.resultado_hepatitisB !== '' && (!Array.isArray(row.resultado_hepatitisB) || row.resultado_hepatitisB.length > 0)) {
          payload.resultado_hepatitisB = Array.isArray(row.resultado_hepatitisB) ? row.resultado_hepatitisB : [row.resultado_hepatitisB];
        }
        if (row.resultado_hepatitisC !== undefined && row.resultado_hepatitisC !== null && row.resultado_hepatitisC !== '' && (!Array.isArray(row.resultado_hepatitisC) || row.resultado_hepatitisC.length > 0)) {
          payload.resultado_hepatitisC = Array.isArray(row.resultado_hepatitisC) ? row.resultado_hepatitisC : [row.resultado_hepatitisC];
        }
        if (row.fecha_suma !== undefined && row.fecha_suma !== null && row.fecha_suma !== '' && (!Array.isArray(row.fecha_suma) || row.fecha_suma.length > 0)) {
          payload.fecha_suma = Array.isArray(row.fecha_suma) ? row.fecha_suma : [row.fecha_suma];
        }
        if (row.estado !== undefined && row.estado !== null && row.estado !== '') {
          payload.estado = row.estado;
        }

        // Si el payload está vacío, no envía nada
        if (Object.keys(payload).length === 0) {
          console.warn(`Fila con ID ${row.id} no tiene datos para actualizar.`);
          continue;
        }

        console.log(`Endpoint llamado: ${API_URL}/update-laboratorio/${row.id}`);
        console.log("Payload enviado:", payload);

        try {
          await axios.patch(`${API_URL}/update-laboratorio/${row.id}`, payload);
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


  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCloseEmptyFieldsModal = () => {
    setOpenEmptyFieldsModal(false);
  };

  return (
    <>
      <Navbar />
      <Box sx={{
        marginTop: "60px", width: "100%"

      }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontSize: { xs: "2rem", md: "3rem" },
            backgroundColor: "primary.dark",
            textAlign: "center",
            color: "white",
          }}
        >
          Laboratorio Suma
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

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            mb: 2,
            ml: 1,
            color: "primary.dark",
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={allNegative}
                onChange={handleMarkAllNegative}
                color="primary"
                sx={{
                  "& .MuiSvgIcon-root": { fontSize: 28 },
                  color: "primary.main",
                  "&.Mui-checked": { color: "primary.main" },
                }}
              />
            }
            label={
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "inherit",
                  fontSize: "1rem",
                  color: "inherit",
                }}
              >
                Marcar todos como negativos
              </Typography>
            }
            sx={{ "& .MuiFormControlLabel-label": { fontWeight: 500 } }}
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
      
      {/* Modal de confirmación */}
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
            Los cambios se guardaron correctamente.
          </DialogContentText>
        </DialogContent>
      </Dialog>

      {/* Modal de advertencia para campos vacíos */}
      <Dialog
        open={openEmptyFieldsModal}
        onClose={handleCloseEmptyFieldsModal}
        PaperProps={{
          sx: {
            borderRadius: 3,
            padding: 3,
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
            Existen campos vacíos.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}

