import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, Dialog, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, FormLabel, IconButton, InputLabel, MenuItem, Modal, Radio, RadioGroup, Select, Stack, TextField, Typography } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BotonPersonalizado from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import axios from "axios";


export default function HistoriaDonante() {
    const [examenP_grupo, setExamenP_grupo] = useState('');
    const [examenP_factor, setExamenP_factor] = useState('');
    const [examenP_hemoglobina, setExamenP_hemoglobina] = useState('');
    const [examenF_hemoglobina, setExamenF_hemoglobina] = useState('');
    const [examenF_peso, setExamenF_peso] = useState('');
    const [examenF_pulso, setExamenF_pulso] = useState('');
    const [examenF_temSublingual, setExamenF_temSublingual] = useState('');
    const [examenF_temAxilar, setExamenF_temAxilar] = useState('');
    const [observacion_interrogatorio, setObservacion_interrogatorio] = useState('');

    const [apto_interrogatorio, setAptoInterrogatorio] = useState<boolean | null>(null);
    const [apto_examenFisico, setAptoExamenFisico] = useState<boolean | null>(null);

    // Estados para modal de éxito/alerta
    const [openModal, setOpenModal] = useState(false);
    const [modalType, setModalType] = useState<"success" | "error">("success");
    const [errorMsg, setErrorMsg] = useState("");

    const [showBox, setShowBox] = useState(false);

    const [errorHemoglobina, setErrorHemoglobina] = useState("");
    const [errorPulso, setErrorPulso] = useState("");
    const [errorPeso, setErrorPeso] = useState("");
    const [errorTempAxilar, setErrorTempAxilar] = useState("");
    const [errorTempSublingual, setErrorTempSublingual] = useState("");

    const { id } = useParams();

    // Solo números enteros
    const onlyIntegers = (value: string) => value.replace(/[^0-9]/g, "");

    // Números con decimales (solo un punto)
    const onlyDecimals = (value: string) => value.replace(/[^0-9.]/g, "").replace(/^([^.]*\.)|\./g, '$1');

    const handleHemoglobinaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = onlyIntegers(e.target.value);
        setExamenF_hemoglobina(value);
        if (value && Number(value) < 125) {
            setErrorHemoglobina("La hemoglobina no puede ser menor de 125");
        } else {
            setErrorHemoglobina("");
        }
    };

    // Pulso (solo enteros)
    const handlePulsoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = onlyIntegers(e.target.value);
        setExamenF_pulso(value);
        const pulso = Number(value);
        if (value && (pulso < 50 || pulso > 100)) {
            setErrorPulso("El pulso debe estar entre 50 y 100");
        } else {
            setErrorPulso("");
        }
    };

    // Peso (solo enteros)
    const handlePesoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = onlyIntegers(e.target.value);
        setExamenF_peso(value);
        if (value && Number(value) < 50) {
            setErrorPeso("El peso no puede ser menor de 50 kg (110 lb)");
        } else {
            setErrorPeso("");
        }
    };

    // Temperatura Axilar (decimales permitidos)
    const handleTempAxilarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = onlyDecimals(e.target.value);
        setExamenF_temAxilar(value);
        const temp = Number(value);
        if (value && (temp < 35 || temp > 37)) {
            setErrorTempAxilar("La temperatura axilar debe estar entre 35 y 37 °C");
        } else {
            setErrorTempAxilar("");
        }
    };

    // Temperatura Sublingual (decimales permitidos)
    const handleTempSublingualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = onlyDecimals(e.target.value);
        setExamenF_temSublingual(value);
        const temp = Number(value);
        if (value && (temp < 35 || temp > 37.5)) {
            setErrorTempSublingual("La temperatura sublingual debe estar entre 35 y 37.5 °C");
        } else {
            setErrorTempSublingual("");
        }
    };


    useEffect(() => {
        const fetchPrechequeo = async () => {
            if (id) {
                try {
                    const res = await axios.get(`http://localhost:3000/registro-donacion/prechequeo/${id}`);
                    setExamenP_grupo(res.data.examenP_grupo || "");
                    setExamenP_factor(res.data.examenP_factor || "");
                    setExamenP_hemoglobina(res.data.examenP_hemoglobina || "");
                } catch (error) {
                    console.error("Error al obtener datos de prechequeo:", error);
                }
            }
        };
        fetchPrechequeo();
    }, [id]);

    const handleClick = () => {
        setShowBox(prev => !prev);
    };


    const navigate = useNavigate();


    const [resp1, setResp1] = useState<boolean | null>(null);
    const [resp2, setResp2] = useState<boolean | null>(null);
    const [texto2, setTexto2] = useState("");
    const [resp3, setResp3] = useState<boolean | null>(null);
    const [texto3, setTexto3] = useState("");
    const [resp4, setResp4] = useState<boolean | null>(null);
    const [text4, setTexto4] = useState("");
    const [resp5, setResp5] = useState<boolean | null>(null);
    const [resp6, setResp6] = useState<boolean | null>(null);
    const [resp7, setResp7] = useState<boolean | null>(null);
    const [resp8, setResp8] = useState<boolean | null>(null);
    const [texto8, setTexto8] = useState("");
    const [resp9, setResp9] = useState<boolean | null>(null);
    const [resp10, setResp10] = useState<boolean | null>(null);
    const [texto10, setTexto10] = useState("");
    const [resp11, setResp11] = useState<boolean | null>(null);
    const [resp12, setResp12] = useState<boolean | null>(null);
    const [resp13, setResp13] = useState<boolean | null>(null);
    const [resp14, setResp14] = useState<boolean | null>(null);
    const [resp15, setResp15] = useState<boolean | null>(null);
    const [resp16, setResp16] = useState<boolean | null>(null);
    const [resp17, setResp17] = useState<boolean | null>(null);
    const [resp18, setResp18] = useState<boolean | null>(null);
    const [resp19, setResp19] = useState<boolean | null>(null);
    const [resp20, setResp20] = useState<boolean | null>(null);
    const [resp21, setResp21] = useState<boolean | null>(null);
    const [resp22, setResp22] = useState<boolean | null>(null);
    const [resp23, setResp23] = useState<boolean | null>(null);
    const [texto23, setTexto23] = useState("");
    const [resp24, setResp24] = useState<boolean | null>(null);
    const [texto24, setTexto24] = useState("");
    const [resp25, setResp25] = useState<boolean | null>(null);
    const [resp26, setResp26] = useState<boolean | null>(null);
    const [resp27, setResp27] = useState<boolean | null>(null);
    const [resp28, setResp28] = useState<boolean | null>(null);
    const [texto28, setTexto28] = useState("");
    const [resp29, setResp29] = useState<boolean | null>(null);
    const [resp30, setResp30] = useState<boolean | null>(null);
    const [resp31, setResp31] = useState<boolean | null>(null);
    const [resp32, setResp32] = useState<boolean | null>(null);
    const [resp33, setResp33] = useState<boolean | null>(null);
    const [resp34, setResp34] = useState<boolean | null>(null);
    const [resp35, setResp35] = useState<boolean | null>(null);
    const [resp36, setResp36] = useState<boolean | null>(null);
    const [resp37, setResp37] = useState<boolean | null>(null);
    const [resp38, setResp38] = useState<boolean | null>(null);
    const [resp39, setResp39] = useState<boolean | null>(null);



    const getRespuestasInterrogatorio = () => [
        { respuesta: resp1, respuesta_escrita: "" },
        { respuesta: resp2, respuesta_escrita: texto2 },
        { respuesta: resp3, respuesta_escrita: texto3 },
        { respuesta: resp4, respuesta_escrita: text4 },
        { respuesta: resp5, respuesta_escrita: "" },
        { respuesta: resp6, respuesta_escrita: "" },
        { respuesta: resp7, respuesta_escrita: "" },
        { respuesta: resp8, respuesta_escrita: texto8 },
        { respuesta: resp9, respuesta_escrita: "" },
        { respuesta: resp10, respuesta_escrita: texto10 },
        { respuesta: resp11, respuesta_escrita: "" },
        { respuesta: resp12, respuesta_escrita: "" },
        { respuesta: resp13, respuesta_escrita: "" },
        { respuesta: resp14, respuesta_escrita: "" },
        { respuesta: resp15, respuesta_escrita: "" },
        { respuesta: resp16, respuesta_escrita: "" },
        { respuesta: resp17, respuesta_escrita: "" },
        { respuesta: resp18, respuesta_escrita: "" },
        { respuesta: resp19, respuesta_escrita: "" },
        { respuesta: resp20, respuesta_escrita: "" },
        { respuesta: resp21, respuesta_escrita: "" },
        { respuesta: resp22, respuesta_escrita: "" },
        { respuesta: resp23, respuesta_escrita: texto23 },
        { respuesta: resp24, respuesta_escrita: texto24 },
        { respuesta: resp25, respuesta_escrita: "" },
        { respuesta: resp26, respuesta_escrita: "" },
        { respuesta: resp27, respuesta_escrita: "" },
        { respuesta: resp28, respuesta_escrita: texto28 },
        { respuesta: resp29, respuesta_escrita: "" },
        { respuesta: resp30, respuesta_escrita: "" },
        { respuesta: resp31, respuesta_escrita: "" },
        { respuesta: resp32, respuesta_escrita: "" },
        { respuesta: resp33, respuesta_escrita: "" },
        { respuesta: resp34, respuesta_escrita: "" },
        { respuesta: resp35, respuesta_escrita: "" },
        { respuesta: resp36, respuesta_escrita: "" },
        { respuesta: resp37, respuesta_escrita: "" },
        { respuesta: resp38, respuesta_escrita: "" },
        { respuesta: resp39, respuesta_escrita: "" },
    ];


    // Validación simple
    const hayCamposVacios = () => {
        return !examenF_peso || !examenF_pulso || !examenF_temSublingual || !examenF_temAxilar || !examenF_hemoglobina || !getRespuestasInterrogatorio || apto_examenFisico === null || apto_interrogatorio === null;
    };


    const handleSubmit = async () => {
        if (hayCamposVacios()) {
            setErrorMsg("Por favor complete todos los campos.");
            setModalType("error");
            setOpenModal(true);
            return;
        }
        try {
            const payload = {
                examenF_peso,
                examenF_pulso,
                examenF_temSublingual,
                examenF_temAxilar,
                examenF_hemoglobina,
                apto_examenFisico,
                respuestas_interrogatorio: getRespuestasInterrogatorio(),
                apto_interrogatorio,
                observacion_interrogatorio,
            };
            await axios.put(`http://localhost:3000/registro-donacion/${id}`, payload);
            // Puedes mostrar un mensaje de éxito aquí si lo deseas
        } catch (error) {
            setErrorMsg("Ocurrió un error al enviar los datos.");
            setModalType("error");
            setOpenModal(true);
        }
    };


    const textFieldSx = {
        width: "100%",
        "& .MuiOutlinedInput-root": {
            color: "#000",
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#00796B",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#00796B",
            },
        },
        "& .MuiInputLabel-outlined": {
            color: "#009688",
        },
        "& .MuiOutlinedInput-notchedOutline": {
            paddingLeft: "8px",
            paddingRight: "8px",
        },
    };



    return (
        <>
            <Navbar />

            <Typography sx={{ mt: 10, textAlign: "center", backgroundColor: "primary.dark", color: "white" }} variant="h6" component="h5" >
                Historia del Donante
            </Typography>

            <IconButton onClick={handleClick} sx={{ color: "primary.dark", ml: 160, fontSize: 70, mt: 7 }}>
                <AddIcon fontSize="inherit" />
            </IconButton>

            {showBox && (
                <Box display={"flex"} justifyContent={"space-between"} padding={2} margin={5} border={1}>
                    <Box >


                        <Box >
                            <Typography sx={{ mt: 2, textAlign: "center", backgroundColor: "primary.dark", color: "white" }} variant="h6" component="h5" >
                                Resultados del Prechequeo.
                            </Typography>
                            <Box display="flex" justifyContent="space-between" padding={2} width={500}>
                                <Box >

                                    <TextField
                                        id="outlined-basic"
                                        label="Grupo"
                                        variant="outlined"
                                        size="small"
                                        value={examenP_grupo}
                                        onChange={e => setExamenP_grupo(e.target.value)}
                                        disabled
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

                                    <TextField
                                        id="outlined-basic"
                                        label="Hemoglobina"
                                        variant="outlined"
                                        size="small"
                                        value={examenP_hemoglobina}
                                        onChange={e => setExamenP_hemoglobina(e.target.value)}
                                        disabled
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

                                    <TextField
                                        id="outlined-basic"
                                        label="Factor"
                                        variant="outlined"
                                        size="small"
                                        value={examenP_factor}
                                        onChange={e => setExamenP_factor(e.target.value)}
                                        disabled
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
                            </Box>
                        </Box>

                    </Box>



                    <Box sx={{ p: 2, width: 600 }}>
                        <Typography sx={{ mb: 2, textAlign: "center", backgroundColor: "primary.dark", color: "white" }} variant="h6" component="h5">
                            Examen Físico
                        </Typography>
                        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
                            <TextField
                                label="Peso"
                                variant="outlined"
                                size="small"
                                value={examenF_peso}
                                onChange={handlePesoChange}
                                error={!!errorPeso}
                                helperText={errorPeso}
                                sx={textFieldSx}
                            />
                            <TextField
                                label="Pulso"
                                variant="outlined"
                                size="small"
                                value={examenF_pulso}
                                onChange={handlePulsoChange}
                                error={!!errorPulso}
                                helperText={errorPulso}
                                sx={textFieldSx}
                            />
                            <TextField
                                label="Temperatura sublingual"
                                variant="outlined"
                                size="small"
                                value={examenF_temSublingual}
                                onChange={handleTempSublingualChange}
                                error={!!errorTempSublingual}
                                helperText={errorTempSublingual}
                                sx={textFieldSx}
                            />
                            <TextField
                                label="Temperatura axilar"
                                variant="outlined"
                                size="small"
                                value={examenF_temAxilar}
                                onChange={handleTempAxilarChange}
                                error={!!errorTempAxilar}
                                helperText={errorTempAxilar}
                                sx={textFieldSx}
                            />
                            <TextField
                                label="Hemoglobina"
                                variant="outlined"
                                size="small"
                                value={examenF_hemoglobina}
                                onChange={handleHemoglobinaChange}
                                error={!!errorHemoglobina}
                                helperText={errorHemoglobina}
                                sx={textFieldSx}
                            />
                            <Box>
                                <FormGroup row>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={apto_examenFisico === true}
                                                onChange={() => setAptoExamenFisico(true)}
                                            />
                                        }
                                        label="Apto"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={apto_examenFisico === false}
                                                onChange={() => setAptoExamenFisico(false)}
                                            />
                                        }
                                        label="No Apto"
                                    />
                                </FormGroup>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            )
            }

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

                                <Box mr={1} mt={1}>
                                    <RadioGroup
                                        row
                                        value={resp1 === null ? "" : resp1 ? "SI" : "NO"}
                                        onChange={e => setResp1(e.target.value === "SI")}
                                    >
                                        <FormControlLabel value="SI" control={<Radio />} label="SI" />
                                        <FormControlLabel value="NO" control={<Radio />} label="NO" />
                                    </RadioGroup>
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
                                            size="small"
                                            value={texto2}
                                            onChange={e => setTexto2(e.target.value)}
                                            disabled={resp2 !== true}
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



                                <Box mt={5} mr={1}>
                                    <RadioGroup
                                        row
                                        value={resp2 === null ? "" : resp2 ? "SI" : "NO"}
                                        onChange={e => setResp2(e.target.value === "SI")}
                                    >
                                        <FormControlLabel value="SI" control={<Radio />} label="SI" />
                                        <FormControlLabel value="NO" control={<Radio />} label="NO" />
                                    </RadioGroup>
                                </Box>


                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Ha tenido o presentdo dengue recientemente?
                                        ¿Cuándo?

                                        <TextField
                                            id="outlined-basic"
                                            label=""
                                            variant="outlined"
                                            size="small"
                                            value={texto3}
                                            onChange={e => setTexto3(e.target.value)}
                                            disabled={resp3 !== true}
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



                                <Box mt={5} mr={1}>
                                    <RadioGroup
                                        row
                                        value={resp3 === null ? "" : resp3 ? "SI" : "NO"}
                                        onChange={e => setResp3(e.target.value === "SI")}
                                    >
                                        <FormControlLabel value="SI" control={<Radio />} label="SI" />
                                        <FormControlLabel value="NO" control={<Radio />} label="NO" />
                                    </RadioGroup>
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
                                            size="small"
                                            value={text4}
                                            onChange={e => setTexto4(e.target.value)}
                                            disabled={resp4 !== true}
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
                                    <RadioGroup
                                        row
                                        value={resp4 === null ? "" : resp4 ? "SI" : "NO"}
                                        onChange={e => setResp4(e.target.value === "SI")}
                                    >
                                        <FormControlLabel value="SI" control={<Radio />} label="SI" />
                                        <FormControlLabel value="NO" control={<Radio />} label="NO" />
                                    </RadioGroup>
                                </Box>
                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Ha recibido transfuciones de sangre o plasma o ha sido tratado con hemoderivados?
                                    </Typography>
                                </Box>

                                <Box mr={1}>
                                    <RadioGroup
                                        row
                                        value={resp5 === null ? "" : resp5 ? "SI" : "NO"}
                                        onChange={e => setResp5(e.target.value === "SI")}
                                    >
                                        <FormControlLabel value="SI" control={<Radio />} label="SI" />
                                        <FormControlLabel value="NO" control={<Radio />} label="NO" />
                                    </RadioGroup>
                                </Box>


                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Alguna donación efectuada por Ud. ha estado implicada en una transmisión de infección al receptor?
                                    </Typography>
                                </Box>

                                <Box mr={1}>
                                    <RadioGroup
                                        row
                                        value={resp6 === null ? "" : resp6 ? "SI" : "NO"}
                                        onChange={e => setResp6(e.target.value === "SI")}
                                    >
                                        <FormControlLabel value="SI" control={<Radio />} label="SI" />
                                        <FormControlLabel value="NO" control={<Radio />} label="NO" />
                                    </RadioGroup>
                                </Box>


                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Ha recibido transplantes o injertos?
                                    </Typography>
                                </Box>

                                <Box mr={1}>
                                    <RadioGroup
                                        row
                                        value={resp7 === null ? "" : resp7 ? "SI" : "NO"}
                                        onChange={e => setResp7(e.target.value === "SI")}
                                    >
                                        <FormControlLabel value="SI" control={<Radio />} label="SI" />
                                        <FormControlLabel value="NO" control={<Radio />} label="NO" />
                                    </RadioGroup>
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
                                            size="small"
                                            value={texto8}
                                            onChange={e => setTexto8(e.target.value)}
                                            disabled={resp8 !== true}
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
                                    <RadioGroup
                                        row
                                        value={resp8 === null ? "" : resp8 ? "SI" : "NO"}
                                        onChange={e => setResp8(e.target.value === "SI")}
                                    >
                                        <FormControlLabel value="SI" control={<Radio />} label="SI" />
                                        <FormControlLabel value="NO" control={<Radio />} label="NO" />
                                    </RadioGroup>
                                </Box>
                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Está o ha estado sujeto a reclusión penitenciaria durante el último año?
                                    </Typography>
                                </Box>

                                <Box mr={1}>
                                    <RadioGroup
                                        row
                                        value={resp9 === null ? "" : resp9 ? "SI" : "NO"}
                                        onChange={e => setResp9(e.target.value === "SI")}
                                    >
                                        <FormControlLabel value="SI" control={<Radio />} label="SI" />
                                        <FormControlLabel value="NO" control={<Radio />} label="NO" />
                                    </RadioGroup>
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
                                            size="small"
                                            value={texto10}
                                            onChange={e => setTexto10(e.target.value)}
                                            disabled={resp10 !== true}
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
                                    <RadioGroup
                                        row
                                        value={resp10 === null ? "" : resp10 ? "SI" : "NO"}
                                        onChange={e => setResp10(e.target.value === "SI")}
                                    >
                                        <FormControlLabel value="SI" control={<Radio />} label="SI" />
                                        <FormControlLabel value="NO" control={<Radio />} label="NO" />
                                    </RadioGroup>
                                </Box>
                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Estuvo embarazada en los últimos seis meses?
                                    </Typography>
                                </Box>

                                <Box mr={1} mt={1}>
                                    <RadioGroup
                                        row
                                        value={resp11 === null ? "" : resp11 ? "SI" : "NO"}
                                        onChange={e => setResp11(e.target.value === "SI")}
                                    >
                                        <FormControlLabel value="SI" control={<Radio />} label="SI" />
                                        <FormControlLabel value="NO" control={<Radio />} label="NO" />
                                    </RadioGroup>
                                </Box>


                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Padece Ud. de anemia?
                                    </Typography>
                                </Box>

                                <Box mr={1} mt={1}>
                                    <RadioGroup
                                        row
                                        value={resp12 === null ? "" : resp12 ? "SI" : "NO"}
                                        onChange={e => setResp12(e.target.value === "SI")}
                                    >
                                        <FormControlLabel value="SI" control={<Radio />} label="SI" />
                                        <FormControlLabel value="NO" control={<Radio />} label="NO" />
                                    </RadioGroup>
                                </Box>


                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "75%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Padece de alcoholismo crónico?
                                    </Typography>
                                </Box>

                                <Box mr={1} mt={1}>
                                    <RadioGroup
                                        row
                                        value={resp13 === null ? "" : resp13 ? "SI" : "NO"}
                                        onChange={e => setResp13(e.target.value === "SI")}
                                    >
                                        <FormControlLabel value="SI" control={<Radio />} label="SI" />
                                        <FormControlLabel value="NO" control={<Radio />} label="NO" />
                                    </RadioGroup>
                                </Box>


                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Padece de epilepsia o convulsiones?
                                    </Typography>
                                </Box>

                                <Box mr={0.5} mt={1}>
                                    <RadioGroup
                                        row
                                        value={resp14 === null ? "" : resp14 ? "SI" : "NO"}
                                        onChange={e => setResp14(e.target.value === "SI")}
                                    >
                                        <FormControlLabel value="SI" control={<Radio />} label="SI" />
                                        <FormControlLabel value="NO" control={<Radio />} label="NO" />
                                    </RadioGroup>
                                </Box>


                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Ha sido sometido recientemente a extracciones dentarias u otras intervenciones de cirugía menor?
                                    </Typography>
                                </Box>

                                <Box mr={1} mt={1}>
                                    <RadioGroup
                                        row
                                        value={resp15 === null ? "" : resp15 ? "SI" : "NO"}
                                        onChange={e => setResp15(e.target.value === "SI")}
                                    >
                                        <FormControlLabel value="SI" control={<Radio />} label="SI" />
                                        <FormControlLabel value="NO" control={<Radio />} label="NO" />
                                    </RadioGroup>
                                </Box>
                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Ha sido sometido recientemente a cirugías dentarias?
                                    </Typography>
                                </Box>

                                <Box mr={1} mt={1}>
                                    <RadioGroup
                                        row
                                        value={resp16 === null ? "" : resp16 ? "SI" : "NO"}
                                        onChange={e => setResp16(e.target.value === "SI")}
                                    >
                                        <FormControlLabel value="SI" control={<Radio />} label="SI" />
                                        <FormControlLabel value="NO" control={<Radio />} label="NO" />
                                    </RadioGroup>
                                </Box>
                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Ha sido sometido a intervenciones de cirugía mayor?
                                    </Typography>
                                </Box>

                                <Box mr={1} mt={1}>
                                    <RadioGroup
                                        row
                                        value={resp17 === null ? "" : resp17 ? "SI" : "NO"}
                                        onChange={e => setResp17(e.target.value === "SI")}
                                    >
                                        <FormControlLabel value="SI" control={<Radio />} label="SI" />
                                        <FormControlLabel value="NO" control={<Radio />} label="NO" />
                                    </RadioGroup>
                                </Box>
                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿En el ultimo año le han hecho tatuajes, acupuntura, perforación de orejas u otros, ha sufrido pinchaduras accidentales con aguja de inyección o ha estado en contacto con sangre infestada?
                                    </Typography>
                                </Box>

                                <Box mr={1} mt={5}>
                                    <RadioGroup
                                        row
                                        value={resp18 === null ? "" : resp18 ? "SI" : "NO"}
                                        onChange={e => setResp18(e.target.value === "SI")}
                                    >
                                        <FormControlLabel value="SI" control={<Radio />} label="SI" />
                                        <FormControlLabel value="NO" control={<Radio />} label="NO" />
                                    </RadioGroup>
                                </Box>
                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Tuvo pérdida de peso inexplicable, manchas rosadas en la piel, fiebre por más de 10 días, sudores nocturnos, diarreas, manchas blancas en la boca,ganglios grandes ?
                                    </Typography>
                                </Box>

                                <Box mr={1} mt={5}>
                                    <RadioGroup
                                        row
                                        value={resp19 === null ? "" : resp19 ? "SI" : "NO"}
                                        onChange={e => setResp19(e.target.value === "SI")}
                                    >
                                        <FormControlLabel value="SI" control={<Radio />} label="SI" />
                                        <FormControlLabel value="NO" control={<Radio />} label="NO" />
                                    </RadioGroup>
                                </Box>
                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Padece o ha padecido recientemente enfermedades de transmición sexual?
                                    </Typography>
                                </Box>

                                <Box mr={1} mt={1}>
                                    <RadioGroup
                                        row
                                        value={resp20 === null ? "" : resp20 ? "SI" : "NO"}
                                        onChange={e => setResp20(e.target.value === "SI")}
                                    >
                                        <FormControlLabel value="SI" control={<Radio />} label="SI" />
                                        <FormControlLabel value="NO" control={<Radio />} label="NO" />
                                    </RadioGroup>
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
                                    <RadioGroup
                                        row
                                        value={resp21 === null ? "" : resp21 ? "SI" : "NO"}
                                        onChange={e => setResp21(e.target.value === "SI")}
                                    >
                                        <FormControlLabel value="SI" control={<Radio />} label="SI" />
                                        <FormControlLabel value="NO" control={<Radio />} label="NO" />
                                    </RadioGroup>
                                </Box>
                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Ha recibido tratamiento con hormonas hipofisarias de origen humano?
                                    </Typography>
                                </Box>

                                <Box mr={1} mt={1}>
                                    <RadioGroup
                                        row
                                        value={resp22 === null ? "" : resp22 ? "SI" : "NO"}
                                        onChange={e => setResp22(e.target.value === "SI")}
                                    >
                                        <FormControlLabel value="SI" control={<Radio />} label="SI" />
                                        <FormControlLabel value="NO" control={<Radio />} label="NO" />
                                    </RadioGroup>
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
                                            size="small"
                                            value={texto23}
                                            onChange={e => setTexto23(e.target.value)}
                                            disabled={resp23 !== true}
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
                                    <RadioGroup
                                        row
                                        value={resp23 === null ? "" : resp23 ? "SI" : "NO"}
                                        onChange={e => setResp23(e.target.value === "SI")}
                                    >
                                        <FormControlLabel value="SI" control={<Radio />} label="SI" />
                                        <FormControlLabel value="NO" control={<Radio />} label="NO" />
                                    </RadioGroup>
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
                                            size="small"
                                            value={texto24}
                                            onChange={e => setTexto24(e.target.value)}
                                            disabled={resp24 !== true}
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
                                    <RadioGroup
                                        row
                                        value={resp24 === null ? "" : resp24 ? "SI" : "NO"}
                                        onChange={e => setResp24(e.target.value === "SI")}
                                    >
                                        <FormControlLabel value="SI" control={<Radio />} label="SI" />
                                        <FormControlLabel value="NO" control={<Radio />} label="NO" />
                                    </RadioGroup>
                                </Box>
                            </Box>
                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Ha visitado áreas endémicas de paludismo?
                                    </Typography>
                                </Box>

                                <Box mr={1} mt={1}>
                                    <RadioGroup
                                        row
                                        value={resp25 === null ? "" : resp25 ? "SI" : "NO"}
                                        onChange={e => setResp25(e.target.value === "SI")}
                                    >
                                        <FormControlLabel value="SI" control={<Radio />} label="SI" />
                                        <FormControlLabel value="NO" control={<Radio />} label="NO" />
                                    </RadioGroup>
                                </Box>


                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Padece Ud. enfermedad de Chagas o ha permanecido en áreas endémicas de la misma ?
                                    </Typography>
                                </Box>

                                <Box mr={1} mt={1}>
                                    <RadioGroup
                                        row
                                        value={resp26 === null ? "" : resp26 ? "SI" : "NO"}
                                        onChange={e => setResp26(e.target.value === "SI")}
                                    >
                                        <FormControlLabel value="SI" control={<Radio />} label="SI" />
                                        <FormControlLabel value="NO" control={<Radio />} label="NO" />
                                    </RadioGroup>
                                </Box>


                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Ha residido Ud. por un período mayor de 6 meses, a partir de 1980, de forma continua o acumulativa, en países con la nueva variante de la Enfermedad de Creutzfeldt Jacob(vECJ) declarada (Reino Unido de Gran Bretaña o Francia)?
                                    </Typography>
                                </Box>

                                <Box mr={1} mt={8}>
                                    <RadioGroup
                                        row
                                        value={resp27 === null ? "" : resp27 ? "SI" : "NO"}
                                        onChange={e => setResp27(e.target.value === "SI")}
                                    >
                                        <FormControlLabel value="SI" control={<Radio />} label="SI" />
                                        <FormControlLabel value="NO" control={<Radio />} label="NO" />
                                    </RadioGroup>
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
                                            size="small"
                                            value={texto28}
                                            onChange={e => setTexto28(e.target.value)}
                                            disabled={resp28 !== true}
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
                                    <RadioGroup
                                        row
                                        value={resp28 === null ? "" : resp28 ? "SI" : "NO"}
                                        onChange={e => setResp28(e.target.value === "SI")}
                                    >
                                        <FormControlLabel value="SI" control={<Radio />} label="SI" />
                                        <FormControlLabel value="NO" control={<Radio />} label="NO" />
                                    </RadioGroup>
                                </Box>
                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Tiene Ud. contacto actualmente con alguna persona que esté padeciendo de alguna enfermedad febril ?
                                    </Typography>
                                </Box>

                                <Box mr={1} mt={3}>
                                    <RadioGroup
                                        row
                                        value={resp29 === null ? "" : resp29 ? "SI" : "NO"}
                                        onChange={e => setResp29(e.target.value === "SI")}
                                    >
                                        <FormControlLabel value="SI" control={<Radio />} label="SI" />
                                        <FormControlLabel value="NO" control={<Radio />} label="NO" />
                                    </RadioGroup>
                                </Box>
                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Tiene antecedentes familares de vECJ?
                                    </Typography>
                                </Box>

                                <Box mr={1} mt={1}>
                                    <RadioGroup
                                        row
                                        value={resp30 === null ? "" : resp30 ? "SI" : "NO"}
                                        onChange={e => setResp30(e.target.value === "SI")}
                                    >
                                        <FormControlLabel value="SI" control={<Radio />} label="SI" />
                                        <FormControlLabel value="NO" control={<Radio />} label="NO" />
                                    </RadioGroup>
                                </Box>
                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Padece de hipotiroidismo o hipertiroidismo?
                                    </Typography>
                                </Box>

                                <Box mr={1} mt={1}>
                                    <RadioGroup
                                        row
                                        value={resp31 === null ? "" : resp31 ? "SI" : "NO"}
                                        onChange={e => setResp31(e.target.value === "SI")}
                                    >
                                        <FormControlLabel value="SI" control={<Radio />} label="SI" />
                                        <FormControlLabel value="NO" control={<Radio />} label="NO" />
                                    </RadioGroup>
                                </Box>
                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Padece de glomerunefritis aguda?
                                    </Typography>
                                </Box>

                                <Box mr={1} mt={1}>
                                    <RadioGroup
                                        row
                                        value={resp32 === null ? "" : resp32 ? "SI" : "NO"}
                                        onChange={e => setResp32(e.target.value === "SI")}
                                    >
                                        <FormControlLabel value="SI" control={<Radio />} label="SI" />
                                        <FormControlLabel value="NO" control={<Radio />} label="NO" />
                                    </RadioGroup>
                                </Box>
                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿En los últimos 6 meses ha padecido de tromboflebitis?
                                    </Typography>
                                </Box>

                                <Box mr={1} mt={1}>
                                    <RadioGroup
                                        row
                                        value={resp33 === null ? "" : resp33 ? "SI" : "NO"}
                                        onChange={e => setResp33(e.target.value === "SI")}
                                    >
                                        <FormControlLabel value="SI" control={<Radio />} label="SI" />
                                        <FormControlLabel value="NO" control={<Radio />} label="NO" />
                                    </RadioGroup>
                                </Box>
                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Padece Ud. de diabetes controlada mediante dieta o de diabetes insulina-dependiente?
                                    </Typography>
                                </Box>

                                <Box mr={1} mt={1}>
                                    <RadioGroup
                                        row
                                        value={resp34 === null ? "" : resp34 ? "SI" : "NO"}
                                        onChange={e => setResp34(e.target.value === "SI")}
                                    >
                                        <FormControlLabel value="SI" control={<Radio />} label="SI" />
                                        <FormControlLabel value="NO" control={<Radio />} label="NO" />
                                    </RadioGroup>
                                </Box>
                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Presenta o ha presentado ganglios en el cuerpo, culebrilla o ha notado manchas blancas en boca, lengua o garganta?
                                    </Typography>
                                </Box>

                                <Box mr={1} mt={1}>
                                    <RadioGroup
                                        row
                                        value={resp35 === null ? "" : resp35 ? "SI" : "NO"}
                                        onChange={e => setResp35(e.target.value === "SI")}
                                    >
                                        <FormControlLabel value="SI" control={<Radio />} label="SI" />
                                        <FormControlLabel value="NO" control={<Radio />} label="NO" />
                                    </RadioGroup>
                                </Box>
                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿En el último año ha sufrido trombosis venenosa profunda de los miembros inferiores?
                                    </Typography>
                                </Box>

                                <Box mr={1} mt={1}>
                                    <RadioGroup
                                        row
                                        value={resp36 === null ? "" : resp36 ? "SI" : "NO"}
                                        onChange={e => setResp36(e.target.value === "SI")}
                                    >
                                        <FormControlLabel value="SI" control={<Radio />} label="SI" />
                                        <FormControlLabel value="NO" control={<Radio />} label="NO" />
                                    </RadioGroup>
                                </Box>
                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Padece Ud. de retinosis pigmentaria, enfermedades cardiovasculares, del SNC, inmunes, neoplásticas, renales crónicas o hematológicas malignas?
                                    </Typography>
                                </Box>

                                <Box mr={1} mt={1}>
                                    <RadioGroup
                                        row
                                        value={resp37 === null ? "" : resp37 ? "SI" : "NO"}
                                        onChange={e => setResp37(e.target.value === "SI")}
                                    >
                                        <FormControlLabel value="SI" control={<Radio />} label="SI" />
                                        <FormControlLabel value="NO" control={<Radio />} label="NO" />
                                    </RadioGroup>
                                </Box>
                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "65%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Padece de enfermedades gastrointestinales que dificulten la asimilacion de hierro y ácido fólico, cirrosis hepática, hepatitis B y hepatitis C ?
                                    </Typography>
                                </Box>

                                <Box mr={1} mt={1}>
                                    <RadioGroup
                                        row
                                        value={resp38 === null ? "" : resp38 ? "SI" : "NO"}
                                        onChange={e => setResp38(e.target.value === "SI")}
                                    >
                                        <FormControlLabel value="SI" control={<Radio />} label="SI" />
                                        <FormControlLabel value="NO" control={<Radio />} label="NO" />
                                    </RadioGroup>
                                </Box>
                            </Box>

                            <Box display={"flex"} justifyContent={"space-between"} >
                                <Box sx={{ width: "70%" }}>
                                    <Typography sx={{ mt: 2 }} variant="h6" component="h5">
                                        ¿Ha padecido en los últimos 6 meses de úlcera péptica?
                                    </Typography>
                                </Box>

                                <Box mr={1} mt={1}>
                                    <RadioGroup
                                        row
                                        value={resp39 === null ? "" : resp39 ? "SI" : "NO"}
                                        onChange={e => setResp39(e.target.value === "SI")}
                                    >
                                        <FormControlLabel value="SI" control={<Radio />} label="SI" />
                                        <FormControlLabel value="NO" control={<Radio />} label="NO" />
                                    </RadioGroup>
                                </Box>
                            </Box>

                        </Box>
                    </Box>


                    <Box sx={{ ml: 50 }}>
                        <Box sx={{ mt: 2, ml: 9, display: "flex", flexDirection: "column", gap: 1 }}>
                            <FormGroup row>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={apto_interrogatorio === true}
                                            onChange={() => setAptoInterrogatorio(true)}
                                        />
                                    }
                                    label="Apto"
                                />
                                <FormControlLabel sx={{ ml: 29 }}
                                    control={
                                        <Checkbox
                                            checked={apto_interrogatorio === false}
                                            onChange={() => setAptoInterrogatorio(false)}
                                        />
                                    }
                                    label="No Apto"
                                />
                            </FormGroup>

                            {apto_interrogatorio === false && (
                                <Box sx={{ margin: 3 }}>
                                    <TextField
                                        label="Observación"
                                        value={observacion_interrogatorio}
                                        onChange={e => setObservacion_interrogatorio(e.target.value)}
                                        multiline
                                        rows={3}
                                        fullWidth
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
                                </Box>
                            )}
                        </Box>
                    </Box>


                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',

                        }}
                    >
                        <BotonPersonalizado onClick={handleSubmit} sx={{ width: 225 }}>
                            ACEPTAR
                        </BotonPersonalizado>
                    </Box>




                </AccordionDetails>
            </Accordion>

            {/* Modal de éxito/alerta */}
            <Dialog
                open={openModal}
                onClose={() => setOpenModal(false)}
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        padding: 3,
                        minWidth: 320,
                        boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                    },
                }}
            >
                <DialogTitle sx={{ textAlign: "center", pb: 0 }}>
                    <Stack direction="column" alignItems="center" spacing={1}>
                        {modalType === "success" ? (
                            <>
                                <CheckCircleOutlineIcon sx={{ fontSize: 60, color: "success.main" }} />
                                <Typography variant="h5" fontWeight="bold" color="success.main">
                                    ¡Éxito!
                                </Typography>
                            </>
                        ) : (
                            <>
                                <ErrorOutlineIcon sx={{ fontSize: 60, color: "error.main" }} />
                                <Typography variant="h5" fontWeight="bold" color="error.main">
                                    Atención
                                </Typography>
                            </>
                        )}
                    </Stack>
                </DialogTitle>
                <DialogContent>
                    <Typography
                        variant="body1"
                        textAlign="center"
                        sx={{ mt: 1, fontSize: "1.1rem" }}
                    >
                        {modalType === "success"
                            ? "Se guardó correctamente"
                            : errorMsg}
                    </Typography>
                </DialogContent>
            </Dialog>
        </>
    )
}

