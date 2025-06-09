import React, { useState, useEffect } from "react";
import {
  AppBar, Toolbar, Typography, Box, Avatar, Modal, Card, CardContent, Button
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface JwtPayload {
  email: string;
  password: string;
  role: string;
}

export default function UsuarioActivo() {
  const [user, setUser] = useState<JwtPayload | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setUser(decoded);
      } catch {
        setUser(null);
      }
    }
  }, []);

  if (!user) return null;

  return (
    <>
      {/* Navbar */}
      <AppBar position="static" sx={{ bgcolor: "white", color: "primary.dark" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Banco de Sangre Provincial
          </Typography>
          <Typography variant="body1" sx={{ mr: 2 }}>
            {user.email} ({user.role})
          </Typography>
          <Avatar 
            sx={{ bgcolor: "primary.main", cursor: "pointer" }}
            onClick={() => setOpen(true)}
          >
            <AccountCircleIcon />
          </Avatar>
        </Toolbar>
      </AppBar>

      {/* Mensaje de bienvenida */}
      <Box sx={{ mt: 6, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          ¡Bienvenido!
        </Typography>
        <Typography variant="subtitle1">
          Rol: {user.role}
        </Typography>
        <Typography variant="subtitle2">
          Email: {user.email}
        </Typography>
      </Box>

      {/* Modal con datos del usuario */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 350,
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            p: 3,
          }}
        >
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Perfil de usuario
              </Typography>
              <Typography variant="body1"><b>Email:</b> {user.email}</Typography>
              <Typography variant="body1"><b>Rol:</b> {user.role}</Typography>
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                fullWidth
                onClick={() => setOpen(false)}
              >
                Cerrar
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </>
  );
}