/*import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Container, Modal, Typography } from '@mui/material';
import { useState } from 'react';
import AssignmentIcon from "@mui/icons-material/Assignment";
import DataGridSol from './DataGridSolicitud';

const columnstock: GridColDef<(typeof rows)[number]>[] = [
    { field: "id", headerName: "Codigo de Bolsa", width: 150 },
    { field: "tipoC", headerName: "Tipo Componente", width: 180 },
    { field: "tipoCH", headerName: "Tipo Componente Habitual", width: 200 },
    { field: "grupo", headerName: "Grupo", width: 120, editable: false, },
    { field: "factor", headerName: "Factor", width: 150, editable: false, },
    { field: "FechaE", headerName: "Fecha de Extraccion", width: 200, editable: false, },
    { field: "FechaV", headerName: "Fecha de Vencimiento", width: 200, editable: false, },
    { field: "VolI", headerName: "Volumen Inicial", width: 150, editable: false, },
    { field: "VolF", headerName: "Volumen Final", width: 150, editable: false, },
    {
        field: "Acciones",
        headerName: "Acciones",
        width: 120,
        renderCell: (params) => {
            const [open, setOpen] = useState(false);
            const handleOpen = () => setOpen(true);
            const handleClose = () => setOpen(false);
            return (
                <>
                    <Button
                        variant="contained"
                        size="small"
                        color="error"
                        endIcon={<AssignmentIcon sx={{ marginLeft: -1 }} />}
                        sx={{ mr: 1 }}
                        onClick={handleOpen}
                    >
                        Solicitar
                    </Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-title"
                        aria-describedby="modal-description"
                    >
                        <Container sx={{
                            width: "80%", height: "75%", display: 'flex',
                            background: "white",
                            mt: "65px",
                            borderRadius: "10px",
                        }}>
                            <Box sx={{ marginTop: "20px", mb: "20px", width: "100%", height: "45%" }}>
                                <Typography
                                    padding={1}
                                    sx={{
                                        width: "100%",
                                        fontSize: "20px",
                                        textAlign: "center",
                                        bgcolor: "primary.dark",
                                        color: "white",
                                    }}
                                >
                                    Solicitud de Componentes
                                </Typography>
                                <DataGridSol />
                            </Box>
                        </Container>
                    </Modal>
                </>
            );
        },
        sortable: false,
        filterable: false,
        editable: false,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function DataGridDemo() {
    return (
        <Box sx={{ height: 400, width: '100%' }}>
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
                    width: "100%",
                }}
                rows={rows}
                columns={columnstock}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
}*/