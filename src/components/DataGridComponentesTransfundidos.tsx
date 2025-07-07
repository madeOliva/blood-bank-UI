/*import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { ReactElement, useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Button, Snackbar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentIcon from "@mui/icons-material/Assignment";
import { ModalPruebasPreTransfusionalesGr, ModalPruebasPreTransfusionalesPCP } from './ModalPruebasPreTGR'; // Ajusta la ruta

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
const AccionesCell = (params: GridRenderCellParams<ComponenteTransfundir> & {
    onOpenModal: (tipoComponente: string, codigoBolsa: string) => void;
    refreshRows: () => void;
}) => {

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleSnackbarClose = () => setSnackbarOpen(false);

    const handleAceptar = async () => {
        setLoading(true);
        setError(null);

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
            await axios.post('http://localhost:3000/stockdelbancodelhas', dataToSend);
            // Eliminar el registro original del stock
            await axios.delete(
                `http://localhost:3000/componentesatransfundir/${params.row.codigo_bolsa}`
            );
            // Eliminar pruebas pretransfusionales según el tipo de componente
            if (params.row.tipo_componente === 'Globulos Rojos') {
                await axios.delete(
                    `http://localhost:3000/pruebaspretransfusionalesgr/${params.row.codigo_bolsa}`
                );
            } else {
                await axios.delete(
                    `http://localhost:3000/pruebaspretransfusionalespcp/${params.row.codigo_bolsa}`
                );
            }
            setSuccess(true);
            setSnackbarOpen(true);
            params.refreshRows();
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
                endIcon={<DeleteIcon />}
                onClick={handleAceptar}
                disabled={loading}
            >
                {loading ? 'Enviando...' : 'Devolver al Stock'}
            </Button>
            <Button
                variant="contained"
                size="small"
                endIcon={<AssignmentIcon />}
                sx={{ ml: 1 }}
                onClick={() => params.onOpenModal(params.row.tipo_componente, params.row.codigo_bolsa)}
                disabled={loading}
            >
                Pruebas Pre Transfusionales
            </Button>
            <Button
                variant="contained"
                size="small"
                color="error"
                endIcon={<SendIcon />}
                sx={{ ml: 1 }}
            >
                Transfundir
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

export default function DataGridComponentesTransfundidos() {
    const [rows, setRows] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState<'GR' | 'PCP' | ''>('');
    const [codigoBolsa, setCodigoBolsa] = useState('');

    const fetchPruebasPreTransfusionales = async (tipo_componente: string, codigo_bolsa: string) => {
        let url = '';
        if (tipo_componente === 'Globulos Rojos') {
            url = `http://localhost:3000/pruebaspretransfusionalesgr/${codigo_bolsa}`;
        } else {
            url = `http://localhost:3000/pruebaspretransfusionalespcp/${codigo_bolsa}`;
        }
        const response = await axios.get(url);
        return response.data;
    };

    const refreshRows = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3000/componentesatransfundir');
            const baseRows = response.data;

            // Obtener datos de pruebas pretransfusionales para cada fila
            const rowsWithPruebas = await Promise.all(
                baseRows.map(async (item: any, index: number) => {
                    let pruebas = {};
                    try {
                        pruebas = await fetchPruebasPreTransfusionales(item.tipo_componente, item.codigo_bolsa);
                    } catch (e) {
                        pruebas = {
                            pruebaregrupo: '',
                            pruebaprefactor: '',
                            pruebaprehemolisis: '',
                            pruebaprecruzadamenor: '',
                            pruebaprecruzadamayor: ''
                        };
                    }
                    return {
                        id: index + 1,
                        ...item,
                        ...pruebas
                    };
                })
            );
            setRows(rowsWithPruebas);
        } catch (error) {
            // Manejo de error
        }
        setLoading(false);
    };

    useEffect(() => {
        refreshRows();
    }, []);

    const handleOpenModal = (tipoComponente: string, codigoBolsa: string) => {
        if (tipoComponente === 'Globulos Rojos') {
            setModalType('GR');
        } else {
            setModalType('PCP');
        }
        setCodigoBolsa(codigoBolsa);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setModalType('');
        setCodigoBolsa('');
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Id', width: 90 }, // id incremental
        { field: 'codigo_bolsa', headerName: 'Código de Bolsa', width: 150 },
        { field: 'tipo_paciente', headerName: 'Tipo Paciente', width: 150 },
        { field: 'tipo_componente', headerName: 'Tipo Componente', width: 180 },
        { field: 'tipo_componente_habitual', headerName: 'Tipo Componente Habitual', width: 200 },
        { field: 'fecha_extraccion', headerName: 'Fecha de Extracción', width: 180, },
        { field: 'fecha_vencimiento', headerName: 'Fecha de Vencimiento', width: 180, },
        { field: 'grupo', headerName: 'Grupo', width: 100 },
        { field: 'factor', headerName: 'Factor', width: 100 },
        { field: 'volumen_inicial', headerName: 'Volumen Inicial', width: 150, type: 'number' },
        { field: 'volumen_final', headerName: 'Volumen Final', width: 150, type: 'number' },
        { field: 'estado', headerName: 'Estado', width: 130 },
        { field: 'pruebaregrupo', headerName: 'PPT de Grupo', width: 130 },
        { field: 'pruebaprefactor', headerName: 'PPT de Factor', width: 130 },
        { field: 'pruebaprehemolisis', headerName: 'PPT de Hemolisis', width: 150 },
        { field: 'pruebaprecruzadamenor', headerName: 'PPT de Cruzada Menor', width: 170 },
        { field: 'pruebaprecruzadamayor', headerName: 'PPT de Cruzada Mayor', width: 170 },
        {
            field: "Acciones",
            headerName: "Acciones",
            width: 530,
            renderCell: (params: GridRenderCellParams) => (
                <AccionesCell
                    {...params}
                    onOpenModal={handleOpenModal}
                    refreshRows={refreshRows}
                />
            ),
            sortable: false,
            filterable: false,
            editable: false,
        },
    ];

    return (
        <>
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    loading={loading}
                    pageSizeOptions={[5]}
                    initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
                    disableRowSelectionOnClick
                />
            </Box>

            {modalType === 'GR' && (
                <ModalPruebasPreTransfusionalesGr open={modalOpen} onClose={handleCloseModal} codigoBolsa={codigoBolsa} />
            )}
            {modalType === 'PCP' && (
                <ModalPruebasPreTransfusionalesPCP open={modalOpen} onClose={handleCloseModal} codigoBolsa={codigoBolsa} />
            )}
        </>
    );
}*/