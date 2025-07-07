import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Typography, Dialog, DialogTitle, DialogContent, DialogContentText } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import BotonPersonalizado from "../../components/Button";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

type RowType = {
  id: any;
  _id: any;
  no_consecutivo: any;
  no_lote: any;
  no_hc: any;
  sexo: any;
  edad: any;
  fecha_donacion: any;
  fecha_obtencion: any;
  volumen: any;
};

export default function PlasmaIndustria() {
  const [rows, setRows] = useState<RowType[]>([]);
  const [lotes, setLotes] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

 const fetchData = () => {
  axios
    .get("http://localhost:3000/componentes-obtenidos/componentes_obtenidos")
    .then((res) => {
      console.log("DATA RECIBIDA:", res.data);
     const data = Array.isArray(res.data)
  ? res.data.flatMap((item: any) =>
      item.componentes
        .filter(
          (c: any) =>
            (c.tipo?.toUpperCase() === "PFC" || c.componente?.toUpperCase() === "PFC") &&
            String(c.estado_obtencion).toLowerCase() === "liberado" &&
            (!c.no_lote || c.no_lote === "") &&
            !!c._id
        )
        .map((pfc: any) => ({
          id: pfc._id,
          _id: item._id,
          no_consecutivo: item.no_consecutivo ?? "",
          no_lote: pfc.no_lote ?? "",
          no_hc: item.registro_donacion?.historiaClinica?.no_hc ?? "",
          sexo:
            typeof item.registro_donacion?.historiaClinica?.sexo === "object"
              ? item.registro_donacion?.historiaClinica?.sexo?.nombre ?? ""
              : item.registro_donacion?.historiaClinica?.sexo ?? "",
          edad: item.registro_donacion?.historiaClinica?.edad ?? "",
          fecha_donacion: item.registro_donacion?.fechaD ?? "",
          fecha_obtencion: pfc.fecha_obtencion ?? "",
          volumen: pfc.volumen ?? ""
        }))
    )
  : [];
      setRows(data);
    })
    .catch(() => setRows([]));
};

  useEffect(() => {
    fetchData();
  }, []);

  // Modal de error se oculta a los 3 segundos
  useEffect(() => {
    if (openErrorModal) {
      const timer = setTimeout(() => setOpenErrorModal(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [openErrorModal]);

  // Modal de éxito se oculta a los 3 segundos
  useEffect(() => {
    if (openSuccessModal) {
      const timer = setTimeout(() => setOpenSuccessModal(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [openSuccessModal]);

  const handleLoteChange = (id: string, value: string) => {
    setLotes((prev) => ({ ...prev, [id]: value }));
  };

 const handleSaveAllLotes = async () => {
  const updates = Object.entries(lotes).filter(([_, lote]) => lote && lote.trim() !== "");
  if (updates.length === 0) {
    setOpenErrorModal(true);
    return;
  }
  setLoading(true);
  try {
    await Promise.all(
      updates.map(([id, lote]) => {
        return axios.patch(
          `http://localhost:3000/componentes-obtenidos/lote/${id}`,
          { no_lote: lote, envio_industria: true }
        );
      })
    );
    setOpenSuccessModal(true);
    fetchData();
    setLotes({});
  } finally {
    setLoading(false);
  }
};

  const columns: GridColDef[] = [
    { field: "no_consecutivo", headerName: "No", width: 100 },
    {
      field: "no_lote",
      headerName: "No lote",
      width: 180,
      renderCell: (params) => (
        <input
          type="text"
          value={lotes[params.row.id] ?? params.value ?? ""}
          onChange={(e) => handleLoteChange(params.row.id, e.target.value)}
          style={{ width: 100 }}
        />
      ),
    },
    { field: "no_hc", headerName: "No. HC", width: 150 },
    { field: "sexo", headerName: "Sexo", width: 100 },
    { field: "edad", headerName: "Edad", width: 100 },
    {
      field: "fecha_donacion",
      headerName: "Fecha Donación",
      width: 150,
      renderCell: (params) =>
        params.value ? new Date(params.value).toLocaleDateString() : "",
    },
    {
      field: "fecha_obtencion",
      headerName: "Fecha Obtención",
      width: 150,
      renderCell: (params) =>
        params.value ? new Date(params.value).toLocaleDateString() : "",
    },
    { field: "volumen", headerName: "Volumen", width: 120 },
  ];

  return (
    <>
      <Navbar />
      <Box sx={{ marginTop: "25" }}>
       <Typography
          variant="h5"
          sx={{
            fontSize: { xs: "2rem", md: "3rem" },
            mt: 8,
            backgroundColor: "primary.dark",
            textAlign: "center",
            color: "white",
          }}
        >
          Envío de Plasma para Industria
        </Typography>

        <Box 
         sx={{
            height: 450,
            width: "90%",
            mb: 2,
            marginBlockEnd: 1,
            marginLeft: 7,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 },
              },
            }}
            pageSizeOptions={[10]}
            getRowId={(row) => row.id}
            disableRowSelectionOnClick
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <BotonPersonalizado
            onClick={handleSaveAllLotes}
            sx={{ width: 150 }}
            disabled={loading}
          >
            {loading
              ? "Enviando..."
              : rows.length > 0
              ? "Enviar"
              : "ACEPTAR"}
          </BotonPersonalizado>
        </Box>
      </Box>

      {/* Modal: No hay elementos para enviar */}
      <Dialog
        open={openErrorModal}
        onClose={() => setOpenErrorModal(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            padding: 3,
            minWidth: 320,
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          },
        }}
        aria-labelledby="no-elements-dialog-title"
        aria-describedby="no-elements-dialog-description"
      >
        <DialogTitle sx={{ textAlign: "center", pb: 0 }} id="error-dialog-title">
          <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
            <ErrorOutlineIcon sx={{ fontSize: 60, color: "error.main" }} />
            <Typography variant="h5" fontWeight="bold" color="error.main">
              Atención
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="no-elements-dialog-description"
            variant="body1"
            textAlign="center"
            sx={{ mt: 1, fontSize: "1.1rem" }}
          >
            No hay números de lote para guardar.
          </DialogContentText>
        </DialogContent>
      </Dialog>

      {/* Modal de éxito */}
      <Dialog
        open={openSuccessModal}
        onClose={() => setOpenSuccessModal(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            padding: 3,
            minWidth: 320,
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          },
        }}
        aria-labelledby="success-dialog-title"
        aria-describedby="success-dialog-description"
      >
        <DialogTitle sx={{ textAlign: "center", pb: 0 }} id="success-dialog-title">
          <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
            <CheckCircleOutlineIcon sx={{ fontSize: 60, color: "success.main" }} />
            <Typography variant="h5" fontWeight="bold" color="success.main">
              ¡Éxito!
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="success-dialog-description"
            variant="body1"
            textAlign="center"
            sx={{ mt: 1, fontSize: "1.1rem" }}
          >
            Números de lote guardados correctamente.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}