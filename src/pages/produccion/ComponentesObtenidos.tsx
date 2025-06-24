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
  { field: "sexo", headerName: "Sexo", width: 60 },
  { field: "edad", headerName: "Edad", width: 60 },
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
  { field: "volumen", headerName: "Volumen (ml)", width: 120 },
];

export default function ComponentesObtenidos() {
  const [rows, setRows] = useState<ComponenteObtenidoRow[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchFechaDesde, setSearchFechaDesde] = useState("");
  const [searchFechaHasta, setSearchFechaHasta] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [filteredRows, setFilteredRows] = useState<ComponenteObtenidoRow[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/componentes-obtenidos/componentes_obtenidos")
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
              .filter((item: any) => item.estado_obtencion === "liberado")
              .flatMap((item: any) =>
                (item.componentes || [])
                  .filter((comp: any) => !!comp._id)
                  .map((comp: any) => ({
                    id: comp._id,
                    no_consecutivo: item.registro_donacion?.no_consecutivo ?? "",
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
        setFilteredRows(data); // Inicializa filtrados igual que rows
      })
      .catch(() => {
        setRows([]);
        setFilteredRows([]);
      });
  }, []);

  // Funciones de búsqueda solo por fecha
  const handleSearch = () => {
    if (!searchFechaDesde || !searchFechaHasta) return;
    const desde = new Date(searchFechaDesde);
    const hasta = new Date(searchFechaHasta);
    const filtered = rows.filter((row) => {
      const fecha = new Date(row.fecha_donacion as string);
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
          variant="h4"
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