import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button, Container, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import axios from 'axios';
import { useState } from 'react';
import ModalPersonalizado from "./ModalPersonalizado";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    codigoBolsa: string;
    refreshRows: () => void; // <-- agrega esto
}

export function ModalPruebasPreTransfusionalesGr({ open, onClose, codigoBolsa, refreshRows }: ModalProps) {
    // Estado para los campos del formulario
    const [pruebaregrupo, setPruebaregrupo] = useState('');
    const [pruebaprefactor, setPruebaprefactor] = useState('');
    const [pruebaprehemolisis, setPruebaprehemolisis] = useState('');
    const [pruebaprecruzadamayor, setPruebaprecruzadamayor] = useState('');
    const [pruebaprecruzadamenor, setPruebaprecruzadamenor] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalNotifOpen, setModalNotifOpen] = useState(false);
    const [notifType, setNotifType] = useState<'success' | 'error' | 'warning'>('success');
    const [notifTitle, setNotifTitle] = useState('');
    const [notifMessage, setNotifMessage] = useState('');

    const handleEnviar = async () => {
        // Validar campos vacíos
        if (
            !pruebaregrupo ||
            !pruebaprefactor ||
            !pruebaprehemolisis !== undefined && !pruebaprehemolisis || // Solo para GR
            !pruebaprecruzadamayor ||
            !pruebaprecruzadamenor
        ) {
            setNotifType('warning');
            setNotifTitle('Advertencia');
            setNotifMessage('Rellene los Campos Vacios');
            setModalNotifOpen(true);
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3000/pruebaspretransfusionalesgr', {
                codigo_bolsa: codigoBolsa,
                pruebaregrupo,
                pruebaprefactor,
                pruebaprehemolisis,
                pruebaprecruzadamayor,
                pruebaprecruzadamenor,
            });

            if (response.status === 200 || response.status === 201) {
                setNotifType('success');
                setNotifTitle('Éxito');
                setNotifMessage('Resultados Guardados');
                setModalNotifOpen(true);
                refreshRows(); // <-- llama aquí
                onClose(); // Si quieres cerrar el modal principal al éxito, descomenta esto
            } else {
                setNotifType('error');
                setNotifTitle('Error');
                setNotifMessage('Error al enviar los datos');
                setModalNotifOpen(true);
            }
        } catch (err: any) {
            setNotifType('error');
            setNotifTitle('Error');
            setNotifMessage(err.message || 'Error en la petición');
            setModalNotifOpen(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Modal open={open} onClose={onClose} aria-labelledby="modal-gr-title">
                <Container sx={{
                    width: "100%", height: "35%", display: 'flex',
                    background: "white",
                    mt: "65px",
                }}>
                    <Box sx={{ marginTop: "20px", mb: "20px", width: "100%", height: "30%" }}>
                        <Typography
                            padding={1}
                            sx={{
                                width: "100%",
                                fontSize: "20px",
                                textAlign: "center",
                                bgcolor: "primary.dark",
                                color: "white",
                            }}
                        >
                            Pruebas Pre Transfusionales
                        </Typography>
                        <Box sx={{ marginTop: "20px" }}>
                            <TextField
                                label="Código de Bolsa"
                                value={codigoBolsa}
                                sx={{ width: '12%' }}
                                InputProps={{ readOnly: true }}
                            />
                            <FormControl sx={{ ml: 1, width: '14%' }}>
                                <InputLabel id="demo-simple-select-label">Prueba de Grupo</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={pruebaregrupo}
                                    label="Prueba de Grupo"
                                    onChange={e => {
                                        // Permite solo letras (mayúsculas y minúsculas) y espacios
                                        const value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, '');
                                        setPruebaregrupo(value);
                                    }}
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value={"A"}>A</MenuItem>
                                    <MenuItem value={"B"}>B</MenuItem>
                                    <MenuItem value={"AB"}>AB</MenuItem>
                                    <MenuItem value={"O"}>O</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ ml: 1, width: '15%' }}>
                                <InputLabel id="demo-simple-select-label">Prueba de Factor</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={pruebaprefactor}
                                    label="Prueba de Factor"
                                    onChange={e => setPruebaprefactor(e.target.value)}
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
                            <FormControl sx={{ ml: 1, width: '17%' }}>
                                <InputLabel id="demo-simple-select-label">Prueba de Hemolisis</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={pruebaprehemolisis}
                                    label="Prueba de Hemolisis"
                                    onChange={e => setPruebaprehemolisis(e.target.value)}
                                    onKeyDown={e => {
                                        if (e.key >= '0' && e.key <= '9' || e.key === 'e') {
                                            e.preventDefault();
                                        }
                                    }}
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value={"Positiva"}>Positiva</MenuItem>
                                    <MenuItem value={"Negativa"}>Negativa</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ ml: 1, width: '19%' }}>
                                <InputLabel id="demo-simple-select-label">Prueba Cruzada Mayor</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={pruebaprecruzadamayor}
                                    label="Prueba Cruzada Mayor"
                                    onChange={e => {
                                        // Permite solo letras (mayúsculas y minúsculas) y espacios
                                        const value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, '');
                                        setPruebaprecruzadamayor(value);
                                    }}
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value={"Compatible"}>Compatible</MenuItem>
                                    <MenuItem value={"Incompatible"}>Incompatible</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ ml: 1, width: '19%' }}>
                                <InputLabel id="demo-simple-select-label">Prueba Cruzada Menor</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={pruebaprecruzadamenor}
                                    label="Prueba Cruzada Menor"
                                    onChange={e => {
                                        // Permite solo letras (mayúsculas y minúsculas) y espacios
                                        const value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, '');
                                        setPruebaprecruzadamenor(value);
                                    }}
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value={"Compatible"}>Compatible</MenuItem>
                                    <MenuItem value={"Incompatible"}>Incompatible</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ mt: "15px", display: 'flex' }}>
                            <Button
                                variant="contained"
                                size="small"
                                endIcon={<SendIcon />}
                                onClick={handleEnviar}
                                disabled={loading}
                            >
                                {loading ? 'Enviando...' : 'Enviar'}
                            </Button>

                            <Button
                                variant="contained"
                                size="small"
                                color='error'
                                sx={{ ml: 1 }}
                                endIcon={<DisabledByDefaultRoundedIcon sx={{ marginLeft: 0, fontSize: "large" }} />}
                                onClick={onClose}
                            >
                                Cerrar
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Modal>
            <ModalPersonalizado
                open={modalNotifOpen}
                onClose={() => setModalNotifOpen(false)}
                title={notifTitle}
                message={notifMessage}
                type={notifType}
            />
        </>
    );
}

