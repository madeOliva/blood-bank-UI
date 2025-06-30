import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar"
import { Button, Snackbar, TextField, Typography } from "@mui/material";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";

function Water({ row }: { row: any }) {

  const navigate = useNavigate();

  const handleHc = () => {
    navigate(`/historiadonante/${row._id}/${row.historiaClinicaId}`, { replace: true });
  };
  return (<Button
    variant="outlined"
    size="small"
    color="error"
    endIcon={<WaterDropIcon sx={{ ml: -1 }} />}
    onClick={handleHc}
  >
    Historia
  </Button>)
}

export default function ResultadosPrechequeo() {

  const [rows, setRows] = useState<any[]>([]);
  useEffect(() => {
    const fetchRows = async () => {
      try {
        const res = await axios.get("http://localhost:3000/registro-donacion/datos");
        const mappedRows = res.data
          .filter((reg: any) => {
            const esPlasma = reg.componente?.nombreComponente?.toLowerCase() === 'plasma';
            const aptoInterrogatorioNulo = reg.apto_interrogatorio === null || reg.apto_interrogatorio === undefined;
            const aptoPrechequeoLleno = reg.apto_prechequeo !== null && reg.apto_prechequeo !== undefined;

            if (esPlasma) {
              return aptoInterrogatorioNulo;
            } else {
              return aptoInterrogatorioNulo && aptoPrechequeoLleno;
            }
          })
          .map((reg: any, idx: number) => ({
            id: idx + 1,
            _id: reg._id,
            historiaClinicaId: reg.historiaClinicaId,
            ci: reg.ci,
            nombre: reg.nombre,
            primer_apellido: reg.primer_apellido,
            segundo_apellido: reg.segundo_apellido,
            examenP_grupo: reg.examenP_grupo,
            examenP_factor: reg.examenP_factor,
            examenP_hemoglobina: reg.examenP_hemoglobina,
            apto_prechequeo: reg.apto_prechequeo ?? '',
          }));

        setRows(mappedRows);
      } catch (error) {
        console.error("Error al cargar los registros:", error);
      }
    };
    fetchRows();
  }, []);


  
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

  const columns: GridColDef[] = [
    { field: "id", headerName: "No", width: 90 },
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
      field: "examenP_grupo",
      headerName: "Grupo",
      width: 150,
      editable: false,
    },
    {
      field: "examenP_factor",
      headerName: "Factor",
      width: 150,
      editable: false,
    },

    {
      field: "examenP_hemoglobina",
      headerName: "Hemoglobina",
      width: 150,
      editable: false,
    },

    {
      field: "apto_prechequeo",
      headerName: "Apto/NoApto",
      width: 150,
      editable: false,
    },

    {
      field: "actions",
      headerName: "",
      width: 150,
      renderCell: (params) => <Water row={params.row} />,
    },
  ];

  return (
    <>
      <Navbar />
      <Typography
        variant="h4"
        component="h5"
        mt={8}
        sx={{ fontSize: { xs: "2rem", md: "3rem" }, textAlign: "center", backgroundColor: "#00796B", color: 'white' }}
      >
        Listado de posibles donantes
      </Typography>

      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', mb: 2, marginTop: 5 }}>
        <TextField
          label="Buscar por CI"
          value={busquedaCI}
          onChange={e => setBusquedaCI(e.target.value.replace(/\D/g, '').slice(0, 11))}
          onKeyDown={e => { if (e.key === 'Enter') handleBuscarPorCI(); }}
          sx={{ width: 250, mr: 2 }}
          inputProps={{ maxLength: 11 }}
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

      <Box sx={{ marginTop: "20px", width: "100%", marginBlockEnd: 1, marginLeft: 1, marginRight: 1 }}>
        <DataGrid
          sx={{
            display: "flex",
            alignContent: "space-between",
            "& .MuiDataGrid-columnHeaderTitle": {
              fontFamily: '"Open Sans"',
              fontWeight: 600,
            },
            "& .MuiDataGrid-cellContent": {
              fontFamily: '"Open Sans"',
              color: "#000"
            },
          }}
          rows={rows}
          columns={columns}
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
    </>
  );
}