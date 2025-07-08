import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Tooltip, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import axios from "axios";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const API_URL = 'http://localhost:3000/registro-donacion';

const analizarColumns: GridColDef[] = [
  {
    field: "numero_consecutivo",
    headerName: "No Consecutivo",
    width: 120,
  },
  {
    field: "no_hc",
    headerName: "Historia Clínica",
    width: 120,
    editable: false,
  },
  {
    field: "resultado_VIH",
    headerName: "HIV",
    width: 180,
    editable: false,


  },

  {
    field: "resultado_hepatitisB",
    headerName: "HBsAg",

    width: 120,
    editable: false,

  },

  {
    field: "resultado_hepatitisC",
    headerName: "HCV ",

    width: 140,
    editable: false,

  },
  {
    field: "fecha_suma",
    headerName: "Fecha ",
    type: "date",
    width: 120,
    editable: false,
    valueGetter: (params) => new Date(params),
  },
  {
    field: "resultado_serologia",
    headerName: "VDRL",

    width: 140,
    editable: false,

  },

  {
    field: "resultado_tipage",
    headerName: "Grupo Sanguíneo",
    width: 180,
    editable: false,


  },

  {
    field: "resultado_rh",
    headerName: "Rh",

    width: 120,
    editable: false,

  },

  {
    field: "resultado_contratipaje",
    headerName: "Contratipaje",

    width: 140,
    editable: false,

  },

  {
    field: "resultado_DU",
    headerName: "DU",

    width: 140,
    editable: false,

  },
  {
    field: "fecha_inmuno",
    headerName: "Fecha ",
    type: "date",
    width: 120,
    editable: false,
    valueGetter: (params) => new Date(params),
  },

]

const REanalizarColumns: GridColDef[] = [
  {
    field: "numero_consecutivo",
    headerName: "No Consecutivo",
    width: 120,
  },
  {
    field: "no_hc",
    headerName: "Historia Clínica",
    width: 120,
    editable: false,
  },
  {
    field: "resultado_VIH1",
    headerName: "HIV (R)",
    width: 180,
    editable: false,


  },
  {
    field: "resultado_hepatitisB1",
    headerName: "HBsAg (R)",

    width: 120,
    editable: false,
  },

  {
    field: "resultado_hepatitisC1",
    headerName: "HCV (R)",

    width: 140,
    editable: false,

  },
  {
    field: "fecha_suma",
    headerName: "Fecha R",
    type: "date",
    width: 120,
    editable: false,
    valueGetter: (params) => new Date(params),
  },

  {
    field: "resultado_VIH2",
    headerName: "HIV (RR)",
    width: 180,
    editable: false,


  },
  {
    field: "resultado_hepatitisB2",
    headerName: "HBsAg (RR)",

    width: 120,
    editable: false,
  },
  {
    field: "resultado_hepatitisC2",
    headerName: "HCV (RR)",

    width: 140,
    editable: false,

  },
  {
    field: "fecha_suma1",
    headerName: "Fecha RR",
    type: "date",
    width: 120,
    editable: false,
    valueGetter: (params) => new Date(params),
  },


  {
    field: "resultado_VIH3",
    headerName: "HIV (RRB)",
    width: 180,
    editable: false,


  },
  {
    field: "resultado_hepatitisB3",
    headerName: "HBsAg (RRB)",

    width: 120,
    editable: false,
  },
  {
    field: "resultado_hepatitisC3",
    headerName: "HCV (RRB) ",

    width: 140,
    editable: false,
  },
  {
    field: "fecha_suma2",
    headerName: "Fecha RRB",
    type: "date",
    width: 120,
    editable: false,
    valueGetter: (params) => new Date(params),
  }


];

