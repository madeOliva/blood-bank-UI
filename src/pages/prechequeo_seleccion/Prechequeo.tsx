import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import BotonPersonalizado from "../../components/Button";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar"
import { Button, Container, FormControl, InputLabel, MenuItem, Modal, Select, Typography } from "@mui/material";
import { useState } from "react";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import React from "react";
import ExclusiveCheckboxes from "../../components/Checkbox";
import api from "../../api/client";

const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "blabla",
    headerName: "BlaBLa",
    width: 150,
    editable: false,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: false,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 150,
    editable: false,
  },
  {
    field: "phone",
    headerName: "Phone",
    type: "number",
    width: 150,
    editable: false,
  },


  {
    field: "actions",
    headerName: "Examenes",
    width: 150,
    renderCell: (params) => <ModalWindow row={params.row} />,
  },

];

const rows = [
  { id: 1, lastName: "Snow", blabla: "Jon", age: 14, phone: 444 },
  { id: 2, lastName: "Lannister", blabla: "Cersei", age: 31, phone: 444 },
  { id: 3, lastName: "Lannister", blabla: "Jaime", age: 31, phone: 444 },
  { id: 4, lastName: "Stark", blabla: "Arya", age: 11, phone: 444 },
  {
    id: 5,
    blabla: "Targaryen",
    firstName: "Daenerys",
    age: null,
    phone: 444,
  },
  { id: 1, lastName: "Snow", blabla: "Jon", age: 14, phone: 444 },
  { id: 2, lastName: "Lannister", blabla: "Cersei", age: 31, phone: 444 },
  { id: 3, lastName: "Lannister", blabla: "Jaime", age: 31, phone: 444 },
  { id: 4, lastName: "Stark", blabla: "Arya", age: 11, phone: 444 },
  { id: 1, lastName: "Snow", blabla: "Jon", age: 14, phone: 444 },
  { id: 2, lastName: "Lannister", blabla: "Cersei", age: 31, phone: 444 },
  { id: 3, lastName: "Lannister", blabla: "Jaime", age: 31, phone: 444 },
  { id: 4, lastName: "Stark", blabla: "Arya", age: 11, phone: 444 },
];

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

function ModalWindow({ row }: { row: any }) {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  // Estos son para el droplist
  const [grupo, setGrupo] = React.useState('');
  const [factor, setFactor] = React.useState('');
  const [hemoglobina, setHemoglobina] = React.useState('');

  // Estado para los checkboxes
  const [checked, setChecked] = useState({ apto: false, noapto: false });

  const handleReset = () => {
    setGrupo('');
    setFactor('');
    setHemoglobina('');
    handleClose();
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        rowId: row?.id, // Si necesitas enviar el id de la fila
        grupo,
        factor,
        hemoglobina,
        apto: checked.apto,
        noapto: checked.noapto,
      };
      // arreglar la ruta
      await api.post('/api/resultados', payload);
      handleReset();
    } catch (error) {
      // Maneja el error como prefieras
      console.error('Error al enviar los datos:', error);
      alert('Ocurrió un error al enviar los datos');
    }
  };

  return (
    <div>
      <Button
        variant="outlined"
        size="small"
        color="error"
        endIcon={<WaterDropIcon sx={{ ml: -1 }} />}
        onClick={handleOpen}
      >
      </Button>

      <Modal sx={{ borderColor: "prymary.dark" }}
        open={open}
        /*onClose={handleClose}} esta linea cierra si tocas cualquier lado de la pantalla*/
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <Typography id="modal-modal-title" variant="h5" component="h4" >
            Resultado:
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} variant="h6" component="h5">
            Grupo
          </Typography>
          <Box sx={{ minWidth: 120, width: 170, minHeight: 40, position: 'revert-layer' }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label"></InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={grupo}
                label="Grupo"
                size="small"
                onChange={(e) => setGrupo(e.target.value)}
              >
                <MenuItem value={10}></MenuItem>
                <MenuItem value={20}>A</MenuItem>
                <MenuItem value={30}>B</MenuItem>
                <MenuItem value={40}>O</MenuItem>
                <MenuItem value={50}>AB</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} variant="h6" component="h5">
            Factor
          </Typography>
          <Box sx={{ minWidth: 120, width: 170, minHeight: 40, position: 'revert-layer' }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label"></InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={factor}
                label="Factor"
                size="small"
                onChange={(e) => setFactor(e.target.value)}
              >
                <MenuItem value={10}></MenuItem>
                <MenuItem value={20}>positivo</MenuItem>
                <MenuItem value={30}>negativo</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} variant="h6" component="h5">
            Hemoglobina
          </Typography>
          <Box sx={{ minWidth: 120, width: 170, minHeight: 40, position: 'revert-layer' }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label"></InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={hemoglobina}
                label="Hemoglobina"
                size="small"
                onChange={(e) => setHemoglobina(e.target.value)}
              >
                <MenuItem value={10}></MenuItem>
                <MenuItem value={20}>normal</MenuItem>
                <MenuItem value={30}>baja</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <ExclusiveCheckboxes checked={checked} onChange={setChecked} />
          <BotonPersonalizado onClick={() => {
            handleSubmit();
            handleClose();
          }} sx={{ width: 225 }}>
            ACEPTAR
          </BotonPersonalizado>
        </Box>
      </Modal>
    </div>
  );
}



export default function Prechequeo() {
  const navigate = useNavigate();

  const handleResultadosPrechequeo = () => {
    // Aquí puedes poner lógica de autenticación si lo deseas
    navigate("/resultadosprechequeo", { replace: true }); // Redirige a la vista de Prechequeo
  };

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
                  pageSize: 7,
                },
              },
            }}
            pageSizeOptions={[7]}
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
