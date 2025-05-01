import { AppBar, Drawer, IconButton, Toolbar } from "@mui/material";
import NavListDrawer from "./NavListDrawer";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu'

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>

    <AppBar position="fixed" sx={{bgcolor:"white", borderColor:"primary.dark"}}>
        <Toolbar>
            <IconButton onClick={() => setOpen(true)} sx={{color:"primary.dark"}}>
                <MenuIcon sx={{fontSize:35}}/>
            </IconButton>
        </Toolbar>
    </AppBar>
      

      <Drawer open={open} anchor="left" onClose={() => setOpen(false)}>
        <NavListDrawer />
      </Drawer>
    </>
  );
}
