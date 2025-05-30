import { Box, Container, Typography } from "@mui/material";
import { GridColDef, DataGrid } from "@mui/x-data-grid";
import Navbar from "../../components/navbar/Navbar";
import api from "../../api/client";
import { useEffect, useState } from "react";

type DonanteNoApto = {
  ci: string;
  observacion: string;
};

type DatosPersonales = {
  ci: string;
  "nombres y apellidos": string;
};

type RowData = {
  id: number;
  ci: string;
  "nombres y apellidos": string;
  observacion: string;
};

const columns: GridColDef<RowData>[] = [
  { field: "ci", headerName: "CI", width: 200, editable: false },
  {
    field: "nombres y apellidos",
    headerName: "Nombres y Apellidos",
    width: 300,
    editable: false,
  },
  {
    field: "observacion",
    headerName: "Observación",
    width: 200,
    editable: false,
  },
];

export default function DonantesNoAptos() {
  const [rows, setRows] = useState<RowData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    api
      .get<DonanteNoApto[]>("/registrodonacion/observacion")
      .then(async (response) => {
        // 1. Obtener los datos personales para cada CI
        const rowsWithNames = await Promise.all(
          response.data.map(async (donante, index) => {
            try {
              const { data: datosPersonales } = await api.get<DatosPersonales>(
                `/persona/nombrecompleto/${donante.ci}`
              );
              return {
                id: index + 1,
                ci: donante.ci,
                "nombres y apellidos": datosPersonales["nombres y apellidos"],
                observacion: donante.observacion,
              };
            } catch (err) {
              // Si falla, ponemos un nombre por defecto o lo dejamos vacío
              return {
                id: index + 1,
                ci: donante.ci,
                "nombres y apellidos": "No disponible",
                observacion: donante.observacion,
              };
            }
          })
        );
        setRows(rowsWithNames);
      })
      .catch((err) => {
        setError("No se pudieron cargar los donantes no aptos.");
        console.error(err);
      })
      .finally(() => setLoading(false));
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
