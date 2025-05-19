import { Box, Container, Typography } from "@mui/material";
import { GridColDef, DataGrid } from "@mui/x-data-grid";
import Navbar from "../../components/navbar/Navbar";

const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "id", headerName: "No", width: 90 },
    {
        field: "nombre",
        headerName: "Nombre",
        width: 200,
        editable: false,
    },
    {
        field: "causa",
        headerName: "Causa",
        width: 200,
        editable: false,
    },
];

const rows = [
    { id: 1, nombre: "Jon", causa: "Revision medica"},
    
];

export default function DonantesNoAptos() {

    return (
        <>

            <Navbar />
            <Typography
                variant="h4"
                component="h5"
                mt={8}
                sx={{ fontSize: { xs: "2rem", md: "3rem" }, textAlign: "center", backgroundColor: "#00796B", color: 'white', marginTop: 10 }}
            >
                Listado de Donantes no Aptos
            </Typography>
            <Container>

                <Box sx={{ marginTop: "20px", marginBlockEnd: 1, marginLeft: 7 }}>

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
    )
}