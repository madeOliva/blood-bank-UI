import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Container,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

interface RowData {
  id: string;
  fechaHora: string;
  areaSalud: string;
  consejoPopular: string;
  consultoriosAfectados: string[] | string;
  lugarDonacion: string;
  compromiso: string;
  responsableSalud: string;
  cdr: string;
}

const API_URL = "http://localhost:3000/plan-trabajo";

export default function ResumenPlanDonaciones() {
  const [rows, setRows] = useState<RowData[]>([]);

  useEffect(() => {
    axios.get(API_URL)
      .then(res => {
        const data = res.data.map((item: any) => ({
          id: item._id || item.id,
          fechaHora: item.fecha || item.fechaHora,
          areaSalud: item.areasalud || item.areaSalud,
          consejoPopular: item.consejopopular || item.consejoPopular,
          consultoriosAfectados: item.consultoriosafectados || item.consultoriosAfectados,
          lugarDonacion: item.lugarDonacion,
          compromiso: item.compromiso,
          responsableSalud: item.responsableDeSalud || item.responsableSalud,
          cdr: item.cdr,
        }));
        setRows(data);
      })
      .catch(() => setRows([]));
  }, []);

  // Agrupar datos por mes
  const groupedData = rows.reduce((acc, row) => {
    const month = dayjs(row.fechaHora).format("MMMM YYYY");
    if (!acc[month]) acc[month] = [];
    acc[month].push(row);
    return acc;
  }, {} as Record<string, RowData[]>);

  // Columnas con formato de fecha y consultorios afectados
  const columns: GridColDef[] = [
    {
      field: "fechaHora",
      headerName: "Fecha y Hora",
      width: 160,
      renderCell: (params) =>
        params.value ? dayjs(params.value).format("DD/MM/YYYY 08:00 A") : "",
    },
    { field: "areaSalud", headerName: "Área de salud", width: 150 },
    { field: "consejoPopular", headerName: "Consejo popular", width: 150 },
    {
      field: "consultoriosAfectados",
      headerName: "Consultorios afectados",
      width: 180,
      renderCell: (params) => {
        if (Array.isArray(params.value)) {
          return params.value.join(", ");
        }
        return params.value || "";
      }
    },
    { field: "lugarDonacion", headerName: "Lugar donación", width: 160 },
    { field: "compromiso", headerName: "Compromiso", width: 140 },
    { field: "responsableSalud", headerName: "Responsable de salud", width: 170 },
    { field: "cdr", headerName: "CDR", width: 100 },
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
        Planes Donaciones Mensual
      </Typography>
      <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
        {Object.entries(groupedData).map(([month, entries]) => (
          <Accordion key={month} sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {month}
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Box sx={{ height: 450, width: "100%" }}>
                <DataGrid
                  rows={entries}
                  columns={columns}
                  pageSizeOptions={[5, 10]}
                  initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
                  disableRowSelectionOnClick
                  hideFooterSelectedRowCount
                />
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}

        {rows.length === 0 && (
          <Typography variant="body1" textAlign="center" sx={{ mt: 3 }}>
            No hay datos para mostrar.
          </Typography>
        )}
      </Container>
    </>
  );
}