const ReanalizarColumnsInmuno: GridColDef[] = [
  {
    field: "numero_consecutivo",
    headerName: "No Consecutivo",
    width: 120,
  },
  {
    field: "no_hc",
    headerName: "Historia Clínica",
    width: 120,
    editable: false,
  },

  {
    field: "resultado_serologia1",
    headerName: "VDRL (R)",

    width: 140,
    editable: false,
  },
  {
    field: "resultado_tipage1",
    headerName: "Grupo Sanguíneo",
    width: 180,
    editable: false,


  },
  {
    field: "resultado_rh1",
    headerName: "Rh",

    width: 120,
    editable: false,

  },
  {
    field: "resultado_contratipaje1",
    headerName: "Contratipaje",

    width: 140,
    editable: false,
  },
  {
    field: "resultado_DU1",
    headerName: "DU (R)",

    width: 140,
    editable: false,
  },
  {
    field: "fecha_inmuno",
    headerName: "Fecha R",
    type: "date",
    width: 120,
    editable: false,
    valueGetter: (params) => new Date(params)
  },


  {
    field: "resultado_serologia2",
    headerName: "VDRL (RR)",

    width: 140,
    editable: false,

  },
  {
    field: "resultado_tipage2",
    headerName: "Grupo Sanguíneo R",
    width: 180,
    editable: false,


  },
  {
    field: "resultado_rh2",
    headerName: "Rh R",

    width: 120,
    editable: false,
  },
  {
    field: "resultado_contratipaje2",
    headerName: "Contratipaje R",

    width: 140,
    editable: false,

  },
  {
    field: "resultado_DU2",
    headerName: "DU (RR)",

    width: 140,
    editable: false,
  },
  {
    field: "fecha_inmuno1",
    headerName: "Fecha RR",
    type: "date",
    width: 120,
    editable: false,
    valueGetter: (params) => new Date(params),
  },
  {
    field: "resultado_serologia3",
    headerName: "VDRL (RRB)",

    width: 140,
    editable: false,

  },
  {
    field: "resultado_tipage3",
    headerName: "Grupo Sanguíneo RRB",
    width: 180,
    editable: false,


  },
  {
    field: "resultado_rh3",
    headerName: "Rh RRB",

    width: 120,
    editable: false,

  },
  {
    field: "resultado_contratipaje3",
    headerName: "Contratipaje RRB",

    width: 140,
    editable: false,
  },

  {
    field: "resultado_DU3",
    headerName: "DU (RRB)",

    width: 140,
    editable: false,
  },
  {
    field: "fecha_inmuno2",
    headerName: "Fecha RRB",
    type: "date",
    width: 120,
    editable: false,
    valueGetter: (params) => new Date(params),
  },

]


//Columnas para resultado Calidad
const calidadColumns: GridColDef[] = [
  {
    field: "numero_consecutivo",
    headerName: "No Consecutivo",
    width: 120,
  },
  {
    field: "no_hc",
    headerName: "Historia Clínica",
    width: 120,
    editable: false,
  },
  {
    field: "resultado_hemoglobina",
    headerName: "Hemoglobina",
    width: 150,
    editable: false,
  },

  {
    field: "resultado_hematocrito",
    headerName: "Hematocrito",
    width: 150,
    editable: false,
  },

  {
    field: "resultado_eritro",
    headerName: "Eritro",
    width: 150,
    editable: false,
  },

  {
    field: "resultado_TGP",
    headerName: "TGP",
    width: 150,
    editable: false,
  },

  {
    field: "resultado_proteinas_totales",
    headerName: "Proteínas Totales",
    width: 150,
    editable: false,
  },
  {
    field: "fecha_calidad",
    headerName: "Fecha ",
    type: "date",
    width: 120,
    editable: false,
    valueGetter: (params) => new Date(params),
  },
]


//Columnas para resultado Calidad Repetidos
const calidadRepeticionColumns: GridColDef[] = [
  {
    field: "numero_consecutivo",
    headerName: "No Consecutivo",
    width: 120,
  },
  {
    field: "no_hc",
    headerName: "Historia Clínica",
    width: 120,
    editable: false,
  },
  {
    field: "resultado_hemoglobina1",
    headerName: "Hemoglobina R",
    width: 150,
    editable: false,
  },

  {
    field: "resultado_hematocrito1",
    headerName: "Hematocrito R",
    width: 150,
    editable: false,
  },

  {
    field: "resultado_eritro1",
    headerName: "Eritro R",
    width: 150,
    editable: false,
  },

  {
    field: "resultado_TGP1",
    headerName: "TGP R",
    width: 150,
    editable: false,
  },

  {
    field: "resultado_proteinas_totales1",
    headerName: "Proteínas Totales R",
    width: 150,
    editable: false,
  },
  {
    field: "fecha_calidad",
    headerName: "Fecha R",
    type: "date",
    width: 120,
    editable: false,
    valueGetter: (params) => new Date(params),
  },
]

