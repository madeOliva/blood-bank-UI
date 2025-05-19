import { Box, Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LogoApp from "../../pictures/LogoApp.png";
import { useNavigate } from "react-router-dom";
import axios, { isAxiosError } from "axios";



interface LoginResponse {
  access_token: string;
}


export default function Login() {

  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const navigate = useNavigate();

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

  const handleLogin = async () => {
    setError('');

    if (!email || !password) {
      setError('Por favor ingresa email y contraseña');
      return;
    }

    try {
      const response = await axios.post<LoginResponse>('http://localhost:3000/auth/login', {
        email,
        password,
      });

      const { access_token } = response.data;
      console.log('eeee')

      if (!access_token) {
        setError('No se recibió token de autenticación');
        return;
      }
      localStorage.setItem('token', access_token);
      navigate('/prechequeo');
    } catch (err) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.message || 'Error al iniciar sesión. Intenta de nuevo.');
      } else {
        setError('Error al iniciar sesión. Intenta de nuevo.');
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
            sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
          >
            BIENVENIDO
          </Typography>

          <TextField
            id="outlined-basic"
            label="Email"
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
              Password
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

          {error && (
            <Typography color="error" variant="body2" sx={{ mb: 1 }}>
              {error}
            </Typography>
          )}

          <Button
            variant="contained"
            sx={{ color: "white", width: 255 }}
            onClick={handleLogin}
          >
            INICIAR SESION
          </Button>

          <a href="/register">Registrate</a>
        </Box>

        <Box
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
    </div>
  );
}
