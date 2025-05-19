import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LogoApp from "../../pictures/LogoApp.png";
import HomeIcon from "@mui/icons-material/Home";
import DeskIcon from "@mui/icons-material/Desk";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentAddIcon from '@mui/icons-material/AssignmentAdd';
import EditDocumentIcon from "@mui/icons-material/EditDocument";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import BiotechIcon from "@mui/icons-material/Biotech";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import MedicationIcon from "@mui/icons-material/Medication";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import DeleteIcon from '@mui/icons-material/Delete';
import ScienceIcon from '@mui/icons-material/Science';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddIcon from '@mui/icons-material/Add';
import WaterDamageIcon from '@mui/icons-material/WaterDamage';
import Groups2Icon from '@mui/icons-material/Groups2';
import { useState } from "react";
import { Assignment } from "@mui/icons-material";
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import { useNavigate } from "react-router-dom";


export default function NavListDrawer() {

  const [open, setOpen] = useState(false);
  const [openHi, setOpenHi] = useState(false);
  const [openC, setOpenC] = useState(false);
  const [openP, setOpenP] = useState(false);
  const [openPre, setOpenPre] = useState(false);
  const [openL, setOpenL] = useState(false);
  const [openH, setOpenH] = useState(false);
  const [openCM, setOpenCM] = useState(false);


  const navigate = useNavigate();

  const handlePrechequeo = () => {
    // Aquí puedes poner lógica de autenticación si lo deseas
    navigate("/prechequeo", { replace: true }); // Redirige a la vista de Prechequeo
  };

  const handleDonacionesDiarias = () => {
    // Aquí puedes poner lógica de autenticación si lo deseas
    navigate("/vizualizar", { replace: true }); // Redirige a la vista de Prechequeo
  };

  const handleCalidad = () => {
    // Aquí puedes poner lógica de autenticación si lo deseas
    navigate("/calidad", { replace: true }); // Redirige a la vista de Prechequeo
  };

  const handleLiberacion = () => {
    // Aquí puedes poner lógica de autenticación si lo deseas
    navigate("/liberacion", { replace: true }); // Redirige a la vista de Prechequeo
  };

  const handleReanalizar = () => {
    // Aquí puedes poner lógica de autenticación si lo deseas
    navigate("/reanalizar", { replace: true }); // Redirige a la vista de Prechequeo
  };

  const handleDesecho = () => {
    // Aquí puedes poner lógica de autenticación si lo deseas
    navigate("/desechos", { replace: true }); // Redirige a la vista de Prechequeo
  };

  const handleRC = () => {
    // Aquí puedes poner lógica de autenticación si lo deseas
    navigate("/entrada_produccion", { replace: true }); // Redirige a la vista de Prechequeo
  };

  const handleCO = () => {
    // Aquí puedes poner lógica de autenticación si lo deseas
    navigate("/componentes_obtenidos", { replace: true }); // Redirige a la vista de Prechequeo
  };

  const handleGB = () => {
    // Aquí puedes poner lógica de autenticación si lo deseas
    navigate("/bajas", { replace: true }); // Redirige a la vista de Prechequeo
  };

  const handleEI = () => {
    // Aquí puedes poner lógica de autenticación si lo deseas
    navigate("/plasma_industria", { replace: true }); // Redirige a la vista de Prechequeo
  };

  const handleFormPlan = () => {
    // Aquí puedes poner lógica de autenticación si lo deseas
    navigate("/formularioplan", { replace: true }); // Redirige a la vista de Prechequeo
  };

  const handlePlanD = () => {
    // Aquí puedes poner lógica de autenticación si lo deseas
    navigate("/planDonaciones", { replace: true }); // Redirige a la vista de Prechequeo
  };

  const handleResumen = () => {
    // Aquí puedes poner lógica de autenticación si lo deseas
    navigate("/resumenDonaciones", { replace: true }); // Redirige a la vista de Prechequeo
  };

  const handlePedidos = () => {
    // Aquí puedes poner lógica de autenticación si lo deseas
    navigate("/pedidos", { replace: true }); // Redirige a la vista de Prechequeo
  };

   const handleRM = () => {
    // Aquí puedes poner lógica de autenticación si lo deseas
    navigate("/principal_lab", { replace: true }); // Redirige a la vista de Prechequeo
  };

   const handleLS = () => {
    // Aquí puedes poner lógica de autenticación si lo deseas
    navigate("/suma_lab", { replace: true }); // Redirige a la vista de Prechequeo
  };

  const handleLCC = () => {
    // Aquí puedes poner lógica de autenticación si lo deseas
    navigate("/calidad_lab", { replace: true }); // Redirige a la vista de Prechequeo
  };

  const handleLI = () => {
    // Aquí puedes poner lógica de autenticación si lo deseas
    navigate("/inmuno_lab", { replace: true }); // Redirige a la vista de Prechequeo
  };


   const handleLPacientes = () => {
    // Aquí puedes poner lógica de autenticación si lo deseas
    navigate("/listadop", { replace: true }); // Redirige a la vista de Prechequeo
  };

  

  



  return (
    <Box sx={{ width: 250, bgcolor: "white" }}>
      <nav>
        <List>
          <ListItem sx={{ bgcolor: "primary.dark" }}>
            <ListItemIcon>
              <Box
                component="img"
                src={LogoApp}
                alt="Descripción"
                sx={{ width: 200, height: 50, bgcolor: "primary.dark" }}
              />
            </ListItemIcon>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              sx={{
                "&:active .MuiListItemIcon-root": {
                  "& svg": {
                    // Apunta directamente al elemento SVG del icono
                    color: "red !important",
                  },
                },
                "&:active .MuiTypography-root": {
                  // Estilo para el texto
                  color: "red !important",
                },
              }}
            >
              <ListItemIcon>
                <HomeIcon
                  sx={{
                    color: "primary.dark",
                    marginLeft: 2,
                    "&:active .MuiListItemIcon-root": {
                      // Estilo para el icono
                      color: "red !important",
                    },
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Inicio" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => setOpenHi(!openHi)}
              sx={{
                "&:active .MuiListItemIcon-root": {
                  "& svg": {
                    // Apunta directamente al elemento SVG del icono
                    color: "red !important",
                  },
                },
                "&:active .MuiTypography-root": {
                  // Estilo para el texto
                  color: "red !important",
                },
              }}
            >
              <ListItemIcon>
                <AssignmentIcon sx={{ color: "primary.dark", marginLeft: 2 }} />
              </ListItemIcon>
              <ListItemText primary="Historia Clínica" />
            </ListItemButton>
          </ListItem>

          <Collapse in={openHi}>
            <List disablePadding>
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleLPacientes()} sx={{

                  "&:active .MuiListItemIcon-root": {
                    "& svg": {
                      // Apunta directamente al elemento SVG del icono
                      color: "red !important",
                    },
                  },
                  "&:active .MuiTypography-root": {
                    // Estilo para el texto
                    color: "red !important",
                  },
                }}>
                  <ListItemIcon>
                    <Groups2Icon sx={{ color: "secondary.main", marginLeft: 3 }} />
                  </ListItemIcon>
                  <ListItemText primary="Listado de Pacientes" />
                </ListItemButton>
              </ListItem>


              <ListItem disablePadding>
                <ListItemButton onClick={() => handleLCC()} sx={{

                  "&:active .MuiListItemIcon-root": {
                    "& svg": {
                      // Apunta directamente al elemento SVG del icono
                      color: "red !important",
                    },
                  },
                  "&:active .MuiTypography-root": {
                    // Estilo para el texto
                    color: "red !important",
                  },
                }}>
                  <ListItemIcon>
                    <FastfoodIcon sx={{ color: "secondary.main", marginLeft: 3 }} />
                  </ListItemIcon>
                  <ListItemText primary="Dietas" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton onClick={() => handleLCC()} sx={{

                  "&:active .MuiListItemIcon-root": {
                    "& svg": {
                      // Apunta directamente al elemento SVG del icono
                      color: "red !important",
                    },
                  },
                  "&:active .MuiTypography-root": {
                    // Estilo para el texto
                    color: "red !important",
                  },
                }}>
                  <ListItemIcon>
                    <ListAltIcon sx={{ color: "secondary.main", marginLeft: 3 }} />
                  </ListItemIcon>
                  <ListItemText primary="Donantes del CMF" />
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse>

          <ListItem disablePadding>
            <ListItemButton onClick={() => setOpen(!open)}
              sx={{
                "&:active .MuiListItemIcon-root": {
                  "& svg": {
                    // Apunta directamente al elemento SVG del icono
                    color: "red !important",
                  },
                },
                "&:active .MuiTypography-root": {
                  // Estilo para el texto
                  color: "red !important",
                },
              }}
            >
              <ListItemIcon>
                <DeskIcon sx={{ color: "primary.dark", marginLeft: 2 }} />
              </ListItemIcon>
              <ListItemText primary="Inscripción" />
            </ListItemButton>
          </ListItem>


          <Collapse in={open}>
            <List disablePadding>
              <ListItem disablePadding>
                <ListItemButton sx={{
                  pl: 9,
                  "&:active .MuiListItemIcon-root": {
                    "& svg": {
                      // Apunta directamente al elemento SVG del icono
                      color: "red !important",
                    },
                  },
                  "&:active .MuiTypography-root": {
                    // Estilo para el texto
                    color: "red !important",
                  },
                }}>
                  <ListItemText primary="Citados" />
                </ListItemButton>
              </ListItem>


              <ListItem disablePadding>
                <ListItemButton sx={{
                  pl: 9,
                  "&:active .MuiListItemIcon-root": {
                    "& svg": {
                      // Apunta directamente al elemento SVG del icono
                      color: "red !important",
                    },
                  },
                  "&:active .MuiTypography-root": {
                    // Estilo para el texto
                    color: "red !important",
                  },
                }}>
                  <ListItemText primary="Hoja de Cargo" />
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse>

              <ListItem disablePadding>
                <ListItemButton onClick={() => setOpenPre(!openPre)}
                  sx={{
                    "&:active .MuiListItemIcon-root": {
                      "& svg": {
                        // Apunta directamente al elemento SVG del icono
                        color: "red !important",
                      },
                    },
                    "&:active .MuiTypography-root": {
                      // Estilo para el texto
                      color: "red !important",
                    },
                  }}
                >
                  <ListItemIcon>
                    <VaccinesIcon sx={{ color: "primary.dark", marginLeft: 2 }} />
                  </ListItemIcon>
                  <ListItemText primary="Pre Chequeo" />
                </ListItemButton>
              </ListItem>

              <Collapse in={openPre}>
                <List disablePadding>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => handlePrechequeo()} sx={{

                      "&:active .MuiListItemIcon-root": {
                        "& svg": {
                          // Apunta directamente al elemento SVG del icono
                          color: "red !important",
                        },
                      },
                      "&:active .MuiTypography-root": {
                        // Estilo para el texto
                        color: "red !important",
                      },
                    }}>
                      <ListItemIcon>
                        <VaccinesIcon
                          sx={{ color: "secondary.main", marginLeft: 3 }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="Examenes de Prechequeo" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Collapse>

          <ListItem disablePadding>
            <ListItemButton
              sx={{
                "&:active .MuiListItemIcon-root": {
                  "& svg": {
                    // Apunta directamente al elemento SVG del icono
                    color: "red !important",
                  },
                },
                "&:active .MuiTypography-root": {
                  // Estilo para el texto
                  color: "red !important",
                },
              }}
            >
              <ListItemIcon>
                <EditDocumentIcon
                  sx={{ color: "primary.dark", marginLeft: 2 }}
                />
              </ListItemIcon>
              <ListItemText primary="Selección" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              sx={{
                "&:active .MuiListItemIcon-root": {
                  "& svg": {
                    // Apunta directamente al elemento SVG del icono
                    color: "red !important",
                  },
                },
                "&:active .MuiTypography-root": {
                  // Estilo para el texto
                  color: "red !important",
                },
              }}
            >
              <ListItemIcon>
                <WaterDropIcon sx={{ color: "primary.dark", marginLeft: 2 }} />
              </ListItemIcon>
              <ListItemText primary="Donación" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => setOpenC(!openC)}
              sx={{
                "&:active .MuiListItemIcon-root": {
                  "& svg": {
                    // Apunta directamente al elemento SVG del icono
                    color: "red !important",
                  },
                },
                "&:active .MuiTypography-root": {
                  // Estilo para el texto
                  color: "red !important",
                },
              }}
            >
              <ListItemIcon>
                <FactCheckIcon sx={{ color: "primary.dark", marginLeft: 2 }} />
              </ListItemIcon>
              <ListItemText primary="Calidad" />
            </ListItemButton>
          </ListItem>

          <Collapse in={openC}>
            <List disablePadding>
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleDonacionesDiarias()} sx={{
                  // pl: 7,
                  "&:active .MuiListItemIcon-root": {
                    "& svg": {
                      // Apunta directamente al elemento SVG del icono
                      color: "red !important",
                    },
                  },
                  "&:active .MuiTypography-root": {
                    // Estilo para el texto
                    color: "red !important",
                  },
                }}
                >
                  <ListItemIcon>
                    <WaterDropIcon sx={{ color: "secondary.main", marginLeft: 3 }} />
                  </ListItemIcon>
                  <ListItemText primary="Donaciones Diarias" />
                </ListItemButton>
              </ListItem>


              <ListItem disablePadding>
                <ListItemButton onClick={() => handleCalidad()} sx={{
                  "&:active .MuiListItemIcon-root": {
                    "& svg": {
                      // Apunta directamente al elemento SVG del icono
                      color: "red !important",
                    },
                  },
                  "&:active .MuiTypography-root": {
                    // Estilo para el texto
                    color: "red !important",
                  },
                }}>
                  <ListItemIcon>
                    <LocalHospitalIcon
                      sx={{ color: "secondary.main", marginLeft: 3 }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Donaciones por Entidad" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton onClick={() => handleLiberacion()} sx={{
                  "&:active .MuiListItemIcon-root": {
                    "& svg": {
                      // Apunta directamente al elemento SVG del icono
                      color: "red !important",
                    },
                  },
                  "&:active .MuiTypography-root": {
                    // Estilo para el texto
                    color: "red !important",
                  },
                }}>
                  <ListItemIcon>
                    <VaccinesIcon
                      sx={{ color: "secondary.main", marginLeft: 3 }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Liberación de Componentes" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton onClick={() => handleReanalizar()} sx={{
                  "&:active .MuiListItemIcon-root": {
                    "& svg": {
                      // Apunta directamente al elemento SVG del icono
                      color: "red !important",
                    },
                  },
                  "&:active .MuiTypography-root": {
                    // Estilo para el texto
                    color: "red !important",
                  },
                }}>
                  <ListItemIcon>
                    <ScienceIcon
                      sx={{ color: "secondary.main", marginLeft: 3 }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Muestras a Reanalizar" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton onClick={() => handleDesecho()} sx={{
                  "&:active .MuiListItemIcon-root": {
                    "& svg": {
                      // Apunta directamente al elemento SVG del icono
                      color: "red !important",
                    },
                  },
                  "&:active .MuiTypography-root": {
                    // Estilo para el texto
                    color: "red !important",
                  },
                }}>
                  <ListItemIcon>
                    <DeleteIcon
                      sx={{ color: "secondary.main", marginLeft: 3 }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Desechos" />
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse>



          <ListItem disablePadding>
            <ListItemButton onClick={() => setOpenP(!openP)}
              sx={{
                "&:active .MuiListItemIcon-root": {
                  "& svg": {
                    // Apunta directamente al elemento SVG del icono
                    color: "red !important",
                  },
                },
                "&:active .MuiTypography-root": {
                  // Estilo para el texto
                  color: "red !important",
                },
              }}
            >
              <ListItemIcon>
                <WaterDamageIcon sx={{ color: "primary.dark", marginLeft: 2 }} />
              </ListItemIcon>
              <ListItemText primary="Producción" />
            </ListItemButton>
          </ListItem>

          <Collapse in={openP}>
            <List disablePadding>
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleRC()} sx={{

                  "&:active .MuiListItemIcon-root": {
                    "& svg": {
                      // Apunta directamente al elemento SVG del icono
                      color: "red !important",
                    },
                  },
                  "&:active .MuiTypography-root": {
                    // Estilo para el texto
                    color: "red !important",
                  },
                }}>
                  <ListItemIcon>
                    <ScienceIcon
                      sx={{ color: "secondary.main", marginLeft: 3 }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Recepción y Centrifugacion" />
                </ListItemButton>
              </ListItem>




              <ListItem disablePadding>
                <ListItemButton onClick={() => handleCO()} sx={{

                  "&:active .MuiListItemIcon-root": {
                    "& svg": {
                      // Apunta directamente al elemento SVG del icono
                      color: "red !important",
                    },
                  },
                  "&:active .MuiTypography-root": {
                    // Estilo para el texto
                    color: "red !important",
                  },
                }}>
                  <ListItemIcon>
                    <VaccinesIcon
                      sx={{ color: "secondary.main", marginLeft: 3 }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Componentes obtenidos" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton onClick={() => handleGB()} sx={{
                  "&:active .MuiListItemIcon-root": {
                    "& svg": {
                      // Apunta directamente al elemento SVG del icono
                      color: "red !important",
                    },
                  },
                  "&:active .MuiTypography-root": {
                    // Estilo para el texto
                    color: "red !important",
                  },
                }}>
                  <ListItemIcon>
                    <DeleteIcon
                      sx={{ color: "secondary.main", marginLeft: 3 }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Gestión de bajas" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton onClick={() => handleEI()}sx={{

                  "&:active .MuiListItemIcon-root": {
                    "& svg": {
                      // Apunta directamente al elemento SVG del icono
                      color: "red !important",
                    },
                  },
                  "&:active .MuiTypography-root": {
                    // Estilo para el texto
                    color: "red !important",
                  },
                }}>
                  <ListItemIcon>
                    <MedicalServicesIcon
                      sx={{ color: "secondary.main", marginLeft: 3 }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Envíos a industria" />
                </ListItemButton>
              </ListItem>

            </List>
          </Collapse>

          <ListItem disablePadding>
            <ListItemButton onClick={() => setOpenL(!openL)}
              sx={{
                "&:active .MuiListItemIcon-root": {
                  "& svg": {
                    // Apunta directamente al elemento SVG del icono
                    color: "red !important",
                  },
                },
                "&:active .MuiTypography-root": {
                  // Estilo para el texto
                  color: "red !important",
                },
              }}
            >
              <ListItemIcon>
                <BiotechIcon sx={{ color: "primary.dark", marginLeft: 2 }} />
              </ListItemIcon>
              <ListItemText primary="Laboratorio" />
            </ListItemButton>
          </ListItem>

          <Collapse in={openL}>
            <List disablePadding>
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleRM()} sx={{

                  "&:active .MuiListItemIcon-root": {
                    "& svg": {
                      // Apunta directamente al elemento SVG del icono
                      color: "red !important",
                    },
                  },
                  "&:active .MuiTypography-root": {
                    // Estilo para el texto
                    color: "red !important",
                  },
                }}>
                  <ListItemIcon>
                    <ScienceIcon
                      sx={{ color: "secondary.main", marginLeft: 3 }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Recepción de Muestras" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton onClick={() => handleLS()}
                  sx={{
                    "&:active .MuiListItemIcon-root": {
                      "& svg": {
                        // Apunta directamente al elemento SVG del icono
                        color: "red !important",
                      },
                    },
                    "&:active .MuiTypography-root": {
                      // Estilo para el texto
                      color: "red !important",
                    },
                  }}>
                  <ListItemIcon>
                    <AddIcon sx={{ color: "secondary.main", marginLeft: 3 }} />
                  </ListItemIcon>
                  <ListItemText primary="Laboratorio Suma" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton onClick={() => handleLI()}
                  sx={{

                    "&:active .MuiListItemIcon-root": {
                      "& svg": {
                        // Apunta directamente al elemento SVG del icono
                        color: "red !important",
                      },
                    },
                    "&:active .MuiTypography-root": {
                      // Estilo para el texto
                      color: "red !important",
                    },
                  }}>
                  <ListItemIcon>
                    <WaterDropIcon sx={{ color: "secondary.main", marginLeft: 3 }} />
                  </ListItemIcon>
                  <ListItemText primary="Laboratorio Inmunohematología" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton onClick={() => handleLCC()}
                  sx={{
                    "&:active .MuiListItemIcon-root": {
                      "& svg": {
                        // Apunta directamente al elemento SVG del icono
                        color: "red !important",
                      },
                    },
                    "&:active .MuiTypography-root": {
                      // Estilo para el texto
                      color: "red !important",
                    },
                  }}>
                  <ListItemIcon>
                    <FactCheckIcon sx={{ color: "secondary.main", marginLeft: 3 }} />
                  </ListItemIcon>
                  <ListItemText primary="Laboratorio Control de Calidad" />
                </ListItemButton>
              </ListItem>
            </List>

          </Collapse>

          <ListItem disablePadding>
            <ListItemButton onClick={() => setOpenCM(!openCM)}
              sx={{
                "&:active .MuiListItemIcon-root": {
                  "& svg": {
                    // Apunta directamente al elemento SVG del icono
                    color: "red !important",
                  },
                },
                "&:active .MuiTypography-root": {
                  // Estilo para el texto
                  color: "red !important",
                },
              }}
            >
              <ListItemIcon>
                <LocalShippingIcon
                  sx={{ color: "primary.dark", marginLeft: 2 }}
                />
              </ListItemIcon>
              <ListItemText primary="Centro Móvil" />
            </ListItemButton>
          </ListItem>

          <Collapse in={openCM}>
            <List disablePadding>
              <ListItem disablePadding>
                <ListItemButton onClick={() => handlePlanD()} sx={{

                  "&:active .MuiListItemIcon-root": {
                    "& svg": {
                      // Apunta directamente al elemento SVG del icono
                      color: "red !important",
                    },
                  },
                  "&:active .MuiTypography-root": {
                    // Estilo para el texto
                    color: "red !important",
                  },
                }}>
                  <ListItemIcon>
                    <Assignment
                      sx={{ color: "secondary.main", marginLeft: 3 }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Plan de Trabajo" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton onClick={() => handleFormPlan()}
                  sx={{
                    "&:active .MuiListItemIcon-root": {
                      "& svg": {
                        // Apunta directamente al elemento SVG del icono
                        color: "red !important",
                      },
                    },
                    "&:active .MuiTypography-root": {
                      // Estilo para el texto
                      color: "red !important",
                    },
                  }}>
                  <ListItemIcon>
                    <AssignmentAddIcon sx={{ color: "secondary.main", marginLeft: 3 }} />
                  </ListItemIcon>
                  <ListItemText primary="Fromulario Plan de Trabajo" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton onClick={() => handlePedidos()}
                  sx={{

                    "&:active .MuiListItemIcon-root": {
                      "& svg": {
                        // Apunta directamente al elemento SVG del icono
                        color: "red !important",
                      },
                    },
                    "&:active .MuiTypography-root": {
                      // Estilo para el texto
                      color: "red !important",
                    },
                  }}>
                  <ListItemIcon>
                    <LowPriorityIcon sx={{ color: "secondary.main", marginLeft: 3 }} />
                  </ListItemIcon>
                  <ListItemText primary="Pedidos y Devoluciones" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton onClick={() => handleResumen()}
                  sx={{
                    "&:active .MuiListItemIcon-root": {
                      "& svg": {
                        // Apunta directamente al elemento SVG del icono
                        color: "red !important",
                      },
                    },
                    "&:active .MuiTypography-root": {
                      // Estilo para el texto
                      color: "red !important",
                    },
                  }}>
                  <ListItemIcon>
                    <FactCheckIcon sx={{ color: "secondary.main", marginLeft: 3 }} />
                  </ListItemIcon>
                  <ListItemText primary="Plan de Trabajo Mensual" />
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse>


          <ListItem disablePadding>
            <ListItemButton onClick={() => setOpenH(!openH)}
              sx={{
                "&:active .MuiListItemIcon-root": {
                  "& svg": {
                    // Apunta directamente al elemento SVG del icono
                    color: "red !important",
                  },
                },
                "&:active .MuiTypography-root": {
                  // Estilo para el texto
                  color: "red !important",
                },
              }}
            >
              <ListItemIcon>
                <LocalHospitalIcon
                  sx={{ color: "primary.dark", marginLeft: 2 }}
                />
              </ListItemIcon>
              <ListItemText primary="Hospitalización" />
            </ListItemButton>
          </ListItem>

          <Collapse in={openH}>
            <List disablePadding>
              <ListItem disablePadding>
                <ListItemButton sx={{
                  pl: 9,
                  "&:active .MuiListItemIcon-root": {
                    "& svg": {
                      // Apunta directamente al elemento SVG del icono
                      color: "red !important",
                    },
                  },
                  "&:active .MuiTypography-root": {
                    // Estilo para el texto
                    color: "red !important",
                  },
                }}>
                  <ListItemText primary="Pacientes a Transfundir" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton
                  sx={{
                    pl: 9,
                    "&:active .MuiListItemIcon-root": {
                      "& svg": {
                        // Apunta directamente al elemento SVG del icono
                        color: "red !important",
                      },
                    },
                    "&:active .MuiTypography-root": {
                      // Estilo para el texto
                      color: "red !important",
                    },
                  }}>
                  <ListItemText primary="Orden de Transfusión" />
                </ListItemButton>
              </ListItem>


            </List>

          </Collapse>



          <ListItem disablePadding>
            <ListItemButton
              sx={{
                "&:active .MuiListItemIcon-root": {
                  "& svg": {
                    // Apunta directamente al elemento SVG del icono
                    color: "red !important",
                  },
                },
                "&:active .MuiTypography-root": {
                  // Estilo para el texto
                  color: "red !important",
                },
              }}
            >
              <ListItemIcon>
                <MedicationIcon sx={{ color: "primary.dark", marginLeft: 2 }} />
              </ListItemIcon>
              <ListItemText primary="Transfusiones" />
            </ListItemButton>
          </ListItem>

        </List>


      </nav >
    </Box >
  );
}
