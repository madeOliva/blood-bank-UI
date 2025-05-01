import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import BotonPersonalizado from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar"
import ModalWindow from "../../../components/ModalWindow";
import { Container, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import React from "react";



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
    width: 110,
    editable: false,
  },
  {
    field: "phone",
    headerName: "Phone",
    type: "number",
    width: 110,
    editable: false,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.blabla || ""}`,
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
  { id: 6, blabla: "Melisandre", firstName: null, age: 150, phone: 444 },
  { id: 7, blabla: "Clifford", firstName: "Ferrara", age: 44, phone: 444 },
  { id: 8, blabla: "Frances", firstName: "Rossini", age: 36, phone: 444 },
  { id: 9, blabla: "Roxie", firstName: "Harvey", age: 65, phone: 444 },
  { id: 10, blabla: "Roxie", firstName: "Harvey", age: 65, phone: 444 },
];

export default function Prechequeo() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Aquí puedes poner lógica de autenticación si lo deseas
    navigate("/register", { replace: true }); // Redirige a la vista de Prechequeo
  };

   

  return (

    <>
      <Navbar />
      <Container>
        <Typography
          variant="h4"
          component="h5"
          mt={8}
          sx={{ fontSize: { xs: "2rem", md: "3rem" }, textAlign: "center", paddingTop:3 }}
        >
          Listado de Prechequeo
        </Typography>

        <Box sx={{ marginTop: "20px", width: "90%", marginBlockEnd: 1, marginLeft: 7 }}>
          <ModalWindow />


          <DataGrid
            sx={{
              "& .MuiDataGrid-columnHeaderTitle": {
                fontFamily: '"Open Sans"',
                fontWeight: 600,
              },
              "& .MuiDataGrid-cellContent": {
                fontFamily: '"Open Sans"',
                color:"#000"
              },

              borderLeft:1,
              borderRight:1,
              borderTop:1
              
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
            checkboxSelection
            disableRowSelectionOnClick
          />


        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

          }}
        >
          <BotonPersonalizado onClick={handleLogin} sx={{ width: 225 }}>
            ACEPTAR
          </BotonPersonalizado>
        </Box>
       
      </Container>
      

    </>


  );
}
