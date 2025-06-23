import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Navbar from "../../components/navbar/Navbar";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import axios from "axios";

export default function HojaCargoDonaciones() {
  // Nombres ajustados según tu backend (registro_donacion.schema.ts)
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
    { field: "no_registro", headerName: "No. Registro", width: 120 },
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
  const [fechaInicio, setFechaInicio] = React.useState<string>(
    dayjs().format("YYYY-MM-DD")
  );
  const [fechaFin, setFechaFin] = React.useState<string>(
    dayjs().format("YYYY-MM-DD")
  );
  const [openModifyConfirm, setOpenModifyConfirm] = React.useState(false);
  const [rowToModify, setRowToModify] = React.useState<any>(null);

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

  // Cargar donaciones del día por defecto (solo estado "procesando")
  React.useEffect(() => {
    const fetchDonacionesHoy = async () => {
      try {
        const hoy = dayjs().format("YYYY-MM-DD");
        const res = await axios.get(
          "http://localhost:3000/registro-donacion/hoja-cargo-donaciones",
          {
            params: { inicio: fechaInicio, fin: fechaFin },
          }
        );
        setRows(
          res.data.map((reg: any) => ({
            id: reg.id || reg._id,
            fechaD: reg.fechaD  ,
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
            componenteObj: reg.componente || null, // <-- Guarda el objeto completo si lo necesitas
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
          }))
        );
      } catch (error) {
        setRows([]);
      }
    };
    fetchDonacionesHoy();
  }, []);

  // Buscar por rango de fechas (solo estado "procesando")
  const handleBuscar = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/registro-donacion/hoja-cargo-donaciones",
        {
          params: { inicio: fechaInicio, fin: fechaFin },
        }
      );
      setRows(
        res.data.map((reg: any) => ({
          id: reg.id || reg._id,
          fechaD: reg.fechaD ,
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
          componenteObj: reg.componente || null, // <-- Guarda el objeto completo si lo necesitas
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
          responsableExtraccion: reg.responsableExtraccion || "",
          nombre_unidad: reg.nombre_unidad || "",
        }))
      );
    } catch (error) {
      setRows([]);
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
          {/* Filtros de fecha */}
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              label="Fecha inicio"
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              InputLabelProps={{ shrink: true }}
              size="small"
            />
            <TextField
              label="Fecha fin"
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              InputLabelProps={{ shrink: true }}
              size="small"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleBuscar}
              sx={{ minWidth: 120 }}
            >
              Buscar
            </Button>
          </Box>
          <DataGrid
            rows={rows}
            columns={columnas.map((col) =>
              col.field === "modificar"
                ? {
                    ...col,
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
                  }
                : col
            )}
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
            <Button onClick={() => setOpenModifyConfirm(false)} color="primary">
              No
            </Button>
            <Button onClick={handleConfirmModify} color="primary" autoFocus>
              Sí
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}
