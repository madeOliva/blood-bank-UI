import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PostAddIcon from '@mui/icons-material/PostAdd';
import type { GridColumnVisibilityModel } from '@mui/x-data-grid';

export default function DataGridSol() {
    // Estado para las filas
    const [rows, setRows] = React.useState([
        { id: 1, TipoComponente: '', grupo: '', factor: '', volumen: 0 },
    ]);

    // Función para agregar fila debajo de la ultima fila
    const handleAddRowBelow = () => {
        setRows((prevRows) => {
      // Generar nuevo id único
      const newId = prevRows.length > 0 ? Math.max(...prevRows.map((r) => r.id)) + 1 : 1;

            // Nueva fila vacía o con valores por defecto
            const newRow = {
                id: newId,
                TipoComponente: '',
                grupo: '',
                factor: '',
                volumen: 0,
            };

            return [...prevRows, newRow]; // Agrega al final
        });
    };

    

    const [columnVisibilityModel, setColumnVisibilityModel] = React.useState<GridColumnVisibilityModel>({
        id: false, // oculta la columna id inicialmente
    });

    // Función para eliminar la fila con id dado
    const handleDeleteRow = (rowId: number) => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== rowId));
    };

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
                            endIcon={<PostAddIcon sx={{ marginLeft: -1 }} />}
                            sx={{ mr: 1 }}
                            onClick={() => handleAddRowBelow()}
                        >
                            Adicionar Solicitud
                        </Button>
                        <Button
                            variant="contained"
                            size="small"
                            color="error"
                            endIcon={<DeleteIcon sx={{ ml: -1 }} />}
                            onClick={() => handleDeleteRow(params.id as number)} // Aquí eliminamos la fila
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
}
