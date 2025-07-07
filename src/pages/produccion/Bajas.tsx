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
  fechaD?: string;
};

export default function Bajas() {
  const [rows, setRows] = useState<BajaRow[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchComponente, setSearchComponente] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [filteredRows, setFilteredRows] = useState<BajaRow[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/componentes-obtenidos/bajas")
      .then(res => {
        const data = Array.isArray(res.data)
          ? res.data.flatMap((item: any, idx: number) =>
              (item.componentes || [])
                .filter((comp: any) => comp.estado_obtencion === "desechada")
                .map((comp: any, compIdx: number) => ({
                  id: comp._id || `${item._id}_${compIdx}`,
                  no_consecutivo: item.no_consecutivo ?? idx + 1,
                  no_hc: item.registro_donacion?.historiaClinica?.no_hc ?? "",
                  componente_a_obtener: comp.tipo ?? comp.componente ?? "",
                  causa_baja: comp.causa_baja ?? item.causa_baja ?? "",
                  fechaD: item.registro_donacion?.fechaD ?? "",
                }))
            )
          : [];
        setRows(data);
        setFilteredRows(data);
      })
      .catch(() => {
        setRows([]);
        setFilteredRows([]);
      });
  }, []);

  // Buscador por componente_a_obtener
  const handleSearch = () => {
    if (!searchComponente) {
      setFilteredRows(rows);
      setIsSearchActive(false);
      setSearchOpen(false);
      return;
    }
    const filtered = rows.filter((row) =>
      String(row.componente_a_obtener).toLowerCase().includes(searchComponente.toLowerCase())
    );
    setFilteredRows(filtered);
    setIsSearchActive(true);
    setSearchOpen(false);
  };

  const handleClearSearch = () => {
    setSearchComponente("");
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
        <DialogTitle>Buscar por componente</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Componente"
              value={searchComponente}
              onChange={e => setSearchComponente(e.target.value)}
              fullWidth
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              disabled={!searchComponente}
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
          variant="h5"
          sx={{
            fontSize: { xs: "2rem", md: "3rem" },
            mt: 8,
            backgroundColor: "primary.dark",
            textAlign: "center",
            color: "white",
          }}
        >
          Componentes de Desecho
        </Typography>

        <Box
           sx={{
            height: 450,
            width: "90%",
            mb: 2,
            marginBlockEnd: 1,
            marginLeft: 9,
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