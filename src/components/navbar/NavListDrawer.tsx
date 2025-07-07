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
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";

export default function NavListDrawer() {
  const navigate = useNavigate();

  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    setUserRole(localStorage.getItem('userRole'));
  }, []);


  const [open, setOpen] = useState(false);
  const [openHi, setOpenHi] = useState(false);
  const [openC, setOpenC] = useState(false);
  const [openD, setOpenD] = useState(false);
  const [openP, setOpenP] = useState(false);
  const [openPre, setOpenPre] = useState(false);
  const [openL, setOpenL] = useState(false);
  const [openH, setOpenH] = useState(false);
  const [openCM, setOpenCM] = useState(false);


  const handleInicio = () => {
    localStorage.removeItem('access_token');
    navigate("/", { replace: true });
  };

  const handleListaE = () => {
    navigate("/lista-espera", { replace: true });
  };

  const handleHojaC = () => {
    navigate("/hoja-cargo", { replace: true });
  };

  const handleHojaD = () => {
    navigate("/hoja-cargo-donaciones", { replace: true });
  }

  const handlePrechequeo = () => {
    navigate("/prechequeo", { replace: true });
  };

  const handleResultados = () => {
    navigate("/resultadosprechequeo", { replace: true });
  };

  const handleNoAptos = () => {
    navigate("/registronoaptos", { replace: true });
  };


  const handleDonacionesDiarias = () => {
    navigate("/vizualizar", { replace: true });
  };

  const handleCalidad = () => {
    navigate("/calidad", { replace: true });
  };

  const handleLiberacion = () => {
    navigate("/liberacion", { replace: true });
  };

  const handleReanalizar = () => {
    navigate("/reanalizar", { replace: true });
  };

  const handleDesecho = () => {
    navigate("/desechos", { replace: true });
  };

  const handleDesechospro = () => {
    navigate("/desechospro", { replace: true });
  };


  const handleRC = () => {
    navigate("/entrada_produccion", { replace: true });
  };

  const handleCO = () => {
    navigate("/componentes_obtenidos", { replace: true });
  };

  const handleGB = () => {
    navigate("/bajas", { replace: true });
  };

  const handleEI = () => {
    navigate("/plasma_industria", { replace: true });
  };

  const handleFormPlan = () => {
    navigate("/formularioplan", { replace: true });
  };

  const handlePlanD = () => {
    navigate("/planDonaciones", { replace: true });
  };

  const handleResumen = () => {
    navigate("/resumenDonaciones", { replace: true });
  };

  const handlePedidos = () => {
    navigate("/pedidos", { replace: true });
  };

  const handleRM = () => {
    navigate("/principal_lab", { replace: true });
  };

  const handleLS = () => {
    navigate("/suma_lab", { replace: true });
  };

  const handleLCC = () => {
    navigate("/calidad_lab", { replace: true });
  };

  const handleLI = () => {
    navigate("/inmuno_lab", { replace: true });
  };

  const handleLPacientes = () => {
    navigate("/listadop", { replace: true });
  };

  const handleDietas = () => {
    navigate("/dieta", { replace: true });
  };

  const handleDonantesC = () => {
    navigate("/donantesCMF", { replace: true });
  };

  const handleCitadosD = () => {
    navigate("/citadosps", { replace: true });
  };

  const handleT = () => {
    navigate("/pageone", { replace: true });
  };

  const handlePacientesT = () => {
    navigate("/listadoPacientes", { replace: true });
  };

  const handleOrdenT = () => {
    navigate("/crearOrden", { replace: true });
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
            <ListItemButton onClick={() => handleInicio()}
              sx={{
                "&:active .MuiListItemIcon-root": {
                  "& svg": {
                    color: "red !important",
                  },
                },
                "&:active .MuiTypography-root": {
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
                      color: "red !important",
                    },
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Inicio" />
            </ListItemButton>
          </ListItem>

          {(userRole === 'Médico del consultorio') && (
            <>
              <ListItem disablePadding>
                <ListItemButton onClick={() => setOpenHi(!openHi)}
                  sx={{
                    "&:active .MuiListItemIcon-root": {
                      "& svg": {
                        color: "red !important",
                      },
                    },
                    "&:active .MuiTypography-root": {
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
                          color: "red !important",
                        },
                      },
                      "&:active .MuiTypography-root": {
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
                    <ListItemButton onClick={() => handleDietas()} sx={{
                      "&:active .MuiListItemIcon-root": {
                        "& svg": {
                          color: "red !important",
                        },
                      },
                      "&:active .MuiTypography-root": {
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
                    <ListItemButton onClick={() => handleDonantesC()} sx={{
                      "&:active .MuiListItemIcon-root": {
                        "& svg": {
                          color: "red !important",
                        },
                      },
                      "&:active .MuiTypography-root": {
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
            </>)}

          {(userRole === 'Técnico de inscripción') && (
            <>

              <ListItem disablePadding>
                <ListItemButton onClick={() => setOpen(!open)}
                  sx={{
                    "&:active .MuiListItemIcon-root": {
                      "& svg": {
                        color: "red !important",
                      },
                    },
                    "&:active .MuiTypography-root": {
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
                    <ListItemButton onClick={() => navigate('/citados')} sx={{
                  
                      "&:active .MuiListItemIcon-root": {
                        "& svg": {
                          color: "red !important",
                        },
                      },
                      "&:active .MuiTypography-root": {
                        color: "red !important",
                      },
                    }}>
                       <ListItemIcon>
                        <Groups2Icon sx={{ color: "secondary.main", marginLeft: 3 }} />
                      </ListItemIcon>
                      <ListItemText primary="Citados" />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton onClick={() => handleHojaC()} sx={{
                      
                      "&:active .MuiListItemIcon-root": {
                        "& svg": {
                          color: "red !important",
                        },
                      },
                      "&:active .MuiTypography-root": {
                        color: "red !important",
                      },
                    }}>
                      <ListItemIcon>
                        <EditDocumentIcon sx={{ color: "secondary.main", marginLeft: 3 }} />
                      </ListItemIcon>
                      <ListItemText primary="Hoja de Cargo" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Collapse>
            </>)}


          {(userRole === 'Médico de selección' || userRole === 'Técnico de prechequeo' || userRole === 'Admin') && (
            <>
              <ListItem disablePadding>
                <ListItemButton onClick={() => setOpenPre(!openPre)}
                  sx={{
                    "&:active .MuiListItemIcon-root": {
                      "& svg": {
                        color: "red !important",
                      },
                    },
                    "&:active .MuiTypography-root": {
                      color: "red !important",
                    },
                  }}
                >
                  <ListItemIcon>
                    <VaccinesIcon sx={{ color: "primary.dark", marginLeft: 2 }} />
                  </ListItemIcon>
                  <ListItemText primary="Pre Chequeo y Selección" />
                </ListItemButton>
              </ListItem>

              <Collapse in={openPre}>
                <List disablePadding>
                  {userRole === 'Técnico de prechequeo' && (
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => handlePrechequeo()} sx={{
                      "&:active .MuiListItemIcon-root": {
                        "& svg": {
                          color: "red !important",
                        },
                      },
                      "&:active .MuiTypography-root": {
                        color: "red !important",
                      },
                    }}>
                      <ListItemIcon>
                        <VaccinesIcon sx={{ color: "secondary.main", marginLeft: 3 }} />
                      </ListItemIcon>
                      <ListItemText primary="Examenes de Prechequeo" />
                    </ListItemButton>
                  </ListItem>
                  )}
                  {userRole === 'Médico de selección' && (
                    <>
                      <ListItem disablePadding>
                        <ListItemButton onClick={() => handleCitadosD()} sx={{
                          "&:active .MuiListItemIcon-root": {
                            "& svg": {
                              color: "red !important",
                            },
                          },
                          "&:active .MuiTypography-root": {
                            color: "red !important",
                          },
                        }}>
                          <ListItemIcon>
                            <Groups2Icon sx={{ color: "secondary.main", marginLeft: 3 }} />
                          </ListItemIcon>
                          <ListItemText primary="Citados" />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton onClick={() => handleResultados()} sx={{
                          "&:active .MuiListItemIcon-root": {
                            "& svg": {
                              color: "red !important",
                            },
                          },
                          "&:active .MuiTypography-root": {
                            color: "red !important",
                          },
                        }}>
                          <ListItemIcon>
                            <EditDocumentIcon sx={{ color: "secondary.main", marginLeft: 3 }} />
                          </ListItemIcon>
                          <ListItemText primary="Resultados de exámenes" />
                        </ListItemButton>
                      </ListItem>

                      <ListItem disablePadding>
                        <ListItemButton onClick={() => handleNoAptos()} sx={{
                          "&:active .MuiListItemIcon-root": {
                            "& svg": {
                              color: "red !important",
                            },
                          },
                          "&:active .MuiTypography-root": {
                            color: "red !important",
                          },
                        }}>
                          <ListItemIcon>
                            <CancelIcon sx={{ color: "secondary.main", marginLeft: 3 }} />
                          </ListItemIcon>
                          <ListItemText primary="Donantes no Aptos" />
                        </ListItemButton>
                      </ListItem>
                    </>
                  )}
                </List>
              </Collapse>
            </>
          )}

          {(userRole === 'Técnico de donación') && (
            <>
              <ListItem disablePadding>
                <ListItemButton onClick={() => setOpenD(!openD)}
                  sx={{
                    "&:active .MuiListItemIcon-root": {
                      "& svg": {
                        color: "red !important",
                      },
                    },
                    "&:active .MuiTypography-root": {
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

              <Collapse in={openD}>
                <List disablePadding>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => handleListaE()} sx={{
                      "&:active .MuiListItemIcon-root": {
                        "& svg": {
                          color: "red !important",
                        },
                      },
                      "&:active .MuiTypography-root": {
                        color: "red !important",
                      },
                    }}>
                      <ListItemIcon>
                        <Groups2Icon sx={{ color: "secondary.main", marginLeft: 3 }} />
                      </ListItemIcon>
                      <ListItemText primary="Lista de Espera" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => handleHojaD()} sx={{
                      "&:active .MuiListItemIcon-root": {
                        "& svg": {
                          color: "red !important",
                        },
                      },
                      "&:active .MuiTypography-root": {
                        color: "red !important",
                      },
                    }}>
                      <ListItemIcon>
                        <EditDocumentIcon sx={{ color: "secondary.main", marginLeft: 3 }} />
                      </ListItemIcon>
                      <ListItemText primary="Hoja de Cargo" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Collapse>
            </>
          )}

          {(userRole === 'Técnico de aseguramiento de calidad') && (
            <>

              <ListItem disablePadding>
                <ListItemButton onClick={() => setOpenC(!openC)}
                  sx={{
                    "&:active .MuiListItemIcon-root": {
                      "& svg": {
                        color: "red !important",
                      },
                    },
                    "&:active .MuiTypography-root": {
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
                      "&:active .MuiListItemIcon-root": {
                        "& svg": {
                          color: "red !important",
                        },
                      },
                      "&:active .MuiTypography-root": {
                        color: "red !important",
                      },
                    }}>
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
                          color: "red !important",
                        },
                      },
                      "&:active .MuiTypography-root": {
                        color: "red !important",
                      },
                    }}>
                      <ListItemIcon>
                        <LocalHospitalIcon sx={{ color: "secondary.main", marginLeft: 3 }} />
                      </ListItemIcon>
                      <ListItemText primary="Donaciones por Entidad" />
                    </ListItemButton>
                  </ListItem>



                  <ListItem disablePadding>
                    <ListItemButton onClick={() => handleReanalizar()} sx={{
                      "&:active .MuiListItemIcon-root": {
                        "& svg": {
                          color: "red !important",
                        },
                      },
                      "&:active .MuiTypography-root": {
                        color: "red !important",
                      },
                    }}>
                      <ListItemIcon>
                        <ScienceIcon sx={{ color: "secondary.main", marginLeft: 3 }} />
                      </ListItemIcon>
                      <ListItemText primary="Muestras a Reanalizar" />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton onClick={() => handleLiberacion()} sx={{
                      "&:active .MuiListItemIcon-root": {
                        "& svg": {
                          color: "red !important",
                        },
                      },
                      "&:active .MuiTypography-root": {
                        color: "red !important",
                      },
                    }}>
                      <ListItemIcon>
                        <VaccinesIcon sx={{ color: "secondary.main", marginLeft: 3 }} />
                      </ListItemIcon>
                      <ListItemText primary="Liberación de Componentes" />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton onClick={() => handleDesechospro()} sx={{
                      "&:active .MuiListItemIcon-root": {
                        "& svg": {
                          color: "red !important",
                        },
                      },
                      "&:active .MuiTypography-root": {
                        color: "red !important",
                      },
                    }}>
                      <ListItemIcon>
                        <DeleteIcon sx={{ color: "secondary.main", marginLeft: 3 }} />
                      </ListItemIcon>
                      <ListItemText primary="Confirmacion de Desechos" />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton onClick={() => handleDesecho()} sx={{
                      "&:active .MuiListItemIcon-root": {
                        "& svg": {
                          color: "red !important",
                        },
                      },
                      "&:active .MuiTypography-root": {
                        color: "red !important",
                      },
                    }}>
                      <ListItemIcon>
                        <DeleteIcon sx={{ color: "secondary.main", marginLeft: 3 }} />
                      </ListItemIcon>
                      <ListItemText primary="Desechos" />
                    </ListItemButton>
                  </ListItem>


                </List>
              </Collapse>
            </>)}

          {(userRole === 'Técnico de producción') && (
            <>
              <ListItem disablePadding>
                <ListItemButton onClick={() => setOpenP(!openP)}
                  sx={{
                    "&:active .MuiListItemIcon-root": {
                      "& svg": {
                        color: "red !important",
                      },
                    },
                    "&:active .MuiTypography-root": {
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
                          color: "red !important",
                        },
                      },
                      "&:active .MuiTypography-root": {
                        color: "red !important",
                      },
                    }}>
                      <ListItemIcon>
                        <ScienceIcon sx={{ color: "secondary.main", marginLeft: 3 }} />
                      </ListItemIcon>
                      <ListItemText primary="Procesamiento de Componentes" />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton onClick={() => handleCO()} sx={{
                      "&:active .MuiListItemIcon-root": {
                        "& svg": {
                          color: "red !important",
                        },
                      },
                      "&:active .MuiTypography-root": {
                        color: "red !important",
                      },
                    }}>
                      <ListItemIcon>
                        <VaccinesIcon sx={{ color: "secondary.main", marginLeft: 3 }} />
                      </ListItemIcon>
                      <ListItemText primary="Componentes Obtenidos" />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton onClick={() => handleGB()} sx={{
                      "&:active .MuiListItemIcon-root": {
                        "& svg": {
                          color: "red !important",
                        },
                      },
                      "&:active .MuiTypography-root": {
                        color: "red !important",
                      },
                    }}>
                      <ListItemIcon>
                        <DeleteIcon sx={{ color: "secondary.main", marginLeft: 3 }} />
                      </ListItemIcon>
                      <ListItemText primary="Componentes de desecho" />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton onClick={() => handleEI()} sx={{
                      "&:active .MuiListItemIcon-root": {
                        "& svg": {
                          color: "red !important",
                        },
                      },
                      "&:active .MuiTypography-root": {
                        color: "red !important",
                      },
                    }}>
                      <ListItemIcon>
                        <MedicalServicesIcon sx={{ color: "secondary.main", marginLeft: 3 }} />
                      </ListItemIcon>
                      <ListItemText primary="Envío de Plasma para la industria" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Collapse>
            </>)}


          {(userRole === 'Técnico de laboratorio calidad' ||
            userRole === 'Técnico de laboratorio inmuno' ||
            userRole === 'Técnico de laboratorio suma') && (
              <>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => setOpenL(!openL)}
                    sx={{
                      "&:active .MuiListItemIcon-root": {
                        "& svg": {
                          color: "red !important",
                        },
                      },
                      "&:active .MuiTypography-root": {
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
                    {(userRole === 'Técnico de laboratorio calidad' ||
                      userRole === 'Técnico de laboratorio inmuno' ||
                      userRole === 'Técnico de laboratorio suma') && (
                        <ListItem disablePadding>
                          <ListItemButton onClick={() => handleRM()} sx={{
                            "&:active .MuiListItemIcon-root": {
                              "& svg": {
                                color: "red !important",
                              },
                            },
                            "&:active .MuiTypography-root": {
                              color: "red !important",
                            },
                          }}>
                            <ListItemIcon>
                              <ScienceIcon sx={{ color: "secondary.main", marginLeft: 3 }} />
                            </ListItemIcon>
                            <ListItemText primary="Recepción de Muestras" />
                          </ListItemButton>
                        </ListItem>
                      )}

                    {userRole === 'Técnico de laboratorio suma' && (
                      <ListItem disablePadding>
                        <ListItemButton onClick={() => handleLS()} sx={{
                          "&:active .MuiListItemIcon-root": {
                            "& svg": {
                              color: "red !important",
                            },
                          },
                          "&:active .MuiTypography-root": {
                            color: "red !important",
                          },
                        }}>
                          <ListItemIcon>
                            <AddIcon sx={{ color: "secondary.main", marginLeft: 3 }} />
                          </ListItemIcon>
                          <ListItemText primary="Laboratorio Suma" />
                        </ListItemButton>
                      </ListItem>
                    )}

                    {userRole === 'Técnico de laboratorio inmuno' && (
                      <ListItem disablePadding>
                        <ListItemButton onClick={() => handleLI()} sx={{
                          "&:active .MuiListItemIcon-root": {
                            "& svg": {
                              color: "red !important",
                            },
                          },
                          "&:active .MuiTypography-root": {
                            color: "red !important",
                          },
                        }}>
                          <ListItemIcon>
                            <WaterDropIcon sx={{ color: "secondary.main", marginLeft: 3 }} />
                          </ListItemIcon>
                          <ListItemText primary="Laboratorio Inmunohematología" />
                        </ListItemButton>
                      </ListItem>
                    )}


                    {userRole === 'Técnico de laboratorio calidad' && (
                      <ListItem disablePadding>
                        <ListItemButton onClick={() => handleLCC()} sx={{
                          "&:active .MuiListItemIcon-root": {
                            "& svg": {
                              color: "red !important",
                            },
                          },
                          "&:active .MuiTypography-root": {
                            color: "red !important",
                          },
                        }}>
                          <ListItemIcon>
                            <FactCheckIcon sx={{ color: "secondary.main", marginLeft: 3 }} />
                          </ListItemIcon>
                          <ListItemText primary="Laboratorio Control de Calidad" />
                        </ListItemButton>
                      </ListItem>
                    )}
                  </List>
                </Collapse>
              </>)}


          {(userRole === 'Jefe de extracción móvil' ||
            userRole === 'Técnico de móvil') && (
              <>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => setOpenCM(!openCM)}
                    sx={{
                      "&:active .MuiListItemIcon-root": {
                        "& svg": {
                          color: "red !important",
                        },
                      },
                      "&:active .MuiTypography-root": {
                        color: "red !important",
                      },
                    }}
                  >
                    <ListItemIcon>
                      <LocalShippingIcon sx={{ color: "primary.dark", marginLeft: 2 }} />
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
                            color: "red !important",
                          },
                        },
                        "&:active .MuiTypography-root": {
                          color: "red !important",
                        },
                      }}>
                        <ListItemIcon>
                          <AssignmentIcon sx={{ color: "secondary.main", marginLeft: 3 }} />
                        </ListItemIcon>
                        <ListItemText primary="Plan de Trabajo" />
                      </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                      <ListItemButton onClick={() => handleFormPlan()} sx={{
                        "&:active .MuiListItemIcon-root": {
                          "& svg": {
                            color: "red !important",
                          },
                        },
                        "&:active .MuiTypography-root": {
                          color: "red !important",
                        },
                      }}>
                        <ListItemIcon>
                          <AssignmentAddIcon sx={{ color: "secondary.main", marginLeft: 3 }} />
                        </ListItemIcon>
                        <ListItemText primary="Formulario Plan de Trabajo" />
                      </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                      <ListItemButton onClick={() => handlePedidos()} sx={{
                        "&:active .MuiListItemIcon-root": {
                          "& svg": {
                            color: "red !important",
                          },
                        },
                        "&:active .MuiTypography-root": {
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
                      <ListItemButton onClick={() => handleResumen()} sx={{
                        "&:active .MuiListItemIcon-root": {
                          "& svg": {
                            color: "red !important",
                          },
                        },
                        "&:active .MuiTypography-root": {
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
              </>)}

          {(userRole === 'Médico del hospital') && (
            <>
              <ListItem disablePadding>
                <ListItemButton onClick={() => setOpenH(!openH)}
                  sx={{
                    "&:active .MuiListItemIcon-root": {
                      "& svg": {
                        color: "red !important",
                      },
                    },
                    "&:active .MuiTypography-root": {
                      color: "red !important",
                    },
                  }}
                >
                  <ListItemIcon>
                    <LocalHospitalIcon sx={{ color: "primary.dark", marginLeft: 2 }} />
                  </ListItemIcon>
                  <ListItemText primary="Hospitalización" />
                </ListItemButton>
              </ListItem>

              <Collapse in={openH}>
                <List disablePadding>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => handlePacientesT()} sx={{

                      "&:active .MuiListItemIcon-root": {
                        "& svg": {
                          color: "red !important",
                        },
                      },
                      "&:active .MuiTypography-root": {
                        color: "red !important",
                      },
                    }}>
                      <ListItemIcon>
                        <Groups2Icon sx={{ color: "secondary.main", marginLeft: 3 }} />
                      </ListItemIcon>
                      <ListItemText primary="Pacientes a Transfundir" />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton onClick={() => handleOrdenT()} sx={{

                      "&:active .MuiListItemIcon-root": {
                        "& svg": {
                          color: "red !important",
                        },
                      },
                      "&:active .MuiTypography-root": {
                        color: "red !important",
                      },
                    }}>
                      <ListItemIcon>
                        <AssignmentAddIcon sx={{ color: "secondary.main", marginLeft: 3 }} />
                      </ListItemIcon>
                      <ListItemText primary="Orden de Transfusión" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Collapse>
            </>)}

          {(userRole === 'Técnico de transfusión') && (
            <>
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleT()}
                  sx={{
                    "&:active .MuiListItemIcon-root": {
                      "& svg": {
                        color: "red !important",
                      },
                    },
                    "&:active .MuiTypography-root": {
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
            </>)}
        </List>
      </nav>
    </Box>
  );
}