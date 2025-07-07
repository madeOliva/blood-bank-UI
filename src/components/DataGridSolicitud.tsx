/*import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AssignmentIcon from "@mui/icons-material/Assignment";
import type { GridColumnVisibilityModel } from '@mui/x-data-grid';

export default function DataGridSol() {
    // Estado para las filas
    const [rows, setRows] = React.useState([
        { id: 1, TipoComponente: '', grupo: '', factor: '', volumen: 0 },
    ]);

    // Función para agregar fila debajo de la fila actual
    const handleAddRowBelow = (rowId: number) => {
        setRows((prevRows) => {
            // Buscar índice de la fila actual
            const index = prevRows.findIndex((row) => row.id === rowId);
            if (index === -1) return prevRows;

            // Calcular nuevo id único
            const newId = prevRows.length > 0 ? Math.max(...prevRows.map(r => r.id)) + 1 : 1;

            // Nueva fila vacía o con valores por defecto
            const newRow = {
                id: newId,
                TipoComponente: '',
                grupo: '',
                factor: '',
                volumen: 0,
            };

            // Insertar la nueva fila justo debajo de la fila actual
            const updatedRows = [...prevRows];
            updatedRows.splice(index + 1, 0, newRow);

            return updatedRows;
        });
    };

    // Función para eliminar la fila con id dado
    const handleDeleteRow = (rowId: number) => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== rowId));
    };

    const [columnVisibilityModel, setColumnVisibilityModel] = React.useState<GridColumnVisibilityModel>({
        id: false, // oculta la columna id inicialmente
    });

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 50 },
        {
            field: "TipoComponente",
            headerName: "Tipo de Componente",
            width: 180,
            editable: true,
            type: "singleSelect",
            valueOptions: [
                'Globulos Rojos',
                'Concentrado de Plaquetas',
                'Plasma Fresco Congelado',
                'Crio Precipitado'
            ],
        },
        {
            field: "grupo",
            headerName: "Grupo",
            width: 150,
            editable: true,
            type: "singleSelect",
            valueOptions: ['A', 'B', 'AB', 'O'],
        },
        {
            field: "factor",
            headerName: "Factor",
            width: 150,
            editable: true,
            type: "singleSelect",
            valueOptions: ['+', '-'],
        },
        {
            field: "volumen",
            headerName: "Volumen",
            width: 150,
            editable: true,
            type: "number",
        },
        {
            field: "acciones",
            headerName: "Acciones",
            width: 280,
            sortable: false,
            filterable: false,
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <>
                        <Button
                            variant="contained"
                            size="small"
                            endIcon={<AssignmentIcon sx={{ marginLeft: -1 }} />}
                            sx={{ mr: 1 }}
                            onClick={() => handleAddRowBelow(params.id as number)}
                        >
                            Adicionar Solicitud
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            color="error"
                            endIcon={<WaterDropIcon sx={{ ml: -1 }} />}
                            onClick={() => handleDeleteRow(params.id as number)}
                        >
                            Eliminar
                        </Button>
                    </>
                );
            },
        },
    ];

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
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
                disableRowSelectionOnClick
                editMode="cell"
                columnVisibilityModel={columnVisibilityModel}
                onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
            />
        </Box>
    );
}*/
