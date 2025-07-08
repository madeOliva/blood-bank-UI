import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { Button, Divider, IconButton, InputBase, Paper, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import EditSquareIcon from '@mui/icons-material/EditSquare';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModalPersonalizado from "../../components/ModalPersonalizado";
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

// Componente para renderizar los botones en la columna "Acciones"
function AccionesCell(props: {
  id: number;
  row: any;
  onAdd: () => void;
  onDelete: (id: number) => void;
  ordenCreada: boolean;
  setOrdenCreada: (ci: string, value: boolean) => void; // Cambiado para usar CI
}) {
  const { id, row, onDelete } = props;
  const navigate = useNavigate();
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <Button
        variant="contained"
        size="small"
        sx={{ mr: 1 }}
        endIcon={<WaterDropIcon sx={{ ml: -1 }} />}
        onClick={() => {
          if (!row.CI) {
            setShowModal(true);
            return;
          }
          navigate('/crearOrden', {
            state: {
              ci: row.CI, // Asegúrate que row.CI contiene el número de cédula
            }
          });
        }}
        disabled={props.ordenCreada}
      >
        Crear Orden
      </Button>

      <Button
        variant="contained"
        size="small"
        endIcon={<EditSquareIcon sx={{ marginLeft: -1 }} />}
        sx={{ mr: 1 }}
        onClick={() => {
          if (!row.CI) {
            setShowModal(true);
            return;
          }
          navigate('/modificarOrden', {
            state: {
              ci: row.CI, // Asegúrate que row.CI contiene el número de cédula
            }
          });
        }}
      >
        Modificar Orden
      </Button>


      {showModal && (
        <ModalPersonalizado
          open={showModal}
          type="info"
          message="No hay datos insertados"
          onClose={() => setShowModal(false)} title={""} />
      )}

      <Button
        variant="contained"
        size="small"
        color="error"
        sx={{ mr: 1 }}
        endIcon={<DeleteForeverIcon sx={{ ml: -1 }} />}
        onClick={() => onDelete(id)}
      >
        Eliminar Orden
      </Button>
    </>
  );
}

interface PacienteRow {
  id: number;
  CI: string;
  NoHClinica: string;
  Nombre: string;
  PApellido: string;
  SApellido: string;
  Sexo: string;
  Edad: number;
  Estado: string;
}

interface PacienteModalData {
  CI: string;
  NoHClinica: string;
  Nombre: string;
  PApellido: string;
  SApellido: string;
  Sexo: string;
  Edad: number;
}

