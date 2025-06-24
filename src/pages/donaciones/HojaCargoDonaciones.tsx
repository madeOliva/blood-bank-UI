import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Navbar from "../../components/navbar/Navbar";
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "../../components/Button"; // Usa tu botón personalizado

export default function HojaCargoDonaciones() {
  const columnas: GridColDef[] = [
    {
      field: "modificar",
      headerName: "",
      width: 80,
      sortable: false,
      filterable: false,
      align: "center",
      renderCell: (params) => (
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            handleModifyClick(params.row);
          }}
          aria-label="modificar"
        >
          <EditIcon sx={{ color: "red" }} />
        </IconButton>
      ),
    },
    { field: "fechaD", headerName: "Fecha Donación", width: 200 },
    { field: "no_registro", headerName: "No. Registro", width: 200 },
    { field: "ci", headerName: "CI", width: 120 },
    { field: "no_hc", headerName: "No. HC", width: 120 },
    { field: "nombre", headerName: "Nombre", width: 250 },
    { field: "sexo", headerName: "Sexo", width: 80 },
    { field: "edad", headerName: "Edad", width: 80 },
    { field: "grupo", headerName: "Grupo", width: 80 },
    { field: "rh", headerName: "Rh", width: 60 },
    { field: "componenteNombre", headerName: "Componente Donado", width: 180 },
    { field: "no_tubuladura", headerName: "No.Tubuladura", width: 140 },
    { field: "no_lote", headerName: "NO. Bolsa", width: 120 },
    { field: "tipo_bolsa", headerName: "Tipo de Bolsa", width: 150 },
    { field: "volumen", headerName: "Volumen", width: 100 },
    { field: "reaccion", headerName: "Reacciones", width: 150 },
    { field: "TCM", headerName: "TCM", width: 80 },
    { field: "TP", headerName: "TP", width: 80 },
    { field: "tiempo", headerName: "T(min)", width: 80 },
    { field: "ciclos", headerName: "Ciclos", width: 80 },
    { field: "ACD", headerName: "ACD", width: 80 },
    { field: "no_lote_kitACD", headerName: "Lote Kit ACD", width: 150 },
    { field: "no_lote_kitBach", headerName: "Lote Kit Bach", width: 150 },
    { field: "nombre_unidad", headerName: "Nombre Unidad", width: 150 },
    {
      field: "responsableExtraccion",
      headerName: "Responsable de Extraccion",
      width: 180,
    },
  ];

  const navigate = useNavigate();
  const [rows, setRows] = React.useState<any[]>([]);
  const [fechaInicio, setFechaInicio] = React.useState<Dayjs | null>(
    dayjs().startOf("day")
  );
  const [fechaFin, setFechaFin] = React.useState<Dayjs | null>(
    dayjs().endOf("day")
  );
  const [errorFechaInicio, setErrorFechaInicio] = React.useState<string | null>(
    null
  );
  const [errorFechaFin, setErrorFechaFin] = React.useState<string | null>(null);
  const [openModifyConfirm, setOpenModifyConfirm] = React.useState(false);
  const [rowToModify, setRowToModify] = React.useState<any>(null);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchNoRegistro, setSearchNoRegistro] = React.useState("");
  const [filteredRows, setFilteredRows] = React.useState<any[]>([]);
  const [isSearchActive, setIsSearchActive] = React.useState(false);

  // --- Modificar: abre modal de confirmación ---
  const handleModifyClick = (row: any) => {
    setRowToModify(row);
    setOpenModifyConfirm(true);
  };

  // --- Confirmar modificación: redirige según tipo de bolsa ---
  const handleConfirmModify = () => {
    if (!rowToModify) return;
    const id = rowToModify.id || rowToModify._id;
    if (rowToModify.componenteNombre?.includes("Plasma")) {
      navigate(`/donaciones-plasma/${id}`, {
        state: { datosDonante: rowToModify },
      });
    } else {
      navigate(`/donaciones-sangre/${id}`, {
        state: { datosDonante: rowToModify },
      });
    }
    setOpenModifyConfirm(false);
  };

  // --- Validación de fechas ---
  const validarFechas = () => {
    if (!fechaInicio) {
      setErrorFechaInicio("La fecha de inicio es obligatoria");
      return false;
    }
    if (!fechaFin) {
      setErrorFechaFin("La fecha fin es obligatoria");
      return false;
    }
    if (fechaInicio.isAfter(fechaFin)) {
      setErrorFechaInicio(
        "La fecha de inicio no puede ser posterior a la fecha fin"
      );
      setErrorFechaFin("La fecha fin no puede ser anterior a la fecha inicio");
      return false;
    }
    setErrorFechaInicio(null);
    setErrorFechaFin(null);
    return true;
  };

  // --- Buscar por rango de fechas ---
  const handleBuscar = async () => {
    if (!validarFechas()) return;
    try {
      const res = await axios.get(
        "http://localhost:3000/registro-donacion/hoja-cargo-donaciones",
        {
          params: {
            inicio: fechaInicio ? fechaInicio.format("YYYY-MM-DD") : "",
            fin: fechaFin ? fechaFin.format("YYYY-MM-DD") : "",
          },
        }
      );

      const mappedRows = res.data.map((reg: any) => ({
        id: reg.id || reg._id,
        fechaD: reg.fechaD,
        no_registro: reg.no_registro || "",
        ci: reg.ci || "",
        no_hc: reg.no_hc || "",
        nombre: reg.nombre || "",
        sexo: reg.sexo || "",
        edad: reg.edad || "",
        grupo: reg.grupo || "",
        rh: reg.rh || "",
        componente: reg.componente?._id || reg.componente || "",
        componenteNombre:
          reg.componente?.nombreComponente || reg.componenteNombre || "",
        componenteObj: reg.componente || null,
        no_tubuladura: reg.no_tubuladura || "",
        no_lote: reg.no_lote || "",
        tipo_bolsa: reg.tipo_bolsa || "",
        volumen: reg.volumen || "",
        reaccion: reg.reaccion || "",
        TCM: reg.TCM || "",
        TP: reg.TP || "",
        tiempo: reg.tiempo || "",
        ciclos: reg.ciclos || "",
        ACD: reg.ACD || "",
        no_lote_kitACD: reg.no_lote_kitACD || "",
        no_lote_kitBach: reg.no_lote_kitBach || "",
        nombre_tecnico: reg.nombre_tecnico || "",
        nombre_unidad: reg.nombre_unidad || "",
        responsableExtraccion: reg.responsableExtraccion || "",
      }));
      setRows(mappedRows);
      setFilteredRows(mappedRows);
      setIsSearchActive(false);
    } catch (error) {
      setRows([]);
      setFilteredRows([]);
      setIsSearchActive(false);
    }
  };

  // --- Cargar donaciones por defecto cuando cambian las fechas ---
  React.useEffect(() => {
    handleBuscar();
    // eslint-disable-next-line
  }, [fechaInicio, fechaFin]);

  // --- Handlers para los pickers ---
  const handleFechaInicioChange = (newValue: Dayjs | null) => {
    setFechaInicio(newValue);
    if (!newValue) {
      setErrorFechaInicio("La fecha de inicio es obligatoria");
    } else if (fechaFin && newValue.isAfter(fechaFin)) {
      setErrorFechaInicio(
        "La fecha de inicio no puede ser posterior a la fecha fin"
      );
    } else {
      setErrorFechaInicio(null);
      if (fechaFin && fechaFin.isBefore(newValue)) {
        setErrorFechaFin(
          "La fecha fin no puede ser anterior a la fecha inicio"
        );
      } else {
        setErrorFechaFin(null);
      }
    }
  };

  const handleFechaFinChange = (newValue: Dayjs | null) => {
    setFechaFin(newValue);
    if (!newValue) {
      setErrorFechaFin("La fecha fin es obligatoria");
    } else if (fechaInicio && newValue.isBefore(fechaInicio)) {
      setErrorFechaFin("La fecha fin no puede ser anterior a la fecha inicio");
    } else {
      setErrorFechaFin(null);
      if (fechaInicio && fechaInicio.isAfter(newValue)) {
        setErrorFechaInicio(
          "La fecha de inicio no puede ser posterior a la fecha fin"
        );
      } else {
        setErrorFechaInicio(null);
      }
    }
  };

  // --- Buscador por No. Registro Donación ---
  const handleSearch = () => {
    setFilteredRows(
      rows.filter(
        (row) =>
          !searchNoRegistro || row.no_registro?.toString() === searchNoRegistro
      )
    );
    setIsSearchActive(true);
    setSearchOpen(false);
  };

  const handleClearSearch = () => {
    setSearchNoRegistro("");
    setSearchOpen(false);
    setIsSearchActive(false);
    handleBuscar(); // Esto recarga los datos según las fechas actuales
  };

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
          fontFamily: '"Open Sans"',
        }}
      >
        Hoja de Cargo
      </Typography>

      <Box sx={{ position: "relative", width: "100%" }}>
        {/* Buscador en la esquina superior derecha */}
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

      {/* Dialogo de búsqueda */}
      <Dialog open={searchOpen} onClose={() => setSearchOpen(false)}>
        <DialogTitle>Buscar por No. Registro Donación</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="No. Registro Donación"
              value={searchNoRegistro}
              onChange={(e) => {
                const value = e.target.value;
                // Solo letras, números, punto y guion, sin espacios
                if (
                  /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9.\-]*$/.test(value) ||
                  value === ""
                ) {
                  setSearchNoRegistro(e.target.value);
                }
              }}
              fullWidth
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              disabled={!searchNoRegistro}
            >
              Buscar
            </Button>
            <Button variant="outlined" onClick={handleClearSearch}>
              Limpiar búsqueda
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>

      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Box
          style={{
            width: "98%",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                mb: 2,
                mt: 2,
                justifyContent: "flex-start",
              }}
            >
              <DateTimePicker
                label="Fecha y Hora Inicio"
                value={fechaInicio}
                onChange={handleFechaInicioChange}
                slotProps={{
                  textField: {
                    size: "small",
                    sx: { width: 230 },
                    error: !!errorFechaInicio,
                    helperText: errorFechaInicio,
                  },
                }}
              />
              <DateTimePicker
                label="Fecha y Hora Fin"
                value={fechaFin}
                onChange={handleFechaFinChange}
                slotProps={{
                  textField: {
                    size: "small",
                    sx: { width: 230 },
                    error: !!errorFechaFin,
                    helperText: errorFechaFin,
                  },
                }}
              />
            </Box>
          </LocalizationProvider>
          {/* Puedes mostrar un mensaje o badge según el estado: */}
          <Typography
            align="center"
            variant="h2"
            component="h2"
            mt={8}
            sx={{
              fontSize: { xs: "1rem", md: "2rem" },
              textAlign: "center",
              backgroundColor: "#00796B",
              color: "white",
              mb: 2,
              fontFamily: '"Open Sans"',
            }}
          >
            {isSearchActive
              ? "Resultado de búsqueda por No. Registro Donación"
              : "Donaciones en el rango de fechas seleccionado"}
          </Typography>
          <DataGrid
            rows={filteredRows}
            columns={columnas}
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                position: "sticky",
                top: 0,
                zIndex: 1,
                backgroundColor: "#fff",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                fontFamily: '"Open Sans"',
                fontWeight: 600,
              },
              "& .MuiDataGrid-cellContent": {
                fontFamily: '"Open Sans"',
                color: "#000",
              },
            }}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}
          />
        </Box>
        {/* Modal de confirmación de modificación */}
        <Dialog
          open={openModifyConfirm}
          onClose={() => setOpenModifyConfirm(false)}
          aria-labelledby="modify-confirm-dialog-title"
        >
          <DialogTitle id="modify-confirm-dialog-title">
            Confirmación
          </DialogTitle>
          <DialogContent>
            ¿Está seguro que desea modificar la donacion de{" "}
            <strong>{rowToModify?.nombre}</strong>?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenModifyConfirm(false)}>No</Button>
            <Button onClick={handleConfirmModify} autoFocus>
              Sí
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}
