import { useState, useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import BotonPersonalizado from "../../components/Button";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import {
  Button,
  Container,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

// Tipos
export type PlanDonacion = {
  id: number;
  fechaHora: string;
  areaSalud: string;
  consejoPopular: string;
  consultoriosAfectados: number;
  lugarDonacion: string;
  compromiso: string;
  responsableSalud: string;
  cdr: string;
};

type LocationState = {
  updatedRow?: PlanDonacion;
  newRow?: PlanDonacion;
};

const initialRows: PlanDonacion[] = [
  {
    id: 1,
    fechaHora: "2025-05-01 14:30",
    areaSalud: "Centro",
    consejoPopular: "CP1",
    consultoriosAfectados: 3,
    lugarDonacion: "Policlínico Central",
    compromiso: "10 donaciones",
    responsableSalud: "Dr. Pérez",
    cdr: "CDR 1",
  },
  {
    id: 2,
    fechaHora: "2025-05-01 09:15",
    areaSalud: "Norte",
    consejoPopular: "CP2",
    consultoriosAfectados: 2,
    lugarDonacion: "Consultorio 5",
    compromiso: "8 donaciones",
    responsableSalud: "Dra. Gómez",
    cdr: "CDR 2",
  },
  {
    id: 3,
    fechaHora: "2025-05-02 10:00",
    areaSalud: "Centro",
    consejoPopular: "CP3",
    consultoriosAfectados: 1,
    lugarDonacion: "Policlínico Sur",
    compromiso: "5 donaciones",
    responsableSalud: "Dr. Ruiz",
    cdr: "CDR 3",
  },
  // ... otras filas
];

export default function PlanDonaciones() {
  const navigate = useNavigate();
  const location = useLocation();
  const [rows, setRows] = useState<PlanDonacion[]>(initialRows);

  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [openSuccess, setOpenSuccess] = useState<boolean>(false);
  const [openDeleteSuccess, setOpenDeleteSuccess] = useState<boolean>(false);
  const [openError, setOpenError] = useState<boolean>(false);

  const [rowToDelete, setRowToDelete] = useState<PlanDonacion | null>(null);
  const [openModifyConfirm, setOpenModifyConfirm] = useState<boolean>(false);
  const [rowToModify, setRowToModify] = useState<PlanDonacion | null>(null);

  // Detectar fila actualizada o nueva al volver de FormularioPlan
  useEffect(() => {
    const state = location.state as LocationState | undefined;
    if (state?.updatedRow) {
      const updatedRow = state.updatedRow;
      setRows((prevRows) =>
        prevRows.map((row) => (row.id === updatedRow.id ? updatedRow : row))
      );
      navigate(location.pathname, { replace: true, state: {} });
    }
    if (state?.newRow) {
      const newRow = state.newRow;
      setRows((prevRows) => {
        const exists = prevRows.some((row) => row.id === newRow.id);
        if (exists) return prevRows;
        return [...prevRows, newRow];
      });
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);

  // Filtrar filas según fecha seleccionada
  const filteredRows = useMemo(() => {
    return rows;
  }, [rows]);

  const handleEnviarClick = () => {
    if (rows.length === 0) {
      setOpenError(true);
    } else {
      setOpenConfirm(true);
    }
  };

  const handleEliminarClick = (row: PlanDonacion) => {
    setRowToDelete(row);
    setOpenConfirm(true);
  };

  const handleConfirmSend = () => {
    setOpenConfirm(false);
    setOpenSuccess(true);
    setTimeout(() => {
      navigate("/resumenDonaciones", { state: { data: rows } });
    }, 1500);
  };

  const handleConfirmDelete = () => {
    setOpenConfirm(false);
    setOpenDeleteSuccess(true);
  };

  const handleModificarClick = (row: PlanDonacion) => {
    setRowToModify(row);
    setOpenModifyConfirm(true);
  };

  const handleConfirmModify = () => {
    setOpenModifyConfirm(false);
    navigate("/FormularioPlan", { state: { data: rowToModify } });
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (openSuccess) {
      timer = setTimeout(() => {
        setOpenSuccess(false);
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [openSuccess]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (openDeleteSuccess && rowToDelete) {
      timer = setTimeout(() => {
        setRows((prev) => prev.filter((r) => r.id !== rowToDelete.id));
        setOpenDeleteSuccess(false);
        setRowToDelete(null);
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [openDeleteSuccess, rowToDelete]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (openError) {
      timer = setTimeout(() => {
        setOpenError(false);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [openError]);

  const columns: GridColDef[] = [
    { field: "fechaHora", headerName: "Fecha y Hora", width: 160 },
    { field: "areaSalud", headerName: "Área de salud", width: 150 },
    { field: "consejoPopular", headerName: "Consejo popular", width: 150 },
    { field: "consultoriosAfectados", headerName: "Consultorios afectados", width: 180 },
    { field: "lugarDonacion", headerName: "Lugar donación", width: 160 },
    { field: "compromiso", headerName: "Compromiso", width: 140 },
    { field: "responsableSalud", headerName: "Responsable de salud", width: 170 },
    { field: "cdr", headerName: "CDR", width: 100 },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 220,
      sortable: false,
      filterable: false,
      disableExport: true,
      renderCell: (params: GridRenderCellParams<PlanDonacion>) => (
        <>
          <Button
            variant="contained"
            color="error"
            size="small"
            style={{ marginRight: 8 }}
            onClick={() => handleEliminarClick(params.row)}
          >
            Eliminar
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleModificarClick(params.row)}
          >
            Modificar
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Navbar />
      <Typography
        variant="h4"
        component="h5"
        sx={{
          fontSize: { xs: "2rem", md: "3rem" },
          backgroundColor: "primary.dark",
          color: "white",
          textAlign: "center",
          marginBlock: 5,
          mt: 8,
        }}
      >
        Plan de Donaciones Mensual
      </Typography>

      <Container maxWidth={false}>
        <Box sx={{ mb: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
          {/* Aquí podrías agregar filtros por fecha si lo deseas */}
        </Box>

        <Box
          sx={{
            marginTop: "20px",
            width: "100%",
            marginBlockEnd: 1,
            mx: "auto",
          }}
        >
          <DataGrid
            sx={{
              height: 450,
              "& .MuiDataGrid-columnHeaderTitle": {
                fontFamily: '"Open Sans"',
                fontWeight: 600,
              },
              "& .MuiDataGrid-cellContent": {
                fontFamily: '"Open Sans"',
                color: "#000",
              },
            }}
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
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </Container>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 3,
          mb: 5,
        }}
      >
        <BotonPersonalizado onClick={handleEnviarClick} sx={{ width: 225 }}>
          Enviar
        </BotonPersonalizado>
      </Box>

      {/* Modal Confirmación Envío o Eliminación */}
      <Dialog
        open={openConfirm}
        onClose={() => {
          setOpenConfirm(false);
          setRowToDelete(null);
        }}
        aria-labelledby="confirm-dialog-title"
      >
        <DialogTitle id="confirm-dialog-title">Confirmación</DialogTitle>
        <DialogContent>
          {rowToDelete ? (
            <>
              ¿Está seguro que desea eliminar el registro de{" "}
              <strong>{rowToDelete.responsableSalud}</strong>?
            </>
          ) : (
            "¿Está seguro que desea enviar el plan?"
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenConfirm(false);
              setRowToDelete(null);
            }}
            color="primary"
          >
            No
          </Button>
          <Button
            onClick={rowToDelete ? handleConfirmDelete : handleConfirmSend}
            color="primary"
            autoFocus
          >
            Sí
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal Confirmación Modificar */}
      <Dialog
        open={openModifyConfirm}
        onClose={() => setOpenModifyConfirm(false)}
        aria-labelledby="modify-confirm-dialog-title"
      >
        <DialogTitle id="modify-confirm-dialog-title">Confirmación</DialogTitle>
        <DialogContent>
          ¿Está seguro que desea modificar el registro de{" "}
          <strong>{rowToModify?.responsableSalud}</strong>?
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

      {/* Modal Éxito Envío */}
      <Dialog
        open={openSuccess}
        onClose={() => setOpenSuccess(false)}
        aria-labelledby="success-dialog-title"
        PaperProps={{
          sx: {
            borderRadius: 3,
            padding: 3,
            minWidth: 320,
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          },
        }}
      >
        <DialogTitle sx={{ textAlign: "center", pb: 0 }} id="success-dialog-title">
          <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
            <CheckCircleOutlineIcon sx={{ fontSize: 60, color: "success.main" }} />
            <Typography variant="h5" fontWeight="bold" color="success.main">
              ¡Éxito!
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" textAlign="center" sx={{ mt: 1, fontSize: "1.1rem" }}>
            Se envió correctamente
          </Typography>
        </DialogContent>
      </Dialog>

      {/* Modal Éxito Eliminación */}
      <Dialog
        open={openDeleteSuccess}
        aria-labelledby="delete-success-dialog-title"
        PaperProps={{
          sx: {
            borderRadius: 3,
            padding: 3,
            minWidth: 320,
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          },
        }}
      >
        <DialogTitle sx={{ textAlign: "center", pb: 0 }} id="delete-success-dialog-title">
          <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
            <CheckCircleOutlineIcon sx={{ fontSize: 60, color: "success.main" }} />
            <Typography variant="h5" fontWeight="bold" color="success.main">
              ¡Éxito!
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" textAlign="center" sx={{ mt: 1, fontSize: "1.1rem" }}>
            Registro eliminado correctamente
          </Typography>
        </DialogContent>
      </Dialog>

      {/* Modal Error */}
      <Dialog
        open={openError}
        onClose={() => setOpenError(false)}
        aria-labelledby="error-dialog-title"
        PaperProps={{
          sx: {
            borderRadius: 3,
            padding: 3,
            minWidth: 320,
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          },
        }}
      >
        <DialogTitle sx={{ textAlign: "center", pb: 0 }} id="error-dialog-title">
          <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
            <ErrorOutlineIcon sx={{ fontSize: 60, color: "error.main" }} />
            <Typography variant="h5" fontWeight="bold" color="error.main">
              Atención
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" textAlign="center" sx={{ mt: 1, fontSize: "1.1rem" }}>
            No se puede enviar porque no hay planes registrados.
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
}