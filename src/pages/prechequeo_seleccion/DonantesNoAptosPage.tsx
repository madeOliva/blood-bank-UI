import { Box, Container, Typography } from "@mui/material";
import { GridColDef, DataGrid } from "@mui/x-data-grid";
import Navbar from "../../components/navbar/Navbar";
import api from "../../api/client";
import { useEffect, useState } from "react";
import axios from "axios";


const columns: GridColDef[] = [
  { field: "id", headerName: "No", width: 90 },
  { field: "ci", headerName: "CI", width: 200, editable: false },
  
  {
    field: "nombre",
    headerName: "Nombre",
    width: 150,
    editable: false,
  },

  {
    field: "primer_apellido",
    headerName: "Primer Apellido",
    width: 150,
    editable: false,
  },

  {
    field: "segundo_apellido",
    headerName: "Segundo Apellido",
    width: 150,
    editable: false,
  },
  {
    field: "observacion_interrogatorio",
    headerName: "Observación",
    width: 200,
    editable: false,
  },
];

export default function DonantesNoAptos() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRows = async () => {
      try {
        const res = await axios.get("http://localhost:3000/registro-donacion/observacion");
        // Mapea los datos para la tabla
        const mappedRows = res.data.map((reg: any, idx: number) => ({
          id: idx + 1,
          ci: reg.ci,
          nombre: reg.nombre,
          primer_apellido: reg.primer_apellido,
          segundo_apellido: reg.segundo_apellido,
          observacion_interrogatorio: reg.observacion_interrogatorio || "No Observación",
        }));
        setRows(mappedRows);
      } catch (error) {
        console.error("Error al cargar los registros:", error);
      }
    };
    fetchRows();
  }, []);

  return (
    <>
      <Navbar />
      <Typography
        variant="h4"
        component="h5"
        mt={8}
        sx={{
          fontSize: { xs: "2rem", md: "3rem" },
          textAlign: "center",
          backgroundColor: "#00796B",
          color: "white",
          marginTop: 10,
        }}
      >
        Listado de Donantes no Aptos
      </Typography>
      <Container>
        <Box sx={{ marginTop: "20px", marginBlockEnd: 1, marginLeft: 7 }}>
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <DataGrid
            sx={{
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
            loading={loading}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
          />
        </Box>
      </Container>
    </>
  );
}
