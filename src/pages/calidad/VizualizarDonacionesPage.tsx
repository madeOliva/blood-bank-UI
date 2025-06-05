import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
//import ModalWindow from "../../components/ModalWindow";

import Navbar from "../../components/navbar/Navbar";
import { Box, Container,  SelectChangeEvent, Typography } from "@mui/material";
import axios from "axios";
 
const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: "no", headerName: "NO", width: 90 },
  {
    field: "hc",
    headerName: "HC-donación",
    width: 150,
    editable: false,
  },
  {
    field: "sexo",
    headerName: "Sexo",
    width: 70,
    editable: false,
  },
  {
    field: "edad",
    headerName: "Edad",
    type: "number",
    width: 70,
    editable: false,
  },
  {
    field: "volumen",
    headerName: "Volumen",
    type: "number",
    width: 90,
    editable: false,
  },
  {
    field: "grupo",
    headerName: "Grupo",
    width: 70,
    editable: false,
  },
  {
    field: "factor",
    headerName: "Factor",
    width: 70,
    editable: false,
  },
  {
    field: "entidad",
    headerName: "Entidad",
    width: 120,
    editable: false,
  },
  {
    field: "estado",
    headerName: "Estado",
    width: 150,
    editable: false,
  },
  

];

const rows = [
  { id: 1, sexo: "F", hc: "02022562246", edad: 14, volumen: 444, grupo:"A", factor:"+", entidad:"02-Mantua",estado:"En Proceso", no:"1" },
  { id: 2, sexo: "F", hc: "02022562246", edad: 31, volumen: 444, grupo:"A", factor:"+", entidad:"01-Sandino", estado:"Traslado", no:"2"},
  { id: 3, sexo: "M", hc: "02022562246", edad: 31, volumen: 444, grupo:"A", factor:"+", entidad:"01-Sandino", estado:"Traslado", no:"3"  },
  { id: 3, sexo: "M", hc: "02022562246", edad: 31, volumen: 444, grupo:"A", factor:"+", entidad:"01-Sandino",estado:"En Proceso", no:"4"  },
  { id: 4, sexo: "F", hc: "02022562246", edad: 11, volumen: 444, grupo:"A", factor:"+", entidad:"01-Sandino",estado:"En Proceso", no:"5" },
  {
    id: 5,
    hc: "02022562246",
    sexo: "F",
    edad: 23,
    volumen: 444,
     grupo:"A", factor:"+",
      entidad:"01-Sandino",
       estado:"Traslado", no:"6"
  },
  { id: 6, hc: "02022562246", sexo: "F", edad: 150, volumen: 444, grupo:"A", factor:"+", entidad:"01-Sandino", estado:"Traslado", no:"7"},
  { id: 7, hc: "02022562246", sexo: "M", edad: 44, volumen: 444, grupo:"A", factor:"+", entidad:"01-Sandino", estado:"Traslado", no:"8" },
  { id: 8, hc: "02022562246", sexo: "M", edad: 36, volumen: 444, grupo:"A", factor:"+", entidad:"01-Sandino", estado:"Traslado", no:"9" },
  { id: 9, hc: "02022562246", sexo: "F", edad: 65, volumen: 444, grupo:"A", factor:"+", entidad:"01-Sandino",estado:"En Proceso", no:"10" },
  { id: 10, hc: "02022562246", sexo: "F", edad: 65, volumen: 444, grupo:"A", factor:"+", entidad:"01-Sandino",estado:"En Proceso", no:"11" },
];

export default function VizualizarDonaciones() {
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
const [rows, setRows] = useState([]);

  useEffect(() => {
    axios.get('http://your-backend-api-url/donations')
      .then(response => {
        // Si tu backend ya retorna un array de objetos con 'id', puedes usarlo directamente.
        // Si no, asigna un id y el campo 'no' para la numeración.
        setRows(response.data.map((item, index) => ({
          ...item,
          id: item.id ?? index + 1,
          no: (index + 1).toString()
        })));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);



  return (

    <>
      <Navbar />
      <Typography
          variant="h4"
          component="h5"
          mt={8}
          sx={{ fontSize: { xs: "2rem", md: "3rem" },backgroundColor:"primary.dark", textAlign: "center", fontFamily:"sans-serif", color:"white" }}
        >
          Donaciones Diarias
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