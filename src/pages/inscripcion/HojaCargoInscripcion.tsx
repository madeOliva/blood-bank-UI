import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Navbar from "../../components/navbar/Navbar";
import { Box, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Edit, Padding } from "@mui/icons-material";
import axios from "axios";

// Definición de las columnas
const columns: GridColDef[] = [
  {
    field: "modificar",
    headerName: "",
    width: 80,
    sortable: false,
    filterable: false,
    align: "center",
    renderCell: (params) => {
      const navigate = useNavigate();
      return (
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/inscripcion/${params.row.id}`);
          }}
          aria-label="modificar"
        >
          <Edit sx={{ color: "red" }} />
        </IconButton>
      );
    },
  },
  { field: "fechaR", headerName: "Fecha de Registro", width: 200 },
  { field: "NoRegistro", headerName: "No. Registro", width: 150 },
  { field: "ci_donante", headerName: "CI", width: 150 },
  { field: "nombre", headerName: "Nombres y Apellidos", width: 300 },
  { field: "edad", headerName: "Edad", width: 100 },
  { field: "sexo", headerName: "Sexo", width: 100 },
  { field: "grupo", headerName: "Grupo", width: 100 },
  { field: "rh", headerName: "RH", width: 100 },
  { field: "donante", headerName: "Donante de", width: 150 },
  
];

export default function HojaCargo() {
  const navigate = useNavigate();
  const [errorFechaInicio, setErrorFechaInicio] = React.useState<string | null>(null);
  const [errorFechaFin, setErrorFechaFin] = React.useState<string | null>(null);

  // Inicializa fechas al primer y último día del mes actual
  const primerDiaMes = dayjs().startOf("month");
  const ultimoDiaMes = dayjs().endOf("month");

  const [fechaInicio, setFechaInicio] = React.useState<Dayjs | null>(primerDiaMes);
  const [fechaFin, setFechaFin] = React.useState<Dayjs | null>(ultimoDiaMes);
  const [rows, setRows] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchRegistros = async () => {
      if (fechaInicio && fechaFin) {
        try {
          const res = await axios.get(
            "http://localhost:3000/registro-donacion/rango-fechas",
            {
              params: {
                inicio: fechaInicio.format("YYYY-MM-DD"),
                fin: fechaFin.format("YYYY-MM-DD"),
              },
            }
          );
          setRows(res.data);
        } catch (error) {
          setRows([]);
        }
      } else {
        setRows([]);
      }
    };
    fetchRegistros();
  }, [fechaInicio, fechaFin]);

  const handleRowClick = () => {
    navigate(`/inscripcion/`);
  };

  const handleFechaInicioChange = (newValue: Dayjs | null) => {
    setFechaInicio(newValue);
    if (!newValue) {
      setErrorFechaInicio("La fecha de inicio es obligatoria");
    } else if (fechaFin && newValue.isAfter(fechaFin)) {
      setErrorFechaInicio("La fecha de inicio no puede ser posterior a la fecha fin");
    } else {
      setErrorFechaInicio(null);
      if (fechaFin && fechaFin.isBefore(newValue)) {
        setErrorFechaFin("La fecha fin no puede ser anterior a la fecha inicio");
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
        setErrorFechaInicio("La fecha de inicio no puede ser posterior a la fecha fin");
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
      {/* Contenedor para los campos de fecha */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          sx={{
            display: "flex",
            gap: 10,
            marginTop: 2,
            justifyContent: "center",
          }}
        >
          <DateTimePicker
            label="Fecha y Hora Inicio"
            value={fechaInicio}
            onChange={handleFechaInicioChange}
            slotProps={{
              textField: {
                sx: { width: 400 },
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
                sx: { width: 400 },
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
            width: "95%",
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            onRowClick={handleRowClick}
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