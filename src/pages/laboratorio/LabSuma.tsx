import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import BotonPersonalizado from "../../components/Button";
import Box from "@mui/material/Box";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Typography, Stack } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, DialogContentText } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const API_URL = 'http://localhost:3000/registro-donacion';

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
    valueOptions: ["Positivo", "Negativo"],
  },
  {
    field: "resultado_hepatitisB",
    headerName: "HBsAg",
    type: "singleSelect",
    width: 120,
    editable: true,
    valueOptions: ["Positivo", "Negativo"],
  },
  {
    field: "resultado_hepatitisC",
    headerName: "HCV",
    type: "singleSelect",
    width: 140,
    editable: true,
    valueOptions: ["Positivo", "Negativo"],
  },
  {
    field: "estado",
    headerName: "Estado",
    type: "singleSelect",
    width: 140,
    editable: true,
    valueOptions: ["Analizadas", "Reanalizadas", "aceptada"], // agrega "aceptada" si quieres verla como opción
  },
  {
    field: "fechaLab",
    headerName: "Fecha",
    type: "date",
    width: 120,
    editable: true,
    valueGetter: (params) => params.value ? new Date(params.value).toLocaleDateString() : "",
  },
];

export default function LabSuma() {
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [openEmptyFieldsModal, setOpenEmptyFieldsModal] = useState(false);

  useEffect(() => {
    const fetchInitialRows = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/registro-donacion/consecutivo-historia-aceptada`);
        console.log("Datos recibidos del backend:", response.data); // Verifica los datos aquí
        if (response.data && Array.isArray(response.data)) {
          const data = response.data.map((item: any) => ({
            id: item._id, // Asegúrate de que el backend devuelve `_id`
            numero_consecutivo: item.numero_consecutivo || "",
            no_hc: item.historiaClinica?.no_hc || "",
            estado: item.estado || "",
            resultado_VIH: item.resultado_VIH ?? "",
            resultado_hepatitisB: item.resultado_hepatitisB ?? "",
            resultado_hepatitisC: item.resultado_hepatitisC ?? "",
            fechaLab: item.fechaLab || "",
          }));
          setRows(data);
        } else {
          console.error("Error: Datos inválidos recibidos del servidor.");
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
    if (!newRow.resultado_VIH || !newRow.resultado_hepatitisB || !newRow.resultado_hepatitisC) {
      console.error("Error: Campos vacíos en la fila.");
      return newRow;
    }
    const updatedRows = rows.map((row) => (row.id === newRow.id ? newRow : row));
    setRows(updatedRows);
    return newRow;
  };

  const hasEmptyFields = () => {
    return rows.some((row) => {
      return (
        row.resultado_VIH === "" ||
        row.resultado_hepatitisB === "" ||
        row.resultado_hepatitisC === "" ||
        row.fechaLab === ""
      );
    });
  };

  
  const handleSave = async () => {
    if (hasEmptyFields()) {
      setOpenEmptyFieldsModal(true);
    } else {
      try {
        for (const row of rows) {
          if (!row.id) {
            console.error("Error: ID del registro está vacío o no es válido:", row);
            continue; // Salta esta fila si el ID no es válido
          }
  
          const payload = {
            resultado_VIH: Array.isArray(row.resultado_VIH) ? row.resultado_VIH : [row.resultado_VIH],
            resultado_hepatitisB: Array.isArray(row.resultado_hepatitisB) ? row.resultado_hepatitisB : [row.resultado_hepatitisB],
            resultado_hepatitisC: Array.isArray(row.resultado_hepatitisC) ? row.resultado_hepatitisC : [row.resultado_hepatitisC],
            estado: row.estado,
            fechaLab: row.fechaLab,
          };
  
          console.log(`Endpoint llamado: ${API_URL}/update-laboratorio/${row.id}`);
          console.log("Payload enviado:", payload);
  
          try {
            await axios.patch(`${API_URL}/update-laboratorio/${row.id}`, payload);
          } catch (error) {
            console.error(`Error al actualizar la fila con ID ${row.id}:`, error.response?.data || error.message);
          }
        }
  
        setOpenModal(true); // Muestra el modal de éxito
        navigate('/principal_lab'); // Redirige después de guardar
      } catch (error) {
        console.error("Error general al actualizar los datos:", error.response?.data || error.message);
      }
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
      <Box sx={{ marginTop: "60px", width: "100%" }}>
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

        <Box sx={{ height: 400, width: "100%", mb: 2 }}>
          <DataGrid
            sx={{ height: 400 }}
            rows={rows}
            columns={columns}

            editMode="row"
            processRowUpdate={handleProcessRowUpdate}
            onRowClick={handleRowClick}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 },
              },
            }}
            pageSizeOptions={[10]}
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
          <BotonPersonalizado onClick={handleSave} sx={{ width: 200 }}>
            Guardar Cambios
          </BotonPersonalizado>
        </Box>
      </Box>

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

