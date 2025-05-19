import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import BotonPersonalizado from "../../components/Button";
import Box from "@mui/material/Box";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import {useEffect, useState } from "react";
import {Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";
/* import {API_URL} from "";



//Definición de tipos para TypeScript
interface LabResult{
  id:number;
  no_consecutivo:string;
  hist_clinica:string;
  hiv:string;
  hepatitisB:string;
  hepatitisC:string;
  estado?:string;
  fecha?:string;
}
 */

const columns: GridColDef[] = [
  {
    field: "no_consecutivo",
    headerName: "No Consecutivo",
    width: 150,
  },
  {
    field: "hist_clinica",
    headerName: "No Historia Clínica",
    width: 150,
    editable: false,
  },
  {
    field: "hiv",
    headerName: "HIV",
    width: 180,
    editable: true,
    type: "singleSelect",
    valueOptions: ["Positivo", "Negativo"],
    
  },
  {
    field: "hepatitisB",
    headerName: "HBsAg",
    type: "singleSelect",
    width: 120,
    editable: true,
    valueOptions: ["Positivo", "Negativo"],
  },
  {
    field: "hepatitisC",
    headerName: "HCV",
    type: "singleSelect",
    width: 140,
    editable: true,
    valueOptions: ["Positivo", "Negativo"],
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
    hiv: "",
    hepatitisB: "",
    hepatitisC: "",
    fecha: "",
  },
  {
    id: 2,
    no_consecutivo: "2",
    hist_clinica: "HC-002",
    hiv: "",
    hepatitisB: "",
    hepatitisC: "",
    fecha: "",
  },
  {
    id: 3,
    no_consecutivo: "3",
    hist_clinica: "HC-003",
    hiv: "",
    hepatitisB: "",
    hepatitisC: "",
    fecha: "",
  },
  {
    id: 4,
    no_consecutivo: "4",
    hist_clinica: "HC-004",
    hiv: "",
    hepatitisB: "",
    hepatitisC: "",
    fecha: "",
  },
  {
    id: 5,
    no_consecutivo: "5",
    hist_clinica: "HC-005",
    hiv: "",
    hepatitisB: "",
    hepatitisC: "",
    fecha: "",
  },
  {
    id: 6,
    no_consecutivo: "6",
    hist_clinica: "HC-006",
    hiv: "",
    hepatitisB: "",
    hepatitisC: "",
    fecha: "",
  },
  {
    id: 7,
    no_consecutivo: "7",
    hist_clinica: "HC-007",
    hiv: "",
    hepatitisB: "",
    hepatitisC: "",
    fecha: "",
  },
  // Más filas de ejemplo...
];

export default function LabSuma() {
  const [rows, setRows] = useState(initialRows);
  const[loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const navigate = useNavigate();

// Cargar datos del backend al montar el componente
/* useEffect(()=>{
  const fetchData = async () =>{
    try{
      const response = await axios.get(`${API_URL}/lab-results`);
      setRows(response.data);
      setLoading(false);
    }catch(err){
      setError("Error al cargar datos del laboratorio");
      setLoading(false);
      console.error("Error fetching data:",err);
    }
  };
  fetchData();
},[]);
 */

  //Funcion para marcar todos como negativo
 const handleMarkAllNegative = (event:React.ChangeEvent<HTMLInputElement>)=>{
  const isChecked = event.target.checked;
  const updatedRows = rows.map(row =>({
    ...row,
    hiv:isChecked? "Negativo":"",
    hepatitisB:isChecked? "Negativo":"",
    hepatitisC:isChecked? "Negativo":"",
  }));
  setRows(updatedRows)

};

 //Verifica si todos estan marcados como negativos
 const allNegative = rows.every(row =>
  row.hiv === "Negativo" && row.hepatitisB === "Negativo" && row.hepatitisC === "Negativo"
 );

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
        <Typography 
        variant="h4" 
        gutterBottom 
        sx={{fontSize:{xs:"2 rem", md:"3rem"},backgroundColor:"primary.dark",textAlign:"center",color: "white" }} >
         Laboratorio Suma
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

        <Box sx={{ 
                  display: 'flex',
                  justifyContent: 'flex-start',
                  mb: 2,
                  ml: 1,
                  color: 'primary.dark'
                }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={allNegative}
                        onChange={handleMarkAllNegative}
                        color="primary"
                        sx={{
                          '& .MuiSvgIcon-root': { fontSize: 28 }, // Tamaño del checkbox
                          color: 'primary.main',
                          '&.Mui-checked': { color: 'primary.main' }
                        }}
                      />
                    }
                    label={
                      <Typography variant="body1" sx={{ 
                        fontFamily: 'inherit',
                        fontSize: '1rem',
                        color: 'inherit'
                      }}>
                        Marcar todos como negativos
                      </Typography>
                    }
                    sx={{ '& .MuiFormControlLabel-label': { fontWeight: 500 } }}
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