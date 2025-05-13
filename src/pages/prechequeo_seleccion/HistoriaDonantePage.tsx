import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, IconButton, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BotonPersonalizado from "../../components/Button";
import { useNavigate } from "react-router-dom";
import TextFieldP from "../../components/TextField";


interface CheckedState {
    a: boolean;
    b: boolean;
}

function ExclusiveCheckboxes() {
    const [checked, setChecked] = useState<CheckedState>({ a: false, b: false });

    const handleChange =
        (name: keyof CheckedState) =>
            (event: React.ChangeEvent<HTMLInputElement>): void => {
                if (event.target.checked) {
                    setChecked({ a: name === 'a', b: name === 'b' });
                } else {
                    setChecked((prev) => ({ ...prev, [name]: false }));
                }
            };

    return (
        <>
            <FormGroup row>
                <FormControlLabel
                    sx={{ mr: 30 }}
                    control={
                        <Checkbox checked={checked.a} onChange={handleChange('a')} />
                    }
                    label="Apto"
                />
                <FormControlLabel
                    sx={{ ml: 20 }}
                    control={
                        <Checkbox checked={checked.b} onChange={handleChange('b')} />
                    }
                    label="No Apto"
                />
            </FormGroup>

            {checked.b && (
                <Box
                    sx={{
                        mt: 2,
                        p: 2,
                        ml: 60,
                        border: '1px solid',
                        borderColor: 'primary.main',
                        borderRadius: 1,
                        backgroundColor: 'background.paper',
                        width: 300
                    }}
                >
                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                        Observacion
                    </Typography>
                    <TextField
                        id="outlined-basic"
                        label=""
                        variant="outlined"
                        sx={{
                            width: 200, ml: 3,
                            // Cambia el color del texto
                            "& .MuiOutlinedInput-root": {
                                color: "#000",
                                // Cambia el color del borde
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#00796B",
                                },
                                // Cambia el color del borde al hacer foco
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#00796B",
                                },
                            },
                            // Cambia el color del label
                            "& .MuiInputLabel-outlined": {
                                color: "#009688",
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                                paddingLeft: "8px",
                                paddingRight: "8px",
                            },
                        }}
                    />


                </Box>
            )}
        </>
    );
}

