import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import BotonPersonalizado from "../../components/Button";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import React from "react";
import ExclusiveCheckboxes from "../../components/Checkbox";
import api from "../../api/client";
import axios from "axios";

function ModalWindow({ row, onRemove }: { row: any, onRemove: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Para selects
  const [examenP_grupo, setGrupo] = useState('');
  const [examenP_factor, setFactor] = useState('');
  const [examenP_hemoglobina, setHemoglobina] = useState('');

  // Estado para los checkboxes
  const [checked, setChecked] = useState({ apto: false, noapto: false });

  // Estados para modal de éxito/alerta
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState<"success" | "error">("success");
  const [errorMsg, setErrorMsg] = useState("");

  const handleReset = () => {
    setGrupo('');
    setFactor('');
    setHemoglobina('');
    setChecked({ apto: false, noapto: false });
    handleClose();
  };

  // Validación simple
  const hayCamposVacios = () => {
    return !examenP_grupo || !examenP_factor || !examenP_hemoglobina || (!checked.apto && !checked.noapto);
  };

  const handleSubmit = async () => {
    if (hayCamposVacios()) {
      setErrorMsg("Por favor complete todos los campos y seleccione Apto o No Apto.");
      setModalType("error");
      setOpenModal(true);
      return;
    }
    try {
      const payload = {
        examenP_grupo,
        examenP_factor,
        examenP_hemoglobina,
        apto_prechequeo: checked.apto ? true : checked.noapto ? false : undefined,
      };
      await api.put(`/registro-donacion/${row.id}`, payload);
      setModalType("success");
      setOpenModal(true);
      handleReset();
      onRemove(row.id);
    } catch (error) {
      setErrorMsg("Ocurrió un error al enviar los datos.");
      setModalType("error");
      setOpenModal(true);
    }
  };

  // Cierra el modal de éxito/alerta automáticamente
  React.useEffect(() => {
    if (openModal) {
      const timeoutDuration = modalType === "success" ? 1200 : 2000;
      const timer = setTimeout(() => setOpenModal(false), timeoutDuration);
      return () => clearTimeout(timer);
    }
  }, [openModal, modalType]);

  return (
    <div>
      <Button
        variant="outlined"
        size="small"
        color="error"
        endIcon={<WaterDropIcon sx={{ ml: -1 }} />}
        onClick={handleOpen}
      >
        Exámenes
      </Button>

      <Modal sx={{ borderColor: "primary.dark" }}
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={handleClose}
      >
        <Box sx={style} >
          <Typography id="modal-modal-title" variant="h5" component="h4" textAlign={"center"} >
            Resultado:
          </Typography>
          <Box sx={{ minWidth: 120, width: 200, minHeight: 40, mt: 2, ml: 1 }}>
            <FormControl fullWidth>
              <InputLabel id="grupo-label">Grupo</InputLabel>
              <Select
                labelId="grupo-label"
                id="grupo-select"
                value={examenP_grupo}
                label="Grupo"
                size="small"
                onChange={(e) => setGrupo(e.target.value)}
              >
                <MenuItem value=""></MenuItem>
                <MenuItem value="A">A</MenuItem>
                <MenuItem value="B">B</MenuItem>
                <MenuItem value="O">O</MenuItem>
                <MenuItem value="AB">AB</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 120, width: 200, minHeight: 40, mt: 2, ml: 1 }}>
            <FormControl fullWidth>
              <InputLabel id="factor-label">Factor</InputLabel>
              <Select
                labelId="factor-label"
                id="factor-select"
                value={examenP_factor}
                label="Factor"
                size="small"
                onChange={(e) => setFactor(e.target.value)}
              >
                <MenuItem value=""></MenuItem>
                <MenuItem value="positivo">positivo</MenuItem>
                <MenuItem value="negativo">negativo</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <TextField
            id="hemoglobina"
            label="Hemoglobina"
            variant="outlined"
            value={examenP_hemoglobina}
            onChange={(e) => setHemoglobina(e.target.value)}
            size="small"
            sx={{
              width: 200,
              mt: 2,
              ml: 1,
              "& .MuiOutlinedInput-root": {
                color: "#000",
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#00796B",
                },
              },
              "& .MuiInputLabel-outlined": {
                color: "#000000",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                paddingLeft: "8px",
                paddingRight: "8px",
              },
            }}
          />
          <Box sx={{ mt: 2, ml: 2, display: "flex", flexDirection: "column", gap: 1 }}>
            <ExclusiveCheckboxes checked={checked} onChange={setChecked} />
          </Box>

          <BotonPersonalizado onClick={handleSubmit} sx={{ width: 225, mt: 2 }}>
            ACEPTAR
          </BotonPersonalizado>
        </Box>
      </Modal>

      {/* Modal de éxito/alerta */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            padding: 3,
            minWidth: 320,
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          },
        }}
      >
        <DialogTitle sx={{ textAlign: "center", pb: 0 }}>
          <Stack direction="column" alignItems="center" spacing={1}>
            {modalType === "success" ? (
              <>
                <CheckCircleOutlineIcon sx={{ fontSize: 60, color: "success.main" }} />
                <Typography variant="h5" fontWeight="bold" color="success.main">
                  ¡Éxito!
                </Typography>
              </>
            ) : (
              <>
                <ErrorOutlineIcon sx={{ fontSize: 60, color: "error.main" }} />
                <Typography variant="h5" fontWeight="bold" color="error.main">
                  Atención
                </Typography>
              </>
            )}
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Typography
            variant="body1"
            textAlign="center"
            sx={{ mt: 1, fontSize: "1.1rem" }}
          >
            {modalType === "success"
              ? "Se guardó correctamente"
              : errorMsg}
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
}

 

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function Prechequeo() {
  const navigate = useNavigate();

  // Estado para los registros
  const [rows, setRows] = useState<any[]>([]);

  const removeRow = (id: string) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

// Las columnas deben ir fuera del componente para evitar redefinición
const columns: GridColDef<any>[] = [
  { field: "ci", headerName: "CI", width: 150 },
  { field: "nombre", headerName: "Nombre", width: 100 },
  { field: "primer_apellido", headerName: "Primer Apellido", width: 100 },
  { field: "segundo_apellido", headerName: "Segundo Apellido", width: 100 },
  { field: "edad", headerName: "Edad", width: 100 },
  { field: "sexo", headerName: "Sexo", width: 100 },
  { field: "grupo_sanguine", headerName: "Grupo", width: 100 },
  { field: "factor", headerName: "Factor", width: 100 },
  { field: "donante de", headerName: "Donante de", width: 100 },
  {
    field: "actions",
    headerName: "Examenes",
    width: 150,
    renderCell: (params) => <ModalWindow row={params.row} onRemove={removeRow}/>,
  },
];

  const handleResultadosPrechequeo = () => {
    navigate("/resultadosprechequeo", { replace: true });
  };

  useEffect(() => {
    const fetchRows = async () => {
      try {
        const res = await axios.get("http://localhost:3000/registro-donacion/find");
        // Mapea los datos para la tabla
        const mappedRows = res.data.map((reg: any) => ({
          id: reg._id,
          ci: reg.persona?.ci,
          nombre: reg.persona?.nombre,
          primer_apellido: reg.persona?.primer_apellido,
          segundo_apellido: reg.persona?.segundo_apellido,
          edad: reg.persona?.edad,
          sexo: reg.persona?.sexo,
          grupo_sanguine: reg.historiaClinica?.grupo_sanguine,
          factor: reg.historiaClinica?.factor,
          "donante de": // cargar el componente
            reg.historiaClinica?.es_donanteControlado
              ? "Controlado"
              : reg.historiaClinica?.es_posibleDonante
                ? "Posible"
                : "No",
        })); // cargar el componente
        setRows(mappedRows);
      } catch (error) {
        console.error("Error al cargar los registros:", error);
      }
    };
    fetchRows();
  }, []);

  return (
    <>
      <Navbar />
      <Typography
        variant="h4"
        component="h5"
        padding={1}
        mt={8}
        sx={{ width: "100%", fontSize: { xs: "1rem", md: "2rem" }, textAlign: "center", bgcolor: "primary.dark", color: "white" }}
      >
        Listado de Prechequeo
      </Typography>
      <Container>
        <Box sx={{ marginTop: "20px", marginBlockEnd: 1, marginLeft: 7 }}>
          <DataGrid
            sx={{
              height: 400,
              "& .MuiDataGrid-columnHeaderTitle": {
                fontFamily: '"Open Sans"',
                fontWeight: 600,
              },
              "& .MuiDataGrid-cellContent": {
                fontFamily: '"Open Sans"',
                color: "#000",
              },
            }}
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[7]}
            getRowId={(row) => row.id}
          />
        </Box>
      </Container>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <BotonPersonalizado onClick={handleResultadosPrechequeo} sx={{ width: 225 }}>
          ACEPTAR
        </BotonPersonalizado>
      </Box>
    </>
  );
}