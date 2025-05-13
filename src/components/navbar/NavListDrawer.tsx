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

export default function NavListDrawer() {

  const [open, setOpen] = useState(false);
  const [openHi, setOpenHi] = useState(false);
  const [openC, setOpenC] = useState(false);
  const [openP, setOpenP] = useState(false);
  const [openL, setOpenL] = useState(false);
  const [openH, setOpenH] = useState(false);

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
                <ListItemButton sx={{

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
                <ListItemButton sx={{

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
                <ListItemButton sx={{

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
                <VaccinesIcon sx={{ color: "primary.dark", marginLeft: 2 }} />
              </ListItemIcon>
              <ListItemText primary="Pre Chequeo" />
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
                <ListItemButton sx={{
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
                <ListItemButton sx={{
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
                <ListItemButton sx={{
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
                  <ListItemText primary="Liberación de Componentes" />
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
                <ListItemButton sx={{

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
                <ListItemButton sx={{
    
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
                <ListItemButton sx={{
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
                <ListItemButton sx={{

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
                <ListItemButton sx={{

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
                  }}>
                  <ListItemIcon>
                    <AddIcon sx={{ color: "secondary.main", marginLeft: 3 }} />
                  </ListItemIcon>
                  <ListItemText primary="Laboratorio Suma" />
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
                  }}>
                  <ListItemIcon>
                    <WaterDropIcon sx={{ color: "secondary.main", marginLeft: 3 }} />
                  </ListItemIcon>
                  <ListItemText primary="Laboratorio Inmunohematología" />
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
                <LocalShippingIcon
                  sx={{ color: "primary.dark", marginLeft: 2 }}
                />
              </ListItemIcon>
              <ListItemText primary="Centro Móvil" />
            </ListItemButton>
          </ListItem>

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
