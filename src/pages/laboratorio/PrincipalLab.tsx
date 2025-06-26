import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import BotonPersonalizado from "../../components/Button";
import Box from "@mui/material/Box";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Tooltip, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import axios from "axios";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


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
    editable: true,
    type: "singleSelect",
    valueOptions: ["Positivo", "Negativo"],

  },
  {
    field: "fecha_VIH",
    headerName: "Fecha HIV",
    type: "date",
    width: 120,
    editable: true,
    valueGetter: (params) => new Date(params),
  },


  {
    field: "resultado_hepatitisB",
    headerName: "HBsAg",
    type: "singleSelect",
    width: 120,
    editable: true,
    valueOptions: ["Positivo", "Negativo"],
  },
  {
    field: "fecha_hepatitisB",
    headerName: "Fecha HBsAg",
    type: "date",
    width: 120,
    editable: true,
    valueGetter: (params) => new Date(params),
  },

  {
    field: "resultado_hepatitisC",
    headerName: "HCV ",
    type: "singleSelect",
    width: 140,
    editable: true,
    valueOptions: ["Positivo", "Negativo"],
  },
  {
    field: "fecha_hepatitisC",
    headerName: "Fecha HCV",
    type: "date",
    width: 120,
    editable: true,
    valueGetter: (params) => new Date(params),
  },
  {
    field: "resultado_serologia",
    headerName: "VDRL",
    type: "singleSelect",
    width: 140,
    editable: true,
    valueOptions: ["Positivo", "Negativo"],
  },
  {
    field: "fecha_serologia",
    headerName: "Fecha VDRL",
    type: "date",
    width: 120,
    editable: true,
    valueGetter: (params) => new Date(params),
  },
  {
    field: "resultado_tipage",
    headerName: "Grupo Sanguíneo",
    width: 180,
    editable: true,
    type: "singleSelect",
    valueOptions: ["A", "B", "AB", "O"],

  },
  {
    field: "fecha_tipage",
    headerName: "Fecha Grupo",
    type: "date",
    width: 120,
    editable: true,
    valueGetter: (params) => new Date(params),
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
    field: "fecha_rh",
    headerName: "Fecha Rh",
    type: "date",
    width: 120,
    editable: true,
    valueGetter: (params) => new Date(params),
  },
  {
    field: "resultado_contratipaje",
    headerName: "Contratipaje",
    type: "singleSelect",
    width: 140,
    editable: true,
    valueOptions: ["A", "B", "AB", "O"],
  },
  {
    field: "fecha_contratipaje",
    headerName: "Fecha Contratipaje",
    type: "date",
    width: 120,
    editable: true,
    valueGetter: (params) => new Date(params),
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
    field: "fecha_DU",
    headerName: "Fecha DU",
    type: "date",
    width: 120,
    editable: true,
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
    editable: true,
    type: "singleSelect",
    valueOptions: ["Positivo", "Negativo"],

  },
  {
    field: "fecha_VIH1",
    headerName: "Fecha VIH R",
    type: "date",
    width: 120,
    editable: true,
    valueGetter: (params) => new Date(params),
  },
  {
    field: "resultado_VIH2",
    headerName: "HIV (RR)",
    width: 180,
    editable: true,
    type: "singleSelect",
    valueOptions: ["Positivo", "Negativo"],

  },
  {
    field: "fecha_VIH2",
    headerName: "Fecha VIH RR",
    type: "date",
    width: 120,
    editable: true,
    valueGetter: (params) => new Date(params),
  },
  {
    field: "resultado_VIH3",
    headerName: "HIV (RRB)",
    width: 180,
    editable: true,
    type: "singleSelect",
    valueOptions: ["Positivo", "Negativo"],

  },
  {
    field: "fecha_VIH3",
    headerName: "Fecha VIH RRB",
    type: "date",
    width: 120,
    editable: true,
    valueGetter: (params) => new Date(params),
  },

  {
    field: "resultado_hepatitisB1",
    headerName: "HBsAg (R)",
    type: "singleSelect",
    width: 120,
    editable: true,
    valueOptions: ["Positivo", "Negativo"],
  },
  {
    field: "fecha_hepatitisB1",
    headerName: "Fecha HBsAg R",
    type: "date",
    width: 120,
    editable: true,
    valueGetter: (params) => new Date(params),
  },
  {
    field: "resultado_hepatitisB2",
    headerName: "HBsAg (RR)",
    type: "singleSelect",
    width: 120,
    editable: true,
    valueOptions: ["Positivo", "Negativo"],
  },
  {
    field: "fecha_hepatitisB2",
    headerName: "Fecha HBsAg RR",
    type: "date",
    width: 120,
    editable: true,
    valueGetter: (params) => new Date(params),
  },
  {
    field: "resultado_hepatitisB3",
    headerName: "HBsAg (RRB)",
    type: "singleSelect",
    width: 120,
    editable: true,
    valueOptions: ["Positivo", "Negativo"],
  },
  {
    field: "fecha_hepatitisB3",
    headerName: "Fecha HBsAg RRB",
    type: "date",
    width: 120,
    editable: true,
    valueGetter: (params) => new Date(params),
  },
  {
    field: "resultado_hepatitisC1",
    headerName: "HCV (R)",
    type: "singleSelect",
    width: 140,
    editable: true,
    valueOptions: ["Positivo", "Negativo"],
  },
  {
    field: "fecha_hepatitisC1",
    headerName: "Fecha HCV R",
    type: "date",
    width: 120,
    editable: true,
    valueGetter: (params) => new Date(params),
  },
  {
    field: "resultado_hepatitisC2",
    headerName: "HCV (RR)",
    type: "singleSelect",
    width: 140,
    editable: true,
    valueOptions: ["Positivo", "Negativo"],
  },
  {
    field: "fecha_hepatitisC2",
    headerName: "Fecha HCV RR",
    type: "date",
    width: 120,
    editable: true,
    valueGetter: (params) => new Date(params),
  },
  {
    field: "resultado_hepatitisC3",
    headerName: "HCV (RRB) ",
    type: "singleSelect",
    width: 140,
    editable: true,
    valueOptions: ["Positivo", "Negativo"],
  },
  {
    field: "fecha_hepatitisC3",
    headerName: "Fecha HCV RRB",
    type: "date",
    width: 120,
    editable: true,
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
    type: "singleSelect",
    width: 140,
    editable: true,
    valueOptions: ["Positivo", "Negativo"],
  },
  {
    field: "fecha_serologia1",
    headerName: "Fecha VDRL R",
    type: "date",
    width: 120,
    editable: true,
    valueGetter: (params) => new Date(params),
  },
  {
    field: "resultado_serologia2",
    headerName: "VDRL (RR)",
    type: "singleSelect",
    width: 140,
    editable: true,
    valueOptions: ["Positivo", "Negativo"],
  },
  {
    field: "fecha_serologia2",
    headerName: "Fecha VDRL RR",
    type: "date",
    width: 120,
    editable: true,
    valueGetter: (params) => new Date(params),
  },
  {
    field: "resultado_serologia3",
    headerName: "VDRL (RRB)",
    type: "singleSelect",
    width: 140,
    editable: true,
    valueOptions: ["Positivo", "Negativo"],
  },
  {
    field: "fecha_serologia3",
    headerName: "Fecha VDRL RRB",
    type: "date",
    width: 120,
    editable: true,
    valueGetter: (params) => new Date(params),
  },
  {
    field: "resultado_tipage1",
    headerName: "Grupo Sanguíneo",
    width: 180,
    editable: true,
    type: "singleSelect",
    valueOptions: ["A", "B", "AB", "O"],

  },
  {
    field: "fecha_tipage1",
    headerName: "Fecha Grupo R",
    type: "date",
    width: 120,
    editable: true,
    valueGetter: (params) => new Date(params),
  },
  {
    field: "resultado_tipage2",
    headerName: "Grupo Sanguíneo R",
    width: 180,
    editable: true,
    type: "singleSelect",
    valueOptions: ["A", "B", "AB", "O"],

  },
  {
    field: "fecha_tipage2",
    headerName: "Fecha Grupo RR",
    type: "date",
    width: 120,
    editable: true,
    valueGetter: (params) => new Date(params),
  },
  {
    field: "resultado_rh1",
    headerName: "Rh",
    type: "singleSelect",
    width: 120,
    editable: true,
    valueOptions: ["+", "-"],
  },
  {
    field: "fecha_rh1",
    headerName: "Fecha Rh R",
    type: "date",
    width: 120,
    editable: true,
    valueGetter: (params) => new Date(params),
  },
  {
    field: "resultado_rh2",
    headerName: "Rh R",
    type: "singleSelect",
    width: 120,
    editable: true,
    valueOptions: ["+", "-"],
  },
  {
    field: "fecha_rh2",
    headerName: "Fecha Rh RR",
    type: "date",
    width: 120,
    editable: true,
    valueGetter: (params) => new Date(params),
  },
  {
    field: "resultado_contratipaje1",
    headerName: "Contratipaje",
    type: "singleSelect",
    width: 140,
    editable: true,
    valueOptions: ["A", "B", "AB", "O"],
  },
  {
    field: "fecha_contratipaje1",
    headerName: "Fecha Contratipaje R",
    type: "date",
    width: 120,
    editable: true,
    valueGetter: (params) => new Date(params),
  },
  {
    field: "resultado_contratipaje2",
    headerName: "Contratipaje R",
    type: "singleSelect",
    width: 140,
    editable: true,
    valueOptions: ["A", "B", "AB", "O"],
  },
  {
    field: "fecha_contratipaje2",
    headerName: "Fecha Contratipaje RR",
    type: "date",
    width: 120,
    editable: true,
    valueGetter: (params) => new Date(params),
  },

  {
    field: "resultado_DU1",
    headerName: "DU (R)",
    type: "singleSelect",
    width: 140,
    editable: true,
    valueOptions: ["Positivo", "Negativo"],
  },
  {
    field: "fecha_DU1",
    headerName: "Fecha DU R",
    type: "date",
    width: 120,
    editable: true,
    valueGetter: (params) => new Date(params),
  },
  {
    field: "resultado_DU2",
    headerName: "DU (RR)",
    type: "singleSelect",
    width: 140,
    editable: true,
    valueOptions: ["Positivo", "Negativo"],
  },
  {
    field: "fecha_DU2",
    headerName: "Fecha DU RR",
    type: "date",
    width: 120,
    editable: true,
    valueGetter: (params) => new Date(params),
  },

  {
    field: "resultado_DU3",
    headerName: "DU (RRB)",
    type: "singleSelect",
    width: 140,
    editable: true,
    valueOptions: ["Positivo", "Negativo"],
  },
  {
    field: "fecha_DU3",
    headerName: "Fecha DU RRB",
    type: "date",
    width: 120,
    editable: true,
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
    editable: true,
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
    field: "resultado_hematocrito",
    headerName: "Hematocrito",
    width: 150,
    editable: true,
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
    field: "resultado_eritro",
    headerName: "Eritro",
    width: 150,
    editable: true,
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
    field: "resultado_TGP",
    headerName: "TGP",
    width: 150,
    editable: true,
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
    field: "resultado_proteinas_totales",
    headerName: "Proteínas Totales",
    width: 150,
    editable: true,
  },
  {
    field: "fecha_proteinas_totales",
    headerName: "Fecha PT",
    type: "date",
    width: 120,
    editable: true,
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
    editable: true,
  },
  {
    field: "fecha_hemoglobina1",
    headerName: "Fecha Hb R",
    type: "date",
    width: 120,
    editable: true,
    valueGetter: (params) => new Date(params),
  },
  {
    field: "resultado_hematocrito1",
    headerName: "Hematocrito R",
    width: 150,
    editable: true,
  },
  {
    field: "fecha_hematocrito1",
    headerName: "Fecha Hto R",
    type: "date",
    width: 120,
    editable: true,
    valueGetter: (params) => new Date(params),
  },
  {
    field: "resultado_eritro1",
    headerName: "Eritro R",
    width: 150,
    editable: true,
  },
  {
    field: "fecha_eritro1",
    headerName: "Fecha Eritro R",
    type: "date",
    width: 120,
    editable: true,
    valueGetter: (params) => new Date(params),
  },
  {
    field: "resultado_TGP1",
    headerName: "TGP R",
    width: 150,
    editable: true,
  },
  {
    field: "fecha_TGP1",
    headerName: "Fecha TGP R",
    type: "date",
    width: 120,
    editable: true,
    valueGetter: (params) => new Date(params),
  },
  {
    field: "resultado_proteinas_totales1",
    headerName: "Proteínas Totales R",
    width: 150,
    editable: true,
  },
  {
    field: "fecha_proteinas_totales1",
    headerName: "Fecha PT R",
    type: "date",
    width: 120,
    editable: true,
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
  const [selectedRow, setSelectedRow] = useState(null);
  const navigate = useNavigate();

  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    }

  const fetchAnalizarData = async () => {
    try {
      const response = await axios.get(`${API_URL}/analizadas`);
      const data = response.data;

      setAnalizar(data); // Carga los datos en la tabla analizarColumns
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


  return (
    <>
      <Navbar />
      <Box sx={{ marginTop: "60px", width: "100%" }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontSize: { xs: "2 rem", md: "3rem" }, textAlign: "center", color: "primary.main" }} >
          Laboratorio
        </Typography>

        {/* Acordeón para Analizar */}
        <Accordion expanded={expanded === 'panel1'} onChange={handleAccordionChange('panel1')} sx={{ marginBottom: 1 }}>
          <AccordionSummary
            sx={{ display: "flex", backgroundColor: "primary.dark", alignItems: "center", "& .MuiAccordionSummary-content": { justifyContent: "center" } }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel1-header"
          >
            <Typography variant="h6" sx={{ color: "white" }}>
              Muestras Analizadas
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ height: 400, width: "100%", mb: 4 }}>
              <DataGrid
                rows={analizar}
                columns={analizarColumns}
                processRowUpdate={handleAnalizarRowUpdate}
                onRowClick={handleRowClick}
                initialState={{
                  pagination: { paginationModel: { pageSize: 10 } },
                }}
                pageSizeOptions={[10]}
                editMode="row"
              />
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Acordeón para Resultados de Calidad */}
        <Accordion expanded={expanded === 'panel2'} onChange={handleAccordionChange('panel2')} sx={{ marginBottom: 1 }}>
          <AccordionSummary sx={{ display: "flex", backgroundColor: "primary.dark", alignItems: "center", "& .MuiAccordionSummary-content": { justifyContent: "center" } }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header">
            <Typography variant="h6" sx={{ color: "white" }}>
              Resultados de Calidad
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ height: 400, width: "100%", mb: 4 }}>
              <DataGrid
                rows={calidad}
                columns={calidadColumns}
                processRowUpdate={handleCalidadRowUpdate}
                initialState={{
                  pagination: { paginationModel: { pageSize: 10 } },
                }}
                pageSizeOptions={[10]}
                editMode="row"
              />
            </Box>
          </AccordionDetails>
        </Accordion>


        {/* Acordeón para Reanalizar */}
        <Accordion expanded={expanded === 'panel3'} onChange={handleAccordionChange('panel3')} sx={{ marginBottom: 1 }}>
          <AccordionSummary sx={{ display: "flex", backgroundColor: "primary.dark", alignItems: "center", "& .MuiAccordionSummary-content": { justifyContent: "center" } }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header">
            <Typography variant="h6" sx={{ color: "white" }}>
              Muestras Reanalizadas de Suma
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ height: 400, width: "100%", mb: 4 }}>
              <DataGrid
                rows={REanalizarSuma}
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
          </AccordionDetails>
        </Accordion>
        {/* Acordeón para Resultados de Calidad Repetidos */}
        <Accordion expanded={expanded === 'panel4'} onChange={handleAccordionChange('panel4')} sx={{ marginBottom: 1 }}>
          <AccordionSummary sx={{ display: "flex", backgroundColor: "primary.dark", alignItems: "center", "& .MuiAccordionSummary-content": { justifyContent: "center" } }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4-content"
            id="panel4-header">
            <Typography variant="h6" sx={{ color: "white" }}>
              Muestras Reanalizadas de Calidad
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ height: 400, width: "100%", mb: 4 }}>
              <DataGrid
                rows={calidadRepeticion}
                columns={calidadRepeticionColumns}
                processRowUpdate={handleReanalizarCalidadRowUpdate}
                initialState={{
                  pagination: { paginationModel: { pageSize: 10 } },
                }}
                pageSizeOptions={[10]}
                editMode="row"
              />
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Acordeón para Resultados de Inmuno */}
        <Accordion expanded={expanded === 'panel5'} onChange={handleAccordionChange('panel5')}>
          <AccordionSummary sx={{ display: "flex", backgroundColor: "primary.dark", alignItems: "center", "& .MuiAccordionSummary-content": { justifyContent: "center" } }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel5-content"
            id="panel5-header">
            <Typography variant="h6" sx={{ color: "white" }}>
              Muestras Reanalizadas de Inmunohematología
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ height: 400, width: "100%", mb: 4 }}>
              <DataGrid
                rows={REanalizarInmuno}
                columns={ReanalizarColumnsInmuno}
                processRowUpdate={handleReanalizarInmunoRowUpdate}
                initialState={{
                  pagination: { paginationModel: { pageSize: 10 } },
                }}
                pageSizeOptions={[10]}
                editMode="row"
              />
            </Box>
          </AccordionDetails>
        </Accordion>


      </Box>
    </>
  );
}





