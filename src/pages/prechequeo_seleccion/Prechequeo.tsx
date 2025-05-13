import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import BotonPersonalizado from "../../components/Button";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar"
import { Checkbox,  FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useState } from "react";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import React from "react";
import ExclusiveCheckboxes from "../../components/Checkbox";




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
    headerName: "",
    width: 150,
    renderCell: (params) => <ModalWindow row={params.row} />,
  },

];

const rows = [
  { id: 1, lastName: "Snow", blabla: "Jon", age: 14, phone: 444 },
  { id: 2, lastName: "Lannister", blabla: "Cersei", age: 31, phone: 444},
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

  const handleReset = () => {
    setGrupo('');
    setFactor('');
    setHemoglobina('');
    handleClose(); // Cierra el modal si es necesario
  };

  return (
    <div>
      
      <WaterDropIcon onClick={handleOpen} sx={{ color: "secondary.main" , marginLeft:10 }} />
      <Modal sx={{ borderColor: "prymary.dark" }}
        open={open}
        /*onClose={handleClose}} esta linea cierra si tocas cualquier lado de la pantalla*/
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <Typography id="modal-modal-title" variant="h6" component="h5" >
            Resultado:
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} variant="h6" component="h5">
            Grupo
          </Typography>
          <Box sx={{ minWidth: 120, width: 120, minHeight: 40, position: 'revert-layer' }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label"></InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={grupo}
                label="Grupo"
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
          <Box sx={{ minWidth: 120, width: 120, minHeight: 40, position: 'revert-layer' }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label"></InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={factor}
                label="Factor"
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
          <Box sx={{ minWidth: 120, width: 120, minHeight: 40, position: 'revert-layer' }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label"></InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={hemoglobina}
                label="Hemoglobina"
                onChange={(e) => setHemoglobina(e.target.value)}
              >
                <MenuItem value={10}></MenuItem>
                <MenuItem value={20}>normal</MenuItem>
                <MenuItem value={30}>baja</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <ExclusiveCheckboxes/>
          <BotonPersonalizado onClick={() => {
            handleReset();  // Resetear valores
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
          mt={8}
          sx={{ fontSize: { xs: "2rem", md: "3rem" }, textAlign: "center", backgroundColor:"#00796B", color:'white',marginTop:10 }}
        >
          Listado de Prechequeo
        </Typography>

        <Box sx={{ marginTop: "20px", marginBlockEnd: 1, marginLeft: 7 }}>

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
            pageSizeOptions={[5]}
          />


        </Box>

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
