import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import BotonPersonalizado from "../../components/Button";
import Box from "@mui/material/Box";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useState,useEffect, useCallback } from "react";
import {  Typography , Stack, Tooltip} from "@mui/material";
import axios from "axios";
import {Dialog, DialogTitle,DialogContent,DialogContentText} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";


const API_URL = 'http://localhost:3000/registro-donacion';
// Función para verificar si un campo específico está fuera de rango
const isFieldInvalid = (field: string, value: any) => {
  if (value === undefined || value === '') return false;

  switch(field) {
    case 'resultado_hemoglobina':
      return value < 115 || value > 175;
    case 'resultado_hematocrito':
      return value < 36 || value > 50;
    case 'resultado_eritro':
      return value < 2 || value > 20;
    case 'resultado_proteinas_totales':
      return value < 65 || value > 82;
    case 'resultado_TGP':
      return value > 49;
    default:
      return false;
  }
  return false;
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
    width: 140,
    editable: false,
  },
  {
    field: "resultado_hemoglobina",
    headerName: "Hemoglobina",
    width: 180,
    editable: true,
    type: "number",
    renderCell: (params) => {
      const isInvalid = isFieldInvalid(params.field, params.value);
      return (
        <Tooltip title={isInvalid ? "Valor fuera de rango - Debe repetirse este examen" : ""}>
          <div className={isInvalid ? "celda-invalida" : ""} style={{ width: '100%', height: '100%' }}>
            {params.value}
          </div>
        </Tooltip>
      );
    },
  },
  {
    field: "fecha_hemoglobina",
    headerName: "Fecha Hb",
    type: "date",
    width: 120,
    editable: true,
    valueGetter: (params) => new Date(params),
  },
  {
    field: "resultado_TGP",
    headerName: "TGP",
    type: "number",
    width: 120,
    editable: true,
    renderCell: (params) => {
      const isInvalid = isFieldInvalid(params.field, params.value);
      return (
        <Tooltip title={isInvalid ? "Valor fuera de rango - Debe repetirse este examen" : ""}>
          <div className={isInvalid ? "celda-invalida" : ""} style={{ width: '100%', height: '100%' }}>
            {params.value}
          </div>
        </Tooltip>
      );
    },
    
  },
  {
    field: "fecha_TGP",
    headerName: "Fecha TGP",
    type: "date",
    width: 120,
    editable: true,
    valueGetter: (params) => new Date(params),
  },
  {
    field: "resultado_eritro",
    headerName: "Eritro",
    type: "number",
    width: 140,
    editable: true,
    renderCell: (params) => {
      const isInvalid = isFieldInvalid(params.field, params.value);
      return (
        <Tooltip title={isInvalid ? "Valor fuera de rango - Debe repetirse este examen" : ""}>
          <div className={isInvalid ? "celda-invalida" : ""} style={{ width: '100%', height: '100%' }}>
            {params.value}
          </div>
        </Tooltip>
      );
    },
    
  },
  {
    field: "fecha_eritro",
    headerName: "Fecha Eritro",
    type: "date",
    width: 120,
    editable: true,
    valueGetter: (params) => new Date(params),
  },
  
  {
    field: "resultado_hematocrito",
    headerName: "Hematocrito",
    type: "number",
    width: 120,
    editable: true,
    renderCell: (params) => {
      const isInvalid = isFieldInvalid(params.field, params.value);
      return (
        <Tooltip title={isInvalid ? "Valor fuera de rango - Debe repetirse este examen" : ""}>
          <div className={isInvalid ? "celda-invalida" : ""} style={{ width: '100%', height: '100%' }}>
            {params.value}
          </div>
        </Tooltip>
      );
    },
    
  },
  {
    field: "fecha_hematocrito",
    headerName: "Fecha Hto",
    type: "date",
    width: 120,
    editable: true,
    valueGetter: (params) => new Date(params),
  },
  {
    field: "resultado_proteinas_totales",
    headerName: "Proteínas Totales",
    type: "number",
    width: 120,
    editable: true,
    renderCell: (params) => {
      const isInvalid = isFieldInvalid(params.field, params.value);
      return (
        <Tooltip title={isInvalid ? "Valor fuera de rango - Debe repetirse este examen" : ""}>
          <div className={isInvalid ? "celda-invalida" : ""} style={{ width: '100%', height: '100%' }}>
            {params.value}
          </div>
        </Tooltip>
      );
    },
    
  },
  {
    field: "fecha_proteinas_totales",
    headerName: "Fecha PT",
    type: "date",
    width: 120,
    editable: true,
    valueGetter: (params) => new Date(params),
  },
  {
    field: "estado",
    headerName: "Estado",
    type: "singleSelect",
    width: 140,
    editable: true,
    valueOptions: ["Analizada", "Reanalizada","Aceptada"],
  },
 
  
];



