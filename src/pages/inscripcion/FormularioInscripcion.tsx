// import React, { useState } from "react";
// import {
//   Box,
//   TextField,
//   Typography,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Checkbox,
//   FormControlLabel,
//   Grid,
// } from "@mui/material";
// import Navbar from "../../components/navbar/Navbar"; // Componente Navbar
// import BotonPersonalizado from "../../components/Button";
// import { useNavigate } from "react-router-dom";
// import axios from "axios"; // Importar axios para realizar solicitudes HTTP

// const FormularioInscripcion: React.FC = () => {

//   const navigate = useNavigate(); // Hook para navegar entre páginas

//   // Función para manejar el registro

//   const [showOtraLocalizacion, setShowOtraLocalizacion] = useState(false); // Estado para controlar la visibilidad
//   return (
//     <>
//       {/* Navbar */}
//       <Navbar />
//       <Typography
//         variant="h4"
//         component="h5"
//         mt={8}
//         sx={{
//           fontSize: { xs: "2rem", md: "3rem" },
//           textAlign: "center",
//           backgroundColor: "#00796B",
//           color: "white",
//           marginTop: 10,
//           fontFamily: '"Open Sans"',
//         }}
//       >
//         Inscripcion
//       </Typography>

//       {/* Contenido principal */}
//       <Box sx={{ padding: 2, marginTop: 2 }}>
//         <Grid
//           container
//           spacing={30}
//           sx={{ display: "flex", justifyContent: "center" }}
//         >
//           {/* Columna Izquierda: Información Personal */}
//           <Grid item xs={12} md={6}>
//             <Box sx={{ border: "1px solid #ccc", padding: 2, borderRadius: 2 }}>
//               {/* Carnet de Identidad */}
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Carnet de Identidad"
//                   variant="outlined"
//                   defaultValue="803011112"
//                 />
//               </Grid>
//               <Typography variant="h6" sx={{ marginBottom: 2 }}>
//                 Información Personal
//               </Typography>
//               <Typography>Nombre y Apellidos: Elvina Hastings</Typography>
//               <Typography>Sexo: Femenino</Typography>
//               <Typography>Fecha de Nacimiento: 01/03/80</Typography>
//               <Typography>
//                 Dirección: 1459 Hunting Hill Loop, Guardian Bldg, Springfield,
//                 IL, 97088
//               </Typography>
//               <Typography>Municipio: Virginia</Typography>
//               <Typography>Provincia: Palacios</Typography>
//               <Typography>Área de Salud: Pedro Borrás</Typography>
//               <Typography>No. HC: 02020202020</Typography>
//               <Typography>Edad: 45</Typography>
//               <Typography>Consultorio: 5</Typography>
//             </Box>
//           </Grid>

//           {/* Columna Derecha: Formulario */}
//           <Grid item xs={12} md={6}>
//             <Grid container spacing={2} flexDirection={"column"}>
//               {/* Donante de */}
//               <Grid item xs={12} md={6}>
//                 <FormControl fullWidth>
//                   <InputLabel>Donante de:</InputLabel>
//                   <Select defaultValue="" size="medium">
//                     <MenuItem value="">Seleccione</MenuItem>
//                     <MenuItem value="voluntario">Voluntario</MenuItem>
//                     <MenuItem value="reposicion">Reposición</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>

//               {/* Centro Laboral y Ocupacion */}
//               <Grid container spacing={2} flexDirection={"row"}>
//                 <Grid item xs={12}>
//                   <TextField
//                     fullWidth
//                     label="Centro Laboral"
//                     variant="outlined"
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField fullWidth label="Ocupación" variant="outlined" />
//                 </Grid>
//               </Grid>

//               {/* Teléfonos */}
//               <Grid container spacing={2} flexDirection={"row"}>
//                 <Grid item xs={6}>
//                   <TextField fullWidth label="Teléfono" variant="outlined" />
//                 </Grid>
//                 <Grid item xs={6}>
//                   <TextField
//                     fullWidth
//                     label="Teléfono Laboral"
//                     variant="outlined"
//                   />
//                 </Grid>
//               </Grid>

//               {/* Otra Localización */}
//               <Grid item xs={12}>
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       checked={showOtraLocalizacion}
//                       onChange={(e) =>
//                         setShowOtraLocalizacion(e.target.checked)
//                       }
//                     />
//                   }
//                   label="Otra Localización"
//                 />
//               </Grid>
//               {showOtraLocalizacion && (
//                 <Grid item xs={12}>
//                   <TextField
//                     fullWidth
//                     label="Otra Localización"
//                     variant="outlined"
//                     multiline
//                     rows={3}
//                   />
//                 </Grid>
//               )}
//               {/* Dirección de Residencia */}
//             </Grid>
//           </Grid>
//         </Grid>

//         {/* Botón Aceptar */}
//         <Grid container justifyContent="center" sx={{ marginTop: 8 }}>
//           <BotonPersonalizado onClick={() => navigate("/citados")}>
//             Registrar
//           </BotonPersonalizado>
//         </Grid>
//       </Box>
//     </>
//   );
// };

// export default FormularioInscripcion;

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
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FormularioInscripcion: React.FC = () => {
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

  const [componentes, setComponentes] = useState<any[]>([]);
  const [showOtraLocalizacion, setShowOtraLocalizacion] = useState(false);

  // Cargar componentes al montar el componente
  useEffect(() => {
    const fetchComponentes = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/componentes"
        );
        setComponentes(res.data);
        console.log("Componentes cargados:", res.data);
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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Manejar envío del formulario
  const handleRegistrar = async (e:any) => {
    e.preventDefault();
    try {
      // Ajusta la URL y los campos según tu backend
      console.error("entrando");
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
                />
              </Grid>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Información Personal
              </Typography>
              {/* Aquí puedes mostrar datos personales si los tienes */}
            </Box>
          </Grid>

          {/* Columna Derecha: Formulario */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={2} flexDirection={"column"}>
              {/* Donante de */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
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
                  {/* <Select defaultValue="" size="medium">
                    <MenuItem value="">Seleccione</MenuItem>
                    <MenuItem value="voluntario">Voluntario</MenuItem>
                    <MenuItem value="reposicion">Reposición</MenuItem>
                  </Select> */}
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
                    name="otraLocalizacion"
                    value={form.otraLocalizacion}
                    onChange={handleChange}
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
