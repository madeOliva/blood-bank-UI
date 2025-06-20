import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Navbar from "../../components/navbar/Navbar";
import {
  Box,
  Container,
  FormControl,
  SelectChangeEvent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from "axios";

export default function PruebasReanalizar() {
  const navigate = useNavigate();

  const [rows, setRows] = useState<any[]>([]);
  const [entidad, setEntidad] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  // Estado para el modal
  const [openModal, setOpenModal] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState<number | string | null>(null);

  // Estado para el acordeón (selección)
  const [motivoDesecho, setMotivoDesecho] = useState("");

  // Cargar todos los datos desde el backend (sin filtro)
 useEffect(() => {
  axios.get('http://localhost:3000/registro-donacion/donaciones-diarias')
    .then(response => {
      console.log(response.data);
      setRows(
        response.data
          .filter((item: any) => {
            // Si estado es string
            if (typeof item.estado === "string") {
              return item.estado.toLowerCase() === "analizada";
            }
            // Si estado es objeto con nombre
            if (item.estado && item.estado.nombre) {
              return item.estado.nombre.toLowerCase() === "analizada";
            }
            return false;
          })
          .map((item: any, idx: number) => ({
            id: item.id || item._id || idx,
            no: item.no ?? idx + 1,
            hc: item.hc ?? "",
            grupo: item.grupo ?? "",
            factor: item.factor ?? "",
            volumen: item.volumen ?? "",
            hiv: item.hiv ?? "",
            hbsag: item.hbsag ?? "",
            hcv: item.hcv ?? "",
            bdrl: item.bdrl ?? "",
            contratipaje: item.contratipaje ?? "",
            du: item.du ?? "",
          }))
      );
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}, []);

  const handleChangeE = (event: SelectChangeEvent) => {
    setEntidad(event.target.value as string);
  };

  const handleOpenModal = (id: number | string) => {
    setSelectedRowId(id);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRowId(null);
    setMotivoDesecho("");
  };

  // Desechar: actualiza el estado en la base de datos
 const handleConfirmDesechar = async () => {
  if (!selectedRowId) return;
  try {
    await axios.put(`http://localhost:3000/registro-donacion/updatee/${selectedRowId}`, {
      motivo_desecho: motivoDesecho,
      estado: "desechada",
    });
    // Recarga los datos y filtra solo los de estado "analizada"
    const response = await axios.get('http://localhost:3000/registro-donacion/donaciones-diarias');
    setRows(
      response.data
        .filter((item: any) => {
          if (typeof item.estado === "string") {
            return item.estado.toLowerCase() === "analizada";
          }
          if (item.estado && item.estado.nombre) {
            return item.estado.nombre.toLowerCase() === "analizada";
          }
          return false;
        })
        .map((item: any, idx: number) => ({
          id: item.id || item._id || idx,
          no: item.no ?? idx + 1,
          hc: item.hc ?? "",
          grupo: item.grupo ?? "",
          factor: item.factor ?? "",
          volumen: item.volumen ?? "",
          hiv: item.hiv ?? "",
          hbsag: item.hbsag ?? "",
          hcv: item.hcv ?? "",
          bdrl: item.bdrl ?? "",
          contratipaje: item.contratipaje ?? "",
          du: item.du ?? "",
        }))
    );
  } catch (error) {
    alert("Error al desechar la muestra.");
  }
  setOpenModal(false);
  setSelectedRowId(null);
  setMotivoDesecho("");
};

  // Enviar: actualiza el estado en la base de datos
 const handleEnviarIndividual = async (id: string | number) => {
  try {
    await axios.put(`http://localhost:3000/registro-donacion/updatee/${id}`, {
      estado: "aceptada",
    });
    // Recarga los datos y filtra solo los de estado "analizada"
    const response = await axios.get('http://localhost:3000/registro-donacion/donaciones-diarias');
    setRows(
      response.data
        .filter((item: any) => {
          if (typeof item.estado === "string") {
            return item.estado.toLowerCase() === "analizada";
          }
          if (item.estado && item.estado.nombre) {
            return item.estado.nombre.toLowerCase() === "analizada";
          }
          return false;
        })
        .map((item: any, idx: number) => ({
          id: item.id || item._id || idx,
          no: item.no ?? idx + 1,
          hc: item.hc ?? "",
          grupo: item.grupo ?? "",
          factor: item.factor ?? "",
          volumen: item.volumen ?? "",
          hiv: item.hiv ?? "",
          hbsag: item.hbsag ?? "",
          hcv: item.hcv ?? "",
          bdrl: item.bdrl ?? "",
          contratipaje: item.contratipaje ?? "",
          du: item.du ?? "",
        }))
    );
  } catch (error) {
    alert("Error al enviar la muestra.");
  }
};

  // Columnas con los botones y solo los datos solicitados
  const columns: GridColDef<any>[] = [
    { field: "no", headerName: "NO", width: 70 },
    { field: "hc", headerName: "Historia Clínica", width: 130 },
    { field: "grupo", headerName: "Grupo", width: 70 },
    { field: "factor", headerName: "Factor", width: 90 },
    { field: "volumen", headerName: "Volumen", width: 90 },
    { field: "hiv", headerName: "HIV", width: 90 },
    { field: "hbsag", headerName: "HBsAg", width: 90 },
    { field: "hcv", headerName: "HCV", width: 90 },
    { field: "bdrl", headerName: "BDRL", width: 90 },
    { field: "contratipaje", headerName: "Contratipaje", width: 120 },
    { field: "du", headerName: "DU", width: 90 },
    {
      field: "accion",
      headerName: "",
      width: 220,
      editable: false,
      renderCell: (params) => (
        <>
          <Button
            onClick={() => handleOpenModal(params.id)}
            color="error"
            variant="contained"
            sx={{ mr: 1 }}
          >
            Desechar
          </Button>
          <Button
            onClick={() => handleEnviarIndividual(params.id)}
            color="success"
            variant="contained"
          >
            Enviar
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Navbar />
      <Typography
        variant="h4"
        component="h5"
        sx={{
          fontSize: { xs: "2rem", md: "3rem" },
          backgroundColor: "primary.dark",
          color: "white",
          textAlign: "center",
          marginBlock: 5,
          mt: 8,
        }}
      >
        Muestras a Reanalizar
      </Typography>
      <Container maxWidth={false}>
        <Box sx={{ mb: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
          <DataGrid
            sx={{
              height: 450,
              "& .MuiDataGrid-columnHeaderTitle": {
                fontFamily: '"Open Sans"',
                fontWeight: 600,
              },
              "& .MuiDataGrid-cellContent": {
                fontFamily: '"Open Sans"',
                color: "#000",
              },
            }}
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}
          />
        </Box>
      </Container>

      {/* Modal de confirmación con Accordion */}
      <Dialog
  open={openModal}
  onClose={handleCloseModal}
>
  <DialogTitle>Desechar muestra</DialogTitle>
  <DialogContent>
    <DialogContentText>
      ¿Estás seguro que deseas desechar esta muestra?
    </DialogContentText>
    <Accordion sx={{ mt: 2 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Selecciona el motivo de desecho de la muestra</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormControl component="fieldset">
          <RadioGroup
            value={motivoDesecho}
            onChange={e => setMotivoDesecho(e.target.value)}
          >
            <FormControlLabel value="Lipemia" control={<Radio />} label="Lipemia" />
            <FormControlLabel value="Hemolisis" control={<Radio />} label="Hemolisis" />
            <FormControlLabel value="Return" control={<Radio />} label="Return" />
            <FormControlLabel value="Bajo Volumen" control={<Radio />} label="Bajo Volumen" />
            <FormControlLabel value="Sobre Volumen" control={<Radio />} label="Sobre Volumen" />
            <FormControlLabel value="Lipotimia" control={<Radio />} label="Lipotimia" />
            <FormControlLabel value="Otros" control={<Radio />} label="Otro" />
          </RadioGroup>
        </FormControl>
      </AccordionDetails>
    </Accordion>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseModal} color="inherit">
      Cancelar
    </Button>
    <Button
      onClick={handleConfirmDesechar}
      color="error"
      variant="contained"
      disabled={!motivoDesecho}
    >
      Desechar
    </Button>
  </DialogActions>
</Dialog>
    </>
  );
}