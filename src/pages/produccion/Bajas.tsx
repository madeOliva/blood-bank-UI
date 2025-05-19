import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import BotonPersonalizado from "../../components/Button";
//import { useNavigate } from "react-router-dom";
import { useState } from "react";

const columns: GridColDef[] = [
  { field: "no_consecutivo", 
    headerName: "No", 
    width: 150
  },
    { field: "no_tubuladura", 
      headerName: "No Tubuladura", 
      width: 150 
    },
    {
      field: "componente",
      headerName: "Componente",
      width: 150,
      type: "singleSelect",
      valueOptions: ["CEPL", "CP", "PFC", "CRIO"],
    },
    {
      field: "causa",
      headerName: "Causa",
      width: 150,
      type: "singleSelect",
      valueOptions: ["Ictero", "Lipemia", "Hemolisis", "Otras"],
    },
    {
      field: "confirmacion",
      headerName: "Confirmación Calidad",
      width: 200,
      type: "boolean",
     
    },
  ];
  
  const initialRows = [
    {
      id: 1,
      no_consecutivo: "1",
      no_tubuladura: "TUB001",
      componente: "CEPL",
      causa: "Lipemia",
      confirmacion: false,
    },
    {
      id: 2,
      no_consecutivo: "2",
      no_tubuladura: "TUB002",
      componente: "CP",
      causa: "Hemolisis",
      confirmacion: false,
    },
    {
      id: 3,
      no_consecutivo: "3",
      no_tubuladura: "TUB003",
      componente: "CRIO",
      causa: "Icteo",
      confirmacion: false,
    },{
      id: 4,
      no_consecutivo: "4",
      no_tubuladura: "TUB004",
      componente: "CEPL",
      causa: "Lipemia",
      confirmacion: false,
    },{
      id: 5,
      no_consecutivo: "5",
      no_tubuladura: "TUB005",
      componente: "PFC",
      causa: "Hemolisis",
      confirmacion: false,
    },{
      id: 6,
      no_consecutivo: "6",
      no_tubuladura: "TUB006",
      componente: "CRIO",
      causa: "Lipemia",
      confirmacion: false,
    },{
      id: 7,
      no_consecutivo: "7",
      no_tubuladura: "TUB007",
      componente: "CP",
      causa: "Lipemia",
      confirmacion: false,
    },{
      id: 8,
      no_consecutivo: "8",
      no_tubuladura: "TUB008",
      componente: "CEPL",
      causa: "Lipemia",
      confirmacion: false,
    },{
      id: 9,
      no_consecutivo: "9",
      no_tubuladura: "TUB009",
      componente: "CEPL",
      causa: "Ictero",
      confirmacion: false,
    },{
      id: 10,
      no_consecutivo: "10",
      no_tubuladura: "TUB0010",
      componente: "PFC",
      causa: "Lipemia",
      confirmacion: false,
    },{
      id: 11,
      no_consecutivo: "11",
      no_tubuladura: "TUB0011",
      componente: "CEPL",
      causa: "Lipemia",
      confirmacion: false,
    },{
      id: 12,
      no_consecutivo: "12",
      no_tubuladura: "TUB0012",
      componente: "CEPL",
      causa: "Lipemia",
      confirmacion: false,
    }
    // Más filas de ejemplo...
  ];
  
  export default function Bajas() {
    const [rows, setRows] = useState(initialRows);
    //const navigate = useNavigate();
  
    const handleSave = () => {
      // Lógica para guardar en la base de datos
      console.log("Bajas registradas:", rows);
    };
  
    return (
      <>
        <Navbar />
        <Box sx={{ 
          marginTop: "25",
          }}>
          <Typography 
          sx={{fontSize: {xs: "2rem", md: "3rem"},mt:8, backgroundColor: "primary.dark", textAlign: "center", color: "white"}}>
            Registro de Bajas
          </Typography>
          
          <Box sx={{ 
              height: 450, 
              width: "90%", mb: 2,
              marginBlockEnd: 1, 
              marginLeft: 7,  
              display: "flex",
              alignItems: "center",
               justifyContent: "space-between" 
               }}>
            <DataGrid
              sx={{
                height: 450,
              }}
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                paginationModel: { 
                pageSize: 10 },
                },
              }
              }
              pageSizeOptions={[10]}
              editMode="row"
              processRowUpdate={(newRow) => {
                const updatedRows = rows.map((row) => 
                  row.id === newRow.id ? newRow : row
                );
                setRows(updatedRows);
                return newRow;
              }}
            />
          </Box>
  
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            <BotonPersonalizado onClick={handleSave} sx={{ width: 200 }}>
              Guardar Cambios
            </BotonPersonalizado>
            {/*<BotonPersonalizado 
              onClick={() => navigate("/centrifugacion")} 
              sx={{ width: 200 }}
            >
              Ir a centrifugacion
            </BotonPersonalizado> */}
          </Box>
        </Box>
      </>
    );
  }