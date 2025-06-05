import { DataGrid, GridColDef } from "@mui/x-data-grid";
  import { Box, Typography } from "@mui/material";
  import Navbar from "../../components/navbar/Navbar";
  import BotonPersonalizado from "../../components/Button";
  import { useNavigate } from "react-router-dom";
  import { useState } from "react";
  
  const columns: GridColDef[] = [
    { field: "no_consecutivo", 
      headerName: "No", 
      width: 50,
    },
    { field: "no_tubuladura", 
      headerName: "No Tubuladura", 
      width: 130,
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
      width: 70,
      editable: false
    },
    { 
      field: 'factor', 
      headerName: 'Factor', 
      width: 60,
      editable: false
    },
    {
      field: "tipo_componente",
      headerName: "Componente Obtenido",
      width: 150,
      editable: true,
      type: "singleSelect",
      valueOptions: ["CEPL", "CP", "PFC", "CRIO", "Plasma Industria"],
    },
    {
      field: "volumen",
      headerName: "Volumen (ml)",
      type: "number",
      width: 120,
      editable: true,
    },
    {
      field: "fecha_obtencion",
      headerName: "Fecha Obtención",
      type: "date",
      width: 130,
      editable: true,
      valueGetter: (params) => new Date(params),
    },
    
  ];
  
  const initialRows = [
    {
      id: 1,
      no_consecutivo: "1",
      no_tubuladura: "TUB001",
      sexo: "M", 
      edad: 35,
      grupo: 'A',
      factor: 'Positivo',
      tipo_componente: "CEPL",
      volumen: 250,
      fecha_obtencion: "2025-05-02"
    },
    // Más filas de ejemplo...
  ];
  
  export default function ComponentesObtenidos() {
    const [rows, setRows] = useState(initialRows);
    const navigate = useNavigate();
  
    const handleSave = () => {
      // Lógica para guardar en la base de datos
      console.log("Componentes guardados:", rows);
    };
  
    return (
        <>
          <Navbar />
          <Box sx={{
            marginTop: "25"}}>
            <Typography
             variant="h4" 
             sx={{ fontSize: {xs: "2rem", md: "3rem"}, backgroundColor: "primary.dark", textAlign: "center",mt:8, color: "white" }}>
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
    
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center"  }}>
              {/*<BotonPersonalizado onClick={handleSave} sx={{ width: 200 }}>
                Guardar Cambios
              </BotonPersonalizado>*/}
             
              <BotonPersonalizado 
                onClick={() => navigate("/plasma_industria")} 
                sx={{ width: 250 }}
              >
                Enviar Plasma a Industria
              </BotonPersonalizado>
            </Box>
          </Box>
        </>
      );
    }
  