import { Box, Container, Snackbar, TextField, Typography } from "@mui/material";
import { GridColDef, DataGrid } from "@mui/x-data-grid";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";


const columns: GridColDef[] = [
  { field: "id", headerName: "No", width: 90 },
  { field: "ci", headerName: "CI", width: 200, editable: false },

  {
    field: "nombre",
    headerName: "Nombre",
    width: 150,
    editable: false,
  },

  {
    field: "primer_apellido",
    headerName: "Primer Apellido",
    width: 150,
    editable: false,
  },

  {
    field: "segundo_apellido",
    headerName: "Segundo Apellido",
    width: 150,
    editable: false,
  },
  {
    field: "observacion_interrogatorio",
    headerName: "Observación",
    width: 200,
    editable: false,
  },
];

export default function DonantesNoAptos() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ...dentro del componente Prechequeo:
  const [busquedaCI, setBusquedaCI] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Validación de CI
  const validarCI = (ci: string): string => {
    if (!/^\d{11}$/.test(ci))
      return "El CI debe tener exactamente 11 dígitos numéricos.";
    const mes = parseInt(ci.slice(2, 4), 10);
    const dia = parseInt(ci.slice(4, 6), 10);
    if (mes < 1 || mes > 12) return "El mes en el CI no es válido.";
    if (dia < 1 || dia > 31) return "El día en el CI no es válido.";
    return "";
  };

  // Función para buscar por CI
  const handleBuscarPorCI = () => {
    const errorMsg = validarCI(busquedaCI);
    if (errorMsg) {
      setSnackbarMessage(errorMsg);
      setSnackbarOpen(true);
      return;
    }

    if (!busquedaCI.trim()) return;
    const encontrado = rows.find(r => r.ci === busquedaCI.trim());
    if (encontrado) {
      setRows(prev => [encontrado, ...prev.filter(r => r.id !== encontrado.id)]);
      setSnackbarMessage("Donante encontrado y movido al inicio");
      setSnackbarOpen(true);
    } else {
      setSnackbarMessage("No existe un donante con ese CI en prechequeo pendiente");
      setSnackbarOpen(true);
    }
    setBusquedaCI("");
  };

  useEffect(() => {
    const fetchRows = async () => {
      try {
        const res = await axios.get("http://localhost:3000/registro-donacion/observacion");
        // Mapea los datos para la tabla
        const mappedRows = res.data.map((reg: any, idx: number) => ({
          id: idx + 1,
          ci: reg.ci,
          nombre: reg.nombre,
          primer_apellido: reg.primer_apellido,
          segundo_apellido: reg.segundo_apellido,
          observacion_interrogatorio: reg.observacion_interrogatorio || "No Observación",
        }));
        setRows(mappedRows);
      } catch (error) {
        console.error("Error al cargar los registros:", error);
      }
    };
    fetchRows();
  }, []);

  return (
    <>
      <Navbar />
      <Typography
        variant="h4"
        component="h5"
        mt={8}
        sx={{
          fontSize: { xs: "2rem", md: "3rem" },
          textAlign: "center",
          backgroundColor: "#00796B",
          color: "white",
          marginTop: 10,
        }}
      >
        Listado de Donantes no Aptos
      </Typography>
      <Container>
        <Box sx={{ marginTop: "20px", marginBlockEnd: 1, marginLeft: 7 }}>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <TextField
              label="Buscar por CI"
              value={busquedaCI}
              onChange={e => setBusquedaCI(e.target.value.replace(/\D/g, '').slice(0, 11))}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  const errorMsg = validarCI(busquedaCI);
                  if (errorMsg) {
                    setSnackbarMessage(errorMsg);
                    setSnackbarOpen(true);
                  } else {
                    handleBuscarPorCI();
                  }
                }
              }}
              sx={{ width: 250, mr: 2 }}
              inputProps={{ maxLength: 11 }}
              error={!!validarCI(busquedaCI) && busquedaCI.length > 0}
              helperText={busquedaCI.length > 0 ? validarCI(busquedaCI) : ''}
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
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={2500}
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
          <Box sx={{ marginTop: "20px", marginBlockEnd: 1, marginLeft: 7 }}>
            {error && (
              <Typography color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}
            <DataGrid
              sx={{
                "& .MuiDataGrid-columnHeaderTitle": {
                  fontFamily: '"Open Sans"',
                  fontWeight: 600,
                },
                "& .MuiDataGrid-cellContent": {
                  fontFamily: '"Open Sans"',
                  color: "#000",
                },
              }}
              rows={rows}
              columns={columns}
              loading={loading}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
            />
          </Box>
        </Box >
      </Container>
    </>
  );
}
