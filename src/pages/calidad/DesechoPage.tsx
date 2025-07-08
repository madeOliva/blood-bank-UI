import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Navbar from "../../components/navbar/Navbar";
import { Box, IconButton, Dialog, DialogTitle, DialogContent, TextField, Button, Stack, Typography } from "@mui/material";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";

const columns: GridColDef[] = [
  { field: "no", headerName: "NO", width: 90 },
  { field: "hc", headerName: "HC-donación", width: 150 },
  { field: "desecho", headerName: "Desecho", width: 150 },
  { field: "motivo", headerName: "Motivo", width: 250 },
];

export default function Desechos() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<any[]>([]);
  const [filteredRows, setFilteredRows] = useState<any[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchHC, setSearchHC] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
  axios.get("http://localhost:3000/registro-donacion/donaciones-diarias")
    .then(response => {
      const desechadas = Array.isArray(response.data)
        ? response.data
            .filter((item: any) => item.estado === "desechada")
            .map((item: any, idx: number) => ({
              id: item.id || item._id || item.no_consecutivo || idx,
              no: item.no || item.no_consecutivo || idx + 1,
              hc: item.hc ?? "", // <-- usa el campo hc que ya viene del backend
              desecho: item.desecho,
              motivo: item.motivo_desecho || "Sin motivo"
            }))
        : [];
      setRows(desechadas);
      setFilteredRows(desechadas);
    })
    .catch(error => {
      setRows([]);
      setFilteredRows([]);
    });
}, []);

// Buscador por número de historia clínica
const handleSearch = () => {
  if (!searchHC) {
    setFilteredRows(rows);
    setIsSearchActive(false);
    setSearchOpen(false);
    return;
  }
  const search = searchHC.trim().replace(/\s+/g, '').toLowerCase();
 
 const data = rows.filter((row) =>
  String(row.hc).replace(/\s+/g, '').toLowerCase() === search
);
  setFilteredRows(data);
  setIsSearchActive(true);
  setSearchOpen(false);
  setTimeout(() => {
    if (document && document.body) document.body.focus();
  }, 0);
};

const handleClearSearch = () => {
  setSearchHC("");
  setFilteredRows(rows);
  setIsSearchActive(false);
  setSearchOpen(false);
  setTimeout(() => {
    if (document && document.body) document.body.focus();
  }, 0);
};

  return (
    <>
      <Navbar />
      
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
          <SearchIcon />
        </IconButton>
      </Box>
      <Dialog open={searchOpen} onClose={() => setSearchOpen(false)}>
        <DialogTitle>Buscar por Historia Clínica</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Historia Clínica"
              value={searchHC}
              onChange={(e) => setSearchHC(e.target.value)}
              fullWidth
            />
            <Button variant="contained" onClick={handleSearch} disabled={!searchHC}>
              Buscar
            </Button>
            <Button variant="outlined" onClick={handleClearSearch}>
              Limpiar búsqueda
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
      
      <Typography
        variant="h4"
        component="h5"
        mt={8}
        sx={{
          fontSize: { xs: "2rem", md: "3rem" },
          backgroundColor: "primary.dark",
          textAlign: "center",
          color: "white",
        }}
      >
        Desechos
      </Typography>
      <Box sx={{ width: "95%", margin: "40px auto 0 auto", height: 500 }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
}