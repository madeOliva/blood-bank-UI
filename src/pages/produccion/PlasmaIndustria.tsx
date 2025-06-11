import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import BotonPersonalizado from "../../components/Button";
import {Dialog, DialogTitle, DialogContent, DialogContentText, Stack} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";


const columns: GridColDef[] = [
  { field: "no_consecutivo", 
    headerName: "No", 
    width: 100
  },
   { field: "no_lote", 
    headerName: "No lote", 
    width: 100,
    editable:true
  },
  { field: "no_hc", 
    headerName: "No. HC", 
    width: 150 
  },
  { field: "sexo", 
    headerName: "Sexo", 
    width: 60
  },
   { field: "edad", 
    headerName: "Edad", 
    width: 60, 
    type: "number"
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
  
];

const initialRows = [
  {
    id: 1,
    no_consecutivo: "1",
    no_lote:"",
    no_hc: "TUB001",
    sexo: "M",
    edad:35,
    fecha_donacion: "2025-05-01",
    fecha_obtencion: "2025-05-02",
    volumen: 250,
    
  },
  // Más filas de ejemplo...
];

export default function PlasmaIndustria() {
  const [rows, setRows] = useState(initialRows);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
        if(openModal) {
          const timer = setTimeout(() => setOpenModal(false), 3000);
          return() => clearTimeout(timer);
        }
      }, [openModal]);
    
      const handleSave = () => {
        // Lógica para guardar en la base de datos
        console.log("Los componentes bajas se enviaron correctamente :", rows);
        setOpenModal(true);
      };
    
      // Función para cerrar el modal
      const handleCloseModal = () => {
        setOpenModal(false);
      };
    
  return (
    <>
      <Navbar />
      <Box sx={{ marginTop: "25" }}>
        <Typography 
        variant="h4" 
        sx={{fontSize: {xs: "2rem", md: "3rem"}, mt: 8, backgroundColor: "primary.dark", textAlign: "center", color: "white"}}>
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

         <Box sx={{ display: "flex", gap: 2, justifyContent: "center"  }}>
                      <BotonPersonalizado 
                        onClick={handleSave}  // Aquí conectas la función
                        sx={{ width: 150 }}
                      >
                        Enviar
                      </BotonPersonalizado>
                    </Box>
                    {/* Modal de confirmación */}
                              <Dialog
                                open={openModal}
                                onClose={handleCloseModal}
                                PaperProps={{
                                  sx: {
                                    borderRadius: 3,
                                    Padding: 3,
                                    minWidth: 320,
                                    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                                  },
                                }}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                              >
                                <DialogTitle id="alert-dialog-title" sx={{textAlign: "center", pb: 0 }}>
                                  <Stack direction="column" alignItems="center" spacing={1}>
                                    <CheckCircleOutlineIcon sx={{ fontSize:60, color:"success.main"}}/>
                                    <Typography variant="h5" fontWeight="bold" color="success.main">
                                      ¡Éxito!
                                    </Typography>
                                  </Stack>
                                </DialogTitle>
                        
                                <DialogContent>
                                  <DialogContentText 
                                    id="alert-dialog-description"
                                    variant="body1"
                                    textAlign="center"
                                    sx={{ mt:1, fontSize: "1.1rem"}}
                                  >
                                    El Plasma para la industria se envió correctamente
                                  </DialogContentText>
                                </DialogContent>
                              </Dialog>
               </Box>
    </>
  );
}