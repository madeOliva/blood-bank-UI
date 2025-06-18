import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import BotonPersonalizado from "../../components/Button";
import Box from "@mui/material/Box";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import {  Typography , Stack} from "@mui/material";
import {Dialog, DialogTitle,DialogContent,DialogContentText} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";


const columns: GridColDef[] = [
  {
    field: "numero_consecutivo",
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
    field: "resultado_hemoglobina",
    headerName: "Hemoglobina",
    width: 180,
    editable: true,
    type: "number",
  },
  {
    field: "resultado_TGP",
    headerName: "TCP",
    type: "number",
    width: 120,
    editable: true,
    
  },
  {
    field: "resultado_eritro",
    headerName: "Eritro",
    type: "number",
    width: 140,
    editable: true,
    
  },
  
  {
    field: "resultado_hematocrito",
    headerName: "Hematocrito",
    type: "number",
    width: 120,
    editable: true,
    
  },
  {
    field: "resultado_proteinas_totales",
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
    numero_consecutivo: "1",
    hist_clinica: "HC-001",
    resultado_hemoglobina: "",
    resultado_TGP: "",
    resultado_eritro: "",
    resultado_hematocrito:"",
    resultado_proteinas_totales:"",
    fecha: "",
  },
  {
    id: 2,
    numero_consecutivo: "2",
    hist_clinica: "HC-002",
    resultado_hemoglobina: "",
    resultado_TGP: "",
    resultado_eritro: "",
    resultado_hematocrito:"",
    resultado_proteinas_totales:"",
    fecha: "",
  },
  // Más filas de ejemplo...
];



export default function LabCCalidad() {
  const [rows, setRows] = useState(initialRows);
  const [selectedRow, setSelectedRow] = useState(null);
  const navigate = useNavigate();
  const [openModal,setOpenModal] = useState(false);
const [openEmptyFieldsModal, setOpenEmptyFieldsModal] = useState(false);

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
    //Función para verificar campos vacíos
    const hasEmptyFields = () =>{
      return rows.some(row =>{
        return(
          row.resultado_hemoglobina === "" ||
          row.resultado_TGP === "" ||
          row.resultado_eritro === "" ||
          row.resultado_hematocrito === "" ||
          row.resultado_proteinas_totales === ""
        );
      })
    };
  

   const handleSave = () => {
    if(hasEmptyFields()){
      setOpenEmptyFieldsModal(true);
    }else{
      console.log("Datos guardados:",rows);
      setOpenModal(true);
    }
  };

   //Función para cerrar el modal
    const handleCloseModal =()=>{
      setOpenModal(false);
    };

    const handleCloseEmptyFieldsModal = ()=>{
      setOpenEmptyFieldsModal(false);
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