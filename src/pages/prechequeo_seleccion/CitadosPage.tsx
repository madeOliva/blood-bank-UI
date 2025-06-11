import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Navbar from "../../components/navbar/Navbar";
import { Box, Button, Container, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';

const columns: GridColDef<any>[] = [
    { field: "ci", headerName: "CI", width: 150 },
    { field: "nombre", headerName: "Nombre", width: 150 },
    { field: "primer_apellido", headerName: "Primer Apellido", width: 150 },
    { field: "segundo_apellido", headerName: "Segundo Apellido", width: 150 },
    { field: "componente", headerName: "Donante de", width: 100 },
    { field: "fechaD", headerName: "Fecha de Donación", width: 150 },
    {
      field: "actions",
      headerName: "Citar",
      width: 100,
      renderCell: (params) => (
        <Button
        variant="outlined"
        size="small"
        color="error"
        endIcon={<EditIcon sx={{ ml: -1 }} />}
      >
        Citar
      </Button>
      ),
    },

];

export default function CitadosPS() {
    const [rows, setRows] = useState<any[]>([]);

    useEffect(() => {
        const fetchDonantes = async () => {
            try {
                const res = await axios.get("http://localhost:3000/registro-donacion/pueden-donar");
                // Ajusta el mapeo según la estructura de tu backend
                const mappedRows = res.data.map((reg: any, idx: number) => ({
                    id: reg._id || idx + 1,
                    ci: reg.historiaClinica?.ci || "",
                    nombre: reg.historiaClinica?.nombre || "",
                    primer_apellido: reg.historiaClinica?.primer_apellido || "",
                    segundo_apellido: reg.historiaClinica?.segundo_apellido || "",
                    "donante de": reg.historiaClinica?.donante_de || "",
                    fechaD: reg.fechaD || "",
                }));
                setRows(mappedRows);
            } catch (error) {
                console.error("Error al cargar donantes:", error);
            }
        };
        fetchDonantes();
    }, []);

    return (
        <>
            <Navbar />
            <Typography
                variant="h4"
                component="h5"
                padding={1}
                mt={8}
                sx={{ width: "100%", fontSize: { xs: "1rem", md: "2rem" }, textAlign: "center", bgcolor: "primary.dark", color: "white" }}
            >
                Listado de Donantes a Citar.
            </Typography>
            <Container>
                <Box sx={{ marginTop: "20px", marginBlockEnd: 1, marginLeft: 7 }}>
                    <DataGrid
                        sx={{
                            height: 400,
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
                                    pageSize: 5,
                                },
                            },
                        }}
                        pageSizeOptions={[]}
                        getRowId={(row) => row.id}
                    />
                </Box>
            </Container>
            </>
     );
}
    