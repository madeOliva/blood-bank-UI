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
  TextField,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import axios from "axios";
import dayjs from "dayjs";




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

const API_URL = "http://localhost:3000/plan-trabajo";

export default function PlanDonaciones() {
  const navigate = useNavigate();
  const location = useLocation();
  const [rows, setRows] = useState<PlanDonacion[]>([]);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [openSuccess, setOpenSuccess] = useState<boolean>(false);
  const [openDeleteSuccess, setOpenDeleteSuccess] = useState<boolean>(false);
  const [openError, setOpenError] = useState<boolean>(false);
  const [rowToDelete, setRowToDelete] = useState<PlanDonacion | null>(null);
  const [openModifyConfirm, setOpenModifyConfirm] = useState<boolean>(false);
  const [rowToModify, setRowToModify] = useState<PlanDonacion | null>(null);

  // Email modal states
  const [openEmailModal, setOpenEmailModal] = useState(false);
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(API_URL);
    const data = res.data.map((item: any) => ({
  id: item._id || item.id,
  fechaHora: item.fecha || item.fechaHora,
  areaSalud: item.areasalud || item.areaSalud,
  consejoPopular: item.consejopopular || item.consejoPopular,
  consultoriosAfectados: item.consultoriosafectados || item.consultoriosAfectados, // <-- aquí
  lugarDonacion: item.lugarDonacion,
  compromiso: item.compromiso,
  responsableSalud: item.responsableDeSalud || item.responsableSalud,
  cdr: item.cdr,
}));
        setRows(data);
      } catch (err) {
        setRows([]);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const state = location.state as LocationState | undefined;
    if (state?.updatedRow) {
      setRows((prevRows) =>
        prevRows.map((row) => (row.id === state.updatedRow!.id ? state.updatedRow! : row))
      );
      navigate(location.pathname, { replace: true, state: {} });
    }
    if (state?.newRow) {
      setRows((prevRows) => {
        const exists = prevRows.some((row) => row.id === state.newRow!.id);
        if (exists) return prevRows;
        return [...prevRows, state.newRow!];
      });
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);

  const filteredRows = useMemo(() => {
    return rows;
  }, [rows]);

  const handleEnviarClick = () => {
    if (rows.length === 0) {
      setOpenError(true);
    } else {
      setOpenEmailModal(true);
    }
  };

  const handleEliminarClick = (row: PlanDonacion) => {
    setRowToDelete(row);
    setOpenConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!rowToDelete) return;
    try {
      await axios.delete(`${API_URL}/${rowToDelete.id}`);
      setRows((prev) => prev.filter((r) => r.id !== rowToDelete.id));
      setOpenDeleteSuccess(true);
    } catch (e) {
      setOpenError(true);
    } finally {
      setOpenConfirm(false);
      setRowToDelete(null);
    }
  };

  // Enviar plan por correo
  const handleSendPlanByEmail = async () => {
    setSending(true);
    try {
      await axios.post(`${API_URL}/enviar-correo`, {
        email,
        planes: rows,
      });
      setOpenEmailModal(false);
      setOpenSuccess(true);
      setTimeout(() => {
        navigate("/resumenDonaciones", { state: { data: rows } });
      }, 1500);
    } catch (e) {
      setOpenEmailModal(false);
      setOpenError(true);
    } finally {
      setSending(false);
    }
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
    if (openDeleteSuccess) {
      timer = setTimeout(() => {
        setOpenDeleteSuccess(false);
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [openDeleteSuccess]);

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
  {
  field: "fechaHora",
  headerName: "Fecha y Hora",
  width: 160,
  renderCell: (params) =>
    params.value ? dayjs(params.value).format("DD/MM/YYYY 08:00 A") : "",
},
    { field: "areaSalud", headerName: "Área de salud", width: 150 },
    { field: "consejoPopular", headerName: "Consejo popular", width: 150 },
   {
  field: "consultoriosAfectados",
  headerName: "Consultorios afectados",
  width: 180,
  renderCell: (params) => {
    if (Array.isArray(params.value)) {
      return params.value.join(", ");
    }
    return params.value || "";
  }
},
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

      {/* Modal para pedir correo */}
      <Dialog
        open={openEmailModal}
        onClose={() => setOpenEmailModal(false)}
        aria-labelledby="email-dialog-title"
      >
        <DialogTitle id="email-dialog-title">Enviar plan por correo</DialogTitle>
        <DialogContent>
          <Typography mb={2}>
            Introduzca el correo electrónico al que desea enviar el plan:
          </Typography>
          <TextField
            label="Correo electrónico"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            fullWidth
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEmailModal(false)} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={handleSendPlanByEmail}
            color="primary"
            disabled={!email || sending}
          >
            {sending ? "Enviando..." : "Enviar"}
          </Button>
        </DialogActions>
      </Dialog>

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
            onClick={rowToDelete ? handleConfirmDelete : () => setOpenEmailModal(true)}
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