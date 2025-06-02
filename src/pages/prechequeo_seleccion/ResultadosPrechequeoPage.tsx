import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import BotonPersonalizado from "../../components/Button";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar"
import {Typography } from "@mui/material";
import WaterDropIcon from "@mui/icons-material/WaterDrop";

const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: "id", headerName: "No", width: 90 },
  {
    field: "nombre",
    headerName: "Nombre",
    width: 150,
    editable: false,
  },

   {
    field: "primer_apellido",
    headerName: "Primer Apellido",
    width: 150,
    editable: false,
  },

  {
    field: "segundo_apellido",
    headerName: "Segundo Apellido",
    width: 150,
    editable: false,
  },
  {
    field: "grupo",
    headerName: "Grupo",
    width: 150,
    editable: false,
  },
  {
    field: "factor",
    headerName: "Factor",
    width: 150,
    editable: false,
  },

  {
    field: "hemoglobina",
    headerName: "Hemoglobina",
    width: 150,
    editable: false,
  },

  {
    field: "aptonoapto",
    headerName: "Apto/NoApto",
    width: 150,
    editable: false,
  },

  {
    field: "actions",
    headerName: "",
    width: 150,
    renderCell: (params) => <Water row={params.row} />,
  },
  

];

const rows = [
  { id: 1, lastName: "Padilla", nombre: "Madelaine",grupo: "A", factor:"positivo", hemoglobina:"baja", aptonoapto:"apto"},

  
]

function Water({row}:{row:any}){

  const navigate = useNavigate();

  const handleHc = () => {
    // Aquí puedes poner lógica de autenticación si lo deseas
    navigate("/historiadonante", { replace: true }); // Redirige a la vista de Prechequeo
  };

  return ( <WaterDropIcon onClick={handleHc} sx={{ color: "secondary.main" , marginLeft:10 }} />)
  
}




export default function ResultadosPrechequeo() {
  const navigate = useNavigate();

  const handleHc = () => {
    // Aquí puedes poner lógica de autenticación si lo deseas
    navigate("/historiadonante", { replace: true }); // Redirige a la vista de Prechequeo
  };

  

  return (

    <>
      <Navbar />
      
        <Typography
          variant="h4"
          component="h5"
          mt={8}
          sx={{ fontSize: { xs: "2rem", md: "3rem" }, textAlign: "center", backgroundColor:"#00796B", color:'white' }}
        >
          Listado de posibles donantes
        </Typography>

        <Box sx={{ marginTop: "20px", width: "90%", marginBlockEnd: 1, marginLeft: 7 }}>


          <DataGrid
            sx={{
              display:"flex",
              alignContent:"space-between",
              "& .MuiDataGrid-columnHeaderTitle": {
                fontFamily: '"Open Sans"',
                fontWeight: 600,
              },
              "& .MuiDataGrid-cellContent": {
                fontFamily: '"Open Sans"',
                color: "#000"
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
          <BotonPersonalizado onClick={handleHc} sx={{ width: 225 }}>
            ACEPTAR
          </BotonPersonalizado>
        </Box>
    </>


  );
}