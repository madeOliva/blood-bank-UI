import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import BotonPersonalizado from "../../components/Button";
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
  { field: "sexo", 
    headerName: "Sexo", 
    width: 100
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
  {
    field: "resultado_analisis",
    headerName: "Resultado Análisis",
    width: 150,
    valueFormatter: (params) => (params ? "Negativo" : "Positivo" ),
  },
];

const initialRows = [
  {
    id: 1,
    no_consecutivo: "1",
    no_tubuladura: "TUB001",
    sexo: "M",
    fecha_donacion: "2025-05-01",
    fecha_obtencion: "2025-05-02",
    volumen: 250,
    resultado_analisis: true,
  },
  // Más filas de ejemplo...
];

export default function PlasmaIndustria() {
  const [rows, setRows] = useState(initialRows);
  
  const handleSave = () => {
    // Lógica para guardar en la base de datos
    console.log("Plasma para industria registrado:", rows);
  };
  return (
    <>
      <Navbar />
      <Box sx={{ marginTop: "25" }}>
        <Typography 
        variant="h4" 
        sx={{fontSize: {xs: "2rem", md: "3rem"},mt:8, backgroundColor: "primary.dark", textAlign: "center", color: "white"}}>
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

        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <BotonPersonalizado onClick={handleSave} sx={{ width: 200 }}>
            Guardar Cambios
          </BotonPersonalizado>
        </Box>
      </Box>
    </>
  );
}