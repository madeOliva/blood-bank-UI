import { DataGrid, GridCellParams, GridColDef, GridRowParams } from "@mui/x-data-grid";
import BotonPersonalizado from "../../components/Button";
import Box from "@mui/material/Box";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";


// Datos de ejemplo
const initialRows = [
  {
    id: 1,
    no_consecutivo: "1",
    hist_clinica: "HC-001",
    serologia:"",
    grupo: "",
    factor: "",
    contratipaje: "",
    du: "",
    fecha: "",
  },
  {
    id: 2,
    no_consecutivo: "2",
    hist_clinica: "HC-002",
    serologia:"",
    grupo: "",
    factor: "",
    contratipaje: "",
    du: "",
    fecha: "",
  },
  // Más filas de ejemplo...
];

export default function LabInmuno() {
  const [rows, setRows] = useState(initialRows);
  const [selectedRow, setSelectedRow] = useState(null);
  const [columnVisibilityModel,setColumnVisibilityModel]= useState({});
  const navigate = useNavigate();

  const isCellEditable = (params: GridCellParams) =>{
    if(params.field === 'du'){
      return params.row.factor === "-";
    }
    return true;
  };
  useEffect(() =>{
    const shouldShowDU = rows.some(row => row.factor === "-");
    setColumnVisibilityModel(prev => ({
      ...prev,
      du:shouldShowDU
    }));
  },[rows]);

  //Funcion para marcar todos como negativo
 const handleMarkAllNegative = (event:React.ChangeEvent<HTMLInputElement>)=>{
  const isChecked = event.target.checked;
  const updatedRows = rows.map(row =>({
    ...row,
    factor:isChecked? "-":"",
    du:isChecked? "Negativo":"",
    serologia:isChecked? "Negativo":""
  }));
  setRows(updatedRows)
 };

 //Verifica si todos estan marcados como negativos
 const allNegative = rows.every(row =>
  row.factor === "-" && row.du === "Negativo" && row.serologia === "Negativo"
 );

  const handleRowClick = (params: GridRowParams) => {
    setSelectedRow(params.row);
  };

  const handleProcessRowUpdate = (newRow: any, oldRow:any) => {
   let updatedRow = newRow;

   //Resetear DU si el factor no es negativo
   if(newRow.factor !== "-" && newRow.du !== ""){
    updatedRow = {...newRow,du:""};
   }

   const updatedRows = rows.map(row => 
    row.id === updatedRow.id ? updatedRow : row
   );

   setRows(updatedRows);
   return updatedRow;
  };

   const handleSave = () => {
    // Aquí iría la lógica para guardar en la base de datos
    console.log("Datos guardados:", rows);
    navigate("/componentes_obtenidos");
  };

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
    field: "serologia",
    headerName: "Serología",
    width: 180,
    editable: true,
    type: "singleSelect",
    valueOptions: ["Positivo", "Negativo"],
    
  },
  {
    field: "grupo",
    headerName: "Grupo Sanguíneo",
    width: 180,
    editable: true,
    type: "singleSelect",
    valueOptions: ["A", "B","AB","O"],
    
  },
  {
    field: "factor",
    headerName: "Rh",
    type: "singleSelect",
    width: 120,
    editable: true,
    valueOptions: ["+", "-"],
  },
  {
    field: "contratipaje",
    headerName: "Contratipaje",
    type: "singleSelect",
    width: 140,
    editable: true,
    valueOptions: ["A", "B","AB","O"],
  },
  {
    field: "du",
    headerName: "DU",
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




return (
    <>
      <Navbar />
      <Box sx={{ marginTop: "60px", width: "100%" }}>
        <Typography variant="h4" gutterBottom 
        sx={{fontSize:{xs:"2 rem", md:"3rem"},backgroundColor:"primary.dark",textAlign:"center",color: "white" }} >
         Laboratorio Inmunohematología
        </Typography>
        
        <Box sx={{ height: 400, width: "100%", mb: 2 }}>
          <DataGrid
          sx={{
            height:400,
          }
          }
            rows={rows}
            columns={columns}
            isCellEditable = {isCellEditable}
            columnVisibilityModel={columnVisibilityModel}
            processRowUpdate={handleProcessRowUpdate}
            getCellClassName ={(params: GridCellParams) =>{
              if(params.field ===  'du' && params.row.factor !== "-"){
                return 'disabled-cell';
              }
              return "";
            }}
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
          
          {/* <Tooltip title="AllNegative" >
          <BotonPersonalizado onClick={handleMarkAllNegative} sx={{ width: 200 }}>
            Todos Negativos
          </BotonPersonalizado>
            </Tooltip> */}
          
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