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

interface ModalProps {
    open: boolean;
    onClose: () => void;
    codigoBolsa: string;
}

export function ModalPruebasPreTransfusionalesGr({ open, onClose, codigoBolsa }: ModalProps) {
    // Estado para los campos del formulario
    const [pruebaregrupo, setPruebaregrupo] = useState('');
    const [pruebaprefactor, setPruebaprefactor] = useState('');
    const [pruebaprehemolisis, setPruebaprehemolisis] = useState('');
    const [pruebaprecruzadamayor, setPruebaprecruzadamayor] = useState('');
    const [pruebaprecruzadamenor, setPruebaprecruzadamenor] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleEnviar = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);

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
                setSuccess(true);
                // Opcional: limpiar campos o cerrar modal
                // onClose();
            } else {
                setError('Error al enviar los datos');
            }
        } catch (err: any) {
            setError(err.message || 'Error en la petición');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal open={open} onClose={onClose} aria-labelledby="modal-gr-title">
            <Container sx={{
                width: "80%", height: "82%", display: 'flex',
                background: "white",
                mt: "65px",
                borderRadius: "10px",
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
                        <FormControl sx={{ ml: "10px", width: '17%' }}>
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
                        {error && (
                            <Typography color="error" sx={{ mt: 1 }}>
                                {error}
                            </Typography>
                        )}
                        {success && (
                            <Typography color="success.main" sx={{ mt: 1 }}>
                                Datos enviados correctamente
                            </Typography>
                        )}
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
    );
}

export function ModalPruebasPreTransfusionalesPCP({ open, onClose, codigoBolsa }: ModalProps) {
    // Estado para los campos del formulario
    const [pruebaregrupo, setPruebaregrupo] = useState('');
    const [pruebaprefactor, setPruebaprefactor] = useState('');
    const [pruebaprecruzadamayor, setPruebaprecruzadamayor] = useState('');
    const [pruebaprecruzadamenor, setPruebaprecruzadamenor] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleEnviar = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);

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
                setSuccess(true);
                // Opcional: limpiar campos o cerrar modal
                // onClose();
            } else {
                setError('Error al enviar los datos');
            }
        } catch (err: any) {
            setError(err.message || 'Error en la petición');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal open={open} onClose={onClose} aria-labelledby="modal-pcp-title">
            <Container sx={{
                width: "80%", height: "35%", display: 'flex',
                background: "white",
                mt: "65px",
                borderRadius: "10px",
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
                        {error && (
                            <Typography color="error" sx={{ mt: 1 }}>
                                {error}
                            </Typography>
                        )}
                        {success && (
                            <Typography color="success.main" sx={{ mt: 1 }}>
                                Datos enviados correctamente
                            </Typography>
                        )}
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
    );
}
