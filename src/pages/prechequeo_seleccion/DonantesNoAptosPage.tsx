import { Box, Typography } from "@mui/material";
import { GridColDef, DataGrid } from "@mui/x-data-grid";
import Navbar from "../../components/navbar/Navbar";

const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
        field: "blabla",
        headerName: "BlaBLa",
        width: 150,
        editable: false,
    },
    {
        field: "lastName",
        headerName: "Last name",
        width: 150,
        editable: false,
    },
    {
        field: "age",
        headerName: "Age",
        type: "number",
        width: 150,
        editable: false,
    },
    {
        field: "phone",
        headerName: "Phone",
        type: "number",
        width: 150,
        editable: false,
    },



];

const rows = [
    { id: 1, lastName: "Snow", blabla: "Jon", age: 14, phone: 444 },
    { id: 2, lastName: "Lannister", blabla: "Cersei", age: 31, phone: 444 },
    { id: 3, lastName: "Lannister", blabla: "Jaime", age: 31, phone: 444 },
    { id: 4, lastName: "Stark", blabla: "Arya", age: 11, phone: 444 },
    {
        id: 5,
        blabla: "Targaryen",
        firstName: "Daenerys",
        age: null,
        phone: 444,
    },
    { id: 1, lastName: "Snow", blabla: "Jon", age: 14, phone: 444 },
    { id: 2, lastName: "Lannister", blabla: "Cersei", age: 31, phone: 444 },
    { id: 3, lastName: "Lannister", blabla: "Jaime", age: 31, phone: 444 },
    { id: 4, lastName: "Stark", blabla: "Arya", age: 11, phone: 444 },
    { id: 1, lastName: "Snow", blabla: "Jon", age: 14, phone: 444 },
    { id: 2, lastName: "Lannister", blabla: "Cersei", age: 31, phone: 444 },
    { id: 3, lastName: "Lannister", blabla: "Jaime", age: 31, phone: 444 },
    { id: 4, lastName: "Stark", blabla: "Arya", age: 11, phone: 444 },
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
                Donantes no Aptos
            </Typography>
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


            </Box></>
    )
}