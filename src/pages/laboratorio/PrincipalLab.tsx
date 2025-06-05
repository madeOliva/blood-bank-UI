import { DataGrid, GridColDef, GridRowParams} from "@mui/x-data-grid";
import BotonPersonalizado from "../../components/Button";
import Box from "@mui/material/Box";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import {  useState } from "react";
import { Tooltip,Typography } from "@mui/material";


// Datos de Ejemplo
const initialAnalizar =[
    {
        id:1,
        no_consecutivo:"1",
        hist_clinic:"HC-001",
        hiv:"Negativo",
        hepatitisB:"Negativo",
        hepatitisC:"Negativo",
        serologia:"Positivo",
        grupo:"A",
        factor:"+",
        contratipaje:"B",
        du:"",
        fecha:"2023-01-15",
       
    },
     {
        id:2,
        no_consecutivo:"2",
        hist_clinic:"HC-002",
        hiv:"Negativo",
        hepatitisB:"Negativo",
        hepatitisC:"Negativo",
        serologia:"Positivo",
        grupo:"A",
        factor:"+",
        contratipaje:"B",
        du:"",
        fecha:"2023-01-15",
       
    },
     {
        id:3,
        no_consecutivo:"3",
        hist_clinic:"HC-003",
        hiv:"Negativo",
        hepatitisB:"Negativo",
        hepatitisC:"Negativo",
        serologia:"Positivo",
        grupo:"A",
        factor:"+",
        contratipaje:"B",
        du:"",
        fecha:"2023-01-15",
       
    }
];
const initialReanalizar =[
    {
        id:1,
        no_consecutivo:"1",
        hist_clinic:"HC-001",
        hivR:"",
        hivRR:"",
        hivRRB:"",
        hepatitisBR:"",
        hepatitisB_RR:"",
        hepatitisB_RRB:"",
        hepatitisC_R:"Negativo",
        hepatitisC_RR:"",
        hepatitisC_RRB:"",
        serologiaR:"Positivo",
        serologiaRR:"",
        serologiaRRB:"",
        grupo:"A",
        factor:"+",
        contratipaje:"B",
        duR:"",
        duRR:"",
        duRRB:"",
        fecha:"2023-01-15",
       
    },
     {
        id:2,
        no_consecutivo:"2",
        hist_clinic:"HC-002",
        hivR:"",
        hivRR:"",
        hivRRB:"",
        hepatitisBR:"",
        hepatitisB_RR:"",
        hepatitisB_RRB:"",
        hepatitisC_R:"Negativo",
        hepatitisC_RR:"",
        hepatitisC_RRB:"",
        serologiaR:"Positivo",
        serologiaRR:"",
        serologiaRRB:"",
        grupo:"A",
        factor:"+",
        contratipaje:"B",
        duR:"",
        duRR:"",
        duRRB:"",
        fecha:"2023-01-15",
       
    },
     {
        id:3,
        no_consecutivo:"3",
        hist_clinic:"HC-003",
        hivR:"",
        hivRR:"",
        hivRRB:"",
        hepatitisBR:"",
        hepatitisB_RR:"",
        hepatitisB_RRB:"",
        hepatitisC_R:"Negativo",
        hepatitisC_RR:"",
        hepatitisC_RRB:"",
        serologiaR:"Positivo",
        serologiaRR:"",
        serologiaRRB:"",
        grupo:"A",
        factor:"+",
        contratipaje:"B",
        duR:"",
        duRR:"",
        duRRB:"",
        fecha:"2023-01-15",
       
    }
]
const analizarColumns: GridColDef[] =[
    {
        field:"no_consecutivo",
        headerName:"No Consecutivo",
        width:120,
    },
    {
        field:"hist_clinic",
        headerName:"Historia Clínica",
        width:120,
        editable:false,
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
        headerName: "HCV ",
        type: "singleSelect",
        width: 140,
        editable: true,
        valueOptions: ["Positivo", "Negativo"],
      },
      {
        field: "serologia",
        headerName: "VDRL",
        type: "singleSelect",
        width: 140,
        editable: true,
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
   
]

const REanalizarColumns: GridColDef[] =[
    {
        field:"no_consecutivo",
        headerName:"No Consecutivo",
        width:120,
    },
    {
        field:"hist_clinic",
        headerName:"Historia Clínica",
        width:120,
        editable:false,
    },
    {
        field: "hivR",
        headerName: "HIV (R)",
        width: 180,
        editable: true,
        type: "singleSelect",
        valueOptions: ["Positivo", "Negativo"],
        
      },
      {
        field: "hivRR",
        headerName: "HIV (RR)",
        width: 180,
        editable: true,
        type: "singleSelect",
        valueOptions: ["Positivo", "Negativo"],
        
      },
      {
        field: "hivRRB",
        headerName: "HIV (RRB)",
        width: 180,
        editable: true,
        type: "singleSelect",
        valueOptions: ["Positivo", "Negativo"],
        
      },
      
      {
        field: "hepatitisBR",
        headerName: "HBsAg (R)",
        type: "singleSelect",
        width: 120,
        editable: true,
        valueOptions: ["Positivo", "Negativo"],
      },
      {
        field: "hepatitisB_RR",
        headerName: "HBsAg (RR)",
        type: "singleSelect",
        width: 120,
        editable: true,
        valueOptions: ["Positivo", "Negativo"],
      },
      {
        field: "hepatitisB_RRB",
        headerName: "HBsAg (RRB)",
        type: "singleSelect",
        width: 120,
        editable: true,
        valueOptions: ["Positivo", "Negativo"],
      },
      {
        field: "hepatitisC_R",
        headerName: "HCV (R)",
        type: "singleSelect",
        width: 140,
        editable: true,
        valueOptions: ["Positivo", "Negativo"],
      },
      {
        field: "hepatitisC_RR",
        headerName: "HCV (RR)",
        type: "singleSelect",
        width: 140,
        editable: true,
        valueOptions: ["Positivo", "Negativo"],
      },
      {
        field: "hepatitisC_RRB",
        headerName: "HCV (RRB) ",
        type: "singleSelect",
        width: 140,
        editable: true,
        valueOptions: ["Positivo", "Negativo"],
      },
      {
        field: "serologiaR",
        headerName: "VDRL (R)",
        type: "singleSelect",
        width: 140,
        editable: true,
        valueOptions: ["Positivo", "Negativo"],
      },
      {
        field: "serologiaRR",
        headerName: "VDRL (RR)",
        type: "singleSelect",
        width: 140,
        editable: true,
        valueOptions: ["Positivo", "Negativo"],
      },
      {
        field: "serologiaRRB",
        headerName: "VDRL (RRB)",
        type: "singleSelect",
        width: 140,
        editable: true,
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
        field: "duR",
        headerName: "DU (R)",
        type: "singleSelect",
        width: 140,
        editable: true,
        valueOptions: ["Positivo", "Negativo"],
    },
    {
        field: "duRR",
        headerName: "DU (RR)",
        type: "singleSelect",
        width: 140,
        editable: true,
        valueOptions: ["Positivo", "Negativo"],
    },
    {
        field: "duRRB",
        headerName: "DU (RRB)",
        type: "singleSelect",
        width: 140,
        editable: true,
        valueOptions: ["Positivo", "Negativo"],
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

export default function PrincipalLab(){
    const [analizar,setAnalizar] = useState(initialAnalizar);
    const [REanalizar, setReanalizar] = useState(initialReanalizar);
    const [selectedRow,setSelectedRow] = useState(null);
    const navigate = useNavigate();

    const handleRowClick =(params: GridRowParams)=>{
        setSelectedRow(params.row);
    };
    
    const handleAnalizarRowUpdate = (newRow: any) => {
        const updatedRows = analizar.map((row) => 
          row.id === newRow.id ? newRow : row
        );
        setAnalizar(updatedRows);
        return newRow;
      };
      const handleReanalizarRowUpdate = (newRow: any) => {
        const updatedRows = REanalizar.map((row) => 
          row.id === newRow.id ? newRow : row
        );
        setReanalizar(updatedRows);
        return newRow;
      };

      const handleSave = () => {
        // Aquí iría la lógica para guardar en la base de datos
        console.log("Datos guardados:", analizar);
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
               Laboratorio 
              </Typography>
              
              {/*Tabla Analizar*/ }
              <Typography variant="h5" gutterBottom sx={{color:"primary.main",mt:2,mb:2}}>
                Muestras Analizadas
              </Typography>
              <Box sx={{ height: 400, width: "100%", mb: 4 }}>
                <DataGrid
                  sx={{
                    height:400,
                  }
                  }
                  rows={analizar}
                  columns={analizarColumns}
                  processRowUpdate={handleAnalizarRowUpdate}
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
                {/*Tabla Reanalizar*/ }
                <Typography variant="h5" gutterBottom sx={{color:"primary.main",mt:2,mb:2}}>
                Muestras Reanalizadas
              </Typography>
              <Box sx={{ height: 400, width: "100%", mb: 2 }}>
                <DataGrid
                  sx={{
                    height:400,
                  }
                  }
                  rows={REanalizar}
                  columns={REanalizarColumns}
                  processRowUpdate={handleReanalizarRowUpdate}
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


