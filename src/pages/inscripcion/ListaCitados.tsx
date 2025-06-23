import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridRowParams,
} from "@mui/x-data-grid";
import Navbar from "../../components/navbar/Navbar";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BotonPersonalizado from "../../components/Button";
import { useState, useEffect } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";



export default function ListaCitados() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<any>(null);


// Eliminar donante (cambiar citado a false y quitar de la tabla)
  const handleConfirmDelete = async () => {
    if (!rowToDelete) return;
    try {
      await axios.put(`http://localhost:3000/historia-clinica/${rowToDelete.id}`, { citado: false });
      setRows((prevRows) => prevRows.filter((row) => row.id !== rowToDelete.id));
      setOpenDeleteConfirm(false);
      setRowToDelete(null);
    } catch (error) {
      setOpenDeleteConfirm(false);
      setRowToDelete(null);
      // Puedes mostrar un mensaje de error si lo deseas
    }
  };


  //Columnas
const columns: GridColDef[] = [
  {
      field: "eliminar",
      headerName: "",
      width: 80,
      sortable: false,
      filterable: false,
      align: "center",
      renderCell: (params) => (
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            setRowToDelete(params.row);
            setOpenDeleteConfirm(true);
          }}
          aria-label="eliminar"
        >
          <DeleteIcon sx={{ color: "red" }} />
        </IconButton>
      ),
    },
  
  { field: "ci", headerName: "CI", width: 200 },
  {
    field: "nombres_apellidos",
    headerName: "Nombres y Apellidos",
    width: 300,
  },
  { field: "edad", headerName: "Edad", width: 100 },
  { field: "sexo", headerName: "Sexo", width: 100 },
  { field: "grupo", headerName: "Grupo", width: 100 },
  { field: "rh", headerName: "Rh", width: 100 },
  { field: "donante_de", headerName: "Donante de", width: 120 },
];




  useEffect(() => {
    // Llama a la API para obtener las historias clínicas citadas
    axios
      .get("http://localhost:3000/historia-clinica/citados")
      .then((res) => {
        // Mapea los datos para el DataGrid
        const mappedRows = res.data.map((item: any, idx: number) => ({
          id: item._id || idx,
          ci: item.ci,
          nombres_apellidos: `${item.nombre} ${item.primer_apellido} ${item.segundo_apellido}`,
          edad: item.edad,
          sexo: item.sexo?.nombre || "",
          grupo: item.grupo_sanguine?.nombre || "",
          rh: item.factor?.signo || "",
          donante_de: item.donante_de || "", // Ajusta este campo según tu backend
        }));
        setRows(mappedRows);
      })
      .catch((err) => {
        setRows([]);
      });
  }, []);

  // Maneja el clic en una fila

  const handleRowClick = async (params: GridRowParams) => {
    try {
      // Navega a la inscripción
      navigate(`/inscripcion/`, { state: { historiaClinica: params.row } });

      // Llama al backend para actualizar el campo citado a false
      await axios.put(
        `http://localhost:3000/historia-clinica/${params.row.id}`,
        { citado: false }
      );
      // Elimina la fila de la tabla visualmente
      setRows((prevRows) => prevRows.filter((row) => row.id !== params.row.id));
    } catch (error) {
      // Manejo de error opcional
      console.error("Error actualizando citado:", error);
    }
  };


  // Modal de confirmación
  const DeleteConfirmModal = (
    <Dialog
      open={openDeleteConfirm}
      onClose={() => setOpenDeleteConfirm(false)}
      aria-labelledby="delete-confirm-dialog-title"
    >
      <DialogTitle id="delete-confirm-dialog-title">Confirmar eliminación</DialogTitle>
      <DialogContent>
        ¿Está seguro que desea eliminar al posible donante{" "}
        <strong>{rowToDelete?.nombres_apellidos}</strong> de la lista de citados?
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenDeleteConfirm(false)} color="primary">
          No
        </Button>
        <Button onClick={handleConfirmDelete} color="error" autoFocus>
          Sí
        </Button>
      </DialogActions>
    </Dialog>
  );

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
        Citados del Dia
      </Typography>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          style={{
            height: 450,
            width: "80%",
          }}
        >
        {DeleteConfirmModal}
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
        <Box sx={{ marginTop: 2 }}>
          <BotonPersonalizado onClick={() => navigate("/inscripcion/")}>
            Agregar Nuevo
          </BotonPersonalizado>
        </Box>
      </Box>
    </>
  );
}
