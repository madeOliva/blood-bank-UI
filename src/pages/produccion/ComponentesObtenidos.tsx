import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Typography, IconButton, Dialog, DialogTitle, DialogContent, Stack, TextField, Button } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { Search } from "@mui/icons-material";

type ComponenteObtenidoRow = {
  id: string;
  no_consecutivo: string;
  no_hc: string;
  sexo: string;
  edad: number | string;
  fecha_donacion: string | Date;
  fecha_obtencion: string | Date;
  volumen: number | string;
};

const columns: GridColDef[] = [
  { field: "no_consecutivo", headerName: "No", width: 100 },
  { field: "no_hc", headerName: "No. HC", width: 150 },
  { field: "sexo", headerName: "Sexo", width: 100 },
  { field: "edad", headerName: "Edad", width: 100 },
  {
    field: "fecha_donacion",
    headerName: "Fecha Donación",
    width: 150,
    renderCell: (params) => {
      const value = params.value;
      if (!value || typeof value !== "string") return "";
      const date = new Date(value.includes("T") ? value : value.replace(/-/g, "/"));
      return isNaN(date.getTime()) ? "" : date.toLocaleDateString();
    },
  },
  {
    field: "fecha_obtencion",
    headerName: "Fecha Obtención",
    width: 150,
    renderCell: (params) =>
      params.value ? new Date(params.value).toLocaleDateString() : "",
  },
  { field: "volumen", headerName: "Volumen", width: 120 },
];

export default function ComponentesObtenidos() {
  const [rows, setRows] = useState<ComponenteObtenidoRow[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchFechaObtencion, setSearchFechaObtencion] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [filteredRows, setFilteredRows] = useState<ComponenteObtenidoRow[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/componentes-obtenidos/componentes_obtenidos")
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data.flatMap((item: any) =>
              (item.componentes || [])
                .filter((comp: any) => comp.estado_obtencion === "liberado")
                .map((comp: any) => ({
                  id: comp._id,
                  no_consecutivo: item.no_consecutivo ?? "",
                  no_hc: item.registro_donacion?.historiaClinica?.no_hc ?? "",
                  sexo:
                    typeof item.registro_donacion?.historiaClinica?.sexo === "object"
                      ? item.registro_donacion?.historiaClinica?.sexo?.nombre ?? ""
                      : item.registro_donacion?.historiaClinica?.sexo ?? "",
                  edad: item.registro_donacion?.historiaClinica?.edad ?? "",
                  fecha_donacion: item.registro_donacion?.fechaD ?? "",
                  fecha_obtencion: comp.fecha_obtencion ?? "",
                  volumen: comp.volumen ?? "",
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

  // Búsqueda por una sola fecha de obtención
const handleSearch = () => {
  if (!searchFechaObtencion) return;
const filtered = rows.filter((row) => {
  const rowDateStr = String(row.fecha_obtencion).trim().slice(0, 10);
  return rowDateStr === searchFechaObtencion;
});
console.log("Filtrados:", filtered);
  setFilteredRows(filtered);
  setIsSearchActive(true);
  setSearchOpen(false);
};

  const handleClearSearch = () => {
    setSearchFechaObtencion("");
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
        <DialogTitle>Buscar por fecha de donacion</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Fecha de obtención"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={searchFechaObtencion}
              onChange={e => setSearchFechaObtencion(e.target.value)}
              fullWidth
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              disabled={!searchFechaObtencion}
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
          Componentes Obtenidos
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
            rows={isSearchActive ? filteredRows : rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 },
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