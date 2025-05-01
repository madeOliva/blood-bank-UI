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
import { useNavigate } from "react-router-dom";
import LogoApp from "../../pictures/LogoApp.png";


export default function Login() {
  const navigate = useNavigate();

  const handlePrechequeo = () => {
    // Aquí puedes poner lógica de autenticación si lo deseas
    navigate("/prechequeo", { replace: true }); // Redirige a la vista de Prechequeo
  };

  const [showPassword, setShowPassword] = React.useState(false);

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
            sx={{ width:255,
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
            sx={{ width:255,
             
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

          <Button
            variant="contained"
            sx={{ color: "white", width: 255 }}
            onClick={handlePrechequeo}
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
