import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import LogoApp from "../../pictures/LogoApp.png";
import { useNavigate } from "react-router-dom";
import React from "react";
import axios, { isAxiosError } from "axios";
import { jwtDecode } from "jwt-decode";

interface RegisterResponse {
  access_token: string;
}

interface JwtPayload {
  email: string;
  password: string;
  role: string;
}


export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [role, setRole] = React.useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleRegister = async () => {
    setError('');

    if (!name || !email || !password || !role) {
      setError('Por favor completa todos los campos');
      return;
    }

    try {
      const response = await axios.post<RegisterResponse>('http://localhost:3000/auth/register', {
        name,
        email,
        password,
        role,
      });

      const { access_token } = response.data;

      if (!access_token) {
        setError('No se recibió token de autenticación');
        return;
      }

      // Decodifica el token y guarda el rol
      const decoded = jwtDecode<JwtPayload>(access_token);
      localStorage.setItem('token', access_token);
      localStorage.setItem('userRole', decoded.role);
      if (decoded.role === 'Médico de selección') {
        navigate('/resultadosprechequeo');
      } else if (decoded.role === 'Técnico de aseguramiento de calidad') {
        navigate('/vizualizar');
      } else if(decoded.role === 'Médico del hospital') {
        navigate('/');
      }else if(decoded.role === 'Médico del consultorio') {
        navigate('/listadop');
      }else if(decoded.role === 'Técnico de prechequeo'){
        navigate('/prechequeo');
      }else if (decoded.role === 'Jefe de extracción móvil'){
        navigate('/planDonaciones')
      }else if (decoded.role === 'Técnico de móvil'){
        navigate('/planDonaciones')
      }else if (decoded.role === 'Técnico de inscripción'){
        navigate('/citados')
      }else if (decoded.role === 'Técnico de transfusión'){
        navigate('/pageone')
      }else if (decoded.role === 'Técnico de donación'){
        navigate('/lista-espera')
      }else if (decoded.role === 'Técnico de laboratorio suma' || decoded.role === 'Técnico de laboratorio inmuno' || decoded.role === 'Técnico de laboratorio calidad'){
        navigate('/principal_lab')
      }else if (decoded.role === 'Técnico de producción'){
        navigate('/entrada_produccion')
      }
      else {
        setError('No tienes permiso para acceder a esta sección.');
      }
    } catch (err) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.message || 'Error al registrarse. Intenta de nuevo.');
      } else {
        setError('Error al registrarse. Intenta de nuevo.');
      }
    }
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          backgroundColor: "#00796B",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column", // Elementos en columna
            alignItems: "center", // Centrado horizontal
            justifyContent: "center", // Centrado vertical
            height: "100vh", // Altura completa (ajustar según necesidad)
            width: "50%",
            gap: 2, // Espacio entre elementos (opcional)
            borderEndEndRadius: 30,
            borderTopRightRadius: 30,
            backgroundColor: "white",
          }}
        >
          <Typography
            variant="h3"
            component="h4"
            mt={8}
            sx={{ fontSize: { xs: "3rem", md: "3rem" } }}
          >
            REGÍSTRATE
          </Typography>

          <TextField
            id="outlined-basicc"
            label="Nombre"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{
              width: 255,

              // Cambia el color del texto
              "& .MuiOutlinedInput-root": {
                color: "#000",
                // Cambia el color del borde
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#00796B",
                },
                // Cambia el color del borde al hacer foco
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#00796B",
                },
              },
              // Cambia el color del label
              "& .MuiInputLabel-outlined": {
                color: "#009688",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                paddingLeft: "8px",
                paddingRight: "8px",
              },
            }}
          />

          <TextField
            id="outlined-basic"
            label="Correo"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              width: 255,

              // Cambia el color del texto
              "& .MuiOutlinedInput-root": {
                color: "#000",
                // Cambia el color del borde
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#00796B",
                },
                // Cambia el color del borde al hacer foco
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#00796B",
                },
              },
              // Cambia el color del label
              "& .MuiInputLabel-outlined": {
                color: "#009688",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                paddingLeft: "8px",
                paddingRight: "8px",
              },
            }}
          />

          <FormControl
            sx={{
              width: 255,
              m: 1,
              // Cambia el color del texto
              "& .MuiOutlinedInput-root": {
                color: "#000",
                // Cambia el color del borde
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#00796B",
                },
                // Cambia el color del borde al hacer foco
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#00796B",
                },
              },
              // Cambia el color del label
              "& .MuiInputLabel-outlined": {
                color: "#009688",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                paddingLeft: "8px",
                paddingRight: "8px",
              },
            }}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Contraseña
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          <TextField
            id="outlined-basicc"
            label="Rol"
            variant="outlined"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            sx={{
              width: 255,

              // Cambia el color del texto
              "& .MuiOutlinedInput-root": {
                color: "#000",
                // Cambia el color del borde
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#00796B",
                },
                // Cambia el color del borde al hacer foco
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#00796B",
                },
              },
              // Cambia el color del label
              "& .MuiInputLabel-outlined": {
                color: "#009688",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                paddingLeft: "8px",
                paddingRight: "8px",
              },
            }}
          />

          {error && (
            <Typography color="error" variant="body2" sx={{ mb: 1 }}>
              {error}
            </Typography>
          )}

          <Button
            variant="contained"
            sx={{ color: "white", width: 255 }}
            onClick={handleRegister}
          >
            Regístrate
          </Button>
          <a href="/">Inicia Sesión</a>
        </Box>




        < Box
          bgcolor={"#00796B"}
          sx={{
            display: "flex",
            alignItems: "center", // Centrado horizontal
            justifyContent: "center", // Centrado vertical
            width: "50%",
          }}
        >
          <img
            src={LogoApp}
            alt="Logo"
            style={{
              width: "100%",
              maxWidth: "400px", // Ajusta según necesidad
              height: "auto",
              objectFit: "contain",
              padding: "20px", // Espacio en móviles
            }}
          />
        </Box>
      </Box>
    </div >
  );
}
