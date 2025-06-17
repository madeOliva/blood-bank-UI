import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Navbar from "../../components/navbar/Navbar";
import { Box, Button, Container, Dialog, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";



const columns: GridColDef<any>[] = [
    { field: "ci", headerName: "CI", width: 150 },
    { field: "nombre", headerName: "Nombre", width: 150 },
    { field: "primer_apellido", headerName: "Primer Apellido", width: 150 },
    { field: "segundo_apellido", headerName: "Segundo Apellido", width: 150 },
    { field: "componente", headerName: "Donante de", width: 150 },
    { field: "fechaC", headerName: "Fecha de Cita", width: 150 },
    {
        field: "actions",
        headerName: "Citar",
        width: 100,
        renderCell: (params) => (
            <Button
                variant="outlined"
                size="small"
                color="error"
                endIcon={<EditIcon sx={{ ml: -1 }} />}
                onClick={() => handleCitar(params.row.historiaClinicaId)}
            >
                Citar
            </Button>
        ),
    },

];
let handleCitar = (_: string) => {};

export default function CitadosPS() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Modal de éxito/error
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState<"success" | "error">("success");
  const [errorMsg, setErrorMsg] = useState("");

  // Handler para citar
  handleCitar = async (historiaClinicaId: string) => {
    const fechaCita = new Date();
    fechaCita.setDate(fechaCita.getDate() + 1);

    try {
      await axios.patch(`http://localhost:3000/historia-clinica/${historiaClinicaId}`, {
        citado: true,
        fechaCita: fechaCita,
      });
      setModalType("success");
      setOpenModal(true);
      // Recargar la lista de donantes
      fetchRows();
    } catch (error) {
      setErrorMsg("Ocurrió un error al citar al donante.");
      setModalType("error");
      setOpenModal(true);
    }
  };

  // Cargar los donantes que pueden donar y no están citados
  const fetchRows = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/registro-donacion/pueden-donar");
      const filtered = res.data.filter((reg: any) => reg.citado === false || reg.citado === undefined);
      const mappedRows = filtered.map((reg: any, idx: number) => ({
        id: reg._id || idx + 1,
        historiaClinicaId: reg.historiaClinicaId,
        ci: reg.ci || "",
        nombre: reg.nombre || "",
        primer_apellido: reg.primer_apellido || "",
        segundo_apellido: reg.segundo_apellido || "",
        componente: reg.componente || "",
        fechaC: reg.fechaPermitida ? new Date(reg.fechaPermitida).toLocaleDateString() : "",
      }));
      setRows(mappedRows);
    } catch (error) {
      setRows([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRows();
    // eslint-disable-next-line
  }, []);

  // Cierra el modal automáticamente tras el éxito
  useEffect(() => {
    if (openModal && modalType === "success") {
      const timer = setTimeout(() => setOpenModal(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [openModal, modalType]);

    return (
        <>
            <Navbar />
            <Typography
                variant="h4"
                component="h5"
                padding={1}
                mt={8}
                sx={{ width: "100%", fontSize: { xs: "1rem", md: "2rem" }, textAlign: "center", bgcolor: "primary.dark", color: "white" }}
            >
                Listado de Donantes a Citar
            </Typography>
            <Container>
                <Box sx={{ marginTop: "20px", marginBlockEnd: 1, marginLeft: 7 }}>
                    <DataGrid
                        sx={{
                            height: 400,
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
                        getRowId={(row) => row.id}
                    />
                </Box>
            </Container>
            <Dialog
                open={openModal}
                onClose={() => setOpenModal(false)}
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        padding: 3,
                        minWidth: 320,
                        boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                    },
                }}
            >
                <DialogTitle sx={{ textAlign: "center", pb: 0 }}>
                    <Stack direction="column" alignItems="center" spacing={1}>
                        {modalType === "success" ? (
                            <>
                                <CheckCircleOutlineIcon sx={{ fontSize: 60, color: "success.main" }} />
                                <Typography variant="h5" fontWeight="bold" color="success.main">
                                    ¡Éxito!
                                </Typography>
                            </>
                        ) : (
                            <>
                                <ErrorOutlineIcon sx={{ fontSize: 60, color: "error.main" }} />
                                <Typography variant="h5" fontWeight="bold" color="error.main">
                                    Atención
                                </Typography>
                            </>
                        )}
                    </Stack>
                </DialogTitle>
                <DialogContent>
                    <Typography
                        variant="body1"
                        textAlign="center"
                        sx={{ mt: 1, fontSize: "1.1rem" }}
                    >
                        {modalType === "success"
                            ? "Donante citado correctamente"
                            : errorMsg}
                    </Typography>
                </DialogContent>
            </Dialog>
        </>
    );
}
