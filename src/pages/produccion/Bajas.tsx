import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Typography, IconButton, Dialog, DialogTitle, DialogContent, Stack, TextField, Button } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { Search } from "@mui/icons-material";

const columns: GridColDef[] = [
  { field: "no_consecutivo", headerName: "No", width: 120 },
  { field: "no_hc", headerName: "No HC", width: 170 },
  {
    field: "componente_a_obtener",
    headerName: "Componente",
    width: 170,
    type: "singleSelect",
    valueOptions: ['CEPL','CEAD','CE','CP','SP','SC','PC', 'PFC', 'CRIO'],
  },
  {
    field: "causa_baja",
    headerName: "Causa",
    width: 170,
    type: "singleSelect",
    valueOptions: ["Ictero", "Lipemia", "Hemolisis", "Rotura"],
  },
];

type BajaRow = {
  id: any;
  no_consecutivo: number;
  no_hc: any;
  componente_a_obtener: any;
  causa_baja: any;
  fechaD?: string; // <-- Asegúrate de que este campo exista en tu backend
};

export default function Bajas() {
  const [rows, setRows] = useState<BajaRow[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchFechaDesde, setSearchFechaDesde] = useState("");
  const [searchFechaHasta, setSearchFechaHasta] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [filteredRows, setFilteredRows] = useState<BajaRow[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/componentes-obtenidos/bajas")
      .then(res => {
        const data = Array.isArray(res.data)
          ? res.data.map((item: any, idx: number) => ({
              id: item._id || idx + 1,
              no_consecutivo: item.no_consecutivo ?? item.no_registro ?? idx + 1,
              no_hc: item.registro_donacion?.historiaClinica?.no_hc ?? "",
              componente_a_obtener: item.centrifugacion?.componente_a_obtener ?? "",
              causa_baja: item.causa_baja ?? item.motivo_desecho ?? "",
              fechaD: item.registro_donacion?.fechaD ?? "", // <-- Asegúrate de que este campo exista
            }))
          : [];
        setRows(data);
        setFilteredRows(data);
      })
      .catch(() => {
        setRows([]);
        setFilteredRows([]);
      });
  }, []);

  // Buscador por rango de fechas usando fechaD
  const handleSearch = () => {
    if (!searchFechaDesde || !searchFechaHasta) return;
    const desde = new Date(searchFechaDesde);
    const hasta = new Date(searchFechaHasta);
    const filtered = rows.filter((row) => {
      const fecha = new Date(row.fechaD as string);
      return fecha >= desde && fecha <= hasta;
    });
    setFilteredRows(filtered);
    setIsSearchActive(true);
    setSearchOpen(false);
  };

  const handleClearSearch = () => {
    setSearchFechaDesde("");
    setSearchFechaHasta("");
    setSearchOpen(false);
    setIsSearchActive(false);
    setFilteredRows(rows);
  };

  return (
    <>
      <Navbar />
      {/* Botón y diálogo de búsqueda */}
      <Box sx={{ position: "relative", width: "100%" }}>
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
          <Search />
        </IconButton>
      </Box>
      <Dialog open={searchOpen} onClose={() => setSearchOpen(false)}>
        <DialogTitle>Buscar por rango de fechas de donación</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Fecha desde"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={searchFechaDesde}
              onChange={e => setSearchFechaDesde(e.target.value)}
              fullWidth
            />
            <TextField
              label="Fecha hasta"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={searchFechaHasta}
              onChange={e => setSearchFechaHasta(e.target.value)}
              fullWidth
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              disabled={!searchFechaDesde || !searchFechaHasta}
            >
              Buscar
            </Button>
            <Button variant="outlined" onClick={handleClearSearch}>
              Limpiar búsqueda
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>

      <Box sx={{ marginTop: "25" }}>
        <Typography
          sx={{
            fontSize: { xs: "2rem", md: "3rem" },
            mt: 8,
            backgroundColor: "primary.dark",
            textAlign: "center",
            color: "white",
          }}
        >
          Registro de Bajas
        </Typography>

        <Box
          sx={{
            height: 450,
            width: "90%",
            mb: 2,
            marginBlockEnd: 1,
            marginLeft: 7,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <DataGrid
            sx={{
              height: 450,
            }}
            rows={isSearchActive ? filteredRows : rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}
            editMode="row"
            processRowUpdate={(newRow) => {
              const updatedRows = rows.map((row) =>
                row.id === newRow.id ? newRow : row
              );
              setRows(updatedRows);
              return newRow;
            }}
          />
        </Box>
      </Box>
    </>
  );
}