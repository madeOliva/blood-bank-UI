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
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import BotonPersonalizado from "../../components/Button";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import axios from "axios";

// --- Funciones de validación ---
const soloLetrasEspacios = (texto: string) =>
  /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/.test(texto);
const soloLetrasSinEspacios = (texto: string) =>
  /^[A-Za-zÁÉÍÓÚáéíóúÑñ]*$/.test(texto);
const soloNumeros = (texto: string) => /^\d*$/.test(texto);
const letrasNumerosEspacios = (texto: string) =>
  /^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñ\s]*$/.test(texto);
const letrasNumerosSinEspacios = (texto: string) =>
  /^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñ]*$/.test(texto);
const letrasNumerosPuntoGuionSinEspacios = (texto: string) =>
  /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9.\-]*$/.test(texto);

const DonacionesPlasma: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

  const [datosDonante, setDatosDonante] = useState<any>(null);
  const [form, setForm] = useState({
    TCM: 0,
    TP: 0,
    tiempo: 0,
    ciclos: 0,
    ACD: 0,
    no_lote_kitACD: "",
    no_lote_kitBach: "",
    reaccion: "",
    otra_reaccion: "",
    estado: "",
    fechaD: new Date(), // Fecha de donación
  });

  const [errors, setErrors] = useState({
    TCM: "",
    TP: "",
    tiempo: "",
    ciclos: "",
    ACD: "",
    no_lote_kitACD: "",
    no_lote_kitBach: "",
    reaccion: "",
    otra_reaccion: "",
  });

  const [showReacciones, setShowReacciones] = useState(false);
  const [showOtraReaccion, setShowOtraReaccion] = useState(false);

  // Modal de éxito
  const [openSuccess, setOpenSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Validación de campos
  const validateFields = () => {
    const newErrors = { ...errors };
    if (form.TCM === null || isNaN(form.TCM) || Number(form.TCM) <= 0)
      newErrors.TCM = "Campo obligatorio";
    if (form.TP === null || isNaN(form.TP) || Number(form.TP) <= 0)
      newErrors.TP = "Campo obligatorio";
    if (form.tiempo === null || isNaN(form.tiempo) || Number(form.tiempo) <= 0)
      newErrors.tiempo = "Campo obligatorio";
    if (form.ciclos === null || isNaN(form.ciclos) || Number(form.ciclos) <= 0)
      newErrors.ciclos = "Campo obligatorio";
    if (form.ACD === null || isNaN(form.ACD) || Number(form.ACD) <= 0)
      newErrors.ACD = "Campo obligatorio";
    if (!form.no_lote_kitACD.trim())
      newErrors.no_lote_kitACD = "Campo obligatorio";
    if (!form.no_lote_kitBach.trim())
      newErrors.no_lote_kitBach = "Campo obligatorio";
    if (showReacciones && !form.reaccion.trim())
      newErrors.reaccion = "Campo obligatorio";
    if (showOtraReaccion && !form.otra_reaccion.trim())
      newErrors.otra_reaccion = "Campo obligatorio";
    setErrors(newErrors);
    return Object.values(newErrors).some((err) => err !== "");
  };

  useEffect(() => {
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

  // Manejar cambios en los campos
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any
  ) => {
    const { name, value } = e.target;
    if (name === "no_lote_kitACD" || name === "no_lote_kitBach") {
      if (!letrasNumerosPuntoGuionSinEspacios(value)) return;
    }

    if (["TCM", "TP", "tiempo", "ciclos", "ACD"].includes(name)) {
      setForm({ ...form, [name]: value === "" ? "" : Number(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
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
        responsableExtraccion: usuario.name, // <-- Nuevo campo
      };
      console.log(id);
      await axios.put(
        `http://localhost:3000/registro-donacion/${id}`,
        datosAEnviar
      );
      setSuccessMessage("¡Donación de plasma registrada satisfactoriamente!");
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

          {/* Columna Derecha: Formulario */}
          <Grid item xs={12} md={7}>
            <Grid container spacing={2} flexDirection={"column"}>
              {/* TCM y TP */}
              <Grid container spacing={2} flexDirection={"row"}>
                <Grid item xs={6} sm={3}>
                  <TextField
                    fullWidth
                    label="TCM"
                    variant="outlined"
                    name="TCM"
                    value={form.TCM}
                    onChange={handleChange}
                    error={!!errors.TCM}
                    helperText={errors.TCM}
                    type="number"
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    fullWidth
                    label="TP"
                    variant="outlined"
                    name="TP"
                    value={form.TP}
                    onChange={handleChange}
                    error={!!errors.TP}
                    helperText={errors.TP}
                    type="number"
                  />
                </Grid>
              </Grid>
              {/* T(min) y Ciclos */}
              <Grid container spacing={2} flexDirection={"row"}>
                <Grid item xs={6} sm={3}>
                  <TextField
                    fullWidth
                    label="T(min)"
                    variant="outlined"
                    name="tiempo"
                    value={form.tiempo}
                    onChange={handleChange}
                    error={!!errors.tiempo}
                    helperText={errors.tiempo}
                    type="number"
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    fullWidth
                    label="Ciclos"
                    variant="outlined"
                    name="ciclos"
                    value={form.ciclos}
                    onChange={handleChange}
                    error={!!errors.ciclos}
                    helperText={errors.ciclos}
                    type="number"
                  />
                </Grid>
              </Grid>
              {/* ACD y No. Lote del Kit del ACD */}
              <Grid container spacing={2} flexDirection={"row"}>
                <Grid item xs={6} sm={3}>
                  <TextField
                    fullWidth
                    label="ACD"
                    variant="outlined"
                    name="ACD"
                    value={form.ACD}
                    onChange={handleChange}
                    error={!!errors.ACD}
                    helperText={errors.ACD}
                    type="number"
                  />
                </Grid>
                <Grid item xs={6} sm={9}>
                  <TextField
                    fullWidth
                    label="No. Lote del Kit del ACD"
                    variant="outlined"
                    name="no_lote_kitACD"
                    value={form.no_lote_kitACD}
                    onChange={handleChange}
                    error={!!errors.no_lote_kitACD}
                    helperText={errors.no_lote_kitACD}
                  />
                </Grid>
              </Grid>
              {/* No. Lote del Kit del Bach */}
              <Grid item xs={12}>
                <TextField
                  label="No. Lote del Kit del Bach"
                  variant="outlined"
                  name="no_lote_kitBach"
                  value={form.no_lote_kitBach}
                  onChange={handleChange}
                  error={!!errors.no_lote_kitBach}
                  helperText={errors.no_lote_kitBach}
                  sx={{ width: 210 }}
                />
              </Grid>
              {/* Se produjeron reacciones */}
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
              {/* Reacciones */}
              {showReacciones && (
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={!!errors.reaccion}>
                    <InputLabel>Reacciones:</InputLabel>
                    <Select
                      name="reaccion"
                      value={form.reaccion}
                      onChange={handleChange}
                      size="medium"
                      label="Reacciones:"
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

        {/* Botón Registrar */}
        <Grid container justifyContent="center" sx={{ marginTop: 8 }}>
          <BotonPersonalizado onClick={handleRegistrar}>
            Registrar
          </BotonPersonalizado>
        </Grid>
      </Box>
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

export default DonacionesPlasma;
