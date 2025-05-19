import { useNavigate } from "react-router-dom";
import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
//import ModalWindow from "../../components/ModalWindow";

import Navbar from "../../components/navbar/Navbar";
import { Box, Container,  SelectChangeEvent, Typography } from "@mui/material";
 
const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: "no", headerName: "NO", width: 90 },
  {
    field: "hc",
    headerName: "HC-donación",
    width: 150,
    editable: false,
  },
  {
    field: "desecho",
    headerName: "Desecho",
    width: 150,
    editable: false,
  },
  {
    field: "motivo",
    headerName: "Motivo",
    width: 250,
    editable: false,
  },
  

];

const rows = [
  { id: 1, sexo: "F", hc: "02022562246", desecho:"Bolsa", no:"1", motivo:"Bajo Volumen" },
  { id: 2, sexo: "F", hc: "02022562246", desecho:"Muestra", no:"2", motivo:"Coloracion inadecuada verde" },
  { id: 3, sexo: "F", hc: "02022562246", desecho:"Plasma Fresco", no:"3", motivo:"Coloracion inadecuada verde" },
  { id: 4, sexo: "F", hc: "02022562246", desecho:"Bolsa", no:"4", motivo:"Sobre Volumen" },
  { id: 5, sexo: "F", hc: "02022562246", desecho:"Muestra", no:"5", motivo:"Coloracion inadecuada verde" },
  { id: 6, sexo: "F", hc: "02022562246", desecho:"Crio", no:"6", motivo:"Bajo Volumen" },
  { id: 7, sexo: "F", hc: "02022562246", desecho:"Bolsa", no:"7", motivo:"Coloracion inadecuada verde" },
  { id: 8, sexo: "F", hc: "02022562246", desecho:"Muestra", no:"8", motivo:"Sobre Volumen" },
  { id: 9, sexo: "F", hc: "02022562246", desecho:"Bolsa", no:"9", motivo:"Bajo Volumen" },
  { id: 10, sexo: "F", hc: "02022562246", desecho:"Bolsa", no:"10", motivo:"Coloracion inadecuada verde" },
  { id: 11, sexo: "F", hc: "02022562246", desecho:"Muestra", no:"11", motivo:"Bajo Volumen" },
  
 
];

export default function Desechos() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Aquí puedes poner lógica de autenticación si lo deseas
    navigate("/register", { replace: true }); // Redirige a la vista de Prechequeo
  };

   const [entidad, setEntidad] = React.useState('');

   const handleChangeE = (event: SelectChangeEvent) => {
           setEntidad(event.target.value as string);
       };
       const [selectedActions, setSelectedActions] = React.useState<{ [key: number]: string }>({});

const handleActionChange = (id: number, value: string) => {
  setSelectedActions((prev) => ({
    ...prev,
    [id]: value,
  }));
};



  return (

    <>
      <Navbar />
      <Typography
          variant="h4"
          component="h5"
          mt={8}
          sx={{ fontSize: { xs: "2rem", md: "3rem" },backgroundColor:"primary.dark", textAlign: "center", fontFamily:"sans-serif", color:"white" }}
        >
          Desechos
        </Typography>
      <Container>
       

        <Box sx={{ marginTop: "20px", width: "90%", marginBlockEnd: 1, marginLeft: 7 }}>
          

          <Box sx={{ minWidth: 220, width: 120, minHeight: 40, position: 'revert-layer' }}>
                                 
                              </Box>

          <DataGrid
            sx={{
              height: 400,
              "& .MuiDataGrid-columnHeaderTitle": {
                fontFamily: '"Open Sans"',
                fontWeight: 600,
              },
              "& .MuiDataGrid-cellContent": {
                fontFamily: '"Open Sans"',
                color:"#000"
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
     

    </>


  );
}