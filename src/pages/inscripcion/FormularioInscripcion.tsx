import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Grid,
} from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import BotonPersonalizado from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const FormularioInscripcion: React.FC = () => {
  const { ci } = useParams<{ ci?: string }>();
  //const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  // Estado para los campos del formulario
  const [form, setForm] = useState({
    ci: "",
    componente: "",
    centroLaboral: "",
    ocupacion: "",
    telefono: "",
    telefonoLaboral: "",
    otraLocalizacion: "",
  });

  // Estado para la historia clínica
  const [historiaClinica, setHistoriaClinica] = useState<any>(null);

  // Cuando cambia el parámetro ci en la URL, actualiza el campo ci del formulario
  useEffect(() => {
    if (ci) {
      setForm((prev) => ({
        ...prev,
        ci: ci,
      }));
    }
  }, [ci]);

  // Cargar datos del registro si hay id
  useEffect(() => {
    if (ci) {
      axios
        .get(`http://localhost:3000/registro-donacion/${ci}`)
        .then((res) => {
          console.log(res.data);
          setForm({
            ci: res.data.ci_donante ||  "",
            componente: res.data.componente?._id || res.data.componente || "",
            centroLaboral: res.data.centroLaboral || "",
            ocupacion: res.data.ocupacion || "",
            telefono: res.data.telefono || "",
            telefonoLaboral: res.data.telefonoLaboral || "",
            otraLocalizacion: res.data.otraLocalizacion || "",
          });
          setShowOtraLocalizacion(!!res.data.otraLocalizacion);
        })
        .catch(() => {});
    }
  }, [ci]);

  // Buscar historia clínica cuando el CI es válido
  useEffect(() => {
    const buscarHistoria = async () => {
      if (/^\d{11}$/.test(form.ci)) {
        try {
          const res = await axios.get(
            `http://localhost:3000/historia-clinica/${form.ci}`
          );
          setHistoriaClinica(res.data);
        } catch (error) {
          setHistoriaClinica(null);
        }
      } else {
        setHistoriaClinica(null);
      }
    };
    buscarHistoria();
  }, [form.ci]);

  const [componentes, setComponentes] = useState<any[]>([]);
  const [showOtraLocalizacion, setShowOtraLocalizacion] = useState(false);

  // Estado de errores por campo
  const [errors, setErrors] = useState({
    ci: "",
    componente: "",
    centroLaboral: "",
    ocupacion: "",
    telefono: "",
    telefonoLaboral: "",
    otraLocalizacion: "",
  });

  // Validación de CI
  const validarCI = (ci: string): string => {
    if (!/^\d{11}$/.test(ci))
      return "El CI debe tener exactamente 11 dígitos numéricos.";
    const mes = parseInt(ci.slice(2, 4), 10);
    const dia = parseInt(ci.slice(4, 6), 10);
    if (mes < 1 || mes > 12) return "El mes en el CI no es válido.";
    if (dia < 1 || dia > 31) return "El día en el CI no es válido.";
    return "";
  };

  // Validar todos los campos
  const validateFields = () => {
    const newErrors: typeof errors = {
      ci: "",
      componente: "",
      centroLaboral: "",
      ocupacion: "",
      telefono: "",
      telefonoLaboral: "",
      otraLocalizacion: "",
    };

    // CI
    if (!form.ci.trim()) {
      newErrors.ci = "Campo obligatorio";
    } else {
      const ciValidation = validarCI(form.ci);
      if (ciValidation) newErrors.ci = ciValidation;
    }

    // Componente
    if (!form.componente.trim()) newErrors.componente = "Campo obligatorio";
    // Centro Laboral
    if (!form.centroLaboral.trim())
      newErrors.centroLaboral = "Campo obligatorio";
    // Ocupación
    if (!form.ocupacion.trim()) newErrors.ocupacion = "Campo obligatorio";
    // Teléfono
    if (!form.telefono.trim()) newErrors.telefono = "Campo obligatorio";
    // Teléfono Laboral
    if (!form.telefonoLaboral.trim())
      newErrors.telefonoLaboral = "Campo obligatorio";
    // Otra Localización (solo si el checkbox está marcado)
    if (showOtraLocalizacion && !form.otraLocalizacion.trim())
      newErrors.otraLocalizacion = "Campo obligatorio";

    setErrors(newErrors);

    // Devuelve true si hay algún error
    return Object.values(newErrors).some((err) => err !== "");
  };

  // Cargar componentes al montar el componente
  useEffect(() => {
    const fetchComponentes = async () => {
      try {
        const res = await axios.get("http://localhost:3000/componentes");
        setComponentes(res.data);
      } catch (error) {
        console.error("Error cargando componentes", error);
      }
    };
    fetchComponentes();
  }, []);

  // Manejar cambios en los campos
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any
  ) => {
    const { name, value } = e.target;

    // Solo permitir números en teléfono y teléfono laboral
    if (name === "telefono" || name === "telefonoLaboral") {
      if (!/^\d*$/.test(value)) return; // Solo números, permite vacío
    }

    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Limpia error al escribir
  };

  // Manejar envío del formulario
  const handleRegistrar = async (e: any) => {
    e.preventDefault();
    if (validateFields()) {
      return;
    }
    try {
      await axios.post(
        `http://localhost:3000/registro-donacion/${form.ci}`,
        form
      );
      alert("Registro exitoso");
      navigate("/citados");
    } catch (error) {
      alert("Error al registrar");
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
        Inscripcion
      </Typography>

      <Box sx={{ padding: 2, marginTop: 2 }}>
        <Grid
          container
          spacing={30}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {/* Columna Izquierda: Información Personal */}
          <Grid item xs={12} md={6}>
            <Box sx={{ border: "1px solid #ccc", padding: 2, borderRadius: 2 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Carnet de Identidad"
                  variant="outlined"
                  name="ci"
                  value={form.ci}
                  onChange={handleChange}
                  error={!!errors.ci}
                  helperText={
                    errors.ci || "Debe tener 11 dígitos. Ej: 99010112345"
                  }
                  inputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                    maxLength: 11,
                  }}
                  disabled={Boolean(ci)} // <-- Solo deshabilitado si viene por la ruta
                />
              </Grid>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Información Personal
              </Typography>
              {/* Mostrar información personal si existe historiaClinica */}
              {historiaClinica && (
                <Box
                  sx={{
                    mt: 2,
                    mb: 2,
                    p: 2,
                    border: "1px solid #eee",
                    borderRadius: 2,
                    background: "#f9f9f9",
                  }}
                >
                  <Typography variant="subtitle1">
                    <b>Nombre y apellidos:</b> {historiaClinica.nombre}{" "}
                    {historiaClinica.apellidos}
                  </Typography>
                  <Typography variant="subtitle1">
                    <b>No.HC:</b> {historiaClinica.no_hc}
                  </Typography>
                  <Typography variant="subtitle1">
                    <b>Edad:</b> {historiaClinica.edad}
                  </Typography>
                  <Typography variant="subtitle1">
                    <b>Sexo:</b> {historiaClinica.sexo}
                  </Typography>
                  <Typography variant="subtitle1">
                    <b>Fecha de nacimiento:</b>{" "}
                    {historiaClinica.fecha_nacimiento}
                  </Typography>
                  <Typography variant="subtitle1">
                    <b>Dirección:</b> {historiaClinica.direccion}
                  </Typography>
                  <Typography variant="subtitle1">
                    <b>Provincia:</b> {historiaClinica.provincia}
                  </Typography>
                  <Typography variant="subtitle1">
                    <b>Municipio:</b> {historiaClinica.municipio}
                  </Typography>
                  <Typography variant="subtitle1">
                    <b>Área de salud:</b> {historiaClinica.area_salud}
                  </Typography>
                  <Typography variant="subtitle1">
                    <b>Consultorio:</b> {historiaClinica.consultorio}
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>

          {/* Columna Derecha: Formulario */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={2} flexDirection={"column"}>
              {/* Donante de */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={!!errors.componente}>
                  <InputLabel>Donante de:</InputLabel>
                  <Select
                    name="componente"
                    value={form.componente}
                    onChange={handleChange}
                    size="medium"
                  >
                    <MenuItem value="">Seleccione</MenuItem>
                    {componentes.map((comp) => (
                      <MenuItem key={comp._id} value={comp._id}>
                        {comp.nombreComponente}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.componente && (
                    <Typography color="error" variant="caption">
                      {errors.componente}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              {/* Centro Laboral y Ocupacion */}
              <Grid container spacing={2} flexDirection={"row"}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Centro Laboral"
                    variant="outlined"
                    name="centroLaboral"
                    value={form.centroLaboral}
                    onChange={handleChange}
                    error={!!errors.centroLaboral}
                    helperText={errors.centroLaboral}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Ocupación"
                    variant="outlined"
                    name="ocupacion"
                    value={form.ocupacion}
                    onChange={handleChange}
                    error={!!errors.ocupacion}
                    helperText={errors.ocupacion}
                  />
                </Grid>
              </Grid>

              {/* Teléfonos */}
              <Grid container spacing={2} flexDirection={"row"}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Teléfono"
                    variant="outlined"
                    name="telefono"
                    value={form.telefono}
                    onChange={handleChange}
                    error={!!errors.telefono}
                    helperText={errors.telefono}
                    type="tel"
                    inputProps={{
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                      maxLength: 15,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Teléfono Laboral"
                    variant="outlined"
                    name="telefonoLaboral"
                    value={form.telefonoLaboral}
                    onChange={handleChange}
                    error={!!errors.telefonoLaboral}
                    helperText={errors.telefonoLaboral}
                    type="tel"
                    inputProps={{
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                      maxLength: 15,
                    }}
                  />
                </Grid>
              </Grid>

              {/* Otra Localización */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={showOtraLocalizacion}
                      onChange={(e) => {
                        setShowOtraLocalizacion(e.target.checked);
                        if (!e.target.checked) {
                          setForm({ ...form, otraLocalizacion: "" });
                          setErrors({ ...errors, otraLocalizacion: "" });
                        }
                      }}
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
                    name="otraLocalizacion"
                    value={form.otraLocalizacion}
                    onChange={handleChange}
                    error={!!errors.otraLocalizacion}
                    helperText={errors.otraLocalizacion}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>

        {/* Botón Aceptar */}
        <Grid container justifyContent="center" sx={{ marginTop: 8 }}>
          <BotonPersonalizado onClick={handleRegistrar}>
            Registrar
          </BotonPersonalizado>
        </Grid>
      </Box>
    </>
  );
};

export default FormularioInscripcion;
