// Boton reutilizable para toda la app
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";

const BotonPersonalizado = ({
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
          borderColor: "red",
          backgroundColor: "#fff",
        },
        "&:active": {
          borderColor: "red",
          backgroundColor: "red",
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


