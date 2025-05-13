// Boton reutilizable para toda la app
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";

interface BotonPersonalizadoProps {
  children: React.ReactNode; // Tipo para el contenido del botón
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // Tipo para el evento onClick
  sx?: object; // Tipo para los estilos personalizados
  [key: string]: any; // Para permitir props adicionales
}

const BotonPersonalizado: React.FC<BotonPersonalizadoProps>= ({
  children,
  onClick,
  sx = {},
  ...props
}) => {
  const theme = useTheme();

  return (
    <Button
      variant="outlined"
      onClick={onClick}
      sx={{
        backgroundColor: "#fff",
        color: "#000",
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
        transition: "all 0.2s",
        "&:hover": {
          borderColor: "#009688",
          backgroundColor: "#fff",
        },
        "&:active": {
          borderColor: "#009688",
          backgroundColor: "#009688",
          color: "#fff",
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default BotonPersonalizado;


