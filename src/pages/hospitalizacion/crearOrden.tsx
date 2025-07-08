import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Checkbox, FormControl, FormControlLabel, FormLabel, InputAdornment, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import ModalPersonalizado from '../../components/ModalPersonalizado';

export default function CrearOrdenTransfusion() {
    const location = useLocation();
    const ci = location.state?.ci; // Obtiene los datos pasados por navigate
    const navigate = useNavigate();

    const [id_orden, setId_Orden] = React.useState('');
    // Inicializa los estados con los datos del paciente
    const [nombre, setNombre] = React.useState('');
    const [primerApellido, setPrimerApellido] = React.useState('');
    const [segundoApellido, setSegundoApellido] = React.useState('');
    const [sexo, setSexo] = React.useState('');
    const [edad, setEdad] = React.useState('');
    const [cama, setCama] = React.useState('');
    const [sala, setSala] = React.useState('');
    const [peso, setPeso] = React.useState('');
    const [talla, setTalla] = React.useState('');
    const [fecha_orden, setFechaOrden] = React.useState('');
    const [hora_orden, setHoraOrden] = React.useState('');
    const [tipo_paciente, setTipoPaciente] = React.useState('');
    const [diagnostico_principal, setDiagnosticoPrincipal] = React.useState('');
    const [grupo, setGrupo] = React.useState('');
    const [factor, setFactor] = React.useState('');
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

    const [modalNotifOpen, setModalNotifOpen] = React.useState(false);
    const [notifType, setNotifType] = React.useState<'success' | 'error' | 'info' | 'warning'>('success');
    const [notifTitle, setNotifTitle] = React.useState('');
    const [notifMessage, setNotifMessage] = React.useState('');

    React.useEffect(() => {
        const fetchPacienteData = async () => {
            if (ci) {
                try {
                    const response = await axios.get(`http://localhost:3000/historia-clinica/ci/${ci}`);
                    const data = response.data;

                    // Actualiza todos los estados con los datos del paciente
                    setNombre(data.nombre || '');
                    setPrimerApellido(data.primer_apellido || '');
                    setSegundoApellido(data.segundo_apellido || '');
                    setSexo(data.sexo || '');
                    setEdad(data.edad || '');
                    setGrupo(data.grupo_sanguine || '');
                    setFactor(data.factor || '');

                } catch (error) {
                    console.error('Error al cargar datos del paciente:', error);
                }
            }
        };

        fetchPacienteData();
    }, [ci]);

    // Ejemplo de handleGuardar
    const handleGuardar = async () => {
        // Lista de campos requeridos y sus nombres para mostrar en el mensaje
        const camposRequeridos = [
            { campo: id_orden, nombre: "Número de Orden" },
            { campo: peso, nombre: "Peso" },
            { campo: talla, nombre: "Talla" },
            { campo: sala, nombre: "Sala" },
            { campo: cama, nombre: "Cama" },
            { campo: fecha_orden, nombre: "Fecha de Orden" },
            { campo: hora_orden, nombre: "Hora de Orden" },
            { campo: diagnostico_principal, nombre: "Diagnóstico Principal" },
            { campo: tipo_paciente, nombre: "Tipo de Paciente" },
            { campo: hb, nombre: "HB" },
            { campo: hto, nombre: "HTO" },
            { campo: cont_plaqueta, nombre: "Conteo de Plaquetas" },
            { campo: irn, nombre: "IRN" },
            { campo: lugar_transf, nombre: "Lugar de Transfusión" },
            { campo: fecha_transf, nombre: "Fecha de Transfusión" },
            { campo: hora_transf, nombre: "Hora de Transfusión" },
        ];

        // Verificar si algún componente está seleccionado
        const componenteSeleccionado = globulo_rojo || comp_plasmtico;

        // Campos adicionales si hay componentes seleccionados
        if (globulo_rojo) {
            camposRequeridos.push(
                { campo: prioridad_gr, nombre: "Prioridad Globulos Rojos" },
                { campo: componentes, nombre: "Componente Globulos Rojos" },
                { campo: cant_gr, nombre: "Cantidad Globulos Rojos" },
                { campo: fecha_gr, nombre: "Fecha Globulos Rojos" },
                { campo: hora_gr, nombre: "Hora Globulos Rojos" }
            );
        }

        if (comp_plasmtico) {
            camposRequeridos.push(
                { campo: prioridad_cp, nombre: "Prioridad Componente Plasmático" },
                { campo: componentes, nombre: "Componente Plasmático" },
                { campo: cant_cp, nombre: "Cantidad Componente Plasmático" },
                { campo: frecuencia_cp, nombre: "Frecuencia Componente Plasmático" },
                { campo: fecha_cp, nombre: "Fecha Componente Plasmático" }
            );
        }

        // Verificar campos vacíos
        const camposVacios = camposRequeridos
            .filter(item => item.campo === '' || item.campo === null || item.campo === undefined)
            .map(item => item.nombre);

        // Verificar si no se seleccionó ningún componente
        if (!componenteSeleccionado) {
            setNotifType('warning');
            setNotifTitle('Advertencia');
            setNotifMessage('Debe seleccionar al menos un componente (Glóbulos Rojos o Componente Plasmático)');
            setModalNotifOpen(true);
            return;
        }

        // Mostrar advertencia si hay campos vacíos
        if (camposVacios.length > 0) {
            setNotifType('warning');
            setNotifTitle('Campos Vacíos');
            setNotifMessage(`Por favor rellene los siguientes campos: ${camposVacios.join(', ')}`);
            setModalNotifOpen(true);
            return;
        }
        try {
            await axios.post("http://localhost:3000/transfusiones", {
                id_orden,
                ci,
                nombre,
                primerApellido,
                segundoApellido,
                peso: Number(peso),
                talla: Number(talla),
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
            // Actualizar localStorage
            const savedOrders = JSON.parse(localStorage.getItem('ordenesCreadas') || '{}');
            savedOrders[ci] = true;
            localStorage.setItem('ordenesCreadas', JSON.stringify(savedOrders));

            // Disparar evento para notificar a otros tabs
            window.dispatchEvent(new Event('storage'));

            setNotifType('success');
            setNotifTitle('Éxito');
            setNotifMessage('Orden guardada');
            setModalNotifOpen(true);
        } catch (error: any) {
            setNotifType('error');
            setNotifTitle('Error');
            setNotifMessage('Orden de Transfusión Fallida');
            setModalNotifOpen(true);
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
                <Card variant='elevation' sx={{ m: 1, p: 1, display: 'flex' }}>
                    <TextField sx={{ width: "10%" }}
                        label="No.Orden"
                        value={id_orden}
                        inputProps={{ min: 1 }}
                        onChange={e => {
                            // Permite solo números
                            const value = e.target.value.replace(/\D/g, '');
                            setId_Orden(value);
                        }}
                    />
                    <TextField
                        sx={{ width: "10%", ml: "10px" }}
                        label="CI"
                        value={ci}
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        sx={{ width: "6%", ml: "10px" }}
                        label="Nombre"
                        value={nombre}
                        InputProps={{ readOnly: true }}
                        onChange={e => { setNombre(e.target.value); }}
                    />
                    <TextField
                        sx={{ width: "10%", ml: "10px" }}
                        label="Primer Apellido"
                        value={primerApellido}
                        InputProps={{ readOnly: true }}
                        onChange={e => { setPrimerApellido(e.target.value); }}
                    />
                    <TextField
                        sx={{ width: "11%", ml: "10px" }}
                        label="Segundo Apellido"
                        value={segundoApellido}
                        InputProps={{ readOnly: true }}
                        onChange={e => { setSegundoApellido(e.target.value); }}
                    />
                    <TextField
                        sx={{ ml: "10px", width: "4%" }}
                        label="Sexo"
                        value={sexo}
                        InputProps={{ readOnly: true }}
                        onChange={e => { setSexo(e.target.value); }}
                    />
                    <TextField
                        sx={{ width: "5%", ml: "10px" }}
                        label="Edad"
                        value={edad}
                        InputProps={{ readOnly: true }}
                        onChange={e => { setEdad(e.target.value); }}
                    />
                    <TextField
                        sx={{ ml: "10px", width: "5%" }}
                        label="Grupo"
                        value={grupo}
                        InputProps={{ readOnly: true }}
                        onChange={e => { setGrupo(e.target.value); }}
                    />
                    <TextField
                        sx={{ ml: "10px", width: "5%" }}
                        label="Factor"
                        value={factor}
                        InputProps={{ readOnly: true }}
                        onChange={e => setFactor(e.target.value)}
                    />
                    <TextField
                        sx={{ width: "7%", ml: "10px" }}
                        label="Peso(kg)"
                        value={peso}
                        onChange={e => {
                            let value = e.target.value.replace(/\D/g, '');
                            if (value === "0") value = "";
                            setPeso(value);
                        }}
                        onKeyDown={e => {
                            if (e.key === '-' || e.key === 'e' || e.key === '+') {
                                e.preventDefault();
                            }
                        }}
                    />
                    <TextField
                        sx={{ width: "7%", ml: "10px" }}
                        label="Talla(cm)"
                        value={talla}
                        onChange={e => {
                            let value = e.target.value.replace(/\D/g, '');
                            if (value === "0") value = "";
                            setTalla(value);
                        }}
                        onKeyDown={e => {
                            if (e.key === '-' || e.key === 'e' || e.key === '+') {
                                e.preventDefault();
                            }
                        }}
                    />
                    <TextField
                        sx={{ width: "5%", ml: "10px" }}
                        label="Sala"
                        value={sala}
                        onChange={e => {
                            const value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, '');
                            setSala(value);
                        }}
                    />
                    <TextField
                        sx={{ width: "6%", ml: "10px" }}
                        label="Cama"
                        value={cama}
                        onChange={e => {
                            const value = e.target.value.replace(/\D/g, '');
                            setCama(value);
                        }}
                        onKeyDown={e => {
                            if (e.key === '-' || e.key === 'e' || e.key === '+') {
                                e.preventDefault();
                            }
                        }}
                    />
                </Card>
            </Box>
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
            <Box sx={{ justifyItems: "center" }}>
                <Typography
                    padding={1}
                    color='primary'
                    sx={{ width: "100%", fontSize: "16px", textAlign: "center" }}
                >
                    Tipo de Paciente:
                </Typography>
                <Card variant='elevation' sx={{ p: 1 }}>
                    <FormControl sx={{ ml: "20px" }}>
                        <FormLabel id="demo-row-radio-buttons-group-label"></FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={tipo_paciente}
                            onChange={e => setTipoPaciente(e.target.value)}
                        >
                            <FormControlLabel value="Embarazada" control={<Radio />} label="Embarazada"
                                disabled={
                                    sexo === "M" ||
                                    sexo === "m" ||
                                    sexo === "Masculino" ||
                                    sexo === "masculino"
                                } />
                            <FormControlLabel value="Neonato" control={<Radio />} label="Neonato" disabled={Number(edad) > 1} />
                            <FormControlLabel value="Pediatrico" control={<Radio />} label="Pediatrico" disabled={Number(edad) > 18} />
                            <FormControlLabel value="Adulto" control={<Radio />} label="Adulto" disabled={Number(edad) < 18} />
                        </RadioGroup>
                    </FormControl>
                </Card>
            </Box>
            <Box sx={{ mt: "10px", justifyItems: "center" }}>
                <Typography
                    padding={1}
                    color='primary'
                    sx={{ width: "100%", fontSize: "16px", textAlign: "center" }}
                >
                    Resultado de Examenes Complementarios
                </Typography>
                <Card variant='elevation'>
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
                                endAdornment: <InputAdornment position="start">G/dl</InputAdornment>,
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
                                endAdornment: <InputAdornment position="start">L/L</InputAdornment>,
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
                                endAdornment: <InputAdornment position="start">10<sup>9</sup>/L</InputAdornment>,
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
                                endAdornment: <InputAdornment position="start">s</InputAdornment>,
                            },
                        }}
                    />
                </Card>
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
                                onChange={e => {
                                    setPrioridadGr(e.target.value);
                                    if (e.target.value === "1") {
                                        setPrioridadCp("2");
                                    }
                                    else if (e.target.value === "2") {
                                        setPrioridadCp("1");
                                    }
                                }}
                            >
                                <FormControlLabel value="1" control={<Radio size="small" disabled={!globulo_rojo} />} label="1" disabled={!globulo_rojo} />
                                <FormControlLabel value="2" control={<Radio size="small" disabled={!globulo_rojo} />} label="2" disabled={!globulo_rojo} />
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
                                    if (e.key >= '0' && e.key <= '9' || e.key === '-' || e.key === '+') {
                                        e.preventDefault();
                                    }
                                }}
                                disabled={!globulo_rojo} // Deshabilitado si el checkbox no está marcado
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
                                <FormControlLabel
                                    value={true}
                                    control={<Radio size="small" disabled={!globulo_rojo} />}
                                    label="Urgente"
                                    disabled={!globulo_rojo}
                                />
                                <FormControlLabel
                                    value={false}
                                    control={<Radio size="small" disabled={!globulo_rojo} />}
                                    label="No Urgente"
                                    disabled={!globulo_rojo}
                                />
                            </RadioGroup>
                            <TextField
                                label="Cantidad"
                                value={cant_gr}
                                onChange={e => {
                                    const value = e.target.value.replace(/\D/g, '');
                                    setCantGr(value);
                                }}
                                id="outlined-start-adornment"
                                sx={{ width: 250 }}
                                disabled={!globulo_rojo} // Deshabilitado si el checkbox no está marcado
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
                                        onChange={e => setReservaGr(e.target.checked)}
                                        disabled={!globulo_rojo} // Deshabilitado si el checkbox no está marcado
                                    />}
                                    label="Reserva"
                                />
                            </Box>
                            <Box>
                                <TextField sx={{ width: "50%" }}
                                    label="Fecha"
                                    type="date"
                                    value={fecha_gr}
                                    onChange={e => setFechaGr(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    disabled={!globulo_rojo} // Deshabilitado si el checkbox no está marcado
                                />
                                <TextField sx={{ width: "50%" }}
                                    label="Hora"
                                    type="time"
                                    value={hora_gr}
                                    onChange={e => setHoraGr(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    disabled={!globulo_rojo} // Deshabilitado si el checkbox no está marcado
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
                                onChange={e => {
                                    setPrioridadCp(e.target.value);
                                    if (e.target.value === "1") {
                                        setPrioridadGr("2");
                                    }
                                    else if (e.target.value === "2") {
                                        setPrioridadGr("1");
                                    }
                                }}
                            >
                                <FormControlLabel
                                    value="1"
                                    control={<Radio size="small" />}
                                    label="1"
                                    disabled={prioridad_gr === "1" || !comp_plasmtico} // Doble condición
                                />
                                <FormControlLabel
                                    value="2"
                                    control={<Radio size="small" />}
                                    label="2"
                                    disabled={prioridad_gr === "2" || !comp_plasmtico} // Doble condición
                                />
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
                                    if (e.key >= '0' && e.key <= '9' || e.key === '-' || e.key === '+') {
                                        e.preventDefault();
                                    }
                                }}
                                disabled={!comp_plasmtico} // Deshabilitado si el checkbox no está marcado
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
                                <FormControlLabel value={true} control={<Radio size="small" disabled={!comp_plasmtico} />} label="Urgente" disabled={!comp_plasmtico} />
                                <FormControlLabel value={false} control={<Radio size="small" disabled={!comp_plasmtico} />} label="No Urgente" disabled={!comp_plasmtico} />
                            </RadioGroup>
                            <TextField
                                label="Cantidad"
                                id="outlined-start-adornment"
                                value={cant_cp}
                                onChange={e => {
                                    const value = e.target.value.replace(/\D/g, '');
                                    setCantCp(value);
                                }}
                                sx={{ width: 250 }}
                                disabled={!comp_plasmtico} // Deshabilitado si el checkbox no está marcado
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
                                        disabled={!comp_plasmtico} // Deshabilitado si el checkbox no está marcado
                                    />}
                                    label="Reserva"
                                />
                            </Box>
                            <Box>
                                <TextField sx={{ width: "50%" }}
                                    label="Fecha"
                                    type="date"
                                    value={fecha_cp}
                                    onChange={e => setFechaCp(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    disabled={!comp_plasmtico} // Deshabilitado si el checkbox no está marcado
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
                                        if (e.key >= 'e' || e.key === '-' || e.key === '+') {
                                            e.preventDefault();
                                        }
                                    }}
                                    disabled={!comp_plasmtico} // Deshabilitado si el checkbox no está marcado
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

                        <ModalPersonalizado
                            open={modalNotifOpen}
                            onClose={() => {
                                setModalNotifOpen(false);
                                // Solo navegar si fue éxito
                                if (notifType === 'success') {
                                    navigate('/listadoPacientes');
                                }
                            }}
                            title={notifTitle}
                            message={notifMessage}
                            type={notifType}
                        />
                    </CardActions>
                </Card>
            </Box>
        </>
    );
}
