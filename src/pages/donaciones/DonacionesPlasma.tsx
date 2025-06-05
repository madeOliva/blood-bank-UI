import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import BotonPersonalizado from "../../components/Button";
import { useNavigate } from "react-router-dom";

export default function DonacionesPlasma() {
  const navigate = useNavigate();
  const [showReacciones, setShowReacciones] = useState(false);

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
        Donación de Plasma
      </Typography>

      <Box sx={{ padding: 2, marginTop: 2 }}>
        <Grid
          container
          spacing={30}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {/* Columna Izquierda: Información Personal */}
          <Grid item xs={12} md={5}>
            <Box sx={{ border: "1px solid #ccc", padding: 2, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Información Personal
              </Typography>
              <Typography>
                <b>Nombre:</b> Luis Alberto Casanueva Diaz
              </Typography>
              <Typography>
                <b>Sexo:</b> Masculino
              </Typography>
              <Typography>
                <b>Raza:</b> Blanca
              </Typography>
              <Typography>
                <b>Edad:</b> 21
              </Typography>
              <Typography>
                <b>Grupo:</b> O <b>Rh:</b> +
              </Typography>
            </Box>
          </Grid>

          {/* Columna Derecha: Formulario */}
          <Grid item xs={12} md={7}>
            <Grid container spacing={2} flexDirection={"column"}>
              {/* TCM y TP */}
              <Grid container spacing={2} flexDirection={"row"}>
                <Grid item xs={6} sm={3}>
                  <TextField fullWidth label="TCM" variant="outlined" />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField fullWidth label="TP" variant="outlined" />
                </Grid>
              </Grid>
              {/* T(min) y Ciclos */}
              <Grid container spacing={2} flexDirection={"row"}>
                <Grid item xs={6} sm={3}>
                  <TextField fullWidth label="T(min)" variant="outlined" />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField fullWidth label="Ciclos" variant="outlined" />
                </Grid>
              </Grid>
              {/* ACD y No. Lote del Kit del ACD */}
              <Grid container spacing={2} flexDirection={"row"}>
                <Grid item xs={6} sm={3}>
                  <TextField fullWidth label="ACD" variant="outlined" />
                </Grid>
                <Grid item xs={6} sm={9}>
                  <TextField
                    fullWidth
                    label="No. Lote del Kit del ACD"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              {/* No. Lote del Kit del Bach */}
              <Grid item xs={12}>
                <TextField
                  label="No. Lote del Kit del Bach"
                  variant="outlined"
                  sx={{ width: 210 }}
                />
              </Grid>
              {/* Se produjeron reacciones */}
              <Grid item xs={12}>
                <Typography sx={{ fontWeight: 600, mt: 2 }}>
                  Se produjeron reacciones?
                </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={showReacciones}
                      onChange={(e) => setShowReacciones(e.target.checked)}
                    />
                  }
                  label="Sí"
                />
              </Grid>
              {/* Reacciones */}
              {showReacciones && (
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Reacciones:</InputLabel>
                    <Select defaultValue="" size="medium" label="Reacciones:">
                      <MenuItem value="">Seleccione</MenuItem>
                      <MenuItem value="vomito">Vómito</MenuItem>
                      <MenuItem value="mareo">Mareo</MenuItem>
                      <MenuItem value="alergia">Alergia</MenuItem>
                      <MenuItem value="desmayo">Desmayo</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>

        {/* Botón Registrar */}
        <Grid container justifyContent="center" sx={{ marginTop: 8 }}>
          <BotonPersonalizado onClick={() => navigate("/citados")}>
            Registrar
          </BotonPersonalizado>
        </Grid>
      </Box>
    </>
  );
}
