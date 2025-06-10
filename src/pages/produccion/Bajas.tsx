import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box,  Typography } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import { useState,  } from "react";


const columns: GridColDef[] = [
  { field: "no_consecutivo", 
    headerName: "No", 
    width: 120
  },
    { field: "no_hc", 
      headerName: "No HC", 
      width: 170 
    },
    {
      field: "componente",
      headerName: "Componente",
      width: 170,
      type: "singleSelect",
      valueOptions: ['CEPL','CEAD','CE','CP','SP','SC','PC', 'PFC', 'CRIO'],
    },
    {
      field: "causa",
      headerName: "Causa",
      width: 170,
      type: "singleSelect",
      valueOptions: ["Ictero", "Lipemia", "Hemolisis", "Rotura"],
    },
    
  ];
  
  const initialRows = [
    {
      id: 1,
      no_consecutivo: "1",
      no_hc: "TUB001",
      componente: "CEPL",
      causa: "Lipemia",
     
    },
    {
      id: 2,
      no_consecutivo: "2",
      no_hc: "TUB002",
      componente: "CP",
      causa: "Hemolisis",
     
    },
    {
      id: 3,
      no_consecutivo: "3",
      no_hc: "TUB003",
      componente: "CRIO",
      causa: "Icteo",
      confirmacion: false,
    },{
      id: 4,
      no_consecutivo: "4",
      no_hc: "TUB004",
      componente: "CEPL",
      causa: "Lipemia",
      
    },{
      id: 5,
      no_consecutivo: "5",
      no_hc: "TUB005",
      componente: "PFC",
      causa: "Hemolisis",
     
    },{
      id: 6,
      no_consecutivo: "6",
      no_hc: "TUB006",
      componente: "CRIO",
      causa: "Lipemia",
     
    },{
      id: 7,
      no_consecutivo: "7",
      no_hc: "TUB007",
      componente: "CP",
      causa: "Lipemia",
     
    },{
      id: 8,
      no_consecutivo: "8",
      no_hc: "TUB008",
      componente: "CEPL",
      causa: "Lipemia",
      
    },{
      id: 9,
      no_consecutivo: "9",
      no_hc: "TUB009",
      componente: "CEPL",
      causa: "Ictero",
      
    },{
      id: 10,
      no_consecutivo: "10",
      no_hc: "TUB0010",
      componente: "PFC",
      causa: "Lipemia",
    
    },{
      id: 11,
      no_consecutivo: "11",
      no_hc: "TUB0011",
      componente: "CEPL",
      causa: "Lipemia",
      
    },{
      id: 12,
      no_consecutivo: "12",
      no_hc: "TUB0012",
      componente: "CEPL",
      causa: "Lipemia",
     
    }
    // Más filas de ejemplo...
  ];
  
 export default function Bajas() {
  const [rows, setRows] = useState(initialRows);


 
    return (
      <>
        <Navbar />
        <Box sx={{ 
          marginTop: "25",
          }}>
          <Typography 
          sx={{fontSize: {xs: "2rem", md: "3rem"}, mt: 8, backgroundColor: "primary.dark", textAlign: "center", color: "white"}}>
            Registro de Bajas
          </Typography>
          
          <Box sx={{ 
              height: 450, 
              width: "90%", 
              mb: 2,
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
       </Box>
      </>
    );
  }