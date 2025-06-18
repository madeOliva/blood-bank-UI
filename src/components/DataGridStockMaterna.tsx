import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container, Modal, Typography } from '@mui/material';
import DataGridSol from './DataGridSolicitud';
import SendIcon from '@mui/icons-material/Send';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import AssignmentIcon from "@mui/icons-material/Assignment";

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Id', width: 90 }, // id incremental
  { field: 'codigo_bolsa', headerName: 'Código de Bolsa', width: 150 },
  { field: 'tipo_paciente', headerName: 'Tipo Paciente', width: 150 },
  { field: 'tipo_componente', headerName: 'Tipo Componente', width: 180 },
  { field: 'tipo_componente_habitual', headerName: 'Tipo Componente Habitual', width: 200 },
  {
    field: 'fecha_extraccion',
    headerName: 'Fecha de Extracción',
    width: 180,
  },
  {
    field: 'fecha_vencimiento',
    headerName: 'Fecha de Vencimiento',
    width: 180,
  },
  { field: 'grupo', headerName: 'Grupo', width: 100 },
  { field: 'factor', headerName: 'Factor', width: 100 },
  { field: 'volumen_inicial', headerName: 'Volumen Inicial', width: 150, type: 'number' },
  { field: 'volumen_final', headerName: 'Volumen Final', width: 150, type: 'number' },
  { field: 'estado', headerName: 'Estado', width: 130 },
  {
    field: "Acciones",
    headerName: "Acciones",
    width: 120,
    renderCell: () => {
      const [open, setOpen] = useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);
      return (
        <>
          <Button
            variant="contained"
            size="small"
            color="error"
            endIcon={<AssignmentIcon sx={{ marginLeft: -1 }} />}
            sx={{ mr: 1 }}
            onClick={handleOpen}
          >
            Solicitar
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <Container sx={{
              width: "80%", height: "82%", display: 'flex',
              background: "white",
              mt: "65px",
              borderRadius: "10px",
            }}>
              <Box sx={{ marginTop: "20px", mb: "20px", width: "100%", height: "45%" }}>
                <Typography
                  padding={1}
                  sx={{
                    width: "100%",
                    fontSize: "20px",
                    textAlign: "center",
                    bgcolor: "primary.dark",
                    color: "white",
                  }}
                >
                  Solicitud de Componentes
                </Typography>
                <DataGridSol />
                <Button
                  variant="contained"
                  size="small"
                  endIcon={<SendIcon sx={{ marginLeft: 0 }} />}
                  sx={{ mt: "10px" }}
                >
                  Enviar
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color='error'
                  endIcon={<DisabledByDefaultRoundedIcon sx={{ marginLeft: 0, fontSize: "large" }} />}
                  sx={{ mt: "10px", ml: "10px" }}
                  onClick={handleClose}
                >
                  Cancelar
                </Button>
              </Box>
            </Container>
          </Modal>
        </>
      );
    },
    sortable: false,
    filterable: false,
    editable: false,
  },
];

export default function DataGridMaterna() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  axios.get('http://localhost:3000/stockbancohas/Materna')
    .then(response => {
      const rowsWithId = response.data.map((item: any, index: number) => ({
        id: index + 1,
        ...item,
      }));
      setRows(rowsWithId);
      setLoading(false);
    })
    .catch(error => {
      setLoading(false);
    });
}, []);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        pageSizeOptions={[5, 10]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5 },
          },
        }}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}

