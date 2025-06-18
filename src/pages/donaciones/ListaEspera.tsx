import { DataGrid, GridRowsProp, GridColDef, GridRowParams } from "@mui/x-data-grid";
import Navbar from "../../components/navbar/Navbar";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";




 const columns: GridColDef[] = [
  { field: "ci", headerName: "CI", width: 200 },
  {
    field: "nombre",
    headerName: "Nombres y Apellidos",
    width: 300,
  },
  { field: "edad", headerName: "Edad", width: 100 },
  { field: "sexo", headerName: "Sexo", width: 100 },
  { field: "grupo", headerName: "Grupo", width: 100 },
  { field: "rh", headerName: "Rh", width: 100 },
  { field: "donante", headerName: "Donante de", width: 100 },
];

export default function ListaEspera() {
  const navigate = useNavigate(); // Hook para navegar entre páginas
  const [rows, setRows] = useState<any[]>([]);

   useEffect(() => {
    const fetchAptos = async () => {
      try {
        const res = await axios.get("http://localhost:3000/registro-donacion/aptos-interrogatorio");
        // Mapea los datos para el DataGrid
        const mappedRows = res.data.map((reg: any, idx: number) => ({
           id: reg._id || reg.id || idx, // Usa _id, id o el índice como último recurso
          ci: reg.ci,
          nombre: `${reg.nombre || ""} ${reg.primer_apellido || ""} ${reg.segundo_apellido || ""}`.trim(),
          edad: reg.edad,
          sexo: reg.sexo,
          grupo: reg.grupo,
          rh: reg.rh,
          donante: reg.donante,
          // agrega aquí otros campos si los necesitas
        }));
        setRows(mappedRows);
      } catch (error) {
        setRows([]);
      }
    };
    fetchAptos();
  }, []);

  const handleRowClick = (params:GridRowParams) => {
    const componente = params.row.donante; 
    if(componente == "Plasma") {
      // Si el donante es de Plasma, navega a la página de donación de plasma
      navigate(`/donaciones-plasma/` , { state: { datosDonante: params.row } });
    }
    if(componente == "Sangre Total"  )
    // Puedes pasar el nombre del componente como parte de la ruta o como query param
    navigate(`/donaciones-sangre/`, { state: { datosDonante: params.row } });
  };

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
          fontFamily: '"Open Sans"',
        }}
      >
        Lista de Espera de Donantes
      </Typography>
      {/* Contenedor para centrar el DataGrid */}
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          style={{
            height: 450,
            width: "80%" /* Ajusta el ancho según sea necesario */,
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            onRowClick={handleRowClick} // Maneja el clic en la fila
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                position: "sticky", // Hace que los encabezados sean fijos
                top: 0, // Los fija en la parte superior
                zIndex: 1, // Asegura que estén por encima de las filas
                backgroundColor: "#fff", // Fondo blanco para los encabezados
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                fontFamily: '"Open Sans"',
                fontWeight: 600,
              },
              "& .MuiDataGrid-cellContent": {
                fontFamily: '"Open Sans"',
                color: "#000",
              },

            }}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}
          />
        </Box>
      </Box>
    </>
  );
}
