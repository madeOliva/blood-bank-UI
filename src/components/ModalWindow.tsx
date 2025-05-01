import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import BotonPersonalizado from '../components/Button';
import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function ModalWindow() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Estos son para el droplist
    const [grupo, setGrupo] = React.useState('');
    const [factor, setFactor] = React.useState('');
    const [hemoglobina, setHemoglobina] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setGrupo(event.target.value as string);
    };

    const handleChangeF = (event: SelectChangeEvent) => {
        setFactor(event.target.value as string);
    };

    const handleChangeH = (event: SelectChangeEvent) => {
        setHemoglobina(event.target.value as string);
    };

    

    return (
        <div>
            <WaterDropIcon onClick={handleOpen} sx={{ color: "secondary.main" }} />
            <Modal sx={{borderColor:"prymary.dark"}}
                open={open}
                /*onClose={handleClose}} esta linea cierra si tocas cualquier lado de la pantalla*/
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} >
                    <Typography id="modal-modal-title" variant="h6" component="h5" >
                        Resultado:
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} variant="h6" component="h5">
                        Grupo
                    </Typography>
                    <Box sx={{ minWidth: 120, width: 120, minHeight: 40, position: 'revert-layer' }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label"></InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={grupo}
                                label="Grupo"
                                onChange={handleChange}
                            >
                                <MenuItem value={10}></MenuItem>
                                <MenuItem value={20}>A</MenuItem>
                                <MenuItem value={30}>B</MenuItem>
                                <MenuItem value={40}>O</MenuItem>
                                <MenuItem value={50}>AB</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} variant="h6" component="h5">
                        Factor
                    </Typography>
                    <Box sx={{ minWidth: 120, width: 120, minHeight: 40, position: 'revert-layer' }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label"></InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={factor}
                                label="Factor"
                                onChange={handleChangeF}
                            >
                                <MenuItem value={10}></MenuItem>
                                <MenuItem value={20}>positivo</MenuItem>
                                <MenuItem value={30}>negativo</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} variant="h6" component="h5">
                        Hemoglobina
                    </Typography>
                    <Box sx={{ minWidth: 120, width: 120, minHeight: 40, position: 'revert-layer' }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label"></InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={hemoglobina}
                                label="Hemoglobina"
                                onChange={handleChangeH}
                            >
                                <MenuItem value={10}></MenuItem>
                                <MenuItem value={20}>normal</MenuItem>
                                <MenuItem value={30}>baja</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box>
                    <FormControlLabel control={<Checkbox  />} label="Apto" />
                    <FormControlLabel control={<Checkbox  />} label="No apto" />
                    </Box>
                    <BotonPersonalizado onClick={handleClose} sx={{ width: 225 }}>
                        ACEPTAR
                    </BotonPersonalizado>
                </Box>
            </Modal>
        </div>
    );
}