function AccordionUsage() {


    const navigate = useNavigate();

    const handleHc = () => {
        // Aquí puedes poner lógica de autenticación si lo deseas
        navigate("/historiadonante", { replace: true }); // Redirige a la vista de Prechequeo
    };

    return (
        <div>
            <Accordion  >
                <AccordionSummary
                    sx={{ display: "flex", backgroundColor: "primary.dark", alignItems: "center", "& .MuiAccordionSummary-content": { justifyContent: "center" } }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                >
                    <Typography component="span" sx={{ color: "white", alignContent: "center" }}>INTERROGATORIO</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box display={"flex"} justifyContent={"space-between"} >
                        <Box width={"50%"}>
                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Está usted bien?
                                    </Typography>
                                </Box>

                                <Box mr={1}>
                                    <RadioButtonsGroup />
                                </Box>


                            </Box>
                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Ha donado sangre o plasma anteriormente?
                                        ¿Cuándo?

                                        <TextField
                                            id="outlined-basic"
                                            label=""
                                            variant="outlined"
                                            sx={{
                                                width: 300, ml: 3,
                                                // Cambia el color del texto
                                                "& .MuiOutlinedInput-root": {
                                                    color: "#000",
                                                    // Cambia el color del borde
                                                    "& .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: "#00796B",
                                                    },
                                                    // Cambia el color del borde al hacer foco
                                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: "#00796B",
                                                    },
                                                },
                                                // Cambia el color del label
                                                "& .MuiInputLabel-outlined": {
                                                    color: "#009688",
                                                },
                                                "& .MuiOutlinedInput-notchedOutline": {
                                                    paddingLeft: "8px",
                                                    paddingRight: "8px",
                                                },
                                            }}
                                        />
                                    </Typography>

                                </Box>


                                <Box mt={5} mr={1}>
                                    <RadioButtonsGroup />
                                </Box>


                            </Box>
                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Alguna vez ha sido rechazado como donante? ¿Por qué?
                                        <TextField
                                            id="outlined-basic"
                                            label=""
                                            variant="outlined"
                                            sx={{
                                                width: 300, ml: 3,
                                                // Cambia el color del texto
                                                "& .MuiOutlinedInput-root": {
                                                    color: "#000",
                                                    // Cambia el color del borde
                                                    "& .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: "#00796B",
                                                    },
                                                    // Cambia el color del borde al hacer foco
                                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: "#00796B",
                                                    },
                                                },
                                                // Cambia el color del label
                                                "& .MuiInputLabel-outlined": {
                                                    color: "#009688",
                                                },
                                                "& .MuiOutlinedInput-notchedOutline": {
                                                    paddingLeft: "8px",
                                                    paddingRight: "8px",
                                                },
                                            }}
                                        />
                                    </Typography>

                                </Box>
                                <Box mt={2} mr={1}>
                                    <RadioButtonsGroup />
                                </Box>
                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Ha recibido transfuciones de sangre o plasma o ha sido tratado con hemoderivados?
                                    </Typography>
                                </Box>

                                <Box mr={1}>
                                    <RadioButtonsGroup />
                                </Box>


                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Alguna donación efectuada por Ud. ha estado implicada en una transmisión de infección al receptor?
                                    </Typography>
                                </Box>

                                <Box mr={1}>
                                    <RadioButtonsGroup />
                                </Box>


                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Ha recibido transplantes o injertos?
                                    </Typography>
                                </Box>

                                <Box mr={1}>
                                    <RadioButtonsGroup />
                                </Box>


                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Se ha vacunado en el último año?
                                        ¿Cuáles vacunas?
                                        <TextField
                                            id="outlined-basic"
                                            label=""
                                            variant="outlined"
                                            sx={{
                                                width: 300, ml: 2,
                                                // Cambia el color del texto
                                                "& .MuiOutlinedInput-root": {
                                                    color: "#000",
                                                    // Cambia el color del borde
                                                    "& .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: "#00796B",
                                                    },
                                                    // Cambia el color del borde al hacer foco
                                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: "#00796B",
                                                    },
                                                },
                                                // Cambia el color del label
                                                "& .MuiInputLabel-outlined": {
                                                    color: "#009688",
                                                },
                                                "& .MuiOutlinedInput-notchedOutline": {
                                                    paddingLeft: "8px",
                                                    paddingRight: "8px",
                                                },
                                            }}
                                        />
                                    </Typography>

                                </Box>
                                <Box mt={2} mr={1}>
                                    <RadioButtonsGroup />
                                </Box>
                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Está o ha estado sujeto a reclusión penitenciaria durante el último año?
                                    </Typography>
                                </Box>

                                <Box mr={1}>
                                    <RadioButtonsGroup />
                                </Box>


                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Se encuentra tomando medicamentos?
                                        ¿Cuáles?
                                        <TextField
                                            id="outlined-basic"
                                            label=""
                                            variant="outlined"
                                            sx={{
                                                width: 300, ml: 2,
                                                // Cambia el color del texto
                                                "& .MuiOutlinedInput-root": {
                                                    color: "#000",
                                                    // Cambia el color del borde
                                                    "& .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: "#00796B",
                                                    },
                                                    // Cambia el color del borde al hacer foco
                                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: "#00796B",
                                                    },
                                                },
                                                // Cambia el color del label
                                                "& .MuiInputLabel-outlined": {
                                                    color: "#009688",
                                                },
                                                "& .MuiOutlinedInput-notchedOutline": {
                                                    paddingLeft: "8px",
                                                    paddingRight: "8px",
                                                },
                                            }}
                                        />
                                    </Typography>

                                </Box>
                                <Box mt={2} mr={1}>
                                    <RadioButtonsGroup />
                                </Box>
                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Estuvo embarazada en los últimos seis meses?
                                    </Typography>
                                </Box>

                                <Box mr={1} mt={1}>
                                    <RadioButtonsGroup />
                                </Box>


                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Padece Ud. de anemia?
                                    </Typography>
                                </Box>

                                <Box mr={1} mt={1}>
                                    <RadioButtonsGroup />
                                </Box>


                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "75%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Padece de alcoholismo crónico?
                                    </Typography>
                                </Box>

                                <Box mr={1} mt={1}>
                                    <RadioButtonsGroup />
                                </Box>


                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Padece de epilepsia o convulsiones?
                                    </Typography>
                                </Box>

                                <Box mr={0.5} mt={1}>
                                    <RadioButtonsGroup />
                                </Box>


                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Ha sido sometido recientemente a extracciones dentarias u otras intervenciones de cirugía menor?
                                    </Typography>
                                </Box>

                                <Box mr={1} mt={1}>
                                    <RadioButtonsGroup />
                                </Box>
                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Ha sido sometido recientemente a cirugías dentarias?
                                    </Typography>
                                </Box>

                                <Box mr={1} mt={1}>
                                    <RadioButtonsGroup />
                                </Box>
                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Ha sido sometido a intervenciones de cirugía mayor?
                                    </Typography>
                                </Box>

                                <Box mr={1} mt={1}>
                                    <RadioButtonsGroup />
                                </Box>
                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿En el ultimo año le han hecho tatuajes, acupuntura, perforación de orejas u otros, ha sufrido pinchaduras accidentales con aguja de inyección o ha estado en contacto con sangre infestada?
                                    </Typography>
                                </Box>

                                <Box mr={1} mt={5}>
                                    <RadioButtonsGroup />
                                </Box>
                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Tuvo pérdida de peso inexplicable, manchas rosadas en la piel, fiebre por más de 10 días, sudores nocturnos, diarreas, manchas blancas en la boca,ganglios grandes ?
                                    </Typography>
                                </Box>

                                <Box mr={1} mt={5}>
                                    <RadioButtonsGroup />
                                </Box>
                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Padece o ha padecido recientemente enfermedades de transmición sexual?
                                    </Typography>
                                </Box>

                                <Box mr={1} mt={1}>
                                    <RadioButtonsGroup />
                                </Box>
                            </Box>
                        </Box>

                        {/** Lado izquierdo */}

                        <Box width={"50%"}>
                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Tiene contacto sexual con personas que presentan factores de riesgo?
                                    </Typography>
                                </Box>

                                <Box mr={1} mt={1}>
                                    <RadioButtonsGroup />
                                </Box>
                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Ha recibido tratamiento con hormonas hipofisarias de origen humano?
                                    </Typography>
                                </Box>

                                <Box mr={1} mt={1}>
                                    <RadioButtonsGroup />
                                </Box>


                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Presenta afecciones o lesiones en la piel?
                                        Dónde?
                                        <TextField
                                            id="outlined-basic"
                                            label=""
                                            variant="outlined"
                                            sx={{
                                                width: 300, ml: 2,
                                                // Cambia el color del texto
                                                "& .MuiOutlinedInput-root": {
                                                    color: "#000",
                                                    // Cambia el color del borde
                                                    "& .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: "#00796B",
                                                    },
                                                    // Cambia el color del borde al hacer foco
                                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: "#00796B",
                                                    },
                                                },
                                                // Cambia el color del label
                                                "& .MuiInputLabel-outlined": {
                                                    color: "#009688",
                                                },
                                                "& .MuiOutlinedInput-notchedOutline": {
                                                    paddingLeft: "8px",
                                                    paddingRight: "8px",
                                                },
                                            }}
                                        />
                                    </Typography>

                                </Box>
                                <Box mt={2} mr={1} >
                                    <RadioButtonsGroup />
                                </Box>
                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Presenta alguna enfermedad respiratoria?
                                        Cuál?
                                        <TextField
                                            id="outlined-basic"
                                            label=""
                                            variant="outlined"
                                            sx={{
                                                width: 300, ml: 5,
                                                // Cambia el color del texto
                                                "& .MuiOutlinedInput-root": {
                                                    color: "#000",
                                                    // Cambia el color del borde
                                                    "& .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: "#00796B",
                                                    },
                                                    // Cambia el color del borde al hacer foco
                                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: "#00796B",
                                                    },
                                                },
                                                // Cambia el color del label
                                                "& .MuiInputLabel-outlined": {
                                                    color: "#009688",
                                                },
                                                "& .MuiOutlinedInput-notchedOutline": {
                                                    paddingLeft: "8px",
                                                    paddingRight: "8px",
                                                },
                                            }}
                                        />
                                    </Typography>

                                </Box>
                                <Box mt={2} mr={1} >
                                    <RadioButtonsGroup />
                                </Box>
                            </Box>
                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Ha visitado áreas endémicas de paludismo?
                                    </Typography>
                                </Box>

                                <Box mr={1} mt={1}>
                                    <RadioButtonsGroup />
                                </Box>


                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Padece Ud. enfermedad de Chagas o ha permanecido en áreas endémicas de la misma ?
                                    </Typography>
                                </Box>

                                <Box mr={1} mt={1}>
                                    <RadioButtonsGroup />
                                </Box>


                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Ha residido Ud. por un período mayor de 6 meses, a partir de 1980, de forma continua o acumulativa, en países con la nueva variante de la Enfermedad de Creutzfeldt Jacob(vECJ) declarada (Reino Unido de Gran Bretaña o Francia)?
                                    </Typography>
                                </Box>

                                <Box mr={1} mt={8}>
                                    <RadioButtonsGroup />
                                </Box>
                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "60%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Presenta otra enfermedad infecciosa?
                                        Cuál?
                                        <TextField
                                            id="outlined-basic"
                                            label=""
                                            variant="outlined"
                                            sx={{
                                                width: 300, ml: 2,
                                                // Cambia el color del texto
                                                "& .MuiOutlinedInput-root": {
                                                    color: "#000",
                                                    // Cambia el color del borde
                                                    "& .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: "#00796B",
                                                    },
                                                    // Cambia el color del borde al hacer foco
                                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: "#00796B",
                                                    },
                                                },
                                                // Cambia el color del label
                                                "& .MuiInputLabel-outlined": {
                                                    color: "#009688",
                                                },
                                                "& .MuiOutlinedInput-notchedOutline": {
                                                    paddingLeft: "8px",
                                                    paddingRight: "8px",
                                                },
                                            }}
                                        />
                                    </Typography>

                                </Box>
                                <Box mt={2} mr={1} >
                                    <RadioButtonsGroup />
                                </Box>
                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Tiene Ud. contacto actualmente con alguna persona que esté padeciendo de alguna enfermedad febril ?
                                    </Typography>
                                </Box>

                                <Box mr={1} mt={3}>
                                    <RadioButtonsGroup />
                                </Box>
                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Tiene antecedentes familares de vECJ?
                                    </Typography>
                                </Box>

                                <Box mr={1} mt={1}>
                                    <RadioButtonsGroup />
                                </Box>
                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Padece de hipotiroidismo o hipertiroidismo?
                                    </Typography>
                                </Box>

                                <Box mr={1} mt={1}>
                                    <RadioButtonsGroup />
                                </Box>
                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Padece de glomerunefritis aguda?
                                    </Typography>
                                </Box>

                                <Box mr={1} mt={1}>
                                    <RadioButtonsGroup />
                                </Box>
                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿En los últimos 6 meses ha padecido de tromboflebitis?
                                    </Typography>
                                </Box>

                                <Box mr={1} mt={1}>
                                    <RadioButtonsGroup />
                                </Box>
                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Padece Ud. de diabetes controlada mediante dieta o de diabetes insulina-dependiente?
                                    </Typography>
                                </Box>

                                <Box mr={1} mt={1}>
                                    <RadioButtonsGroup />
                                </Box>
                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Presenta o ha presentado ganglios en el cuerpo, culebrilla o ha notado manchas blancas en boca, lengua o garganta?
                                    </Typography>
                                </Box>

                                <Box mr={1} mt={1}>
                                    <RadioButtonsGroup />
                                </Box>
                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿En el último año ha sufrido trombosis venenosa profunda de los miembros inferiores?
                                    </Typography>
                                </Box>

                                <Box mr={1} mt={1}>
                                    <RadioButtonsGroup />
                                </Box>
                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Padece Ud. de retinosis pigmentaria, enfermedades cardiovasculares, del SNC, inmunes, neoplásticas, renales crónicas o hematológicas malignas?
                                    </Typography>
                                </Box>

                                <Box mr={1} mt={1}>
                                    <RadioButtonsGroup />
                                </Box>
                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "65%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Padece de enfermedades gastrointestinales que dificulten la asimilacion de hierro y ácido fólico, cirrosis hepática, hepatitis B y hepatitis C ?
                                    </Typography>
                                </Box>

                                <Box mr={1} mt={1}>
                                    <RadioButtonsGroup />
                                </Box>
                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Ha padecido en los últimos 6 meses de úlcera péptica?
                                    </Typography>
                                </Box>

                                <Box mr={1} mt={1}>
                                    <RadioButtonsGroup />
                                </Box>
                            </Box>

                        </Box>
                    </Box>
                    <Box sx={{ ml: 70 }}>
                        <ExclusiveCheckboxes />
                    </Box>


                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',

                        }}
                    >
                        <BotonPersonalizado onClick={handleHc} sx={{ width: 225 }}>
                            ACEPTAR
                        </BotonPersonalizado>
                    </Box>




                </AccordionDetails>
            </Accordion>
        </div>
    );
}




