import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Alert, Button, Snackbar } from '@mui/material';
import { ReactElement, useEffect, useState } from 'react';
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
}

// Componente para la columna "Acciones"
const AccionesCell = (params: GridRenderCellParams<ComponenteTransfundir> & { fetchRows: () => void }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

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
            params.fetchRows();
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

export default function DataGridServicio() {
    const [rows, setRows] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchRows = () => {
        setLoading(true);
        axios.get('http://localhost:3000/stockdelbancodelhas/paciente/Servicio')
            .then(response => {
                const rowsWithId = response.data.map((item: any, idx: number) => ({
                    id: idx + 1, // id necesario para DataGrid
                    ...item,
                }));
                setRows(rowsWithId);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error al cargar datos:', error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchRows();
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
        {
            field: "Acciones",
            headerName: "Acciones",
            width: 115,
            renderCell: (params) => <AccionesCell {...params} fetchRows={fetchRows} />,
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
                disableRowSelectionOnClick
            />
        </Box>
    );
}