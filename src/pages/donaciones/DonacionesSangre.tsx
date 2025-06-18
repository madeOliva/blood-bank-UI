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
  DialogTitle,
  DialogContent,
  Dialog,
} from "@mui/material";
import Navbar from "../../components/navbar/Navbar"; // Componente Navbar
import BotonPersonalizado from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import axios from "axios";

const DonacionesSangre: React.FC = () => {
  const navigate = useNavigate(); // Hook para navegar entre páginas

  const [form, setForm] = useState({
    no_tubuladura: "",
    no_fabricacion_bolsa: "",
    tipo_bolsa: "",
    volumen: "",
    reaccion: "",
    otra_reaccion: "",
    estado: "", // Estado por defecto
    fechaD: new Date(), // Fecha y hora actual
  });

  // Estado de errores por campo
  const [errors, setErrors] = useState({
    no_tubuladura: "",
    no_fabricacion_bolsa: "",
    tipo_bolsa: "",
    volumen: "",
    reaccion: "",
    otra_reaccion: "",
  });

  const [showReacciones, setShowReacciones] = useState(false); // Estado para controlar la visibilidad
  const [showOtraReaccion, setShowOtraReaccion] = useState(false); // Estado para controlar la visibilidad

  // Estados para el modal de éxito
  const [openSuccess, setOpenSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  //Validación de campos
  const validateFields = () => {
    const newErrors: typeof errors = { ...errors };
    if (!form.no_tubuladura.trim())
      newErrors.no_tubuladura = "Campo obligatorio";
    if (!form.no_fabricacion_bolsa.trim())
      newErrors.no_fabricacion_bolsa = "Campo obligatorio";
    if (!form.tipo_bolsa.trim()) newErrors.tipo_bolsa = "Campo obligatorio";
    if (!form.volumen.trim()) {
      newErrors.volumen = "Campo obligatorio";
    } else if (!/^\d+$/.test(form.volumen) || Number(form.volumen) <= 0) {
      newErrors.volumen = "Solo números mayores que 0";
    }
    if (showReacciones && !form.reaccion.trim())
      newErrors.reaccion = "Campo obligatorio";
    if (showOtraReaccion && !form.otra_reaccion.trim())
      newErrors.otra_reaccion = "Campo obligatorio";

    setErrors(newErrors);
    return Object.values(newErrors).some((err) => err !== "");
  };

  // Manejar cambios en los campos
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any
  ) => {
    const { name, value } = e.target;
    if (name === "volumen") {
      if (!/^\d*$/.test(value)) return; // Solo números
    }
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  // Registrar (actualizar) donación
  const handleRegistrar = async () => {
    if (validateFields()) return;
    try {
      const datosAEnviar = {
        ...form,
        estado: "procesando",
        fechaD: new Date(), // <-- Esto guarda la fecha y hora actual
      };
      await axios.put(
        `http://localhost:3000/registro-donacion/${idRegistroDonacion}`,
        datosAEnviar
      );
      setSuccessMessage("¡Donacion registrada satisfactoriamente!");
      setOpenSuccess(true);
      setTimeout(() => {
        setOpenSuccess(false);
        navigate("/lista-espera");
      }, 1800);
    } catch (error) {
      alert("Error al actualizar el registro");
      console.error(error);
    }
  };

  const location = useLocation();
  const datosDonante = location.state?.datosDonante;
  const idRegistroDonacion = datosDonante?.id; // <-- este es el id que necesitas

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
          backgroundColor: "#00796B",
          color: "white",
          marginTop: 10,
          fontFamily: '"Open Sans"',
        }}
      >
        Donaciones de Sangre
      </Typography>

      {/* Contenido principal */}
      <Box
        sx={{
          padding: { xs: 2, md: 4 },
          marginTop: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid container spacing={30}>
          {/* Columna Izquierda: Información Personal */}
          <Grid item xs={12} md={4}>
            <Box sx={{ border: "1px solid #ccc", padding: 3, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Información Personal
              </Typography>
              <Typography>
                <b>Nombre:</b> {datosDonante ? datosDonante.nombre : ""}
              </Typography>
              <Typography>
                <b>Sexo:</b> {datosDonante ? datosDonante.sexo : ""}
              </Typography>
              <Typography>
                <b>Edad:</b> {datosDonante ? datosDonante.edad : ""}
              </Typography>
              <Typography>
                <b>Grupo:</b> {datosDonante ? datosDonante.grupo : ""}{" "}
                <b>Rh:</b> {datosDonante ? datosDonante.rh : ""}
              </Typography>
              <Typography>
                <b>CI:</b> {datosDonante ? datosDonante.ci : ""}
              </Typography>
            </Box>
          </Grid>

          {/* Formulario Donación */}
          <Grid item xs={16} md={8}>
            <Grid
              container
              spacing={2}
              flexDirection={"column"}
              sx={{ width: { xs: "100%", md: "80%" } }}
            >
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="No.Tubuladura"
                  variant="outlined"
                  name="no_tubuladura"
                  value={form.no_tubuladura}
                  onChange={handleChange}
                  error={!!errors.no_tubuladura}
                  helperText={errors.no_tubuladura}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="NO.Fabricación de la Bolsa"
                  variant="outlined"
                  name="no_fabricacion_bolsa"
                  value={form.no_fabricacion_bolsa}
                  onChange={handleChange}
                  error={!!errors.no_fabricacion_bolsa}
                  helperText={errors.no_fabricacion_bolsa}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={!!errors.tipo_bolsa}>
                  <InputLabel>Tipo de Bolsa:</InputLabel>
                  <Select
                    name="tipo_bolsa"
                    value={form.tipo_bolsa}
                    onChange={handleChange}
                    size="medium"
                  >
                    <MenuItem value="">Seleccione</MenuItem>
                    <MenuItem value="cuadruple">Cuádruple</MenuItem>
                    <MenuItem value="doble">Doble</MenuItem>
                    <MenuItem value="sencilla">Sencilla</MenuItem>
                  </Select>
                  {errors.tipo_bolsa && (
                    <Typography color="error" variant="caption">
                      {errors.tipo_bolsa}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Volumen"
                  variant="outlined"
                  name="volumen"
                  value={form.volumen}
                  onChange={handleChange}
                  error={!!errors.volumen}
                  helperText={errors.volumen}
                  type="number"
                  inputProps={{ min: 0 }}
                />
              </Grid>
              {/* Reacciones */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={showReacciones}
                      onChange={(e) => {
                        setShowReacciones(e.target.checked);
                        if (!e.target.checked) {
                          setForm({ ...form, reaccion: "" });
                          setErrors({ ...errors, reaccion: "" });
                        }
                      }}
                    />
                  }
                  label="Se produjeron reacciones?"
                />
              </Grid>
              {showReacciones && (
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth error={!!errors.reaccion}>
                    <InputLabel>Reacciones:</InputLabel>
                    <Select
                      name="reaccion"
                      value={form.reaccion}
                      onChange={handleChange}
                      size="medium"
                    >
                      <MenuItem value="">Seleccione</MenuItem>
                      <MenuItem value="vomito">Vómito</MenuItem>
                      <MenuItem value="mareo">Mareo</MenuItem>
                      <MenuItem value="alergia">Alergia</MenuItem>
                      <MenuItem value="desmayo">Desmayo</MenuItem>
                    </Select>
                    {errors.reaccion && (
                      <Typography color="error" variant="caption">
                        {errors.reaccion}
                      </Typography>
                    )}
                  </FormControl>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={showOtraReaccion}
                          onChange={(e) => {
                            setShowOtraReaccion(e.target.checked);
                            if (!e.target.checked) {
                              setForm({ ...form, otra_reaccion: "" });
                              setErrors({ ...errors, otra_reaccion: "" });
                            }
                          }}
                        />
                      }
                      label="Otra Reacción"
                    />
                  </Grid>
                  {showOtraReaccion && (
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Otra Reacción"
                        variant="outlined"
                        multiline
                        rows={3}
                        name="otra_reaccion"
                        value={form.otra_reaccion}
                        onChange={handleChange}
                        error={!!errors.otra_reaccion}
                        helperText={errors.otra_reaccion}
                      />
                    </Grid>
                  )}
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {/* Botón Registrar */}
      <Grid container justifyContent="center" sx={{ marginTop: 8 }}>
        <BotonPersonalizado onClick={handleRegistrar}>
          Registrar
        </BotonPersonalizado>
      </Grid>

      {/* Modal Éxito */}
      <Dialog
        open={openSuccess}
        aria-labelledby="success-dialog-title"
        PaperProps={{
          sx: {
            borderRadius: 3,
            padding: 3,
            minWidth: 320,
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          },
        }}
      >
        <DialogTitle
          sx={{ textAlign: "center", pb: 0 }}
          id="success-dialog-title"
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={1}
          >
            <CheckCircleOutlineIcon
              sx={{ fontSize: 60, color: "success.main" }}
            />
            <Typography variant="h5" fontWeight="bold" color="success.main">
              ¡Éxito!
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography
            variant="body1"
            textAlign="center"
            sx={{ mt: 1, fontSize: "1.1rem" }}
          >
            {successMessage}
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DonacionesSangre;
