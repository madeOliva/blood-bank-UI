import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import BotonPersonalizado from "../../components/Button";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar"
import { Button, Typography } from "@mui/material";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import { useEffect, useState } from "react";
import axios from "axios";




function Water({ row, onRemove }: { row: any, onRemove: (id: number) => void }) {

  const navigate = useNavigate();

  const handleHc = () => {
    onRemove(row.id); // Elimina la fila
    navigate("/historiadonante", { replace: true }); // Redirige a la vista de Prechequeo
  };

  return (<Button
    variant="outlined"
    size="small"
    color="error"
    endIcon={<WaterDropIcon sx={{ ml: -1 }} />}
    onClick={handleHc}
  >
    Historia
  </Button>)

}


export default function ResultadosPrechequeo() {
  const navigate = useNavigate();

  const [rows, setRows] = useState<any[]>([]);

  // Función para eliminar la fila
  const removeRow = (id: number) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
  };


  useEffect(() => {
    const fetchRows = async () => {
      try {
        const res = await axios.get("http://localhost:3000/registro-donacion/datos");
        // Mapea los datos para la tabla
        const mappedRows = res.data.map((reg: any, idx: number) => ({
          id: idx + 1,
          nombre: reg.nombre,
          primer_apellido: reg.primer_apellido,
          segundo_apellido: reg.segundo_apellido,
          examenP_grupo: reg.examenP_grupo,
          examenP_factor: reg.examenP_factor,
          examenP_hemoglobina: reg.examenP_hemoglobina,
          apto_prechequeo: reg.apto_prechequeo ? "Apto" : reg.no_apto_prechequeo ? "No Apto" : "",
        }));
        setRows(mappedRows);
      } catch (error) {
        console.error("Error al cargar los registros:", error);
      }
    };
    fetchRows();
  }, []);

  const columns: GridColDef[] = [
  { field: "id", headerName: "No", width: 90 },
  {
    field: "nombre",
    headerName: "Nombre",
    width: 150,
    editable: false,
  },

  {
    field: "primer_apellido",
    headerName: "Primer Apellido",
    width: 150,
    editable: false,
  },

  {
    field: "segundo_apellido",
    headerName: "Segundo Apellido",
    width: 150,
    editable: false,
  },
  {
    field: "examenP_grupo",
    headerName: "Grupo",
    width: 150,
    editable: false,
  },
  {
    field: "examenP_factor",
    headerName: "Factor",
    width: 150,
    editable: false,
  },

  {
    field: "examenP_hemoglobina",
    headerName: "Hemoglobina",
    width: 150,
    editable: false,
  },

  {
    field: "apto_prechequeo",
    headerName: "Apto/NoApto",
    width: 150,
    editable: false,
  },

  {
    field: "actions",
    headerName: "",
    width: 150,
    renderCell: (params) => <Water row={params.row} onRemove={removeRow} />,
  },


];

  const handleHc = () => {
    // Aquí puedes poner lógica de autenticación si lo deseas
    navigate("/historiadonante", { replace: true }); // Redirige a la vista de Prechequeo
  };

  return (

    <>
      <Navbar />

      <Typography
        variant="h4"
        component="h5"
        mt={8}
        sx={{ fontSize: { xs: "2rem", md: "3rem" }, textAlign: "center", backgroundColor: "#00796B", color: 'white' }}
      >
        Listado de posibles donantes
      </Typography>

      <Box sx={{ marginTop: "20px", width: "100%", marginBlockEnd: 1, marginLeft: 1, marginRight: 1 }}>


        <DataGrid
          sx={{
            display: "flex",
            alignContent: "space-between",
            "& .MuiDataGrid-columnHeaderTitle": {
              fontFamily: '"Open Sans"',
              fontWeight: 600,
            },
            "& .MuiDataGrid-cellContent": {
              fontFamily: '"Open Sans"',
              color: "#000"
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

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',

        }}
      >
        <BotonPersonalizado onClick={handleHc} sx={{ width: 225 }}>
          ACEPTAR
        </BotonPersonalizado>
      </Box>
    </>


  );
}