import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Navbar from "../../components/navbar/Navbar";
import {
  Box,
  Container,
  FormControl,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

export default function LiberacionComponentes() {
  const navigate = useNavigate();

  // Estado para los datos
  const [rows, setRows] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [motivoDesecho, setMotivoDesecho] = useState("");

  // Cargar datos desde el backend
  useEffect(() => {
    fetch("http://localhost:3000/componentes-obtenidos/obtenidos")
      .then(res => res.json())
      .then(data => {
        setRows(
          Array.isArray(data)
            ? data.map((item: any, idx: number) => ({
                id: item.id || item._id || idx,
                no: item.no ?? idx + 1,
                hc: item.hc ?? "",
                sexo: item.sexo ?? "",
                edad: item.edad ?? "",
                volumen: item.volumen ?? "",
                grupo: item.grupo ?? "",
                factor: item.factor ?? "",
                fecha_obtencion: item.fecha_obtencion ?? "",
                componente:
                  item.nombre_componente
                  ?? (item.componentes && Array.isArray(item.componentes) && item.componentes[0] && item.componentes[0].tipo)
                  ?? "",
              }))
            : []
        );
      })
      .catch(() => setRows([]));
  }, []);

  const handleOpenModal = (id: number) => {
    setSelectedRowId(id);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRowId(null);
    setMotivoDesecho("");
  };

  const handleConfirmDesechar = () => {
    alert(`Desechada la fila con ID: ${selectedRowId} por motivo: ${motivoDesecho}`);
    setOpenModal(false);
    setSelectedRowId(null);
    setMotivoDesecho("");
  };

  const handleLiberar = (id: number) => {
    alert(`Liberar fila con ID: ${id}`);
    // Aquí puedes poner la lógica real para liberar
  };

  const columns: GridColDef[] = [
    { field: "no", headerName: "NO", width: 90 },
    { field: "hc", headerName: "HC-donacion", width: 150, editable: false },
    { field: "sexo", headerName: "Sexo", width: 70, editable: false },
    { field: "edad", headerName: "Edad", type: "number", width: 70, editable: false },
    { field: "volumen", headerName: "Volumen", type: "number", width: 90, editable: false },
    { field: "grupo", headerName: "Grupo", width: 70, editable: false },
    { field: "factor", headerName: "Factor", width: 70, editable: false },
    { field: "fecha_obtencion", headerName: "Fecha de obtención", width: 170, valueGetter: (params) => params.row.fecha_obtencion ?? "" },
    { field: "componente", headerName: "Componente", width: 130, valueGetter: (params) => params.row.componente ?? "" },
    {
      field: "accion",
      headerName: "",
      width: 220,
      editable: false,
      renderCell: (params) => (
        <>
          <Button
            onClick={() => handleOpenModal(params.id as number)}
            color="error"
            variant="contained"
            sx={{ mr: 1 }}
          >
            Desechar
          </Button>
          <Button
            onClick={() => handleLiberar(params.id as number)}
            color="success"
            variant="contained"
          >
            Liberar
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
        mt={8}
        sx={{ fontSize: { xs: "2rem", md: "3rem" }, backgroundColor: "primary.dark", textAlign: "center", color: "white" }}
      >
        Liberación de Componentes
      </Typography>
      <Container maxWidth={false}>
        <Box sx={{ marginTop: "20px", width: "90%", marginBlockEnd: 1, marginLeft: 7 }}>
          <DataGrid
            sx={{
              height: 500,
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
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}
            disableRowSelectionOnClick
          />
        </Box>
      </Container>

      {/* Modal de confirmación con Accordion */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
      >
        <DialogTitle>Confirmar acción</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro que deseas desechar la fila con ID: {selectedRowId}?
          </DialogContentText>
          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <RadioGroup
              value={motivoDesecho}
              onChange={e => setMotivoDesecho(e.target.value)}
            >
              <FormControlLabel value="Coloración inadecuada Verde" control={<Radio />} label="Coloración inadecuada Verde" />
              <FormControlLabel value="Coloración inadecuada Naranja" control={<Radio />} label="Coloración inadecuada Naranja" />
              <FormControlLabel value="Bajon Volumen" control={<Radio />} label="Bajon Volumen" />
              <FormControlLabel value="Otro" control={<Radio />} label="Otro" />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancelar</Button>
          <Button
            onClick={handleConfirmDesechar}
            color="error"
            variant="contained"
            disabled={!motivoDesecho}
          >
            Desechar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}