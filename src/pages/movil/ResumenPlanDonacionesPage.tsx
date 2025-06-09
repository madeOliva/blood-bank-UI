import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Container,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

interface RowData {
  id: string;
  fechaHora: string;
  areaSalud: string;
  consejoPopular: string;
  consultoriosAfectados: string[] | string;
  lugarDonacion: string;
  compromiso: string;
  responsableSalud: string;
  cdr: string;
}

const API_URL = "http://localhost:3000/plan-trabajo";

export default function ResumenPlanDonaciones() {
  const [rows, setRows] = useState<RowData[]>([]);
  const [filteredRows, setFilteredRows] = useState<RowData[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchDate, setSearchDate] = useState<string>("");

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        const data = res.data.map((item: any) => ({
          id: item._id || item.id,
          fechaHora: item.fecha || item.fechaHora,
          areaSalud: item.areasalud || item.areaSalud,
          consejoPopular: item.consejopopular || item.consejoPopular,
          consultoriosAfectados: item.consultoriosafectados || item.consultoriosAfectados,
          lugarDonacion: item.lugarDonacion,
          compromiso: item.compromiso,
          responsableSalud: item.responsableDeSalud || item.responsableSalud,
          cdr: item.cdr,
        }));
        setRows(data);
        setFilteredRows(data);
      })
      .catch(() => {
        setRows([]);
        setFilteredRows([]);
      });
  }, []);

  // Agrupar datos por mes
  const groupedData = filteredRows.reduce((acc, row) => {
    const month = dayjs(row.fechaHora).format("MMMM YYYY");
    if (!acc[month]) acc[month] = [];
    acc[month].push(row);
    return acc;
  }, {} as Record<string, RowData[]>);

  // Columnas con formato de fecha y consultorios afectados
  const columns: GridColDef[] = [
    {
      field: "fechaHora",
      headerName: "Fecha y Hora",
      width: 160,
      renderCell: (params) =>
        params.value ? dayjs(params.value).format("DD/MM/YYYY 08:00 A") : "",
    },
    { field: "areaSalud", headerName: "Área de salud", width: 150 },
    { field: "consejoPopular", headerName: "Consejo popular", width: 150 },
    {
      field: "consultoriosAfectados",
      headerName: "Consultorios afectados",
      width: 180,
      renderCell: (params) => {
        if (Array.isArray(params.value)) {
          return params.value.join(", ");
        }
        return params.value || "";
      },
    },
    { field: "lugarDonacion", headerName: "Lugar donación", width: 160 },
    { field: "compromiso", headerName: "Compromiso", width: 140 },
    { field: "responsableSalud", headerName: "Responsable de salud", width: 170 },
    { field: "cdr", headerName: "CDR", width: 100 },
  ];

  // Solo esta función handleSearch (filtrado local)
  const handleSearch = () => {
    if (!searchDate) {
      setFilteredRows(rows);
      setSearchOpen(false);
      return;
    }
    const data = rows.filter((row) =>
      dayjs(row.fechaHora).format("YYYY-MM-DD") === searchDate
    );
    setFilteredRows(data);
    setSearchOpen(false);
  };

  // Restablecer filtro
  const handleClearSearch = () => {
    setSearchDate("");
    setFilteredRows(rows);
    setSearchOpen(false);
  };

  return (
    <>
      <Navbar />

      {/* Contenedor para el título y el buscador */}
      <Box sx={{ position: "relative", mt: 8, mb: 5 }}>
        <Typography
          variant="h4"
          component="h5"
          sx={{
            fontSize: { xs: "2rem", md: "3rem" },
            backgroundColor: "primary.dark",
            color: "white",
            textAlign: "center",
            width: "100%",
            py: 2,
          }}
        >
          Planes Donaciones Mensual
        </Typography>
        {/* Buscador en la esquina superior derecha, fuera del navbar */}
        <IconButton
          color="primary"
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            zIndex: 1,
            backgroundColor: "white",
            boxShadow: 2,
            "&:hover": { backgroundColor: "#f0f0f0" },
          }}
          onClick={() => setSearchOpen(true)}
        >
          <SearchIcon />
        </IconButton>
      </Box>

      <Dialog open={searchOpen} onClose={() => setSearchOpen(false)}>
        <DialogTitle>Buscar plan por fecha</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Fecha"
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <Button variant="contained" onClick={handleSearch} disabled={!searchDate}>
              Buscar
            </Button>
            <Button variant="outlined" onClick={handleClearSearch}>
              Limpiar búsqueda
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>

      <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
        {Object.entries(groupedData).map(([month, entries]) => (
          <Accordion key={month} sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {month}
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Box sx={{ height: 450, width: "100%" }}>
                <DataGrid
                  rows={entries}
                  columns={columns}
                  pageSizeOptions={[5, 10]}
                  initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
                  disableRowSelectionOnClick
                  hideFooterSelectedRowCount
                />
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}

        {filteredRows.length === 0 && (
          <Typography variant="body1" textAlign="center" sx={{ mt: 3 }}>
            No hay datos para mostrar.
          </Typography>
        )}
      </Container>
    </>
  );
}