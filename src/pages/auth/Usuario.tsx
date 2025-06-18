import React, { useState, useEffect } from "react";
import {
  AppBar, Toolbar, Typography, Box, Avatar, Modal, Card, CardContent, Button
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import BotonPersonalizado from "../../components/Button";
import Navbar from "../../components/navbar/Navbar";
import Usuario from "../../pictures/Usuario.jpg";

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
      <Navbar>
        { /*<Toolbar>
          <Typography variant="body1" sx={{ mr: 2 }}>
            {user.email} ({user.role})
          </Typography>
          <Avatar 
            sx={{ bgcolor: "primary.main", cursor: "pointer" }}
            onClick={() => setOpen(true)}
          >
            <AccountCircleIcon />
          </Avatar>
        </Toolbar>*/}
      </Navbar>

      {/* Mensaje de bienvenida */}
      <Box sx={{ mt: 10, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          ¡Bienvenido!
        </Typography>

        <img
          src={Usuario}
          alt="Img Usuario"
          style={{
            width: "100%",
            maxWidth: "400px", // Ajusta según necesidad
            height: "auto",
            objectFit: "contain",
            padding: "20px", // Espacio en móviles
          }} />

        <Typography variant="subtitle1">
          Profesion: {user.role}
        </Typography>
        <Typography variant="subtitle2">
          Correo: {user.email}
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
              <BotonPersonalizado
                variant="contained"
                sx={{ mt: 2 }}
                fullWidth
                onClick={() => setOpen(false)}
              >
                Cerrar
              </BotonPersonalizado>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </>
  );
}