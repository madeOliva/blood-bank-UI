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
  { field: "NoRegistro", headerName: "No. Registro", width: 150 },
  { field: "no_hc", headerName: "No. HC", width: 120 },
  { field: "ci_donante", headerName: "CI", width: 150 },
  { field: "nombre", headerName: "Nombres y Apellidos", width: 300 },
  { field: "edad", headerName: "Edad", width: 100 },
  { field: "sexo", headerName: "Sexo", width: 100 },
  { field: "grupo", headerName: "Grupo", width: 100 },
  { field: "rh", headerName: "RH", width: 100 },
  { field: "donante", headerName: "Donante de", width: 150 },
  { field: "municipio", headerName: "Municipio", width: 120 },
  { field: "provincia", headerName: "Provincia", width: 120 },
  { field: "consejo_popular", headerName: "Consejo Popular", width: 140 },
  { field: "no_consultorio", headerName: "No. Consultorio", width: 140 },
  { field: "ocupacion", headerName: "Ocupación", width: 120 },
  { field: "telefono", headerName: "Teléfono", width: 120 },
  { field: "telefonoLaboral", headerName: "Teléfono Laboral", width: 140 },
  { field: "centro_laboral", headerName: "Centro Laboral", width: 140 },
  { field: "otra_localizacion", headerName: "Otra Localización", width: 140 },
];


  const [errorFechaInicio, setErrorFechaInicio] = React.useState<string | null>(
    null
  );

  const [errorFechaFin, setErrorFechaFin] = React.useState<string | null>(null);

  // Inicializa fechas al primer y último día del mes actual
  const primerDiaMes = dayjs().startOf("month");
  const ultimoDiaMes = dayjs().endOf("month");

  const [fechaInicio, setFechaInicio] = React.useState<Dayjs | null>(
    primerDiaMes
  );
  const [fechaFin, setFechaFin] = React.useState<Dayjs | null>(ultimoDiaMes);
  const [rows, setRows] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchRegistros = async () => {
      if (fechaInicio && fechaFin) {
        try {
          const res = await axios.get(
            "http://localhost:3000/registro-donacion",
            {
              params: {
                inicio: fechaInicio.format("YYYY-MM-DD"),
                fin: fechaFin.format("YYYY-MM-DD"),
              },
            }
          );
          // Agrega este log para ver la respuesta real del backend
          console.log("Respuesta backend:", res.data);

          // Mapea los datos para el DataGrid
          const mappedRows = res.data.map((reg: any) => ({
            id: reg.id || reg._id,
            fechaR: reg.fechaR ? new Date(reg.fechaR).toLocaleString() : "",
            NoRegistro: reg.no_registro || "", // <-- minúscula
            no_hc: reg.no_hc || "",
            ci_donante: reg.ci_donante || "", // <-- así lo devuelve el backend
            nombre: reg.nombre || "",
            edad: reg.edad || "",
            sexo: reg.sexo || "",
            grupo: reg.grupo || "",
            rh: reg.rh || "",
            donante: reg.donante || "",
            municipio: reg.municipio || "",
            provincia: reg.provincia || "",
            consejo_popular: reg.consejo_popular || "",
            no_consultorio: reg.no_consultorio || "",
            ocupacion: reg.ocupacion || "",
            telefono: reg.telefono || "",
            telefonoLaboral: reg.telefonoLaboral || "",
            centro_laboral: reg.centro_laboral || "",
            otra_localizacion: reg.otra_localizacion || "",
          }));
          setRows(mappedRows);
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
