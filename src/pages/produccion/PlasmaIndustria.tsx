import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";


const columns: GridColDef[] = [
  { field: "no_consecutivo", 
    headerName: "No", 
    width: 100
  },
   { field: "no_lote", 
    headerName: "No lote", 
    width: 100,
    editable:true
  },
  { field: "no_hc", 
    headerName: "No. HC", 
    width: 150 
  },
  { field: "sexo", 
    headerName: "Sexo", 
    width: 60
  },
   { field: "edad", 
    headerName: "Edad", 
    width: 60, 
    type: "number"
   },
  { field: "fecha_donacion", 
    headerName: "Fecha Donación", 
    width: 150,
    type: "date",
    editable: false,
    valueGetter: (params) => new Date(params),
  },
  { field: "fecha_obtencion", 
    headerName: "Fecha Obtención", 
    width: 150,
    type: "date",
    editable: false,
    valueGetter: (params) => new Date(params),
  },
  { field: "volumen", 
    headerName: "Volumen (ml)", 
    width: 120, type: "number" 
  },
  
];

const initialRows = [
  {
    id: 1,
    no_consecutivo: "1",
    no_lote:"",
    no_hc: "TUB001",
    sexo: "M",
    edad:35,
    fecha_donacion: "2025-05-01",
    fecha_obtencion: "2025-05-02",
    volumen: 250,
    
  },
  // Más filas de ejemplo...
];

export default function PlasmaIndustria() {
  const [rows, setRows] = useState(initialRows);
  
    
  return (
    <>
      <Navbar />
      <Box sx={{ marginTop: "25" }}>
        <Typography 
        variant="h4" 
        sx={{fontSize: {xs: "2rem", md: "3rem"}, mt: 8, backgroundColor: "primary.dark", textAlign: "center", color: "white"}}>
          Registro de Plasma para Industria
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
                paginationModel: { pageSize: 10},
              },
            }}
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