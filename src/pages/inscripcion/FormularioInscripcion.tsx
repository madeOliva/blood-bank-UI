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

const FormularioInscripcion: React.FC = () => {
  const navigate = useNavigate(); // Hook para navegar entre páginas

  const [showOtraLocalizacion, setShowOtraLocalizacion] = useState(false); // Estado para controlar la visibilidad
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
        Inscripcion
      </Typography>

      {/* Contenido principal */}
      <Box sx={{ padding: 4, marginTop: 8 }}>
        <Grid container spacing={30}>
          {/* Columna Izquierda: Información Personal */}
          <Grid item xs={12} md={6}>
            <Box sx={{ border: "1px solid #ccc", padding: 2, borderRadius: 2 }}>
              {/* Carnet de Identidad */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Carnet de Identidad"
                  variant="outlined"
                  defaultValue="803011112"
                />
              </Grid>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Información Personal
              </Typography>
              <Typography>Nombre y Apellidos: Elvina Hastings</Typography>
              <Typography>Sexo: Femenino</Typography>
              <Typography>Fecha de Nacimiento: 01/03/80</Typography>
              <Typography>
                Dirección: 1459 Hunting Hill Loop, Guardian Bldg, Springfield,
                IL, 97088
              </Typography>
              <Typography>Municipio: Virginia</Typography>
              <Typography>Provincia: Palacios</Typography>
              <Typography>Área de Salud: Pedro Borrás</Typography>
              <Typography>No. HC: 02020202020</Typography>
              <Typography>Edad: 45</Typography>
              <Typography>Consultorio: 5</Typography>
            </Box>
          </Grid>

          {/* Columna Derecha: Formulario */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={2} flexDirection={"column"}>
              {/* Donante de */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Donante de:</InputLabel>
                  <Select defaultValue="" size="medium">
                    <MenuItem value="">Seleccione</MenuItem>
                    <MenuItem value="voluntario">Voluntario</MenuItem>
                    <MenuItem value="reposicion">Reposición</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Centro Laboral */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Centro Laboral"
                  variant="outlined"
                />
              </Grid>

              {/* Ocupación */}
              <Grid item xs={12}>
                <TextField fullWidth label="Ocupación" variant="outlined" />
              </Grid>

              {/* Teléfonos */}
              <Grid container spacing={2} flexDirection={"row"}>
                <Grid item xs={6}>
                  <TextField fullWidth label="Teléfono" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Teléfono Laboral"
                    variant="outlined"
                  />
                </Grid>
              </Grid>

              {/* Otra Localización */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={showOtraLocalizacion}
                      onChange={(e) =>
                        setShowOtraLocalizacion(e.target.checked)
                      }
                    />
                  }
                  label="Otra Localización"
                />
              </Grid>
              {showOtraLocalizacion && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Otra Localización"
                    variant="outlined"
                    multiline
                    rows={3}
                  />
                </Grid>
              )}
              {/* Dirección de Residencia */}
            </Grid>
          </Grid>
        </Grid>

        {/* Botón Aceptar */}
        <Grid container justifyContent="center" sx={{ marginTop: 4 }}>
          <BotonPersonalizado onClick={() => navigate("/citados")}>
            Registrar
          </BotonPersonalizado>
        </Grid>
      </Box>
    </>
  );
};

export default FormularioInscripcion;
