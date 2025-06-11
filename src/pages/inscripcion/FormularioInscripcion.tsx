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
  const { id } = useParams<{ id?: string }>();
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
    no_hc: "",
    nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    sexo: "",
    edad: "",
    municipio: "",
    provincia: "",
    color_piel: "",
    grupo_sanguine: "",
    factor: "",
    consejo_popular: "",
    no_consultorio: "",
  });

  //Estados para los datos de los select , el checbox y la HC
  const [componentes, setComponentes] = useState<any[]>([]);
  const [provincias, setProvincias] = useState<any[]>([]);
  const [showOtraLocalizacion, setShowOtraLocalizacion] = useState(false);
  const [sexos, setSexos] = useState<any[]>([]);
  const [gruposSanguineos, setGruposSanguineos] = useState<any[]>([]);
  const [coloresPiel, setColoresPiel] = useState<any[]>([]);
  const [factores, setFactores] = useState<any[]>([]);
  const [idHistoriaClinica, setIdHistoriaClinica] = useState<string>("");

  // Estado de errores por campo
  const [errors, setErrors] = useState({
    ci: "",
    componente: "",
    centroLaboral: "",
    ocupacion: "",
    telefono: "",
    telefonoLaboral: "",
    otraLocalizacion: "",
    no_hc: "",
    nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    sexo: "",
    edad: "",
    municipio: "",
    provincia: "",
    color_piel: "",
    grupo_sanguine: "",
    factor: "",
    consejo_popular: "",
    no_consultorio: "",
  });

  // Cargar datos del registro si hay id
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/registro-donacion/${id}`)
        .then((res) => {
          setForm({
            ci: res.data.historiaClinica?.ci || "",
            no_hc: res.data.historiaClinica?.no_hc || "",
            nombre: res.data.historiaClinica?.nombre || "",
            primer_apellido: res.data.historiaClinica?.primer_apellido || "",
            segundo_apellido: res.data.historiaClinica?.segundo_apellido || "",
            sexo:
              res.data.historiaClinica?.sexo?._id ||
              res.data.historiaClinica?.sexo ||
              "",
            edad: res.data.historiaClinica?.edad
              ? String(res.data.historiaClinica.edad)
              : "",
            municipio: res.data.historiaClinica?.municipio || "",
            provincia: res.data.historiaClinica?.provincia || "",
            color_piel: res.data.historiaClinica?.color_piel || "",
            grupo_sanguine:
              res.data.historiaClinica?.grupo_sanguine?._id ||
              res.data.historiaClinica?.grupo_sanguine ||
              "",
            factor:
              res.data.historiaClinica?.factor?._id ||
              res.data.historiaClinica?.factor ||
              "",
            consejo_popular: res.data.historiaClinica?.consejo_popular || "",
            no_consultorio: res.data.historiaClinica?.no_consultorio || "",
            ocupacion: res.data.historiaClinica?.ocupacion || "",
            telefono: res.data.historiaClinica?.telefono || "",
            telefonoLaboral: res.data.historiaClinica?.telefonoLaboral || "",
            centroLaboral: res.data.historiaClinica?.centro_laboral || "",
            otraLocalizacion: res.data.historiaClinica?.otra_localizacion || "",
            componente: res.data.componente?._id || res.data.componente || "",
          });
          setShowOtraLocalizacion(!!res.data.otraLocalizacion);
          setIdHistoriaClinica(res.data.historiaClinica?._id || "");
        })
        .catch(() => {});
    }
  }, [id]);

  // Cargar datos en mis select
  useEffect(() => {
    const fetchComponentes = async () => {
      try {
        const res = await axios.get("http://localhost:3000/componentes");
        setComponentes(res.data);
      } catch (error) {
        console.error("Error cargando componentes", error);
      }
    };
    const fetchProvincias = async () => {
      try {
        const res = await axios.get("http://localhost:3000/provincia");
        setProvincias(res.data);
      } catch (error) {
        console.error("Error cargando provincias", error);
        console.log(error);
      }
    };
    const fetchSexos = async () => {
      try {
        const res = await axios.get("http://localhost:3000/sexo");
        setSexos(res.data);
      } catch (error) {
        console.error("Error cargando sexos", error);
      }
    };
    const fetchGruposSanguineos = async () => {
      try {
        const res = await axios.get("http://localhost:3000/grupos-sanguineos");
        setGruposSanguineos(res.data);
      } catch (error) {
        console.error("Error cargando grupos sanguineos", error);
      }
    };
    const fetchColoresPiel = async () => {
      try {
        const res = await axios.get("http://localhost:3000/color-piel");
        setColoresPiel(res.data);
      } catch (error) {
        console.error("Error cargando colores de piel", error);
      }
    };
    const fetchFactores = async () => {
      try {
        const res = await axios.get("http://localhost:3000/factores");
        setFactores(res.data);
      } catch (error) {
        console.error("Error cargando factores", error);
      }
    };
    fetchComponentes();
    fetchProvincias();
    fetchSexos();
    fetchGruposSanguineos();
    fetchColoresPiel();
    fetchFactores();
  }, []);

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
    const newErrors: typeof errors = { ...errors };

    if (!form.ci.trim()) {
      newErrors.ci = "Campo obligatorio";
    } else {
      const ciValidation = validarCI(form.ci);
      if (ciValidation) newErrors.ci = ciValidation;
    }
    if (!form.componente.trim()) newErrors.componente = "Campo obligatorio";
    if (!form.centroLaboral.trim())
      newErrors.centroLaboral = "Campo obligatorio";
    if (!form.ocupacion.trim()) newErrors.ocupacion = "Campo obligatorio";
    if (!form.telefono.trim()) newErrors.telefono = "Campo obligatorio";
    if (!form.telefonoLaboral.trim())
      newErrors.telefonoLaboral = "Campo obligatorio";
    if (showOtraLocalizacion && !form.otraLocalizacion.trim())
      newErrors.otraLocalizacion = "Campo obligatorio";
    if (!form.no_hc.trim()) newErrors.no_hc = "Campo obligatorio";
    if (!form.nombre.trim()) newErrors.nombre = "Campo obligatorio";
    if (!form.primer_apellido.trim())
      newErrors.primer_apellido = "Campo obligatorio";
    if (!form.segundo_apellido.trim())
      newErrors.segundo_apellido = "Campo obligatorio";
    if (!form.sexo.trim()) newErrors.sexo = "Campo obligatorio";
    if (!form.edad.trim()) {
      newErrors.edad = "Campo obligatorio";
    } else if (!/^\d+$/.test(form.edad) || Number(form.edad) <= 0) {
      newErrors.edad = "Edad debe ser un número mayor que 0";
    }
    if (!form.municipio.trim()) newErrors.municipio = "Campo obligatorio";
    if (!form.provincia.trim()) newErrors.provincia = "Campo obligatorio";
    if (!form.color_piel.trim()) newErrors.color_piel = "Campo obligatorio";
    if (!form.grupo_sanguine.trim())
      newErrors.grupo_sanguine = "Campo obligatorio";
    if (!form.factor.trim()) newErrors.factor = "Campo obligatorio";
    if (!form.consejo_popular.trim())
      newErrors.consejo_popular = "Campo obligatorio";
    if (!form.no_consultorio.trim())
      newErrors.no_consultorio = "Campo obligatorio";

    setErrors(newErrors);
    return Object.values(newErrors).some((err) => err !== "");
  };

  // Manejar cambios en los campos
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any
  ) => {
    const { name, value } = e.target;
    if (name === "telefono" || name === "telefonoLaboral" || name === "edad") {
      if (!/^\d*$/.test(value)) return;
    }
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  // Manejar envío del formulario
  const handleRegistrar = async (e: any) => {
    e.preventDefault();
    if (validateFields()) {
      return;
    }

    let data;
    if (id) {
      // Para modificar, solo envía el ID de la historia clínica
      data = {
        historiaClinica: idHistoriaClinica, // solo el ID
        componente: form.componente,
        // ...otros campos de donación si los tienes
      };
    } else {
      // Para crear, envía el objeto completo
      data = {
        historiaClinica: {
          ci: form.ci,
          no_hc: form.no_hc,
          nombre: form.nombre,
          primer_apellido: form.primer_apellido,
          segundo_apellido: form.segundo_apellido,
          sexo: form.sexo,
          edad: Number(form.edad),
          municipio: form.municipio,
          provincia: form.provincia,
          color_piel: form.color_piel,
          grupo_sanguine: form.grupo_sanguine,
          factor: form.factor,
          consejo_popular: form.consejo_popular,
          no_consultorio: form.no_consultorio,
          ocupacion: form.ocupacion,
          telefono: form.telefono,
          telefonoLaboral: form.telefonoLaboral,
          centro_laboral: form.centroLaboral,
        },
        componente: form.componente,
      };
    }

    try {
      if (id) {
        await axios.put(
          `http://localhost:3000/historia-clinica/${idHistoriaClinica}`,
          {
            ci: form.ci,
            no_hc: form.no_hc,
            nombre: form.nombre,
            primer_apellido: form.primer_apellido,
            segundo_apellido: form.segundo_apellido,
            sexo: form.sexo,
            edad: Number(form.edad),
            municipio: form.municipio,
            provincia: form.provincia,
            color_piel: form.color_piel,
            grupo_sanguine: form.grupo_sanguine,
            factor: form.factor,
            consejo_popular: form.consejo_popular,
            no_consultorio: form.no_consultorio,
            ocupacion: form.ocupacion,
            telefono: form.telefono,
            telefonoLaboral: form.telefonoLaboral,
            centro_laboral: form.centroLaboral,
            // ...otros campos si tienes
          }
        );

        await axios.put(`http://localhost:3000/registro-donacion/${id}`, data);
        alert("Registro modificado exitosamente");
        navigate("/hoja-cargo");
      } else {
        await axios.post(`http://localhost:3000/registro-donacion/`, data);
        alert("Registro exitoso");
        navigate("/citados");
      }
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
          {/* Columna Izquierda */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={2} flexDirection={"column"}>
              <Grid item xs={12}>
                <Grid container spacing={2}>
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
                      disabled={Boolean(id)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="No. HC"
                      variant="outlined"
                      name="no_hc"
                      value={form.no_hc}
                      onChange={handleChange}
                      error={!!errors.no_hc}
                      helperText={errors.no_hc}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nombre"
                  variant="outlined"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  error={!!errors.nombre}
                  helperText={errors.nombre}
                />
              </Grid>
              {/* Primer Apellido y Segundo Apellido juntos */}
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item>
                    <TextField
                      fullWidth
                      label="Primer Apellido"
                      variant="outlined"
                      name="primer_apellido"
                      value={form.primer_apellido}
                      onChange={handleChange}
                      error={!!errors.primer_apellido}
                      helperText={errors.primer_apellido}
                      sx={{ width: 230 }}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      fullWidth
                      label="Segundo Apellido"
                      variant="outlined"
                      name="segundo_apellido"
                      value={form.segundo_apellido}
                      onChange={handleChange}
                      error={!!errors.segundo_apellido}
                      helperText={errors.segundo_apellido}
                      sx={{ width: 230 }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              {/* Edad, Sexo y Color de Piel juntos*/}
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <TextField
                      label="Edad"
                      variant="outlined"
                      name="edad"
                      value={form.edad}
                      onChange={handleChange}
                      error={!!errors.edad}
                      helperText={errors.edad}
                      type="number"
                      InputProps={{ sx: { minWidth: 0, maxWidth: 105 } }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth error={!!errors.sexo}>
                      <InputLabel>Sexo</InputLabel>
                      <Select
                        name="sexo"
                        value={form.sexo}
                        label="Sexo"
                        onChange={handleChange}
                        size="medium"
                        sx={{ minWidth: 110 }}
                      >
                        <MenuItem value="">Seleccione</MenuItem>
                        {sexos.map((sexo: any) => (
                          <MenuItem key={sexo._id} value={sexo._id}>
                            {sexo.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.sexo && (
                        <Typography color="error" variant="caption">
                          {errors.sexo}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl fullWidth error={!!errors.color_piel}>
                      <InputLabel>Color de Piel</InputLabel>
                      <Select
                        name="color_piel"
                        value={form.color_piel}
                        label="Color de Piel"
                        onChange={handleChange}
                        size="medium"
                        sx={{ minWidth: 150 }}
                      >
                        <MenuItem value="">Seleccione</MenuItem>
                        {coloresPiel.map((color: any) => (
                          <MenuItem key={color._id} value={color._id}>
                            {color.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.color_piel && (
                        <Typography color="error" variant="caption">
                          {errors.color_piel}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              {/* Grupo sanguíneo y factor juntos */}
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item>
                    <FormControl fullWidth error={!!errors.grupo_sanguine}>
                      <InputLabel>Grupo Sanguíneo</InputLabel>
                      <Select
                        name="grupo_sanguine"
                        value={form.grupo_sanguine}
                        label="Grupo Sanguíneo"
                        onChange={handleChange}
                        size="medium"
                        sx={{ minWidth: 230 }}
                      >
                        <MenuItem value="">Seleccione</MenuItem>
                        {gruposSanguineos.map((grupo: any) => (
                          <MenuItem key={grupo._id} value={grupo._id}>
                            {grupo.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.grupo_sanguine && (
                        <Typography color="error" variant="caption">
                          {errors.grupo_sanguine}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth error={!!errors.factor}>
                      <InputLabel>Factor</InputLabel>
                      <Select
                        name="factor"
                        value={form.factor}
                        label="Factor"
                        onChange={handleChange}
                        size="medium"
                        sx={{ minWidth: 120 }}
                      >
                        <MenuItem value="">Seleccione</MenuItem>
                        {factores.map((factor: any) => (
                          <MenuItem key={factor._id} value={factor._id}>
                            {factor.signo}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.factor && (
                        <Typography color="error" variant="caption">
                          {errors.factor}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Columna Derecha */}
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
              <Grid item xs={12}>
                <Grid container spacing={2}>
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
              </Grid>

              {/* Teléfonos */}
              <Grid item xs={12}>
                <Grid container spacing={2}>
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
              </Grid>

              {/* Municipio y Provincia juntos */}
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Municipio"
                      variant="outlined"
                      name="municipio"
                      value={form.municipio}
                      onChange={handleChange}
                      error={!!errors.municipio}
                      helperText={errors.municipio}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <FormControl fullWidth error={!!errors.provincia}>
                      <InputLabel>Provincia</InputLabel>
                      <Select
                        name="provincia"
                        value={form.provincia}
                        label="Provincia"
                        onChange={handleChange}
                        size="medium"
                        sx={{ minWidth: 210 }}
                      >
                        <MenuItem value="">Seleccione</MenuItem>
                        {provincias.map((prov: any) => (
                          <MenuItem key={prov._id} value={prov._id}>
                            {prov.nombre_provincia}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.provincia && (
                        <Typography color="error" variant="caption">
                          {errors.provincia}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
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

              {/* Consejo Popular y No. Consultorio */}
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Consejo Popular"
                      variant="outlined"
                      name="consejo_popular"
                      value={form.consejo_popular}
                      onChange={handleChange}
                      error={!!errors.consejo_popular}
                      helperText={errors.consejo_popular}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="No. Consultorio"
                      variant="outlined"
                      name="no_consultorio"
                      value={form.no_consultorio}
                      onChange={handleChange}
                      error={!!errors.no_consultorio}
                      helperText={errors.no_consultorio}
                    />
                  </Grid>
                </Grid>
              </Grid>
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
