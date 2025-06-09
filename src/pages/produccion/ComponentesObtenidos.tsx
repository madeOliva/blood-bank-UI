import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";

import { useState } from "react";


const columns: GridColDef[] = [
  { field: "no_consecutivo", 
    headerName: "No", 
    width: 70,
  },
  { field: "no_hc", 
    headerName: "No. HC", 
    width: 120,
    editable: false,
  },
  { field: "sexo", 
    headerName: "Sexo", 
    width: 70 
  },
  { field: "edad", 
    headerName: "Edad", 
    width: 70, 
    type: "number" 
  },
  { 
    field: 'grupo', 
    headerName: 'Grupo', 
    width: 80,
    editable: false
  },
  { 
    field: 'factor', 
    headerName: 'Factor', 
    width: 90,
    editable: false
  },
  {
    field: "tipo_componente",
    headerName: "Componente Obtenido",
    width: 170,
    editable: false,
    type: "singleSelect",
    valueOptions: ['CEPL','CEAD','CE','CP','SP','SC','PC', 'PFC', 'CRIO'],
  },
  {
    field: "volumen",
    headerName: "Vol.(ml)",
    type: "number",
    width: 100,
    editable: false,
  },
  {
    field: "fecha_obtencion",
    headerName: "Fecha Obtención",
    type: "date",
    width: 140,
    editable: false,
    valueGetter: (params) => new Date(params),
  },
];

const initialRows = [
  {
    id: 1,
    no_consecutivo: "1",
    no_hc: "TUB001",
    sexo: "M", 
    edad: 35,
    grupo: 'A',
    factor: '+',
    tipo_componente: "CEPL",
    volumen: 250,
    fecha_obtencion: "2025-05-02"
  },
  {
    id: 2,
    no_consecutivo: "2",
    no_hc: "TUB002",
    sexo: "F", 
    edad: 32,
    grupo: 'O',
    factor: '-',
    tipo_componente: "CP",
    volumen: 250,
    fecha_obtencion: "2025-05-02"
  },
  // Más filas de ejemplo...
];

export default function ComponentesObtenidos() {
  const [rows, setRows] = useState(initialRows);
 

 

  return (
    <>
      <Navbar />
      <Box sx={{
        marginTop: "25"}}>
        <Typography
          variant="h4" 
          sx={{ fontSize: {xs: "2rem", md: "3rem"}, mt:8, backgroundColor: "primary.dark", textAlign: "center", color: "white" }}>
          Componentes Obtenidos
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
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 },
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