export function ModalPruebasPreTransfusionalesPCP({ open, onClose, codigoBolsa, refreshRows }: ModalProps) {
    // Estado para los campos del formulario
    const [pruebaregrupo, setPruebaregrupo] = useState('');
    const [pruebaprefactor, setPruebaprefactor] = useState('');
    const [pruebaprecruzadamayor, setPruebaprecruzadamayor] = useState('');
    const [pruebaprecruzadamenor, setPruebaprecruzadamenor] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalNotifOpen, setModalNotifOpen] = useState(false);
    const [notifType, setNotifType] = useState<'success' | 'error' | 'warning'>('success');
    const [notifTitle, setNotifTitle] = useState('');
    const [notifMessage, setNotifMessage] = useState('');

    const handleEnviar = async () => {
        // Validar campos vacíos
        if (
            !pruebaregrupo ||
            !pruebaprefactor ||
            !pruebaprecruzadamayor ||
            !pruebaprecruzadamenor
        ) {
            setNotifType('warning');
            setNotifTitle('Advertencia');
            setNotifMessage('Rellene los Campos Vacios');
            setModalNotifOpen(true);
            return;
        }
        setLoading(true);

        try {
            // Ajusta la URL a tu endpoint backend
            const response = await axios.post('http://localhost:3000/pruebaspretransfusionalespcp', {
                codigo_bolsa: codigoBolsa,
                pruebaregrupo,
                pruebaprefactor,
                pruebaprecruzadamayor,
                pruebaprecruzadamenor,
            });

            if (response.status === 200 || response.status === 201) {
                setNotifType('success');
                setNotifTitle('Éxito');
                setNotifMessage('Resultados Guardados');
                setModalNotifOpen(true);
                refreshRows(); // <-- llama aquí
                onClose(); // Si quieres cerrar el modal principal al éxito, descomenta esto
            } else {
                setNotifType('error');
                setNotifTitle('Error');
                setNotifMessage('Error al enviar los datos');
                setModalNotifOpen(true);
            }
        } catch (err: any) {
            setNotifType('error');
            setNotifTitle('Error');
            setNotifMessage(err.message || 'Error en la petición');
            setModalNotifOpen(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Modal open={open} onClose={onClose} aria-labelledby="modal-pcp-title">
                <Container sx={{
                    width: "80%", height: "35%", display: 'flex',
                    background: "white",
                    mt: "65px",
                }}>
                    <Box sx={{ marginTop: "20px", mb: "20px", width: "100%", height: "30%" }}>
                        <Typography
                            padding={1}
                            sx={{
                                width: "100%",
                                fontSize: "20px",
                                textAlign: "center",
                                bgcolor: "primary.dark",
                                color: "white",
                            }}
                        >
                            Pruebas Pre Transfusionales
                        </Typography>
                        <Box sx={{ marginTop: "20px" }}>
                            <TextField
                                label="Código de Bolsa"
                                value={codigoBolsa}
                                sx={{ width: '13%' }}
                                InputProps={{ readOnly: true }}
                            />
                            <FormControl sx={{ ml: "10px", width: '17%' }}>
                                <InputLabel id="demo-simple-select-label">Prueba de Grupo</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={pruebaregrupo}
                                    label="Prueba de Grupo"
                                    onChange={e => {
                                        // Permite solo letras (mayúsculas y minúsculas) y espacios
                                        const value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, '');
                                        setPruebaregrupo(value);
                                    }}
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value={"A"}>A</MenuItem>
                                    <MenuItem value={"B"}>B</MenuItem>
                                    <MenuItem value={"AB"}>AB</MenuItem>
                                    <MenuItem value={"O"}>O</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ ml: "10px", width: '17%' }}>
                                <InputLabel id="demo-simple-select-label">Prueba de Factor</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={pruebaprefactor}
                                    label="Prueba de Factor"
                                    onChange={e => setPruebaprefactor(e.target.value)}
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
                            <FormControl sx={{ ml: "10px", width: '21%' }}>
                                <InputLabel id="demo-simple-select-label">Prueba Cruzada Mayor</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={pruebaprecruzadamayor}
                                    label="Prueba Cruzada Mayor"
                                    onChange={e => {
                                        // Permite solo letras (mayúsculas y minúsculas) y espacios
                                        const value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, '');
                                        setPruebaprecruzadamayor(value);
                                    }}
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value={"Compatible"}>Compatible</MenuItem>
                                    <MenuItem value={"Incompatible"}>Incompatible</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ ml: "10px", width: '21%' }}>
                                <InputLabel id="demo-simple-select-label">Prueba Cruzada Menor</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={pruebaprecruzadamenor}
                                    label="Prueba Cruzada Menor"
                                    onChange={e => {
                                        // Permite solo letras (mayúsculas y minúsculas) y espacios
                                        const value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, '');
                                        setPruebaprecruzadamenor(value);
                                    }}
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value={"Compatible"}>Compatible</MenuItem>
                                    <MenuItem value={"Incompatible"}>Incompatible</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ mt: "15px", display: 'flex' }}>
                            <Button
                                variant="contained"
                                size="small"
                                endIcon={<SendIcon />}
                                onClick={handleEnviar}
                                disabled={loading}
                            >
                                {loading ? 'Enviando...' : 'Enviar'}
                            </Button>

                            <Button
                                variant="contained"
                                size="small"
                                color='error'
                                sx={{ ml: 1 }}
                                endIcon={<DisabledByDefaultRoundedIcon sx={{ marginLeft: 0, fontSize: "large" }} />}
                                onClick={onClose}
                            >
                                Cerrar
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Modal>
            <ModalPersonalizado
                open={modalNotifOpen}
                onClose={() => setModalNotifOpen(false)}
                title={notifTitle}
                message={notifMessage}
                type={notifType}
            />
        </>
    );
}