export default function PrincipalLab() {

  const [analizar, setAnalizar] = useState([]);
  const [REanalizarSuma, setReanalizarSuma] = useState([]);
  const [REanalizarInmuno, setReanalizarInmuno] = useState([]);
  const [calidad, setCalidad] = useState([]);
  const [calidadRepeticion, setCalidadRepeticion] = useState([]);
  const [expanded, setExpanded] = useState<string | false>('panel1');
  const [setSelectedRow] = useState(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  const [analizarSearch, setAnalizarSearch] = useState("");
  const [reanalizarSumaSearch, setReanalizarSumaSearch] = useState("");
  const [reanalizarInmunoSearch, setReanalizarInmunoSearch] = useState("");
  const [calidadSearch, setCalidadSearch] = useState("");
  const [calidadRepeticionSearch, setCalidadRepeticionSearch] = useState("");


  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, [])

  const allowedFieldsSuma = [
    "numero_consecutivo",
    "no_hc",
    "resultado_VIH",
    "resultado_hepatitisB",
    "resultado_hepatitisC",
    "fecha_suma"
  ];


  const allowedFieldsInmuno = [
    "numero_consecutivo",
    "no_hc",
    "resultado_serologia",
    "resultado_tipage",
    "resultado_contratipaje",
    "resultado_rh",
    "resultado_DU",
    "fecha_inmuno"
  ]

  const analizarResultFields = [
    "resultado_VIH",
    "resultado_hepatitisB",
    "resultado_hepatitisC",
    "fecha_suma",
    "resultado_serologia",
    "resultado_tipage",
    "resultado_rh",
    "resultado_contratipaje",
    "resultado_DU",
    "fecha_inmuno"
  ];



  let filteredAnalizarColumns = analizarColumns;

  if (userRole === "Técnico de laboratorio suma") {
    filteredAnalizarColumns = analizarColumns.filter(col => allowedFieldsSuma.includes(col.field));
  } else if (userRole === "Técnico de laboratorio inmuno") {
    filteredAnalizarColumns = analizarColumns.filter(col => allowedFieldsInmuno.includes(col.field));
  }


  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    }

  // Metodo para cargar muestras que ya fueron analizadas por primera vez
  const fetchAnalizarData = async () => {
    try {
      const response = await axios.get(`${API_URL}/analizadas`);
      const data = response.data;

      // Filtra solo las muestras que tengan al menos un resultado en los arrays
      const filtrado = data.filter(row =>
        analizarResultFields.some(
          field =>
            Array.isArray(row[field]) ? row[field].length > 0 :
              row[field] !== undefined && row[field] !== null && row[field] !== ""
        )
      );

      setAnalizar(filtrado);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAnalizarData();
  }, []);

  // Reanalizadas Suma
  const fetchReanalizarSumaData = async () => {
    try {
      const response = await axios.get(`${API_URL}/reanalizadas-suma`);
      const data = response.data;

      setReanalizarSuma(data); // Carga los datos en la tabla analizarColumns
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchReanalizarSumaData();
  }, []);

  // Reanalizadas Inmuno
  const fetchReanalizarInmunoData = async () => {
    try {
      const response = await axios.get(`${API_URL}/reanalizadas-inmuno`);
      const data = response.data;

      setReanalizarInmuno(data); // Carga los datos en la tabla analizarColumns
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchReanalizarInmunoData();
  }, []);

  // Analizadas Calidad
  const fetchCalidadData = async () => {
    try {
      const response = await axios.get(`${API_URL}/analizadas-calidad`);
      const data = response.data;

      setCalidad(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchCalidadData();
  }, []);

  // Reanalizadas Calidad
  const fetchCalidadRepeticionData = async () => {
    try {
      const response = await axios.get(`${API_URL}/reanalizadas-calidad`);
      const data = response.data;

      setCalidadRepeticion(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchCalidadRepeticionData();
  }, []);


  const handleRowClick = (params: GridRowParams) => {
    setSelectedRow(params.row);
  };


  const handleAnalizarRowUpdate = async (newRow: any) => {
    try {
      await axios.put(`${API_URL}/${newRow.id}`, newRow);
      const updatedRows = analizar.map((row) =>
        row.id === newRow.id ? newRow : row
      );
      setAnalizar(updatedRows);
      return newRow;
    } catch (error) {
      console.error("Error updating row:", error);
      return newRow;
    }
  };

  const handleReanalizarSumaRowUpdate = async (newRow: any) => {
    try {
      await axios.put(`${API_URL}/${newRow.id}`, newRow);
      const updatedRows = REanalizarSuma.map((row) =>
        row.id === newRow.id ? newRow : row
      );
      setReanalizarSuma(updatedRows);
      return newRow;
    } catch (error) {
      console.error("Error updating row:", error);
      return newRow;
    }
  };

  const handleCalidadRowUpdate = async (newRow: any) => {
    try {
      const updatedRows = calidad.map(row =>
        row.id === newRow.id ? newRow : row
      );
      setCalidad(updatedRows);
      return newRow;
    } catch (error) {
      console.error("Error updating row:", error);
      return newRow;
    }
  };

  const handleReanalizarCalidadRowUpdate = async (newRow: any) => {
    try {
      const updatedRows = calidadRepeticion.map(row =>
        row.id === newRow.id ? newRow : row
      );
      setCalidadRepeticion(updatedRows);
      return newRow;
    } catch (error) {
      console.error("Error updating row:", error);
      return newRow;
    }
  };

  const handleReanalizarInmunoRowUpdate = async (newRow: any) => {
    try {
      const updatedRows = REanalizarInmuno.map(row =>
        row.id === newRow.id ? newRow : row
      );
      setReanalizarInmuno(updatedRows);
      return newRow;
    } catch (error) {
      console.error("Error updating row:", error);
      return newRow;
    }
  };

  const handleSave = async () => {
    try {
      await axios.post(API_URL, { analizar, REanalizar });
      console.log("Datos guardados:", analizar);

    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  useEffect(() => {
    fetchAnalizarData();
  }, []);
  useEffect(() => {
    fetchReanalizarSumaData();
  }, []);

  function filterAndPrioritize(data, search, field = "no_hc") {
    if (!search) return data;
    const searchLower = search.toLowerCase();
    const matches = data.filter(row => row[field]?.toLowerCase().includes(searchLower));
    const nonMatches = data.filter(row => !row[field]?.toLowerCase().includes(searchLower));
    return [...matches, ...nonMatches];
  }

  const filteredAnalizar = filterAndPrioritize(analizar, analizarSearch, "no_hc");
  const filteredReanalizarSuma = filterAndPrioritize(REanalizarSuma, reanalizarSumaSearch, "no_hc");
  const filteredReanalizarInmuno = filterAndPrioritize(REanalizarInmuno, reanalizarInmunoSearch, "no_hc");
  const filteredCalidad = filterAndPrioritize(calidad, calidadSearch, "no_hc");
  const filteredCalidadRepeticion = filterAndPrioritize(calidadRepeticion, calidadRepeticionSearch, "no_hc");

  return (
    <>
      <Navbar />
      <Box sx={{ marginTop: "60px", width: "100%" }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontSize: { xs: "2 rem", md: "3rem" }, textAlign: "center", color: "white", backgroundColor: "primary.dark" }} >
          Laboratorio
        </Typography>

        {(userRole === "Técnico de laboratorio suma" || userRole === "Técnico de laboratorio inmuno") && (
          <>
           
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', mb: 2, mt: 1 }}>
                  <TextField
                    label="Buscar por Historia Clínica"
                    value={analizarSearch}
                    onChange={e => setAnalizarSearch(e.target.value)}
                    size="small"
                    sx={{
                      width: 250,
                      
                      mr: 2,
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'primary.main',
                        },
                        '&:hover fieldset': {
                          borderColor: 'primary.dark',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'primary.main',
                        },
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                <Box sx={{ height: 400, width: "100%", mb: 4 }}>
                  <DataGrid
                    rows={filteredAnalizar}
                    columns={filteredAnalizarColumns}
                    processRowUpdate={handleAnalizarRowUpdate}
                    onRowClick={handleRowClick}
                    initialState={{
                      pagination: { paginationModel: { pageSize: 10 } },
                    }}
                    pageSizeOptions={[10]}
                    editMode="row"
                  />
                </Box>
             

          </>
        )}

        {userRole === "Técnico de laboratorio suma" && (
          <>

           
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', mb: 2, mt: 1 }}>
                  <TextField
                    label="Buscar por Historia Clínica"
                    value={reanalizarSumaSearch}
                    onChange={e => setReanalizarSumaSearch(e.target.value)}
                    size="small"
                    sx={{
                      width: 250,
                      
                      mr: 2,
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'primary.main',
                        },
                        '&:hover fieldset': {
                          borderColor: 'primary.dark',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'primary.main',
                        },
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                
                <Box sx={{ height: 400, width: "100%", mb: 4 }}>
                  <DataGrid
                    rows={filteredReanalizarSuma}
                    columns={REanalizarColumns}
                    processRowUpdate={handleReanalizarSumaRowUpdate}
                    onRowClick={handleRowClick}
                    initialState={{
                      pagination: { paginationModel: { pageSize: 10 } },
                    }}
                    pageSizeOptions={[10]}
                    editMode="row"
                  />
                </Box>
            

          </>


        )
        }
        {userRole === "Técnico de laboratorio calidad" && (
          <>
            
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', mb: 2, mt: 1 }}>
                  <TextField
                    label="Buscar por Historia Clínica"
                    value={calidadSearch}
                    onChange={e => setCalidadSearch(e.target.value)}
                    size="small"
                    sx={{
                      width: 250,
                      
                      mr: 2,
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'primary.main',
                        },
                        '&:hover fieldset': {
                          borderColor: 'primary.dark',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'primary.main',
                        },
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                
                <Box sx={{ height: 400, width: "100%", mb: 4 }}>
                  <DataGrid
                    rows={filteredCalidad}
                    columns={calidadColumns}
                    processRowUpdate={handleCalidadRowUpdate}
                    initialState={{
                      pagination: { paginationModel: { pageSize: 10 } },
                    }}
                    pageSizeOptions={[10]}
                    editMode="row"
                  />
                </Box>
             

          
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', mb: 2, mt: 1 }}>
                  <TextField
                    label="Buscar por Historia Clínica"
                    value={calidadRepeticion}
                    onChange={e => setCalidadRepeticionSearch(e.target.value)}
                    size="small"
                    sx={{
                      width: 250,
                      
                      mr: 2,
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'primary.main',
                        },
                        '&:hover fieldset': {
                          borderColor: 'primary.dark',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'primary.main',
                        },
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                
                <Box sx={{ height: 400, width: "100%", mb: 4 }}>
                  <DataGrid
                    rows={filteredCalidadRepeticion}
                    columns={calidadRepeticionColumns}
                    processRowUpdate={handleReanalizarCalidadRowUpdate}
                    initialState={{
                      pagination: { paginationModel: { pageSize: 10 } },
                    }}
                    pageSizeOptions={[10]}
                    editMode="row"
                  />
                </Box>
             

          </>
        )
        }


        {userRole === "Técnico de laboratorio inmuno" && (
          <>
           
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', mb: 2, mt: 1 }}>
                  <TextField
                    label="Buscar por Historia Clínica"
                    value={reanalizarInmunoSearch}
                    onChange={e => setReanalizarInmunoSearch(e.target.value)}
                    size="small"
                    sx={{
                      width: 250,
                      
                      mr: 2,
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'primary.main',
                        },
                        '&:hover fieldset': {
                          borderColor: 'primary.dark',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'primary.main',
                        },
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                
                <Box sx={{ height: 400, width: "100%", mb: 4 }}>
                  <DataGrid
                    rows={filteredReanalizarInmuno}
                    columns={ReanalizarColumnsInmuno}
                    processRowUpdate={handleReanalizarInmunoRowUpdate}
                    initialState={{
                      pagination: { paginationModel: { pageSize: 10 } },
                    }}
                    pageSizeOptions={[10]}
                    editMode="row"
                  />
                </Box>
             
          </>
        )
        }

      </Box>
    </>
  );
}





