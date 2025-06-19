import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { Button, Divider, IconButton, InputBase, Paper, Typography } from "@mui/material";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import EditSquareIcon from '@mui/icons-material/EditSquare';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModalPersonalizado from "../../components/ModalPersonalizado";
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';

// Componente para renderizar los botones en la columna "Acciones"
function AccionesCell(props: {
  id: number;
  row: any; // Puedes tipar mejor si tienes una interfaz de fila
  onAdd: () => void;
  onDelete: (id: number) => void;
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
          // Aquí puedes navegar a otra página si quieres
          navigate("/crearOrden");
        }}
      >
      </Button>

      <Button
        variant="contained"
        size="small"
        endIcon={<AddCircleOutlineIcon sx={{ marginLeft: -1 }} />}
        sx={{ mr: 1 }}
        onClick={() => props.onAdd()} // No pasas id
      >
      </Button>

      <Button
        variant="contained"
        size="small"
        endIcon={<EditSquareIcon sx={{ marginLeft: -1 }} />}
        sx={{ mr: 1 }}
        onClick={() => {
          if (
            !row.Nombre ||
            !row.PApellido ||
            !row.SApellido
          ) {
            setShowModal(true);
            return;
          }
          navigate('/modificarOrden', {
            state: {
              nombre: row.Nombre,
              primerApellido: row.PApellido,
              segundoApellido: row.SApellido
            }
          });
        }}
      />

      {showModal && (
        <ModalPersonalizado
          open={showModal}
          type="info"
          message="No hay datos insertados"
          onClose={() => setShowModal(false)} title={""} />
      )}

      <Button
        variant="outlined"
        size="small"
        color="error"
        sx={{ mr: 1 }}
        endIcon={<DeleteForeverIcon sx={{ ml: -1 }} />}
        onClick={() => onDelete(id)} // Elimina la fila actual
      >
      </Button>
    </>
  );
}

export default function ListadoHospital() {
  // Estado para las filas
  const [rows, setRows] = useState([
    {
      id: 1,
    },
  ]);

  // Función para agregar fila debajo de la fila con id dado
  const handleAddRow = () => {
    setRows((prevRows) => {
      // Generar nuevo id único
      const newId = prevRows.length > 0 ? Math.max(...prevRows.map((r) => r.id)) + 1 : 1;

      // Nueva fila vacía o con valores por defecto
      const newRow = {
        id: newId,
        NoOrden: "",
        NoHClinica: "",
        Nombre: "",
        PApellido: "",
        SApellido: "",
        Sala: "",
        Cama: "",
        Sexo: "",
        Edad: 0,
        Estado: "",
      };

      return [...prevRows, newRow]; // Agrega al final
    });
  };


  // Función para eliminar fila con id dado
  const handleDeleteRow = (rowId: number) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== rowId));
  };

  // Definición de columnas
  const columns: GridColDef[] = [
    { field: "id", headerName: "#", width: 90 },
    { field: "NoHClinica", headerName: "No.HC", width: 120 },
    { field: "Nombre", headerName: "Nombre", width: 120 },
    { field: "PApellido", headerName: "Primer Apellido", width: 150 },
    { field: "SApellido", headerName: "Segundo Apellido", width: 140 },
    { field: "Sala", headerName: "Sala", width: 100 },
    { field: "Cama", headerName: "Cama", width: 100 },
    { field: "Sexo", headerName: "Sexo", width: 100 },
    { field: "Edad", headerName: "Edad", width: 100 },
    { field: "Estado", headerName: "Estado", width: 110 },
    {
      field: "Acciones",
      headerName: "Acciones",
      width: 320,
      sortable: false,
      filterable: false,
      editable: false,
      renderCell: (params: GridRenderCellParams) => (
        <AccionesCell
          id={params.id as number}
          row={params.row} // <-- pasa toda la fila aquí
          onAdd={handleAddRow}
          onDelete={handleDeleteRow}
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
      <Box sx={{justifyItems:'center'}}>
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, mt: "20px" }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Buscar"
            inputProps={{ 'aria-label': 'Buscar' }}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
            <SendIcon />
          </IconButton>
        </Paper>
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
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
}
