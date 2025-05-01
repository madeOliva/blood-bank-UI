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
import BarChartIcon from "@mui/icons-material/BarChart";
import MedicationIcon from "@mui/icons-material/Medication";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { useState } from "react";

export default function NavListDrawer() {

  const [open, setOpen] = useState(false);
  const [openC, setOpenC] = useState(false);
  const [openP, setOpenP] = useState(false);

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
                <AssignmentIcon sx={{ color: "primary.dark", marginLeft: 2 }} />
              </ListItemIcon>
              <ListItemText primary="Historia Clínica" />
            </ListItemButton>
          </ListItem>

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
                    <WaterDropIcon sx={{ color: "secondary.main", marginLeft:4 }} />
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
                sx={{ color: "secondary.main", marginLeft: 4 }}
              />
            </ListItemIcon>
                  <ListItemText primary="Donaciones por entidad" />
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
                  <ListItemText primary="Liberación de componentes" />
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
                <BarChartIcon sx={{ color: "primary.dark", marginLeft: 2 }} />
              </ListItemIcon>
              <ListItemText primary="Producción" />
            </ListItemButton>
          </ListItem>

          <Collapse in={openP}>
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
                  <ListItemText primary="Recepción de componentes" />
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
                  <ListItemText primary="Centrifugación" />
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
                  <ListItemText primary="Componentes obtenidos" />
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
                  <ListItemText primary="Gestión de bajas" />
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
                  <ListItemText primary="Envíos a industria" />
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
                <BiotechIcon sx={{ color: "primary.dark", marginLeft: 2 }} />
              </ListItemIcon>
              <ListItemText primary="Laboratorio" />
            </ListItemButton>
          </ListItem>
        </List>

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
            <ListItemText primary="Centro Movil" />
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
              <LocalHospitalIcon
                sx={{ color: "primary.dark", marginLeft: 2 }}
              />
            </ListItemIcon>
            <ListItemText primary="Hospitalizacion" />
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
              <MedicationIcon sx={{ color: "primary.dark", marginLeft: 2 }} />
            </ListItemIcon>
            <ListItemText primary="Transfusiones" />
          </ListItemButton>
        </ListItem>
      </nav>
    </Box>
  );
}
