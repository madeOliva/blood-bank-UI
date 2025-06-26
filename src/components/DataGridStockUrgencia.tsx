import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Alert, Button, Container, Modal, Snackbar, Typography } from '@mui/material';
import { ReactElement, useEffect, useState } from 'react';
import AssignmentIcon from "@mui/icons-material/Assignment";
import DataGridSol from './DataGridSolicitud';
import SendIcon from '@mui/icons-material/Send';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import axios from 'axios';
import CheckIcon from '@mui/icons-material/Check';

// Interfaz con los campos de tu esquema
interface ComponenteTransfundir {
    codigo_bolsa: string;
    tipo_paciente: string;
    tipo_componente: string;
    tipo_componente_habitual: string;
    fecha_extraccion: Date | string;
    fecha_vencimiento: Date | string;
    grupo: string;
    factor: string;
    volumen_inicial: number;
    volumen_final: number;
    estado: string;
}

// Componente para la columna "Acciones"
const AccionesCell = (params: GridRenderCellParams<ComponenteTransfundir>) => {
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const handleSnackbarClose = () => setSnackbarOpen(false);

    const handleAceptar = async () => {
        setLoading(true);
        setError(null);

        // Extraemos solo los campos que corresponden al schema
        const dataToSend: ComponenteTransfundir = {
            codigo_bolsa: params.row.codigo_bolsa,
            tipo_paciente: params.row.tipo_paciente,
            tipo_componente: params.row.tipo_componente,
            tipo_componente_habitual: params.row.tipo_componente_habitual,
            fecha_extraccion: params.row.fecha_extraccion,
            fecha_vencimiento: params.row.fecha_vencimiento,
            grupo: params.row.grupo,
            factor: params.row.factor,
            volumen_inicial: params.row.volumen_inicial,
            volumen_final: params.row.volumen_final,
            estado: params.row.estado,
        };

        try {
            const response = await axios.post('http://localhost:3000/componentesatransfundir', dataToSend);
            // 2. Eliminar el registro original del stock
            const deleteResponse = await axios.delete(
                `http://localhost:3000/stockdelbancodelhas/${params.row.codigo_bolsa}`
            );
            console.log('Registro eliminado:', deleteResponse.data);
            setSuccess(true);
            setSnackbarOpen(true);
            console.log('Respuesta del servidor:', response.data);
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || 'Error desconocido');
            setSnackbarOpen(true);
        } finally {
            setLoading(false);
        }
    };

    const alertContent: ReactElement | undefined = success && !error ? (
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            Datos enviados correctamente
        </Alert>
    ) : error ? (
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
            {error}
        </Alert>
    ) : undefined;

    return (
        <>
            <Button
                variant="contained"
                size="small"
                sx={{ mt: "10px" }}
                endIcon={<CheckIcon sx={{ marginLeft: 0 }} />}
                onClick={handleAceptar}
                disabled={loading}
            >
                {loading ? 'Enviando...' : 'Aceptar'}
            </Button>

            <Button
                variant="contained"
                size="small"
                color="error"
                endIcon={<AssignmentIcon sx={{ marginLeft: -1 }} />}
                sx={{ ml: 1, mt: "10px" }}
                onClick={handleOpenModal}
            >
                Solicitar
            </Button>

            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Container sx={{
                    width: "80%",
                    height: "82%",
                    display: 'flex',
                    background: "white",
                    mt: "65px",
                    borderRadius: "10px",
                    flexDirection: 'column',
                    p: 2,
                }}>
                    <Typography
                        id="modal-title"
                        padding={1}
                        sx={{
                            width: "100%",
                            fontSize: "20px",
                            textAlign: "center",
                            bgcolor: "primary.dark",
                            color: "white",
                            borderRadius: 1,
                            mb: 2,
                        }}
                    >
                        Solicitud de Componentes
                    </Typography>

                    <Box sx={{ flexGrow: 1, mb: 2 }}>
                        <DataGridSol />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="contained"
                            size="small"
                            endIcon={<SendIcon sx={{ marginLeft: 0 }} />}
                            sx={{ mr: 1 }}
                            onClick={() => alert('Funcionalidad de enviar solicitud pendiente')}
                        >
                            Enviar
                        </Button>

                        <Button
                            variant="contained"
                            size="small"
                            color='error'
                            endIcon={<DisabledByDefaultRoundedIcon sx={{ marginLeft: 0, fontSize: "large" }} />}
                            onClick={handleCloseModal}
                        >
                            Cancelar
                        </Button>
                    </Box>
                </Container>
            </Modal>

            <Snackbar
                open={snackbarOpen && alertContent !== undefined}
                autoHideDuration={4000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                {alertContent}
            </Snackbar>
        </>
    );
};

export default function DataGridUrgencia() {
    const [rows, setRows] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:3000/stockdelbancodelhas/paciente/Urgencia')
            .then(response => {
                const rowsWithId = response.data.map((item: any, index: number) => ({
                    id: index + 1,
                    ...item,
                }));
                setRows(rowsWithId);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
            });
    }, []);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Id', width: 90 },
        { field: 'codigo_bolsa', headerName: 'Código de Bolsa', width: 150 },
        { field: 'tipo_paciente', headerName: 'Tipo Paciente', width: 150 },
        { field: 'tipo_componente', headerName: 'Tipo Componente', width: 180 },
        { field: 'tipo_componente_habitual', headerName: 'Tipo Componente Habitual', width: 200 },
        { field: 'fecha_extraccion', headerName: 'Fecha de Extracción', width: 180 },
        { field: 'fecha_vencimiento', headerName: 'Fecha de Vencimiento', width: 180 },
        { field: 'grupo', headerName: 'Grupo', width: 100 },
        { field: 'factor', headerName: 'Factor', width: 100 },
        { field: 'volumen_inicial', headerName: 'Volumen Inicial', width: 150, type: 'number' },
        { field: 'volumen_final', headerName: 'Volumen Final', width: 150, type: 'number' },
        { field: 'estado', headerName: 'Estado', width: 130 },
        {
            field: "Acciones",
            headerName: "Acciones",
            width: 220,
            renderCell: (params) => <AccionesCell {...params} />,
            sortable: false,
            filterable: false,
            editable: false,
        },
    ];

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
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
}