export default function LabCCalidad() {
  const [rows, setRows] = useState<any[]>([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const navigate = useNavigate();
  const [openModal,setOpenModal] = useState(false);
const [openEmptyFieldsModal, setOpenEmptyFieldsModal] = useState(false);



useEffect(() => {
    const fetchInitialRows = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/registro-donacion/consecutivo-historia-aceptada-controlados`);
        console.log("Datos recibidos del backend:", response.data); // Verifica los datos aquí
        if (response.data && Array.isArray(response.data)) {
          const data = response.data.map((item: any) => ({
            id: item._id, // Asegúrate de que el backend devuelve `_id`
            numero_consecutivo: item.numero_consecutivo ,
            no_hc: item.historiaClinica?.no_hc ,
            estado: item.estado || "",
            resultado_hemoglobina: item.resultado_hemoglobina ?? "",
            fecha_hemoglobina: item.fecha_hemoglobina || "",
            resultado_TGP: item.resultado_TGP ?? "",
            fecha_TGP: item.fecha_TGP || "",
            resultado_eritro: item.resultado_eritro ?? "",
            fecha_eritro: item.fecha_eritro || "",
            resultado_hematocrito: item.resultado_hematocrito ?? "",
            fecha_hematocrito: item.fecha_hematocrito || "",
            resultado_proteinas_totales: item.resultado_proteinas_totales ?? "",
            fecha_proteinas_totales: item.fecha_proteinas_totales || "",
            
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
  }

  const handleProcessRowUpdate = (newRow: any) => {
    // Validación para permitir solo valores mayores que 0
    const invalidFields = [
      "resultado_hemoglobina",
      "resultado_TGP",
      "resultado_eritro",
      "resultado_hematocrito",
      "resultado_proteinas_totales",
    ].filter((field) => newRow[field] <= 0); // Cambiado para validar valores menores o iguales a 0
  
    if (invalidFields.length > 0) {
      console.error(`Error: Los siguientes campos tienen valores menores o iguales a 0: ${invalidFields.join(", ")}`);
      setOpenEmptyFieldsModal(true); // Muestra el modal de error
      return rows.find((row) => row.id === newRow.id); // Devuelve la fila original sin actualizar
    }
  
    const updatedRows = rows.map((row) => (row.id === newRow.id ? newRow : row));
    setRows(updatedRows);
    return newRow;
  };
    

  const handleSave = async () => {
   

        try {
          for (const row of rows) {
            if (!row.id) {
              console.error("Error: ID del registro está vacío o no es válido:", row);
              continue; // Salta esta fila si el ID no es válido
            }
    
            const payload = {
              resultado_hemoglobina: Array.isArray(row.resultado_hemoglobina) ? row.resultado_hemoglobina : [row.resultado_hemoglobina],
              fecha_hemoglobina: Array.isArray(row.fecha_hemoglobina) ? row.fecha_hemoglobina : [row.fecha_hemoglobina],
              resultado_TGP: Array.isArray(row.resultado_TGP) ? row.resultado_TGP : [row.resultado_TGP],
              fecha_TGP: Array.isArray(row.fecha_TGP) ? row.fecha_TGP : [row.fecha_TGP],
              resultado_eritro: Array.isArray(row.resultado_eritro) ? row.resultado_eritro : [row.resultado_eritro],
              fecha_eritro: Array.isArray(row.fecha_eritro) ? row.fecha_eritro : [row.fecha_eritro],
              resultado_hematocrito: Array.isArray(row.resultado_hematocrito) ? row.resultado_hematocrito : [row.resultado_hematocrito],
              fecha_hematocrito: Array.isArray(row.fecha_hematocrito) ? row.fecha_hematocrito : [row.fecha_hematocrito],
              resultado_proteinas_totales: Array.isArray(row.resultado_proteinas_totales) ? row.resultado_proteinas_totales : [row.resultado_proteinas_totales],
              fecha_proteinas_totales: Array.isArray(row.fecha_proteinas_totales) ? row.fecha_proteinas_totales : [row.fecha_proteinas_totales],
              estado: row.estado,
              
            };
    
            console.log(`Endpoint llamado: ${API_URL}/update-laboratorio-calidad/${row.id}`);
            console.log("Payload enviado:", payload);
    
            try {
              await axios.patch(`${API_URL}/update-laboratorio-calidad/${row.id}`, payload);
            } catch (error) {
              console.error(`Error al actualizar la fila con ID ${row.id}:`, error.response?.data || error.message);
            }
          }
    
          setOpenModal(true); // Muestra el modal de éxito
          navigate('/principal_lab'); // Redirige después de guardar
        } catch (error) {
          console.error("Error general al actualizar los datos:", error.response?.data || error.message);
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
            sx={{ fontSize: { xs: "2 rem", md: "3rem" }, backgroundColor: "primary.dark", textAlign: "center", color: "white" }} >
            Laboratorio Control de Calidad
          </Typography>
          
          <Box sx={{ 
            height: 400, 
            width: "100%", 
            mb: 2,
            '& .celda-invalida': {
              backgroundColor: 'rgba(255, 0, 0, 0.2)',
              '&:hover': {
                backgroundColor: 'rgba(255, 0, 0, 0.3)'
              }
            }
          }}>
            <DataGrid
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
  
        {/* Modales existentes sin cambios */}
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
  
        <Dialog
          open={openEmptyFieldsModal}
          onClose={handleCloseEmptyFieldsModal}
          PaperProps={{
            sx: {
              borderRadius: 3,
              padding: 3,
              minWidth: 320,
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
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
              No pueden existir resultados con valores negativos.
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </>
    );
  }