import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Navbar from "../../components/navbar/Navbar";
import { Box, IconButton, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Edit, Padding, Search } from "@mui/icons-material";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

export default function HojaCargo() {
  const navigate = useNavigate();
  const [openModifyConfirm, setOpenModifyConfirm] = React.useState(false);
  const [rowToModify, setRowToModify] = React.useState<any>(null);

  //Estados para busqueda
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchNoRegistro, setSearchNoRegistro] = React.useState("");
  const [filteredRows, setFilteredRows] = React.useState<any[]>([]);
  const [isSearchActive, setIsSearchActive] = React.useState(false);

  const handleModifyClick = (row: any) => {
    setRowToModify(row);
    setOpenModifyConfirm(true);
  };

  const handleConfirmModify = () => {
    // Aquí navegas o haces la acción de modificar
    navigate(`/inscripcion/${rowToModify.id}`);
    setOpenModifyConfirm(false);
  };

  // Definición de las columnas
  const columns: GridColDef[] = [
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
          <Edit sx={{ color: "red" }} />
        </IconButton>
      ),
    },
    { field: "fechaR", headerName: "Fecha de Registro", width: 200 },
    { field: "NoRegistro", headerName: "No. Registro", width: 200 },
    { field: "no_hc", headerName: "No. HC", width: 120 },
    { field: "ci_donante", headerName: "CI", width: 150 },
    { field: "nombre", headerName: "Nombres y Apellidos", width: 250 },
    {
      field: "fecha_nacimiento",
      headerName: "Fecha de Nacimiento",
      width: 200,
    },
    { field: "edad", headerName: "Edad", width: 100 },
    { field: "sexo", headerName: "Sexo", width: 50 },
    { field: "grupo", headerName: "Grupo", width: 100 },
    { field: "rh", headerName: "RH", width: 100 },
    { field: "donante", headerName: "Donante de", width: 150 },
    { field: "municipio", headerName: "Municipio", width: 120 },
    { field: "provincia", headerName: "Provincia", width: 120 },
    { field: "direccion", headerName: "Direccion", width: 300 },
    { field: "consejo_popular", headerName: "Consejo Popular", width: 140 },
    { field: "no_consultorio", headerName: "No. Consultorio", width: 140 },
    { field: "ocupacion", headerName: "Ocupación", width: 120 },
    { field: "telefono", headerName: "Teléfono", width: 120 },
    { field: "telefonoLaboral", headerName: "Teléfono Laboral", width: 140 },
    { field: "centro_laboral", headerName: "Centro Laboral", width: 140 },
    { field: "otra_localizacion", headerName: "Otra Localización", width: 140 },
    { field: "nombre_unidad", headerName: "Nombre Unidad", width: 140 },
    {
      field: "responsableInscripcion",
      headerName: "Responsable de Inscripción",
      width: 220,
    },
  ];

  const [errorFechaInicio, setErrorFechaInicio] = React.useState<string | null>(
    null
  );

  const [errorFechaFin, setErrorFechaFin] = React.useState<string | null>(null);

  // Inicializa fechas al primer y último día del mes actual
  const inicioDia = dayjs().startOf("day");
  const finDia = dayjs().endOf("day");

  const [fechaInicio, setFechaInicio] = React.useState<Dayjs | null>(inicioDia);
  const [fechaFin, setFechaFin] = React.useState<Dayjs | null>(finDia);
  const [rows, setRows] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchRegistros = async () => {
      if (fechaInicio && fechaFin) {
        try {
          const res = await axios.get(
            "http://localhost:3000/registro-donacion",
            {
              params: {
                inicio: fechaInicio.format("YYYY-MM-DD HH:mm:ss"),
                fin: fechaFin.format("YYYY-MM-DD HH:mm:ss"),
              },
            }
          );

          // Mapea los datos para el DataGrid
          const mappedRows = res.data.map((reg: any) => ({
            id: reg.id || reg._id,
            fechaR: reg.fechaR ? new Date(reg.fechaR).toLocaleString() : "",
            NoRegistro: reg.no_registro || "", // <-- minúscula
            no_hc: reg.no_hc || "",
            ci_donante: reg.ci_donante || "", // <-- así lo devuelve el backend
            nombre: reg.nombre || "",
            fecha_nacimiento: reg.fecha_nacimiento
              ? new Date(reg.fecha_nacimiento).toLocaleDateString()
              : "", // <-- aquí formateas la fecha
            edad: reg.edad || "",
            sexo: reg.sexo || "",
            grupo: reg.grupo || "",
            rh: reg.rh || "",
            donante: reg.donante || "",
            municipio: reg.municipio || "",
            provincia: reg.provincia || "",
            direccion: reg.direccion || "",
            consejo_popular: reg.consejo_popular || "",
            no_consultorio: reg.no_consultorio || "",
            ocupacion: reg.ocupacion || "",
            telefono: reg.telefono || "",
            telefonoLaboral: reg.telefonoLaboral || "",
            centro_laboral: reg.centro_laboral || "",
            otra_localizacion: reg.otra_localizacion || "",
            responsableInscripcion: reg.responsableInscripcion || "",
            nombre_unidad: reg.nombre_unidad || "",
          }));
          setRows(mappedRows);
          setFilteredRows(mappedRows);
          setIsSearchActive(false);
        } catch (error) {
          setRows([]);
          setFilteredRows([]);
          setIsSearchActive(false);
        }
      } else {
        setRows([]);
        setFilteredRows([]);
        setIsSearchActive(false);
      }
    };
    fetchRegistros();
  }, [fechaInicio, fechaFin]);

  // Búsqueda exacta por No. Registro
  const handleSearch = () => {
    setFilteredRows(
      rows.filter((row) => row.NoRegistro?.toString() === searchNoRegistro)
    );
    setIsSearchActive(true);
    setSearchOpen(false);
  };

  // Limpiar búsqueda y mostrar registros del rango de fechas
  const handleClearSearch = () => {
    setSearchNoRegistro("");
    setSearchOpen(false);
    setIsSearchActive(false);
    setFilteredRows(rows);
  };

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
        <DialogTitle>Buscar por No. Registro</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="No. Registro"
              value={searchNoRegistro}
              onChange={(e) => {
                const value = e.target.value;
                // Solo letras, números, punto y guion, sin espacios
                if (
                  /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9.\-]*$/.test(value) ||
                  value === ""
                ) {
                  setSearchNoRegistro(value);
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

      {/* Contenedor para los campos de fecha */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            marginTop: 2,
            paddingLeft: 2,
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
      {/* Contenedor para centrar el DataGrid */}
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Box
          style={{
            height: 450,
            width: "100%",
          }}
        >
          <Dialog
            open={openModifyConfirm}
            onClose={() => setOpenModifyConfirm(false)}
            aria-labelledby="modify-confirm-dialog-title"
          >
            <DialogTitle id="modify-confirm-dialog-title">
              Confirmación
            </DialogTitle>
            <DialogContent>
              ¿Está seguro que desea modificar el registro de{" "}
              <strong>
                {rowToModify?.responsableSalud || rowToModify?.nombre}
              </strong>
              ?
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setOpenModifyConfirm(false)}
                color="primary"
              >
                No
              </Button>
              <Button onClick={handleConfirmModify} color="primary" autoFocus>
                Sí
              </Button>
            </DialogActions>
          </Dialog>
          {/* Mensaje de estado de búsqueda */}
          <Typography
            align="center"
            variant="h2"
            component="h2"
            mt={2}
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
              : "Registros en el rango de fechas seleccionado"}
          </Typography>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            // onRowClick={handleRowClick}
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
      </Box>
    </>
  );
}
