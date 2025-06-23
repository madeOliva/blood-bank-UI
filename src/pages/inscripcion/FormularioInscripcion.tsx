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
  DialogTitle,
  DialogContent,
  Dialog,
} from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import BotonPersonalizado from "../../components/Button";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const municipiosPinarDelRio = [
  { codigo: "101", nombre: "Pinar del Río" },
  { codigo: "102", nombre: "Consolación del Sur" },
  { codigo: "103", nombre: "Guane" },
  { codigo: "104", nombre: "La Palma" },
  { codigo: "105", nombre: "Los Palacios" },
  { codigo: "106", nombre: "Mantua" },
  { codigo: "107", nombre: "Minas de Matahambre" },
  { codigo: "108", nombre: "San Juan y Martínez" },
  { codigo: "109", nombre: "San Luis" },
  { codigo: "110", nombre: "Sandino" },
  { codigo: "111", nombre: "Viñales" }
];

const FormularioInscripcion: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const historiaClinica = location.state?.historiaClinica;
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
  console.log(usuario.name);

  const camposVacios = {
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
    ocupacion: "",
    telefono: "",
    telefonoLaboral: "",
    centroLaboral: "",
    otraLocalizacion: "",
    direccion: "",
    fecha_nacimiento: "",
  };

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
    direccion: "",
    fecha_nacimiento: "",
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
    direccion: "",
    fecha_nacimiento: "",
  });

  //Para Calcular la edad
  function calcularEdad(fechaNacimiento: string): number {
    if (!fechaNacimiento) return 0;
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const m = hoy.getMonth() - nacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  }

  // Estados para el modal de éxito
  const [openSuccess, setOpenSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Estados para el modal de error
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Efecto para cargar datos de la historia clínica cundo se seleccione una de la lista de citados
  useEffect(() => {
    if (historiaClinica) {
      setForm({
        ...form,
        ci: historiaClinica.ci,
        nombre: historiaClinica.nombre,
        primer_apellido: historiaClinica.primer_apellido,
        segundo_apellido: historiaClinica.segundo_apellido,
        sexo: historiaClinica.sexo?._id || historiaClinica.sexo,
        edad: historiaClinica.edad ? String(historiaClinica.edad) : "",
        municipio: historiaClinica.municipio,
        provincia: historiaClinica.provincia?._id || historiaClinica.provincia,
        color_piel: historiaClinica.color_piel,
        grupo_sanguine:
          historiaClinica.grupo_sanguine?._id || historiaClinica.grupo_sanguine,
        factor: historiaClinica.factor?._id || historiaClinica.factor,
        consejo_popular: historiaClinica.consejo_popular,
        no_consultorio: historiaClinica.no_consultorio,
        ocupacion: historiaClinica.ocupacion,
        telefono: historiaClinica.telefono,
        telefonoLaboral: historiaClinica.telefonoLaboral,
        centroLaboral: historiaClinica.centro_laboral,
        otraLocalizacion: historiaClinica.otra_localizacion,
        no_hc: historiaClinica.no_hc,
        direccion: historiaClinica.direccion,
        fecha_nacimiento: historiaClinica.fecha_nacimiento,
      });
      setShowOtraLocalizacion(!!historiaClinica.otra_localizacion);
    }
  }, [historiaClinica]);

  useEffect(() => {
    // Solo buscar si el CI tiene 11 dígitos
    if (/^\d{11}$/.test(form.ci)) {
      axios
        .get(`http://localhost:3000/historia-clinica/ci/${form.ci}`)
        .then((res) => {
          if (res.data) {
            // Llena los campos del formulario con los datos encontrados
            setForm((prev) => ({
              ...prev,
              no_hc: res.data.no_hc || "",
              nombre: res.data.nombre || "",
              primer_apellido: res.data.primer_apellido || "",
              segundo_apellido: res.data.segundo_apellido || "",
              sexo: res.data.sexo?._id || res.data.sexo || "",
              edad: res.data.edad ? String(res.data.edad) : "",
              municipio: res.data.municipio || "",
              provincia: res.data.provincia?._id || res.data.provincia || "",
              direccion: res.data.direccion || "",
              color_piel: res.data.color_piel || "",
              grupo_sanguine:
                res.data.grupo_sanguine?._id || res.data.grupo_sanguine || "",
              factor: res.data.factor?._id || res.data.factor || "",
              consejo_popular: res.data.consejo_popular || "",
              no_consultorio: res.data.no_consultorio || "",
              ocupacion: res.data.ocupacion || "",
              telefono: res.data.telefono || "",
              telefonoLaboral: res.data.telefonoLaboral || "",
              centroLaboral: res.data.centro_laboral || "",
              otraLocalizacion: res.data.otra_localizacion || "",
              fecha_nacimiento: res.data.fecha_nacimiento
                ? res.data.fecha_nacimiento.slice(0, 10)
                : prev.fecha_nacimiento, // <-- SOLO si viene, si no, deja la que ya estaba
              // ...otros campos...
            }));
            setShowOtraLocalizacion(!!res.data.otra_localizacion);
            setIdHistoriaClinica(res.data._id || "");
          }
        })
        .catch(() => {
          // Si no existe, limpia los campos (opcional)
          setForm({ ...form, ...camposVacios });
          setShowOtraLocalizacion(false);
          setIdHistoriaClinica("");
        });
    } else {
      // Si el CI no tiene 11 dígitos, limpia los campos dependientes
      setForm((prev) => ({
        ...prev,
        ...camposVacios,
        ci: prev.ci, // Mantén el valor actual del CI
      }));
      setShowOtraLocalizacion(false);
      setIdHistoriaClinica("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.ci]);

  // Cargar datos del registro si hay id (Esto es cuando voy a modificar)
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
            direccion: res.data.historiaClinica?.direccion || "",
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
            fecha_nacimiento: res.data.historiaClinica?.fecha_nacimiento
              ? res.data.historiaClinica.fecha_nacimiento.slice(0, 10)
              : "",
          });
          setShowOtraLocalizacion(!!res.data.otraLocalizacion);
          setIdHistoriaClinica(res.data.historiaClinica?._id || "");
        })
        .catch(() => {
          setShowOtraLocalizacion(false);
        });
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
    } else if (Number(form.edad) < 18 || Number(form.edad) > 65) {
      newErrors.edad = "Edad debe estar entre 18 y 65 años";
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
    if (name === "fecha_nacimiento") {
      const nuevaEdad = calcularEdad(value);
      setForm({ ...form, [name]: value, edad: nuevaEdad.toString() });
    } else {
      setForm({ ...form, [name]: value });
    }
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
          otra_localizacion: form.otraLocalizacion,
          direccion: form.direccion,
          fecha_nacimiento: form.fecha_nacimiento,
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
            otra_localizacion: form.otraLocalizacion,
            direccion: form.direccion,
            fecha_nacimiento: form.fecha_nacimiento,
          }
        );

        await axios.put(`http://localhost:3000/registro-donacion/${id}`, data);
        //alert("Registro modificado exitosamente");
        setSuccessMessage("¡Se ha modificado satisfactoriamente!");
        setOpenSuccess(true);
        // Navega después de un pequeño delay para que el usuario vea el modal
        setTimeout(() => {
          setOpenSuccess(false);
          navigate("/hoja-cargo");
        }, 1800);
      } else {
        const datosAEnviar = {
          ...data,
          responsableInscripcion: usuario.name, // o el campo correcto
        };
        console.log("Responsable que se envía:", usuario.name, datosAEnviar);
        await axios.post(
          "http://localhost:3000/registro-donacion",
          datosAEnviar
        );
        setSuccessMessage("¡Se ha registrado correctamente!");
        setOpenSuccess(true);
        setTimeout(() => {
          setOpenSuccess(false);
          navigate("/citados");
        }, 1800);
      }
    } catch (error: any) {
      setErrorMessage(
        error?.response?.data?.message ||
          "Ocurrió un error al registrar. Intente nuevamente."
      );
      setOpenError(true);
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
                      sx={{ minWidth: 230 }}
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
                      sx={{ minWidth: 200, maxWidth: 250 }}
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
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Fecha de Nacimiento"
                      name="fecha_nacimiento"
                      type="date"
                      value={form.fecha_nacimiento}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      variant="outlined"
                      sx={{ minWidth: 230 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      sx={{ minWidth: 230 }}
                      label="Nombre"
                      variant="outlined"
                      name="nombre"
                      value={form.nombre}
                      onChange={handleChange}
                      error={!!errors.nombre}
                      helperText={errors.nombre}
                    />
                  </Grid>
                </Grid>
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
                      disabled
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
                    <FormControl fullWidth error={!!errors.municipio}>
                      <InputLabel>Municipio</InputLabel>
                      <Select
                        name="municipio"
                        value={form.municipio}
                        label="Municipio"
                        onChange={handleChange}
                        sx={{ minWidth: 210 }}
                      >
                        <MenuItem value="">Seleccione</MenuItem>
                        {municipiosPinarDelRio.map((mun) => (
                          <MenuItem key={mun.codigo} value={mun.nombre}>
                            {mun.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.municipio && (
                        <Typography color="error" variant="caption">
                          {errors.municipio}
                        </Typography>
                      )}
                    </FormControl>
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
              {/*Direccion Particular*/}
              <Grid item xs={12}>
                <TextField
                  label="Dirección Particular"
                  name="direccion"
                  value={form.direccion}
                  onChange={handleChange}
                  multiline
                  minRows={2}
                  maxRows={2}
                  fullWidth
                  variant="outlined"
                />
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
                      onChange={(e) => {
                        // Solo permite números
                        const value = e.target.value.replace(/\D/g, "");
                        setForm({ ...form, no_consultorio: value });
                        setErrors({ ...errors, no_consultorio: "" });
                      }}
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
      {/* Modal Éxito Registro/Modificación */}
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
      {/* Modal Error Registro/Modificación */}
      <Dialog
        open={openError}
        onClose={() => setOpenError(false)}
        aria-labelledby="error-dialog-title"
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
          id="error-dialog-title"
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={1}
          >
            <span style={{ color: "#d32f2f", fontSize: 60 }}>✖</span>
            <Typography variant="h5" fontWeight="bold" color="error">
              Error
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography
            variant="body1"
            textAlign="center"
            sx={{ mt: 1, fontSize: "1.1rem" }}
          >
            {errorMessage}
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FormularioInscripcion;
