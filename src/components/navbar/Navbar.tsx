import { AppBar, Box, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import NavListDrawer from "./NavListDrawer";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu'
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token'); // Borra el token
    navigate("/", { replace: true }); // Redirige al login o home
  };

  const handleUser = () => {
    navigate("/usuario", { replace: true })
  }

  return (
    <>

    <AppBar position="fixed" sx={{ bgcolor: "white", borderColor: "primary.dark" }}>
        <Toolbar>
          <IconButton onClick={() => setOpen(true)} sx={{ color: "primary.dark" }}>
            <MenuIcon sx={{ fontSize: 35 }} />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Typography
        variant="h6"
        component="h5"
        sx={{ color: "primary.dark" }}
      >
        Banco de Sangre Provincial Pinar del Río
      </Typography>
      <IconButton sx={{ color: "primary.dark" }}>
            <PersonIcon sx={{ fontSize: 30 }}  onClick={handleUser}/>
          </IconButton>
          <IconButton sx={{ color: "primary.dark" }} onClick={handleLogout}>
            <LogoutIcon  sx={{ fontSize: 30 }} />
          </IconButton>
          
        </Toolbar>
      </AppBar>
      

      <Drawer open={open} anchor="left" onClose={() => setOpen(false)}>
        <NavListDrawer />
      </Drawer>
    </>
  );
}
