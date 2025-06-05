import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
//import ModalWindow from "../../components/ModalWindow";

import Navbar from "../../components/navbar/Navbar";
import { Box, Container, Typography } from "@mui/material";
import axios from "axios";
 
const columns: GridColDef[] = [
  { field: "no", headerName: "NO", width: 90 },
  {
    field: "no_hc",
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
    field: "examenP_grupo",
    headerName: "Grupo",
    width: 70,
    editable: false,
  },
  {
    field: "examenP_factor",
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


export default function VizualizarDonaciones() {
  const navigate = useNavigate();


const [rows, setRows] = useState([]);

  useEffect(() => {
  axios.get('http://localhost:3000/registro-donacion/donaciones-diarias')
    .then(response => {
      setRows(response.data.map((item: any, index: number) => ({
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