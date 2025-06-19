import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Alert, Box, Button, Card, CardActions, CardContent, CardMedia, Checkbox, FormControl, FormControlLabel, FormLabel, InputAdornment, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
import axios from "axios";

export default function CrearOrdenTransfusion() {
    const [id_orden, setId_Orden] = React.useState('');
    const [nombre, setNombre] = React.useState('');
    const [primerApellido, setPrimerApellido] = React.useState('');
    const [segundoApellido, setSegundoApellido] = React.useState('');
    const [cama, setCama] = React.useState('');
    const [sala, setSala] = React.useState('');
    const [sexo, setSexo] = React.useState('');
    const [edad, setEdad] = React.useState('');
    const [fecha_orden, setFechaOrden] = React.useState('');
    const [hora_orden, setHoraOrden] = React.useState('');
    const [tipo_paciente, setTipoPaciente] = React.useState('');
    const [diagnostico_principal, setDiagnosticoPrincipal] = React.useState('');
    const [grupo, setGrupo] = React.useState('');
    const [factor, setFactor] = React.useState('');
    const [observacion_error, setObservacionError] = React.useState('');
    const [hb, setHb] = React.useState('');
    const [hto, setHto] = React.useState('');
    const [irn, setIrn] = React.useState('');
    const [cont_plaqueta, setContPlaqueta] = React.useState('');
    const [globulo_rojo, setGlobuloRojo] = React.useState(false);
    const [prioridad_gr, setPrioridadGr] = React.useState('');
    const [componentes, setComponentes] = React.useState('');
    const [urgencia_gr, setUrgenciaGr] = React.useState(false);
    const [urgencia_cp, setUrgenciaCp] = React.useState(false);
    const [cant_gr, setCantGr] = React.useState('');
    const [reserva_gr, setReservaGr] = React.useState(false);
    const [fecha_gr, setFechaGr] = React.useState('');
    const [hora_gr, setHoraGr] = React.useState('');
    const [comp_plasmtico, setCompPlasmtico] = React.useState(false);
    const [prioridad_cp, setPrioridadCp] = React.useState('');
    const [cant_cp, setCantCp] = React.useState('');
    const [frecuencia_cp, setFrecuenciaCp] = React.useState('');
    const [reserva_cp, setReservaCp] = React.useState(false);
    const [fecha_cp, setFechaCp] = React.useState('');
    const [fecha_transf, setFechaTransf] = React.useState('');
    const [hora_transf, setHoraTransf] = React.useState('');
    const [caracter, setCaracter] = React.useState(false);
    const [lugar_transf, setLugarTransf] = React.useState('');

    // Ejemplo de handleGuardar
    const handleGuardar = async () => {
        try {
            await axios.post("http://localhost:3000/transfusiones", {
                id_orden,
                nombre,
                primerApellido,
                segundoApellido,
                cama: Number(cama),
                sala,
                sexo,
                edad,
                fecha_orden: new Date(fecha_orden),
                hora_orden: new Date(`${fecha_orden}T${hora_orden}`),
                tipo_paciente,
                diagnostico_principal,
                grupo,
                factor,
                observacion_error,
                hb: Number(hb),
                hto: Number(hto),
                irn: Number(irn),
                cont_plaqueta: Number(cont_plaqueta),
                globulo_rojo,
                prioridad_gr: Number(prioridad_gr),
                componentes,
                urgencia_gr,
                urgencia_cp,
                cant_gr: Number(cant_gr),
                reserva_gr,
                fecha_gr: new Date(fecha_gr),
                hora_gr: new Date(`${fecha_gr}T${hora_gr}`),
                comp_plasmtico,
                prioridad_cp: Number(prioridad_cp),
                cant_cp: Number(cant_cp),
                frecuencia_cp: Number(frecuencia_cp),
                reserva_cp,
                fecha_cp: new Date(fecha_cp),
                fecha_transf: new Date(fecha_transf),
                hora_transf: new Date(`${fecha_transf}T${hora_transf}`),
                caracter,
                lugar_transf,
            });
            <Alert severity="success">Orden de Transfusion Creada</Alert>
        } catch (error) {
            <Alert severity="error">Orden de Transfusion Fallida</Alert>
        }
    };

    return (
        <>
            <Typography
                variant="h4"
                component="h5"
                padding={1}
                sx={{ width: "100%", fontSize: { xs: "1rem", md: "2rem" }, textAlign: "center", bgcolor: "primary.dark", color: "white" }}
            >
                Orden de Transfusion
            </Typography>
            <Box sx={{ mt: "10px" }}>
                <TextField sx={{ width: "10%", ml: "10px" }}
                    label="No.Orden"
                    value={id_orden}
                    inputProps={{ min: 1 }}
                    onChange={e => {
                        // Permite solo números
                        const value = e.target.value.replace(/\D/g, '');
                        setId_Orden(value);
                    }}
                />
                <TextField sx={{ ml: "10px" }}
                    label="Nombre"
                    value={nombre}
                    onChange={e => {
                        // Permite solo letras (mayúsculas y minúsculas) y espacios
                        const value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, '');
                        setNombre(value);
                    }}
                />
                <TextField sx={{ ml: "10px" }}
                    label="Primer Apellido"
                    value={primerApellido}
                    onChange={e => {
                        // Permite solo letras (mayúsculas y minúsculas) y espacios
                        const value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, '');
                        setPrimerApellido(value);
                    }}
                />
                <TextField sx={{ ml: "10px" }}
                    label="Segundo Apellido"
                    value={segundoApellido}
                    onChange={e => {
                        // Permite solo letras (mayúsculas y minúsculas) y espacios
                        const value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, '');
                        setSegundoApellido(value);
                    }}
                />
                <TextField sx={{ width: "5%", ml: "10px" }}
                    label="Cama"
                    type="number"
                    value={cama}
                    inputProps={{ min: 1 }}
                    onChange={e => setCama(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === '-' || e.key === 'e' || e.key === '+') {
                            e.preventDefault();
                        }
                    }}
                />
                <FormControl sx={{ ml: "10px", minWidth: 80 }}>
                    <InputLabel id="demo-simple-select-label">Sexo</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={sexo}
                        label="sexo"
                        onChange={e => {
                            // Permite solo letras (mayúsculas y minúsculas) y espacios
                            const value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, '');
                            setSexo(value);
                        }}
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value={"F"}>F</MenuItem>
                        <MenuItem value={"M"}>M</MenuItem>

                    </Select>
                </FormControl>
                <TextField sx={{ width: "6%", ml: "10px" }}
                    label="Edad"
                    type="number"
                    value={edad}
                    inputProps={{ min: 1 }}
                    onChange={e => setEdad(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === '-' || e.key === 'e' || e.key === '+') {
                            e.preventDefault();
                        }
                    }}
                />
                <TextField sx={{ width: "5%", ml: "10px" }}
                    label="Sala"
                    value={sala}
                    onChange={e => {
                        // Permite solo letras (mayúsculas y minúsculas) y espacios
                        const value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, '');
                        setSala(value);
                    }}
                />
                <FormControl sx={{ ml: "10px", minWidth: 90 }}>
                    <InputLabel id="demo-simple-select-label">Grupo</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={grupo}
                        label="grupo"
                        onChange={e => {
                            // Permite solo letras (mayúsculas y minúsculas) y espacios
                            const value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, '');
                            setGrupo(value);
                        }}
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value={"A"}>A</MenuItem>
                        <MenuItem value={"B"}>B</MenuItem>
                        <MenuItem value={"AB"}>AB</MenuItem>
                        <MenuItem value={"O"}>O</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ ml: "10px", minWidth: 90 }}>
                    <InputLabel id="demo-simple-select-label">Factor</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={factor}
                        label="factor"
                        onChange={e => setFactor(e.target.value)}
                        onKeyDown={e => {
                            if (e.key >= '0' && e.key <= '9' || e.key === 'e') {
                                e.preventDefault();
                            }
                        }}
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value={"+"}>+</MenuItem>
                        <MenuItem value={"-"}>-</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Accordion sx={{ mt: "10px" }}>
                <AccordionSummary sx={{ width: "100%", fontSize: { xs: "1rem", md: "2rem" }, textAlign: "center", bgcolor: "primary.dark", color: "white" }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography sx={{ width: "100%", fontSize: "16px", textAlign: "center" }} component="span">Historia Clinica</Typography>
                </AccordionSummary>
                <AccordionDetails>
                </AccordionDetails>
            </Accordion>
            <Box sx={{ mt: "10px", display: "flex", alignItems: "center" }}>
                <TextField sx={{ width: "11%", ml: "10px" }}
                    label="Fecha"
                    type="date"
                    value={fecha_orden}
                    onChange={e => setFechaOrden(e.target.value)}
                    InputLabelProps={{
                        shrink: true, // Para que el label no se superponga al valor
                    }}
                />
                <TextField sx={{ width: "11%", ml: "10px" }}
                    label="Hora"
                    type="time"
                    value={hora_orden}
                    onChange={e => setHoraOrden(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />


                <FormControl sx={{ ml: "20px" }}>
                    <FormLabel id="demo-row-radio-buttons-group-label">Tipo de Paciente</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={tipo_paciente}
                        onChange={e => setTipoPaciente(e.target.value)}
                    >
                        <FormControlLabel value="Embarazada" control={<Radio />} label="Embarazada" />
                        <FormControlLabel value="Neonato" control={<Radio />} label="Neonato" />
                        <FormControlLabel value="Pediatrico" control={<Radio />} label="Pediatrico" />
                    </RadioGroup>
                </FormControl>


                <TextField sx={{ width: "40%", ml: "10px" }}
                    label="Diagnostico Principal"
                    value={diagnostico_principal}
                    onChange={e => {
                        // Permite solo letras (mayúsculas y minúsculas) y espacios
                        const value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, '');
                        setDiagnosticoPrincipal(value);
                    }}
                />
            </Box>


            <Box sx={{ mt: "10px", justifyItems: "center" }}>
                <Typography
                    padding={1}
                    color='primary'
                    sx={{ width: "100%", fontSize: "16px", textAlign: "center" }}
                >
                    Resultado de Examenes Complementarios
                </Typography>
                <TextField
                    label="HB"
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: '25ch' }}
                    value={hb}
                    onChange={e => {
                        // Permite solo números
                        const value = e.target.value.replace(/\D/g, '');
                        setHb(value);
                    }}
                    slotProps={{
                        input: {
                            endAdornment: <InputAdornment position="start">um</InputAdornment>,
                        },
                    }}
                />
                <TextField
                    label="HTO"
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: '25ch' }}
                    value={hto}
                    onChange={e => {
                        // Permite solo números
                        const value = e.target.value.replace(/\D/g, '');
                        setHto(value);
                    }}
                    slotProps={{
                        input: {
                            endAdornment: <InputAdornment position="start">um</InputAdornment>,
                        },
                    }}
                />
                <TextField
                    label="Conteo de Plaquetas"
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: '25ch' }}
                    value={cont_plaqueta}
                    onChange={e => {
                        // Permite solo números
                        const value = e.target.value.replace(/\D/g, '');
                        setContPlaqueta(value);
                    }}
                    slotProps={{
                        input: {
                            endAdornment: <InputAdornment position="start">um</InputAdornment>,
                        },
                    }}
                />
                <TextField
                    label="IRN"
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: '25ch' }}
                    value={irn}
                    onChange={e => {
                        // Permite solo números
                        const value = e.target.value.replace(/\D/g, '');
                        setIrn(value);
                    }}
                    slotProps={{
                        input: {
                            endAdornment: <InputAdornment position="start">um</InputAdornment>,
                        },
                    }}
                />
            </Box>


            <Box sx={{ mt: "10px" }}>
                <Typography
                    padding={1}
                    color='primary'
                    sx={{ width: "100%", fontSize: "16px", textAlign: "center" }}
                >
                    Componentes a Transfundir
                </Typography>
                <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                    <Card sx={{ width: 400 }}>
                        <CardMedia sx={{ display: "flex", justifyContent: "space-between" }}>
                            <FormControlLabel sx={{ ml: "2px" }}
                                control={<Checkbox
                                    checked={globulo_rojo}
                                    onChange={e => setGlobuloRojo(e.target.checked)}
                                />}
                                label="Globulos Rojos"
                            />
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={prioridad_gr}
                                onChange={e => setPrioridadGr(e.target.value)}
                            >
                                <FormControlLabel value={1} control={<Radio size="small" />} label="1" />
                                <FormControlLabel value={2} control={<Radio size="small" />} label="2" />
                            </RadioGroup>
                        </CardMedia>
                        <CardContent>
                            <InputLabel id="demo-simple-select-label">Componente</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={componentes}
                                label="Componente"
                                onChange={e => setComponentes(e.target.value)}
                                sx={{ height: 36, width: 250 }}
                                onKeyDown={e => {
                                    // Previene la escritura de números directamente
                                    if (e.key >= '0' && e.key <= '9' || e.key === '-' || e.key === '+') {
                                        e.preventDefault();
                                    }
                                }}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value={"CE"}>CE</MenuItem>
                                <MenuItem value={"CEPL"}>CEPL</MenuItem>
                                <MenuItem value={"CEAD"}>CEAD</MenuItem>
                            </Select>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={urgencia_gr}
                                onChange={e => setUrgenciaGr(e.target.value === "true")}
                            >
                                <FormControlLabel value={true} control={<Radio size="small" />} label="Urgente" />
                                <FormControlLabel value={false} control={<Radio size="small" />} label="No Urgente" />
                            </RadioGroup>
                            <TextField
                                label="Cantidad"
                                value={cant_gr}
                                onChange={e => {
                                    // Permite solo números
                                    const value = e.target.value.replace(/\D/g, '');
                                    setCantGr(value);
                                }}
                                id="outlined-start-adornment"
                                sx={{ width: 250 }}
                                slotProps={{
                                    input: {
                                        endAdornment: <InputAdornment position="start">ml</InputAdornment>,
                                    },
                                }}
                            />
                        </CardContent>
                        <CardActions sx={{ display: "grid" }}>
                            <Box>
                                <FormControlLabel sx={{ ml: "2px" }}
                                    control={<Checkbox
                                        checked={reserva_gr}
                                        onChange={e => setReservaGr(e.target.checked)} />}
                                    label="Reserva" />
                            </Box>
                            <Box>
                                <TextField sx={{ width: "50%" }}
                                    label="Fecha"
                                    type="date"
                                    value={fecha_gr}
                                    onChange={e => setFechaGr(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true, // Para que el label no se superponga al valor
                                    }}
                                />
                                <TextField sx={{ width: "50%" }}
                                    label="Hora"
                                    type="time"
                                    value={hora_gr}
                                    onChange={e => setHoraGr(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Box>
                        </CardActions>
                    </Card>
                    <Card sx={{ maxWidth: 450 }}>
                        <CardMedia sx={{ display: "flex" }}>
                            <FormControlLabel sx={{ ml: "2px" }} control={<Checkbox
                                checked={comp_plasmtico}
                                onChange={e => setCompPlasmtico(e.target.checked)}
                            />} label="Componente Plasmatico" />
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={prioridad_cp}
                                onChange={e => setPrioridadCp(e.target.value)}
                            >
                                <FormControlLabel value={1} control={<Radio size="small" />} label="1" />
                                <FormControlLabel value={2} control={<Radio size="small" />} label="2" />
                            </RadioGroup>
                        </CardMedia>
                        <CardContent>
                            <InputLabel id="demo-simple-select-label">Componente</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={componentes}
                                label="Componente"
                                onChange={e => setComponentes(e.target.value)}
                                sx={{ height: 36, width: 250 }}
                                onKeyDown={e => {
                                    // Previene la escritura de números directamente
                                    if (e.key >= '0' && e.key <= '9' || e.key === '-' || e.key === '+') {
                                        e.preventDefault();
                                    }
                                }}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value={"CP"}>CP</MenuItem>
                                <MenuItem value={"CPA"}>CPA</MenuItem>
                                <MenuItem value={"CPAF"}>CPAF</MenuItem>
                            </Select>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={urgencia_cp}
                                onChange={e => setUrgenciaCp(e.target.value === "true")}
                            >
                                <FormControlLabel value={true} control={<Radio size="small" />} label="Urgente" />
                                <FormControlLabel value={false} control={<Radio size="small" />} label="No Urgente" />
                            </RadioGroup>
                            <TextField
                                label="Cantidad"
                                id="outlined-start-adornment"
                                value={cant_cp}
                                onChange={e => {
                                    // Permite solo números
                                    const value = e.target.value.replace(/\D/g, '');
                                    setCantCp(value);
                                }}
                                sx={{ width: 250 }}
                                slotProps={{
                                    input: {
                                        endAdornment: <InputAdornment position="start">ml</InputAdornment>,
                                    },
                                }}
                            />
                        </CardContent>
                        <CardActions sx={{ display: "grid" }}>
                            <Box>
                                <FormControlLabel sx={{ ml: "2px" }}
                                    control={<Checkbox
                                        checked={reserva_cp}
                                        onChange={e => setReservaCp(e.target.checked)}
                                    />} label="Reserva" />
                            </Box>
                            <Box>
                                <TextField sx={{ width: "50%" }}
                                    label="Fecha"
                                    type="date"
                                    value={fecha_cp}
                                    onChange={e => setFechaCp(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true, // Para que el label no se superponga al valor
                                    }}
                                />
                                <InputLabel id="demo-simple-select-label">Frecuencia</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={frecuencia_cp}
                                    label="Frecuencia"
                                    onChange={e => setFrecuenciaCp(e.target.value)}
                                    sx={{ height: 36, width: 250 }}
                                    onKeyDown={e => {
                                        // Previene la escritura de números directamente
                                        if (e.key >= 'e' || e.key === '-' || e.key === '+') {
                                            e.preventDefault();
                                        }
                                    }}
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                </Select>
                            </Box>
                        </CardActions>
                    </Card>
                </Box>
            </Box>
            <Box sx={{ display: "flex", mt: "20px", justifyContent: "space-between", padding: 2 }}>
                <TextField
                    id="outlined-multiline-static"
                    label="Observaciones"
                    value={observacion_error}
                    onChange={e => setObservacionError(e.target.value)}
                    multiline
                    rows={4}
                />
                <Card sx={{ maxWidth: 450 }}>
                    <CardMedia>
                        <Typography
                            padding={1}
                            color='primary'
                            sx={{ width: "100%", fontSize: "16px", textAlign: "center" }}
                        >
                            La Transfusion debe realizarse:
                        </Typography>
                    </CardMedia>
                    <CardContent>
                        <Typography
                            color='primary'
                            sx={{ width: "100%", fontSize: "16px" }}
                        >
                            Lugar
                        </Typography>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={lugar_transf}
                            onChange={e => setLugarTransf(e.target.value)}
                        >
                            <FormControlLabel value="Sala" control={<Radio size="small" />} label="Sala" />
                            <FormControlLabel value="Salon de Operaciones" control={<Radio size="small" />} label="Salon de Operaciones" />
                        </RadioGroup>
                        <Box>
                            <Typography
                                color='primary'
                                sx={{ width: "100%", fontSize: "16px" }}
                            >
                                Caracter
                            </Typography>
                            <FormControlLabel control={<Checkbox
                                checked={caracter}
                                onChange={e => setCaracter(e.target.checked)}
                            />} label="Urgente" />
                        </Box>
                    </CardContent>
                    <CardActions sx={{ display: "grid" }}>
                        <Box>
                            <TextField sx={{ width: "50%" }}
                                label="Fecha"
                                type="date"
                                value={fecha_transf}
                                onChange={e => setFechaTransf(e.target.value)}
                                InputLabelProps={{
                                    shrink: true, // Para que el label no se superponga al valor
                                }}
                            />
                            <TextField sx={{ width: "50%" }}
                                label="Hora"
                                type="time"
                                value={hora_transf}
                                onChange={e => setHoraTransf(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Box>
                        <Button
                            variant="contained"
                            size="small"
                            sx={{ m: 1 }}
                            onClick={handleGuardar}
                        >
                            Aceptar
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        </>
    );
}
