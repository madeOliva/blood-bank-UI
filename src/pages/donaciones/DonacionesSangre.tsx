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
import Navbar from "../../components/navbar/Navbar"; // Componente Navbar
import BotonPersonalizado from "../../components/Button";
import { useNavigate } from "react-router-dom";

const DonacionesSangre: React.FC = () => {
  const navigate = useNavigate(); // Hook para navegar entre páginas

  const [showReacciones, setShowReacciones] = useState(false); // Estado para controlar la visibilidad
  const [showOtraReaccion, setShowOtraReaccion] = useState(false); // Estado para controlar la visibilidad
  return (
    <>
      {/* Navbar */}
      <Navbar />
      <Typography
        variant="h4"
        component="h5"
        mt={8}
        sx={{
          fontSize: { xs: "2rem", md: "3rem" },
          textAlign: "center",
          paddingTop: 2,
          fontFamily: '"Open Sans"',
        }}
      >
        Donaciones de Sangre
      </Typography>

      {/* Contenido principal */}
      <Box sx={{ padding: { xs: 2, md: 4 }, marginTop: 2 }}>
        <Grid container spacing={30}>
          {/* Columna Izquierda: Información Personal */}
          <Grid item xs={12} md={4}>
            <Box sx={{ border: "1px solid #ccc", padding: 3, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Información Personal
              </Typography>
              <Typography>No. HC: 02020202020</Typography>
              <Typography>Nombre y Apellidos: Elvina Hastings</Typography>
              <Typography>Sexo: Femenino</Typography>
              <Typography>Edad: 45</Typography>
              <Typography>Grupo:A</Typography>
              <Typography>RH:+</Typography>
            </Box>
          </Grid>

          {/* Columna Derecha: Formulario */}
          <Grid
            item
            xs={12}
            md={8}
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "flex-end" } // Centrado en pantallas pequeñas, alineado a la derecha en grandes
            }}
          >
            <Grid
              container
              spacing={2}
              flexDirection={"column"}
              sx={{
                width: { xs: "100%", md: "80%" }, // Ancho completo en pantallas pequeñas, 80% en grandes
              }}
            >
              {/* NO.fabricaion de la bolsa */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="NO.Fabricaion de la Bolsa "
                  variant="outlined"
                />
              </Grid>
              {/* Donante de */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Tipo de Bolsa:</InputLabel>
                  <Select defaultValue="" size="medium">
                    <MenuItem value="">Seleccione</MenuItem>
                    <MenuItem value="cuadruple">Cuadruple</MenuItem>
                    <MenuItem value="doble">Doble</MenuItem>
                    <MenuItem value="sencilla">Sencilla</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {/* Volumen*/}
              <Grid item xs={12}>
                <TextField fullWidth label="Volumen" variant="outlined" />
              </Grid>

              {/*Reacciones*/}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={showReacciones}
                      onChange={(e) => setShowReacciones(e.target.checked)}
                    />
                  }
                  label="Se produjeron reacciones?"
                />
              </Grid>
              {showReacciones && (
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Reacciones:</InputLabel>
                    <Select defaultValue="" size="medium">
                      <MenuItem value="">Seleccione</MenuItem>
                      <MenuItem value="vomito">Vomito</MenuItem>
                      <MenuItem value="mareo">Mareo</MenuItem>
                      <MenuItem value="alergia">Alergia</MenuItem>
                      <MenuItem value="desmayo">Desmayo</MenuItem>
                    </Select>
                  </FormControl>

                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={showOtraReaccion}
                          onChange={(e) =>
                            setShowOtraReaccion(e.target.checked)
                          }
                        />
                      }
                      label="Otra Reaccion"
                    />
                  </Grid>
                  {showOtraReaccion && (
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Otra Reaccion"
                        variant="outlined"
                        multiline
                        rows={3}
                      />
                    </Grid>
                  )}
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>

        {/* Botón Aceptar */}
        <Grid container justifyContent="center" sx={{ marginTop: 8 }}>
          <BotonPersonalizado onClick={() => navigate("/citados")}>
            Registrar
          </BotonPersonalizado>
        </Grid>
      </Box>
    </>
  );
};

export default DonacionesSangre;
