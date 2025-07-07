import { DataGrid, GridCellParams, GridColDef, GridRowParams } from "@mui/x-data-grid";
import BotonPersonalizado from "../../components/Button";
import Box from "@mui/material/Box";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Typography, Stack, Tooltip } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Dialog, DialogTitle, DialogContent, DialogContentText } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { green } from "@mui/material/colors";

const API_URL = 'http://localhost:3000/registro-donacion';

// Función para verificar si un campo específico está fuera de rango
const isFieldInvalid = (field: string, value: any) => {
  if (value === undefined || value === '') return false;

  switch (field) {
    case 'resultado_serologia':
    case 'resultado_DU':

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


export default function LabInmuno() {
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({});
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [openEmptyFieldsModal, setOpenEmptyFieldsModal] = useState(false);

  const tieneDatosPrevios = (item: any) => {
    const tieneSerologia = Array.isArray(item.resultado_serologia) && item.resultado_serologia.some(val => val !== "");
    const tieneTipaje = Array.isArray(item.resultado_tipage) && item.resultado_tipage.some(val => val !== "");
    const tieneContratipaje = Array.isArray(item.resultado_contratipaje) && item.resultado_contratipaje.some(val => val !== "");
    const tieneRh = Array.isArray(item.resultado_rh) && item.resultado_rh.some(val => val !== "");
    const tieneDu = Array.isArray(item.resultado_DU) && item.resultado_DU.some(val => val !== "");
    return tieneSerologia || tieneTipaje || tieneContratipaje || tieneRh || tieneDu;
  };

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
              resultado_serologia: "", // Inicializamos vacío para nuevos registros

              resultado_tipage: "",

              resultado_contratipaje: "",

              resultado_rh: "",

              resultado_DU: "",
              fecha_inmuno: "",
              yaAnalizada,
              _originalData: {
                Serologia: item.resultado_serologia,
                Tipaje: item.resultado_tipage,
                Contratipaje: item.resultado_contratipaje,
                Rh: item.resultado_rh,
                DU: item.resultado_DU
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


  const isCellEditable = (params: GridCellParams) => {
    if (params.field === 'resultado_DU') {
      return params.row.resultado_rh === "-";
    }
    return true;
  };
  useEffect(() => {
    const shouldShowDU = rows.some(row => row.resultado_rh === "-");

    setColumnVisibilityModel(prev => ({
      ...prev,
      resultado_DU: shouldShowDU,

    }));
  }, [rows]);

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



  //Funcion para marcar todos como negativo
  const handleMarkAllNegative = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    const updatedRows = rows.map(row => ({
      ...row,
      resultado_rh: isChecked ? "-" : "",
      resultado_DU: isChecked ? "Negativo" : "",
      resultado_serologia: isChecked ? "Negativo" : ""
    }));
    setRows(updatedRows)
  };

  //Verifica si todos estan marcados como negativos
  const allNegative = rows.every(row =>
    row.resultado_rh === "-" && row.resultado_DU === "Negativo" && row.resultado_serologia === "Negativo"
  );

  const handleRowClick = (params: GridRowParams) => {
    setSelectedRow(params.row);
  };

  const handleProcessRowUpdate = (newRow: any, oldRow: any) => {
    let updatedRow = newRow;

    //Resetear DU si el factor no es negativo
    if (newRow.factor !== "-" && newRow.du !== "") {
      updatedRow = { ...newRow, du: "" };
    }

    const updatedRows = rows.map((row) => (row.id === newRow.id ? newRow : row));
    setRows(updatedRows);
    return newRow;
  };

  const hasInvalidDates = () => {
    return rows.some(row => isDateInvalid(row.fecha_inmuno));
  };


  const handleSave = async () => {
    try {
      for (const row of rows) {
        if (!row.id) {
          console.error("Error: ID del registro está vacío o no es válido:", row);
          continue;
        }

        const payload = {};

        // Agregar todos los campos que tengan valor
        if (row.resultado_serologia) payload.resultado_serologia = Array.isArray(row.resultado_serologia) ? row.resultado_serologia : [row.resultado_serologia];
        if (row.resultado_tipage) payload.resultado_tipage = Array.isArray(row.resultado_tipage) ? row.resultado_tipage : [row.resultado_tipage];
        if (row.resultado_contratipaje) payload.resultado_contratipaje = Array.isArray(row.resultado_contratipaje) ? row.resultado_contratipaje : [row.resultado_contratipaje];
        if (row.resultado_rh) payload.resultado_rh = Array.isArray(row.resultado_rh) ? row.resultado_rh : [row.resultado_rh];
        if (row.fecha_inmuno) payload.fecha_inmuno = Array.isArray(row.fecha_inmuno) ? row.fecha_inmuno : [row.fecha_inmuno];
        if (row.estado) payload.estado = row.estado;

        // Lógica especial para resultado_DU
        if (row.resultado_rh === '-') {
          // Si resultado_rh es '-', solo se agrega resultado_DU si tiene valor
          if (row.resultado_DU) {
            payload.resultado_DU = Array.isArray(row.resultado_DU) ? row.resultado_DU : [row.resultado_DU];
          }
        } else {
          // Si resultado_rh no es '-', resultado_DU debe enviarse como vacío (string vacío)
          payload.resultado_DU = [""];
        }

        // Si el payload está vacío, no envía nada
        if (Object.keys(payload).length === 0) {
          console.warn(`Fila con ID ${row.id} no tiene datos para actualizar.`);
          continue;
        }

        console.log(`Endpoint llamado: ${API_URL}/update-laboratorio-inmuno/${row.id}`);
        console.log("Payload enviado:", payload);

        try {
          await axios.patch(`${API_URL}/update-laboratorio-inmuno/${row.id}`, payload);
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



  //Función para cerrar los modales
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCloseEmptyFieldsModal = () => {
    setOpenEmptyFieldsModal(false);
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
      field: "resultado_serologia",
      headerName: "Serología",
      width: 180,
      editable: true,
      type: "singleSelect", renderCell: (params) => {
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
      field: "resultado_tipage",
      headerName: "Grupo Sanguíneo",
      width: 180,
      editable: true,
      type: "singleSelect",
      valueOptions: ["A", "B", "AB", "O"],

    },

    {
      field: "resultado_rh",
      headerName: "Rh",
      type: "singleSelect",
      width: 120,
      editable: true,
      valueOptions: ["+", "-"],
    },

    {
      field: "resultado_contratipaje",
      headerName: "Contratipaje",
      type: "singleSelect",
      width: 140,
      editable: true,
      valueOptions: ["A", "B", "AB", "O"],
    },

    {
      field: "resultado_DU",
      headerName: "DU",
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
      field: "fecha_inmuno",
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




  return (
    <>
      <Navbar />
      <Box sx={{ marginTop: "60px", width: "100%" }}>
        <Typography variant="h4" gutterBottom
          sx={{ fontSize: { xs: "2 rem", md: "3rem" }, backgroundColor: "primary.dark", textAlign: "center", color: "white" }} >
          Laboratorio Inmunohematología
        </Typography>

        <Box sx={{
          height: 400, width: "100%", mb: 2,
          '& .celda-invalida': {
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
            '&:hover': {
              backgroundColor: 'rgba(255, 0, 0, 0.3)'
            }
          }
        }}>
          <DataGrid
            sx={{
              height: 400,
            }
            }
            rows={rows}
            columns={columns}
            isCellEditable={isCellEditable}
            columnVisibilityModel={columnVisibilityModel}
            processRowUpdate={handleProcessRowUpdate}
            getCellClassName={(params: GridCellParams) => {
              if (params.field === 'resultado_DU' && params.row.resultado_rh !== "-") {
                return 'disabled-cell';
              }
              return "";
            }}
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

        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          mb: 2,
          ml: 1,
          color: 'primary.dark'
        }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={allNegative}
                onChange={handleMarkAllNegative}
                color="primary"
                sx={{
                  '& .MuiSvgIcon-root': { fontSize: 28 }, // Tamaño del checkbox
                  color: 'primary.main',
                  '&.Mui-checked': { color: 'primary.main' }
                }}
              />
            }
            label={
              <Typography variant="body1" sx={{
                fontFamily: 'inherit',
                fontSize: '1rem',
                color: 'inherit'
              }}>
                Marcar todos como negativos
              </Typography>
            }
            sx={{ '& .MuiFormControlLabel-label': { fontWeight: 500 } }}
          />
        </Box>


        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <BotonPersonalizado
            onClick={handleSave}
            sx={{ width: 200 }} disabled={hasInvalidDates()}>
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

      {/*Modal de advertencia para campos vacíos*/}
      <Dialog
        open={openEmptyFieldsModal}
        onClose={handleCloseEmptyFieldsModal}
        PaperProps={{
          sx: {
            borderRadius: 3,
            padding: 3,
            minWidht: 320,
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
            Existen campos vacíos.
          </DialogContentText>
        </DialogContent>
      </Dialog>


    </>
  );

}