import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import BotonPersonalizado from "../../components/Button";
import Box from "@mui/material/Box";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {  Typography } from "@mui/material";


const columns: GridColDef[] = [
  {
    field: "no_consecutivo",
    headerName: "No Consecutivo",
    width: 150,
  },
  {
    field: "hist_clinica",
    headerName: "No Historia Clínica",
    width: 140,
    editable: false,
  },
  {
    field: "hemoglobina",
    headerName: "Hemoglobina",
    width: 180,
    editable: true,
    type: "number",
  },
  {
    field: "tcp",
    headerName: "TCP",
    type: "number",
    width: 120,
    editable: true,
    
  },
  {
    field: "eritro",
    headerName: "Eritro",
    type: "number",
    width: 140,
    editable: true,
    
  },
  {
    field: "glicemia",
    headerName: "Glicemia",
    type: "number",
    width: 140,
    editable: true,
  },
  {
    field: "hematocrito",
    headerName: "Hematocrito",
    type: "number",
    width: 120,
    editable: true,
    
  },
  {
    field: "proteinas_totales",
    headerName: "Proteínas Totales",
    type: "number",
    width: 120,
    editable: true,
    
  },
  {
    field: "estado",
    headerName: "Estado",
    type: "singleSelect",
    width: 140,
    editable: true,
    valueOptions: ["Analizadas", "Reanalizadas"],
  },
  {
    field: "fecha",
    headerName: "Fecha",
    type: "date",
    width: 120,
    editable: true,
    valueGetter: (params) => new Date(params),
  },
];

// Datos de ejemplo
const initialRows = [
  {
    id: 1,
    no_consecutivo: "1",
    hist_clinica: "HC-001",
    hemoglobina: "",
    tcp: "",
    eritro: "",
    glicemia: "",
    fecha: "",
  },
  {
    id: 2,
    no_consecutivo: "2",
    hist_clinica: "HC-002",
    hemoglobina: "",
    tcp: "",
    eritro: "",
    glicemia: "",
    hematocrito:"",
    proteinas_totales:"",
    fecha: "",
  },
  // Más filas de ejemplo...
];



export default function LabCCalidad() {
  const [rows, setRows] = useState(initialRows);
  const [selectedRow, setSelectedRow] = useState(null);
  const navigate = useNavigate();

 

  const handleRowClick = (params: GridRowParams) => {
    setSelectedRow(params.row);
  };

  const handleProcessRowUpdate = (newRow: any) => {
    const updatedRows = rows.map((row) => 
      row.id === newRow.id ? newRow : row
    );
    setRows(updatedRows);
    return newRow;
  };

   const handleSave = () => {
    // Aquí iría la lógica para guardar en la base de datos
    console.log("Datos guardados:", rows);
    navigate("/componentes_obtenidos");
  };

  return (
    <>
      <Navbar />
      <Box sx={{ marginTop: "60px", width: "100%" }}>
        <Typography variant="h4" gutterBottom 
        sx={{fontSize:{xs:"2 rem", md:"3rem"},backgroundColor:"primary.dark",textAlign:"center",color: "white" }} >
         Laboratorio Control de Calidad
        </Typography>
        
        <Box sx={{ height: 400, width: "100%", mb: 2 }}>
          <DataGrid
          sx={{
            height:400,
          }
          }
            rows={rows}
            columns={columns}
            processRowUpdate={handleProcessRowUpdate}
            onRowClick={handleRowClick}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 },
              },
            }}
            pageSizeOptions={[10]}
            editMode="row"
            
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <BotonPersonalizado onClick={handleSave} sx={{ width: 200 }}>
            Guardar Cambios
          </BotonPersonalizado>
          
          
           {/*<BotonPersonalizado 
            onClick={() => navigate("/componentes_obtenidos")} 
            sx={{ width: 200 }}
          >
            Continuar a Componentes
          </BotonPersonalizado>*/}
        </Box>
      </Box>
    </>
  );
}