import { DataGrid, GridCellParams, GridColDef, GridRowParams } from "@mui/x-data-grid";
import BotonPersonalizado from "../../components/Button";
import Box from "@mui/material/Box";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Typography ,Stack} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import {Dialog, DialogTitle,DialogContent,DialogContentText} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";



// Datos de ejemplo
const initialRows = [
  {
    id: 1,
    numero_consecutivo: "1",
    hist_clinica: "HC-001",
    resultado_serologia:"",
    resultado_tipage: "",
    resultado_rh: "",
    resultado_contratipaje: "",
    resultado_DU: "",
    fecha: "",
  },
  {
    id: 2,
    numero_consecutivo: "2",
    hist_clinica: "HC-002",
    resultado_serologia:"",
    resultado_tipage: "",
    resultado_rh: "",
    resultado_contratipaje: "",
    resultado_DU: "",
    fecha: "",
  },
  // Más filas de ejemplo...
];

export default function LabInmuno() {
  const [rows, setRows] = useState(initialRows);
  const [selectedRow, setSelectedRow] = useState(null);
  const [columnVisibilityModel,setColumnVisibilityModel]= useState({});
  const navigate = useNavigate();
  const [openModal,setOpenModal] = useState(false);
  const [openEmptyFieldsModal, setOpenEmptyFieldsModal] = useState(false);
 

 
 const isCellEditable = (params: GridCellParams) =>{
    if(params.field === 'resultado_DU'){
      return params.row.resultado_rh === "-";
    }
    return true;
  };
  useEffect(() =>{
    const shouldShowDU = rows.some(row => row.resultado_rh === "-");
    setColumnVisibilityModel(prev => ({
      ...prev,
      resultado_DU:shouldShowDU
    }));
  },[rows]);

 useEffect(()=>{
  if(openModal){
    const timer =setTimeout(()=> setOpenModal(false),3000);
    return()=>clearTimeout(timer);
  }
 },[openModal]);

 useEffect(()=>{
  if(openEmptyFieldsModal){
    const timer = setTimeout(()=> setOpenEmptyFieldsModal(false),3000);
    return()=> clearTimeout(timer);
  }
 },[openEmptyFieldsModal]);

 

  //Funcion para marcar todos como negativo
 const handleMarkAllNegative = (event:React.ChangeEvent<HTMLInputElement>)=>{
  const isChecked = event.target.checked;
  const updatedRows = rows.map(row =>({
    ...row,
    resultado_rh:isChecked? "-":"",
    resultado_DU:isChecked? "Negativo":"",
    resultado_serologia:isChecked? "Negativo":""
  }));
  setRows(updatedRows)
 };

 //Verifica si todos estan marcados como negativos
 const allNegative = rows.every(row =>
  row.resultado_rh === "-" && row.resultado_DU === "Negativo" && row.resultado_serologia === "Negativo"
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

  //Función para verificar campos vacíos
  const hasEmptyFields = () =>{
    return rows.some(row =>{
      return(
        row.resultado_serologia === "" ||
        row.resultado_tipage === "" ||
        row.resultado_rh === "" ||
        (row.resultado_rh === "-" && row.resultado_DU === "") ||
        row.resultado_contratipaje === "" ||
        row.fecha === ""
      );
    });
  };

   const handleSave = () => {
    if(hasEmptyFields()){
      setOpenEmptyFieldsModal(true);
    }else{
      console.log("Datos guardados:",rows);
      setOpenModal(true);
    }
    
  };

  //Función para cerrar los modales
  const handleCloseModal =()=>{
    setOpenModal(false);
  };

  const handleCloseEmptyFieldsModal = ()=>{
    setOpenEmptyFieldsModal(false);
  };

const columns: GridColDef[] = [
  {
    field: "numero_consecutivo",
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
    field: "resultado_serologia",
    headerName: "Serología",
    width: 180,
    editable: true,
    type: "singleSelect",
    valueOptions: ["Positivo", "Negativo"],
    
  },
  {
    field: "resultado_tipage",
    headerName: "Grupo Sanguíneo",
    width: 180,
    editable: true,
    type: "singleSelect",
    valueOptions: ["A", "B","AB","O"],
    
  },
  {
    field: "resultado_rh",
    headerName: "Rh",
    type: "singleSelect",
    width: 120,
    editable: true,
    valueOptions: ["+", "-"],
  },
  {
    field: "resultado_contratipaje",
    headerName: "Contratipaje",
    type: "singleSelect",
    width: 140,
    editable: true,
    valueOptions: ["A", "B","AB","O"],
  },
  {
    field: "resultado_DU",
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
              if(params.field ===  'resultado_DU' && params.row.resultado_rh !== "-"){
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
          <BotonPersonalizado 
          onClick={handleSave}
           sx={{ width: 200 }}>
            Guardar Cambios
          </BotonPersonalizado>

          
        </Box>
        </Box>

{/* Modal de confirmación */}
<Dialog
  open={openModal}
  onClose={handleCloseModal}
  PaperProps={{
    sx: {
      borderRadius: 3,
      padding: 3,
      minWidth: 320,
      boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
    },
  }}
  aria-labelledby="alert-dialog-title"
  aria-describedby="alert-dialog-description"
>
  
  <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center", pb: 0 }} >
  <Stack direction="column" alignItems="center" spacing={1}>
     <CheckCircleOutlineIcon sx={{ fontSize: 60, color: "success.main" }} />
     <Typography variant="h5" fontWeight="bold" color="success.main">
     ¡Éxito!
    </Typography>                 
  </Stack>
 
  </DialogTitle>
  <DialogContent >
    <DialogContentText id="alert-dialog-description"  
              variant="body1"
              textAlign="center"
              sx={{ mt: 1, fontSize: "1.1rem" }}>
      Los cambios se guardaron correctamente.
    </DialogContentText>
  </DialogContent>
 
</Dialog>

{/*Modal de advertencia para campos vacíos*/}
<Dialog
open={openEmptyFieldsModal}
onClose={handleCloseEmptyFieldsModal}
PaperProps={{
  sx:{
    borderRadius:3,
    padding:3,
    minWidht:320,
    boxShadow:"0 8px 24px rgba(0,0,0,0.2)",
  }
}}
aria-labelledby="empty-fields-dialog-title"
aria-describedby="empty-fields-dialog-description"
>
<DialogTitle id="alert-dialog-title" sx={{ textAlign: "center", pb: 0 }} >
  <Stack direction="column" alignItems="center" spacing={1}>
     <ErrorOutlineIcon sx={{ fontSize: 60, color: "error.main" }} />
     <Typography variant="h5" fontWeight="bold" color="error.main">
     ¡Error!
    </Typography>                 
  </Stack>
 
  </DialogTitle>
  <DialogContent >
    <DialogContentText id="alert-dialog-description"  
              variant="body1"
              textAlign="center"
              sx={{ mt: 1, fontSize: "1.1rem" }}>
      Existen campos vacíos.
    </DialogContentText>
  </DialogContent>
</Dialog>


</>
);
     
}