export default function ListadoHospital() {
  const [rows, setRows] = useState<PacienteRow[]>([]);
  const [ci, setCi] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [ordenesCreadas, setOrdenesCreadas] = React.useState<Record<string, boolean>>({});
  const [pacienteData, setPacienteData] = useState<PacienteModalData>({
    CI: '',
    NoHClinica: '',
    Nombre: '',
    PApellido: '',
    SApellido: '',
    Sexo: '',
    Edad: 0
  });

  const buscarPaciente = async () => {
    if (!ci || ci.length !== 11) {
      setModalConfig({
        open: true,
        type: 'warning',
        title: 'CI inválido',
        message: 'Debe ingresar exactamente 11 dígitos para el Carnet de Identidad.'
      });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:3000/historia-clinica/ci/${ci}`);
      const data = response.data;

      setPacienteData({
        CI: data.ci || '',
        NoHClinica: data.no_hc || '',
        Nombre: data.nombre || '',
        PApellido: data.primer_apellido || '',
        SApellido: data.segundo_apellido || '',
        Sexo: data.sexo || '',
        Edad: data.edad || 0
      });

      setOpenModal(true);
    } catch (err) {
      setError('No se encontró el paciente o hubo un error en la búsqueda');
      console.error('Error al buscar paciente:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSavePaciente = async () => {
    try {
      // 1. Preparar los datos para enviar al backend
      const payload = {
        ci: pacienteData.CI,
        no_hc: pacienteData.NoHClinica,
        nombre: pacienteData.Nombre,
        primerApellido: pacienteData.PApellido,
        segundoApellido: pacienteData.SApellido,
        sexo: pacienteData.Sexo,
        edad: Number(pacienteData.Edad) // Asegurarse que sea número
      };

      // 2. Enviar los datos al backend
      await axios.post('http://localhost:3000/listado-pacientes', payload);
      fetchAndDisplayPacientes();

      // 3. Limpiar el input del CI después de guardar
      setCi(''); // <-- Esto limpia el campo de entrada

      setOpenModal(false);
    } catch (error) {
      console.error('Error al guardar paciente:', error);
      setError('Error al guardar los datos del paciente');
    }
  };

  const fetchAndDisplayPacientes = async () => {
    try {
      // 1. Obtener los datos actualizados del backend
      const response = await axios.get('http://localhost:3000/listado-pacientes');
      const pacientesFromBackend = response.data;

      // 2. Transformar los datos al formato que espera el DataGrid
      const formattedRows = pacientesFromBackend.map((paciente: any, index: number) => ({
        id: index + 1, // O usar un ID real si viene del backend
        CI: paciente.ci,
        NoHClinica: paciente.no_hc,
        Nombre: paciente.nombre,
        PApellido: paciente.primerApellido,
        SApellido: paciente.segundoApellido,
        Sexo: paciente.sexo,
        Edad: paciente.edad,
        Estado: "" // O el estado real si viene del backend
      }));

      // 3. Actualizar el estado del DataGrid
      setRows(formattedRows);
    } catch (error) {
      console.error('Error al obtener pacientes:', error);
      setError('Error al cargar los datos de pacientes');
    }
  };

  useEffect(() => {
    fetchAndDisplayPacientes();
  }, []);

  React.useEffect(() => {
    const handleStorageChange = () => {
      const savedOrders = localStorage.getItem('ordenesCreadas');
      if (savedOrders) {
        setOrdenesCreadas(JSON.parse(savedOrders));
      }
    };

    // Escuchar cambios en el localStorage
    window.addEventListener('storage', handleStorageChange);

    // Cargar estado inicial
    handleStorageChange();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleModalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPacienteData(prev => ({
      ...prev,
      [name]: name === 'Edad' ? Number(value) : value
    }));
  };

  const handleAddRow = () => {
    setRows(prevRows => {
      const newId = prevRows.length > 0 ? Math.max(...prevRows.map(r => r.id)) + 1 : 1;
      const newRow: PacienteRow = {
        id: newId,
        CI: "",
        NoHClinica: "",
        Nombre: "",
        PApellido: "",
        SApellido: "",
        Sexo: "",
        Edad: 0,
        Estado: "",
      };
      return [...prevRows, newRow];
    });
  };

  const [modalConfig, setModalConfig] = React.useState<{
    open: boolean;
    type: 'success' | 'error' | 'info' | 'warning';
    title: string;
    message: string;
  }>({
    open: false,
    type: 'info',
    title: '',
    message: ''
  });

  const handleDeleteRow = async (rowId: number) => {
    try {
      // 1. Encontrar la fila que se va a eliminar para obtener el CI
      const rowToDelete = rows.find(row => row.id === rowId);

      if (!rowToDelete) {
        setModalConfig({
          open: true,
          type: 'error',
          title: 'Error',
          message: 'No se encontró la fila a eliminar'
        });
        return;
      }

      // 2. Intentar borrar la orden de transfusión primero
      try {
        await axios.delete(`http://localhost:3000/transfusiones/by-ci/${rowToDelete.CI}`);
      } catch (error) {
        let errorMessage = 'No se pudo eliminar la orden de transfusión. El paciente no será eliminado.';
        if (axios.isAxiosError(error)) {
          errorMessage = error.response?.data?.message || errorMessage;
        }
        setModalConfig({
          open: true,
          type: 'error',
          title: 'Error',
          message: errorMessage
        });
        return; // No continuar si falla la eliminación de la orden
      }

      //Peticion DELETE para borrar al paciente de listado-pacientes
      await axios.delete(`http://localhost:3000/listado-pacientes/${rowToDelete.CI}`);


      // 3. Actualizar el estado local (eliminar la fila)
      setRows(prevRows => prevRows.filter(row => row.id !== rowId));

      // Actualizar estado de órdenes creadas
      setOrdenesCreadas(prev => {
        const newState = { ...prev };
        delete newState[rowToDelete.CI];

        // Actualizar localStorage
        localStorage.setItem('ordenesCreadas', JSON.stringify(newState));

        return newState;
      });

      // Mostrar modal de éxito
      setModalConfig({
        open: true,
        type: 'success',
        title: 'Éxito',
        message: 'Paciente eliminado correctamente'
      });

    } catch (error) {
      console.error('Error al eliminar paciente:', error);

      let errorMessage = 'Error al eliminar el paciente';
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      }

      setModalConfig({
        open: true,
        type: 'error',
        title: 'Error',
        message: errorMessage
      });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let onlyNums = event.target.value.replace(/[^0-9]/g, '');
    if (onlyNums.length > 11) {
      onlyNums = onlyNums.slice(0, 11);
    }
    setCi(onlyNums);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "#", width: 90 },
    { field: "CI", headerName: "CI", width: 150 },
    { field: "NoHClinica", headerName: "No.HC", width: 150 },
    { field: "Nombre", headerName: "Nombre", width: 150 },
    { field: "PApellido", headerName: "Primer Apellido", width: 150 },
    { field: "SApellido", headerName: "Segundo Apellido", width: 150 },
    { field: "Sexo", headerName: "Sexo", width: 100 },
    { field: "Edad", headerName: "Edad", width: 100 },
    {
      field: "Acciones",
      headerName: "Acciones",
      width: 430,
      sortable: false,
      filterable: false,
      editable: false,
      renderCell: (params: GridRenderCellParams) => (
        <AccionesCell
          id={params.id as number}
          row={params.row}
          onAdd={handleAddRow}
          onDelete={handleDeleteRow}
          ordenCreada={ordenesCreadas[params.row.CI] || false}
          setOrdenCreada={(ci, value) => {
            setOrdenesCreadas(prev => {
              const newState = { ...prev, [ci]: value };
              localStorage.setItem('ordenesCreadas', JSON.stringify(newState));
              return newState;
            });
          }}
        />
      ),
    },
  ];

  return (
    <>
      <Navbar />
      <Typography
        variant="h4"
        component="h5"
        padding={1}
        mt={8}
        sx={{
          width: "100%",
          fontSize: { xs: "1rem", md: "2rem" },
          textAlign: "center",
          bgcolor: "primary.dark",
          color: "white",
        }}
      >
        Listado de Pacientes a Transfundir
      </Typography>
      <Box sx={{ justifyItems: 'center' }}>
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, mt: "20px" }}
          onSubmit={(e) => {
            e.preventDefault();
            buscarPaciente();
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Carnet de Identidad"
            inputProps={{ maxLength: 11, inputMode: 'numeric', pattern: '[0-9]*' }}
            value={ci}
            onChange={handleChange}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton
            color="primary"
            sx={{ p: '10px' }}
            aria-label="directions"
            onClick={buscarPaciente}
            disabled={loading}
          >
            <SendIcon />
          </IconButton>
        </Paper>
        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
      </Box>
      <Box sx={{ marginTop: "20px", mb: "20px", width: "100%" }}>
        <DataGrid
          sx={{
            "& .MuiDataGrid-columnHeaderTitle": {
              fontFamily: '"Open Sans"',
              fontWeight: 600,
            },
            "& .MuiDataGrid-cellContent": {
              fontFamily: '"Open Sans"',
              color: "#000",
            },
            width: "100%",
          }}
          rows={rows}
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
          loading={loading}
        />
      </Box>

      {/* Modal para mostrar/editar datos del paciente */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Datos del Paciente</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              label="CI"
              name="CI"
              value={pacienteData.CI}
              onChange={handleModalChange}
              InputProps={{ readOnly: true }}
            />
            <TextField
              margin="normal"
              fullWidth
              label="No. Historia Clínica"
              name="NoHClinica"
              value={pacienteData.NoHClinica}
              onChange={handleModalChange}
              InputProps={{ readOnly: true }}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Nombre"
              name="Nombre"
              value={pacienteData.Nombre}
              onChange={handleModalChange}
              InputProps={{ readOnly: true }}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Primer Apellido"
              name="PApellido"
              value={pacienteData.PApellido}
              onChange={handleModalChange}
              InputProps={{ readOnly: true }}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Segundo Apellido"
              name="SApellido"
              value={pacienteData.SApellido}
              onChange={handleModalChange}
              InputProps={{ readOnly: true }}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Sexo"
              name="Sexo"
              value={pacienteData.Sexo}
              onChange={handleModalChange}
              InputProps={{ readOnly: true }}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Edad"
              name="Edad"
              type="number"
              value={pacienteData.Edad}
              onChange={handleModalChange}
              InputProps={{ readOnly: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancelar</Button>
          <Button onClick={handleSavePaciente} variant="contained" color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
      <ModalPersonalizado
        open={modalConfig.open}
        type={modalConfig.type}
        title={modalConfig.title}
        message={modalConfig.message}
        onClose={() => setModalConfig(prev => ({ ...prev, open: false }))}
        showConfirmButton={true}
        confirmText="Aceptar"
      />
    </>
  );
}