import React, { useEffect, useState } from "react";
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
  DialogActions,
  Button,
  Collapse,
} from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import BotonPersonalizado from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import axios from "axios";

const DonacionesSangre: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

  // Estado para datos personales (para mostrar en la columna izquierda)
  const [datosDonante, setDatosDonante] = useState<any>(null);

  const [form, setForm] = useState({
    no_tubuladura: "",
    no_lote: "",
    tipo_bolsa: "",
    volumen: 0,
    reaccion: "",
    otra_reaccion: "",
    estado: "",
    fechaD: new Date(),
    nombre: "",
    sexo: "",
    edad: "",
    grupo: "",
    rh: "",
    ci: "",
    no_hc: "",
    no_registro: "",
  });

  const [errors, setErrors] = useState({
    no_tubuladura: "",
    no_lote: "",
    tipo_bolsa: "",
    volumen: "",
    reaccion: "",
    otra_reaccion: "",
  });

  const [showReacciones, setShowReacciones] = useState(false);
  const [showOtraReaccion, setShowOtraReaccion] = useState(false);

  const [openSuccess, setOpenSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Cargar datos al montar (por id de la URL o por location.state)
  useEffect(() => {
    // Si vienes de la hoja de cargo y tienes datos en location.state, úsalos
    const stateDonante = location.state?.datosDonante;
    const aplanarDatos = (d: any) => {
      const historia = d.historiaClinica || {};
      return {
        ...d,
        nombre: d.nombre || historia.nombre || "",
        sexo: d.sexo || historia.sexo?.nombre || historia.sexo || "",
        edad: d.edad || historia.edad || "",
        grupo:
          d.grupo ||
          historia.grupo_sanguine?.nombre ||
          historia.grupo_sanguine ||
          "",
        rh: d.rh || historia.factor?.signo || historia.factor || "",
        ci: d.ci || historia.ci || "",
        no_hc: d.no_hc || historia.no_hc || "",
        no_registro: d.no_registro || "",
      };
    };

    if (stateDonante) {
      const datos = aplanarDatos(stateDonante);
      setDatosDonante(datos);
      setForm((prev) => ({
        ...prev,
        ...datos,
        fechaD: datos.fechaD || "",
      }));
    } else if (id) {
      // Si entras por URL directa, busca los datos en el backend
      axios
        .get(`http://localhost:3000/registro-donacion/${id}`)
        .then((res) => {
          const datos = aplanarDatos(res.data);
          setDatosDonante(datos);
          setForm((prev) => ({
            ...prev,
            ...datos,
            fechaD: datos.fechaD || "",
          }));
        })
        .catch(() => setDatosDonante(null));
    }
    // eslint-disable-next-line
  }, [id, location.state]);

  const validateFields = () => {
    const newErrors: typeof errors = { ...errors };
    if (!form.no_tubuladura.trim())
      newErrors.no_tubuladura = "Campo obligatorio";
    if (!form.no_lote.trim()) newErrors.no_lote = "Campo obligatorio";
    if (!form.tipo_bolsa.trim()) newErrors.tipo_bolsa = "Campo obligatorio";
     // Volumen como número
    if (
      form.volumen === null ||
      form.volumen === undefined ||
      form.volumen === 0
    ) {
      newErrors.volumen = "Campo obligatorio";
    } else if (
      isNaN(form.volumen) ||
      Number(form.volumen) <= 0 ||
      !Number.isInteger(Number(form.volumen))
    ) {
      newErrors.volumen = "Solo números enteros mayores que 0";
    }
    if (showReacciones && !form.reaccion.trim())
      newErrors.reaccion = "Campo obligatorio";
    if (showOtraReaccion && !form.otra_reaccion.trim())
      newErrors.otra_reaccion = "Campo obligatorio";

    setErrors(newErrors);
    return Object.values(newErrors).some((err) => err !== "");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any
  ) => {
    const { name, value } = e.target;
    if (name === "volumen") {
      if (!/^\d*$/.test(value)) return;
    }
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleRegistrar = async () => {
    if (validateFields()) return;
    try {
      const datosAEnviar = {
        ...form,
        estado: "procesando",
        fechaD: new Date(),
        responsableExtraccion: usuario.name, // Nuevo campo para el responsable
      };
      console.log("ID que se envía:", id);
      console.log("Enviando PUT a:", `http://localhost:3000/registro-donacion/${id}`, form);
      await axios.put(
        `http://localhost:3000/registro-donacion/${id}`,
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
        Donaciones de Sangre
      </Typography>

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
                <b>Nombre:</b>{" "}
                {datosDonante?.nombre ||
                  datosDonante?.historiaClinica?.nombre ||
                  ""}
              </Typography>
              <Typography>
                <b>Sexo:</b>{" "}
                {datosDonante?.sexo ||
                  datosDonante?.historiaClinica?.sexo?.nombre ||
                  datosDonante?.historiaClinica?.sexo ||
                  ""}
              </Typography>
              <Typography>
                <b>Edad:</b>{" "}
                {datosDonante?.edad ||
                  datosDonante?.historiaClinica?.edad ||
                  ""}
              </Typography>
              <Typography>
                <b>Grupo:</b>{" "}
                {datosDonante?.grupo ||
                  datosDonante?.historiaClinica?.grupo_sanguine?.nombre ||
                  datosDonante?.historiaClinica?.grupo_sanguine ||
                  ""}{" "}
                <b>Rh:</b>{" "}
                {datosDonante?.rh ||
                  datosDonante?.historiaClinica?.factor?.signo ||
                  datosDonante?.historiaClinica?.factor ||
                  ""}
              </Typography>
              <Typography>
                <b>CI:</b>{" "}
                {datosDonante?.ci || datosDonante?.historiaClinica?.ci || ""}
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
              {/* Primera caja: No.Tubuladura y NO.Fabricación de la Bolsa */}
              <Box sx={{ display: "flex", gap: 2, mb: 2, minWidth: 500 }}>
                <TextField
                  fullWidth
                  label="No.Tubuladura"
                  variant="outlined"
                  name="no_tubuladura"
                  value={form.no_tubuladura}
                  onChange={handleChange}
                  error={!!errors.no_tubuladura}
                  helperText={errors.no_tubuladura}
                  sx={{ minWidth: 180 }}
                />
                <TextField
                  fullWidth
                  label="NO.Fabricación de la Bolsa"
                  variant="outlined"
                  name="no_lote"
                  value={form.no_lote}
                  onChange={handleChange}
                  error={!!errors.no_lote}
                  helperText={errors.no_lote}
                  sx={{ flex: 2, minWidth: 240 }}
                />
              </Box>

              {/* Segunda caja: Tipo de Bolsa y Volumen */}
              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
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
              </Box>

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
              <Collapse in={showReacciones}>
                <Grid item xs={12}>
                  <FormControl error={!!errors.reaccion} sx={{ width: 200 }}>
                    <InputLabel>Reacciones:</InputLabel>
                    <Select
                      name="reaccion"
                      value={form.reaccion}
                      onChange={handleChange}
                      size="medium"
                      label="Reacciones:"
                      sx={{ width: 180 }}
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
                  <Box sx={{ mt: 2 }}>
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
                  </Box>
                  <Collapse in={showOtraReaccion}>
                    <TextField
                      fullWidth
                      label="Otra Reacción"
                      variant="outlined"
                      multiline
                      name="otra_reaccion"
                      value={form.otra_reaccion}
                      onChange={handleChange}
                      error={!!errors.otra_reaccion}
                      helperText={errors.otra_reaccion}
                      sx={{ mt: 2 }}
                    />
                  </Collapse>
                </Grid>
              </Collapse>
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