function RadioButtonsGroup() {
    return (
        <FormControl sx={{ marginTop: 1 }}>
            <FormLabel id="demo-row-radio-buttons-group-label"></FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
            >
                <FormControlLabel value="female" control={<Radio />} label="SI" />
                <FormControlLabel value="male" control={<Radio />} label="NO" />
            </RadioGroup>
        </FormControl>
    );
}


export default function HistoriaDonante() {
    const [hemoglobina, setHemoglobina] = React.useState('');

    const [showBox, setShowBox] = useState(false);

    const handleClick = () => {
        setShowBox(prev => !prev); // Alterna la visibilidad
    };
    return (
        <>
            <Navbar />

            <Typography sx={{ mt: 10, textAlign: "center", backgroundColor: "primary.dark" , color:"white"}} variant="h6" component="h5" >
                Historia del Donante
            </Typography>

            <IconButton onClick={handleClick} sx={{ color: "primary.dark", ml: 160, fontSize: 70, mt: 10 }}>
                <AddIcon fontSize="inherit" />
            </IconButton>

            {showBox && (
                <Box display={"flex"} justifyContent={"space-between"} padding={2} marginLeft={10} marginRight={10} border={1}>
                    <Box >


                        <Box >
                            <Typography sx={{ mt: 2, textAlign: "center", backgroundColor: "primary.dark" }} variant="h6" component="h5" >
                                Resultados del Prechequeo.
                            </Typography>
                            <Box display="flex" justifyContent="space-between" padding={2} width={500}>
                                <Box >
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        Grupo
                                    </Typography>
                                    <TextField
                                        id="outlined-basic"
                                        label=""
                                        variant="outlined"
                                        sx={{
                                            width: 150,
                                            // Cambia el color del texto
                                            "& .MuiOutlinedInput-root": {
                                                color: "#000",
                                                // Cambia el color del borde
                                                "& .MuiOutlinedInput-notchedOutline": {
                                                    borderColor: "#00796B",
                                                },
                                                // Cambia el color del borde al hacer foco
                                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                    borderColor: "#00796B",
                                                },
                                            },
                                            // Cambia el color del label
                                            "& .MuiInputLabel-outlined": {
                                                color: "#009688",
                                            },
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                paddingLeft: "8px",
                                                paddingRight: "8px",
                                            },
                                        }}
                                    />

                                </Box>

                                <Box>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }} variant="h6" component="h5">
                                        Hemoglobina
                                    </Typography>
                                    <Box sx={{ minWidth: 120, width: 150, minHeight: 40, position: 'revert-layer' }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label"></InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={hemoglobina}
                                                label="Hemoglobina"
                                                onChange={(e) => setHemoglobina(e.target.value)}
                                            >
                                                <MenuItem value={10}></MenuItem>
                                                <MenuItem value={20}>normal</MenuItem>
                                                <MenuItem value={30}>baja</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Box>
                                <Box>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        Factor
                                    </Typography>
                                    <TextFieldP />
                                </Box>
                            </Box>
                        </Box>

                    </Box>

                    <Box>
                        <Typography sx={{ mt: 2, textAlign: "center", backgroundColor: "primary.dark" }} variant="h6" component="h5" >
                            Examen Físico
                        </Typography>

                        <Box display="flex" justifyContent="space-between" padding={2} width={600}>

                            <Box >
                                <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                    Peso
                                </Typography>

                                <TextField
                                    id="outlined-basic"
                                    label=""
                                    variant="outlined"
                                    sx={{
                                        width: 150,
                                        // Cambia el color del texto
                                        "& .MuiOutlinedInput-root": {
                                            color: "#000",
                                            // Cambia el color del borde
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#00796B",
                                            },
                                            // Cambia el color del borde al hacer foco
                                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#00796B",
                                            },
                                        },
                                        // Cambia el color del label
                                        "& .MuiInputLabel-outlined": {
                                            color: "#009688",
                                        },
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            paddingLeft: "8px",
                                            paddingRight: "8px",
                                        },
                                    }}
                                />


                                <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                    Pulso
                                </Typography>

                                <TextField
                                    id="outlined-basic"
                                    label=""
                                    variant="outlined"
                                    sx={{
                                        width: 150,
                                        // Cambia el color del texto
                                        "& .MuiOutlinedInput-root": {
                                            color: "#000",
                                            // Cambia el color del borde
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#00796B",
                                            },
                                            // Cambia el color del borde al hacer foco
                                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#00796B",
                                            },
                                        },
                                        // Cambia el color del label
                                        "& .MuiInputLabel-outlined": {
                                            color: "#009688",
                                        },
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            paddingLeft: "8px",
                                            paddingRight: "8px",
                                        },
                                    }}
                                />
                            </Box>
                            <Box >
                                <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                    Temperatura sublingual
                                </Typography>
                                <TextField
                                    id="outlined-basic"
                                    label=""
                                    variant="outlined"
                                    sx={{
                                        width: 150,
                                        // Cambia el color del texto
                                        "& .MuiOutlinedInput-root": {
                                            color: "#000",
                                            // Cambia el color del borde
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#00796B",
                                            },
                                            // Cambia el color del borde al hacer foco
                                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#00796B",
                                            },
                                        },
                                        // Cambia el color del label
                                        "& .MuiInputLabel-outlined": {
                                            color: "#009688",
                                        },
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            paddingLeft: "8px",
                                            paddingRight: "8px",
                                        },
                                    }}
                                />
                                <Typography id="modal-modal-description" sx={{ mt: 2 }} variant="h6" component="h5">
                                    Temperatura axilar
                                </Typography>
                                <TextField
                                    id="outlined-basic"
                                    label=""
                                    variant="outlined"
                                    sx={{
                                        width: 150,
                                        // Cambia el color del texto
                                        "& .MuiOutlinedInput-root": {
                                            color: "#000",
                                            // Cambia el color del borde
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#00796B",
                                            },
                                            // Cambia el color del borde al hacer foco
                                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#00796B",
                                            },
                                        },
                                        // Cambia el color del label
                                        "& .MuiInputLabel-outlined": {
                                            color: "#009688",
                                        },
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            paddingLeft: "8px",
                                            paddingRight: "8px",
                                        },
                                    }}
                                />
                            </Box>
                            <Box >
                                <Typography id="modal-modal-description" sx={{ mt: 2, borderColor: "primary.dark " }} variant="h6" component="h5">
                                    Hemoglobina
                                </Typography>
                                <Box sx={{ minWidth: 120, width: 150, minHeight: 40, position: 'revert-layer' }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label"></InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={hemoglobina}
                                            label="Hemoglobina"
                                            onChange={(e) => setHemoglobina(e.target.value)}
                                        >
                                            <MenuItem value={10}></MenuItem>
                                            <MenuItem value={20}>normal</MenuItem>
                                            <MenuItem value={30}>baja</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Box>

                        </Box>
                    </Box>



                </Box>
            )}



            <AccordionUsage />
        </>
    )
}

