import { DataGrid, GridCellParams, GridColDef, GridRowParams } from "@mui/x-data-grid";
import BotonPersonalizado from "../../components/Button";
import Box from "@mui/material/Box";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Typography ,Stack} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import FormControlLabel from "@mui/material/FormControlLabel";
import {Dialog, DialogTitle,DialogContent,DialogContentText} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const API_URL = 'http://localhost:3000/registro-donacion';


export default function LabInmuno() {
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [columnVisibilityModel,setColumnVisibilityModel]= useState({});
  const navigate = useNavigate();
  const [openModal,setOpenModal] = useState(false);
  const [openEmptyFieldsModal, setOpenEmptyFieldsModal] = useState(false);
 
useEffect(() => {
    const fetchInitialRows = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/registro-donacion/consecutivo-historia-aceptada`);
        console.log("Datos recibidos del backend:", response.data); // Verifica los datos aquí
        if (response.data && Array.isArray(response.data)) {
          const data = response.data.map((item: any) => ({
            id: item._id, // Asegúrate de que el backend devuelve `_id`
            numero_consecutivo: item.numero_consecutivo || "",
            no_hc: item.historiaClinica?.no_hc || "",
            estado: item.estado || "",
            resultado_serologia: item.resultado_serologia ?? "",
            resultado_tipage: item.resultado_tipage ?? "",
            resultado_rh: item.resultado_rh ?? "",
            resultado_contratipaje: item.resultado_contratipaje ?? "",
            resultado_DU: item.resultado_DU ?? "",
           fechaLab: item.fechaLab || "",
          }));
          setRows(data);
        } else {
          console.error("Error: Datos inválidos recibidos del servidor.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchInitialRows();
  }, []);

 
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
   if (!newRow.resultado_serologia || !newRow.resultado_tipage || !newRow.resultado_contratipaje || !newRow.resultado_rh ) {
    console.error("Error: Campos vacíos en la fila.");
    return newRow;
    }
   //Resetear DU si el factor no es negativo
   if(newRow.factor !== "-" && newRow.du !== ""){
    updatedRow = {...newRow,du:""};
   }

   const updatedRows = rows.map((row) => (row.id === newRow.id ? newRow : row));
    setRows(updatedRows);
    return newRow;
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
        row.fechaLab === ""
      );
    });
  };

  const handleSave = async () => {
    if (hasEmptyFields()) {
      setOpenEmptyFieldsModal(true);
    } else {
      try {
        for (const row of rows) {
          if (!row.id) {
            console.error("Error: ID del registro está vacío o no es válido:", row);
            continue; // Salta esta fila si el ID no es válido
          }
  
          const payload = {
            resultado_serologia: Array.isArray(row.resultado_serologia) ? row.resultado_serologia : [row.resultado_serologia],
            resultado_tipage: Array.isArray(row.resultado_tipage) ? row.resultado_tipage : [row.resultado_tipage],
            resultado_contratipaje: Array.isArray(row.resultado_contratipaje) ? row.resultado_contratipaje : [row.resultado_contratipaje],
            resultado_rh: Array.isArray(row.resultado_rh) ? row.resultado_rh : [row.resultado_rh],
            resultado_DU: Array.isArray(row.resultado_DU) ? row.resultado_DU : [row.resultado_DU],
              
            estado: row.estado,
            fechaLab: row.fechaLab,
          };
  
          console.log(`Endpoint llamado: ${API_URL}/update-laboratorio-inmuno/${row.id}`);
          console.log("Payload enviado:", payload);
  
          try {
            await axios.patch(`${API_URL}/update-laboratorio-inmuno/${row.id}`, payload);
          } catch (error) {
            console.error(`Error al actualizar la fila con ID ${row.id}:`, error.response?.data || error.message);
          }
        }
  
        setOpenModal(true); // Muestra el modal de éxito
        navigate('/principal_lab'); // Redirige después de guardar
      } catch (error) {
        console.error("Error general al actualizar los datos:", error.response?.data || error.message);
      }
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
    field: "no_hc",
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
    valueOptions: ["Analizadas", "Reanalizadas","Aceptada"],
  },
  {
    field: "fechaLab",
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