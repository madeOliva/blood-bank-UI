import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Typography, Button, Paper, Container } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import BotonPersonalizado from "../../components/Button";

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

  const fetchData = () => {
    axios
      .get(
        "http://localhost:3000/componentes-obtenidos/componentes_obtenidos?estado=liberado"
      )
      .then((res) => {
   const data = Array.isArray(res.data)
  ? res.data
      .filter(
        (item: any) =>
          item.estado_obtencion?.toLowerCase() === "liberado" &&
          item.componentes?.some(
            (c: any) =>
              c.componente?.toUpperCase() === "PFC" &&
              (!c.no_lote || c.no_lote === "")
          )
      )
      .flatMap((item: any, idx: number) =>
        item.componentes
          .filter(
            (c: any) =>
              c.componente?.toUpperCase() === "PFC" &&
              (!c.no_lote || c.no_lote === "")
          )
          .map((pfc: any, pfcIdx: number) => ({
            id: `${item._id}_${pfcIdx}`,
            _id: item._id,
            no_consecutivo: item.no_consecutivo ?? "",
            no_lote: pfc.no_lote ?? "",
            no_hc: item.registro_donacion?.historiaClinica?.no_hc ?? "",
            sexo: item.registro_donacion?.historiaClinica?.sexo ?? "",
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

  const handleLoteChange = (id: string, value: string) => {
    setLotes((prev) => ({ ...prev, [id]: value }));
  };
  const handleSaveAllLotes = async () => {
    const updates = Object.entries(lotes)
      .filter(([id, lote]) => lote && lote.trim() !== "");
    if (updates.length === 0) {
      alert("No hay números de lote para guardar.");
      return;
    }
    setLoading(true);
    try {
      await Promise.all(
        updates.map(([id, lote]) =>
          axios.patch(
            `http://localhost:3000/componentes-obtenidos/${id}/lote`,
            { no_lote: lote }
          )
        )
      );
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
    { field: "sexo", headerName: "Sexo", width: 60 },
    { field: "edad", headerName: "Edad", width: 60 },
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
    { field: "volumen", headerName: "Volumen (ml)", width: 120 },
  ];

  return (
    <>
    <Navbar />
    <Box sx={{  marginTop: "25" }}>
      <Typography
          sx={{
            fontSize: { xs: "2rem", md: "3rem" },
            mt: 8,
            backgroundColor: "primary.dark",
            textAlign: "center",
            color: "white",
          }}
        >
          Plasma Industria
        </Typography>
      
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            getRowId={(row) => row.id}
            disableSelectionOnClick
          />
        </Box>
      
     
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <BotonPersonalizado
        onClick={handleSaveAllLotes}
        sx={{ width: 225 }}
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
    </>
  );
}