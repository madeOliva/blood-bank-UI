import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, Dialog, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, FormLabel, IconButton, InputLabel, MenuItem, Modal, Paper, Radio, RadioGroup, Select, Stack, TextField, Typography, Grid } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BotonPersonalizado from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";


// Estilos para modales
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: "primary.dark",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    textAlign: 'center',
};

const successModalStyle = {
    ...modalStyle,
    borderTop: '4px solid #13b09e',
};

const errorModalStyle = {
    ...modalStyle,
    borderTop: '4px solid #b0170c',
};

const emptyHistoryData = {
    generalData: {
        ci: '',
        nombre: '',
        primer_apellido: '',
        segundo_apellido: '',
        edad: '',
        sexo: '',
        color_piel: '',
        no_hc: '',
        estado_civil: '',
        municipio: '',
        provincia: '',
        consejo_popular: '',
        no_consultorio: '',
        ocupacion: '',
        cat_ocupacional: '',
        telefono: '',
        centro_laboral: '',
        telefonoLaboral: '',
        otra_localizacion: '',
        grupo_sanguine: '',
        factor: '',
        estilo_vida: '',
        alimentacion: '',
        genero_vida: '',
        donante: '',
    },
    antecedentesPersonales: [] as { id: number; antecedente: string; año: string }[],
    antecedentesFamiliares: [] as { id: number; antecedente: string; parentesco: string }[],
    alergias: [] as { id: number; alergia: string }[],
    habitosToxicos: [] as { id: number; habito: string; intensidad: string }[],
    estanciaExtranjero: [] as { id: number; fecha: string; pais: string; estadia: string; motivo: string }[],
    donacionesPrevias: [] as { id: number; fecha: string; lugar: string; reaccion: string }[],
    transfusionesPrevias: [] as { id: number; fecha: string; lugar: string; diagnostico: string; reaccion: string; observaciones: string }[],
};


export default function HistoriaDonante() {

    const { id, historiaClinicaId } = useParams();
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

    // Estado principal que contiene toda la historia clínica
    const [historyData, setHistoryData] = useState(emptyHistoryData);
    const [loading, setLoading] = useState(true);
    const [donacionesPrevias, setDonacionesPrevias] = useState([]);

    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const [openErrorModal, setOpenErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [sexos, setSexos] = useState<{ _id: string; nombre: string }[]>([]);
    const [coloresPiel, setColoresPiel] = useState<{ _id: string; nombre: string }[]>([]);
    const [provincias, setProvincias] = useState<{ _id: string; nombre_provincia: string }[]>([]);
    const [gruposSanguineos, setGruposSanguineos] = useState<{ _id: string; nombre: string }[]>([]);
    const [factores, setFactores] = useState<{ _id: string; signo: string }[]>([]);



    useEffect(() => {
        const fetchCatalogos = async () => {
            try {
                const [sexosRes, coloresRes, provinciasRes, gruposRes, factoresRes] = await Promise.all([
                    axios.get('http://localhost:3000/sexo'),
                    axios.get('http://localhost:3000/color-piel'),
                    axios.get('http://localhost:3000/provincia'),
                    axios.get('http://localhost:3000/grupos-sanguineos'),
                    axios.get('http://localhost:3000/factores'),
                ]);
                setSexos(sexosRes.data);
                setColoresPiel(coloresRes.data);
                setProvincias(provinciasRes.data);
                setGruposSanguineos(gruposRes.data);
                setFactores(factoresRes.data);
            } catch (error) {
                setErrorMessage('Error al cargar catálogos');
                setOpenErrorModal(true);
            }
        };
        fetchCatalogos();
    }, []);




    // Cargar datos del backend al montar el componente
    useEffect(() => {
        axios.get(`http://localhost:3000/historia-clinica/datos/${historiaClinicaId}`)
            .then(res => {
                const d = res.data;
                const sexoId = sexos.find(s => s.nombre === d.sexo)?._id || '';
                const provinciaId = provincias.find(p => p.nombre_provincia === d.provincia)?._id || '';
                const colorPielId = coloresPiel.find(c => c.nombre === d.color_piel)?._id || '';
                const grupoSanguineoId = gruposSanguineos.find(g => g.nombre === d.grupo_sanguine)?._id || '';
                const factorId = factores.find(f => f.signo === d.factor)?._id || '';
                setHistoryData({
                    generalData: {
                        ci: d.ci || '',
                        nombre: d.nombre || '',
                        primer_apellido: d.primer_apellido || '',
                        segundo_apellido: d.segundo_apellido || '',
                        edad: d.edad || '',
                        sexo: sexoId,
                        provincia: provinciaId,
                        color_piel: colorPielId,
                        grupo_sanguine: grupoSanguineoId,
                        factor: factorId,
                        no_hc: d.no_hc || '',
                        estado_civil: d.estado_civil || '',
                        municipio: d.municipio || '',
                        consejo_popular: d.consejo_popular || '',
                        no_consultorio: d.no_consultorio || '',
                        ocupacion: d.ocupacion || '',
                        cat_ocupacional: d.cat_ocupacional || '',
                        telefono: d.telefono || '',
                        centro_laboral: d.centro_laboral || '',
                        telefonoLaboral: d.telefonoLaboral || '',
                        otra_localizacion: d.otra_localizacion || '',
                        estilo_vida: d.estilo_vida || '',
                        alimentacion: d.alimentacion || '',
                        genero_vida: d.genero_vida || '',
                        donante: d.es_donanteControlado
                            ? 'Donante Controlado'
                            : d.es_posibleDonante
                                ? 'Posible Donante'
                                : d.es_donanteActivo
                                    ? 'Donante Activo'
                                    : '',
                    },
                    antecedentesPersonales: (d.antecedentesPersonales || []).map((a: any, idx: number) => ({
                        id: idx + 1,
                        antecedente: a.antecedente || '',
                        año: a.año || '',
                    })),
                    antecedentesFamiliares: (d.antecedentesFamiliares || []).map((a: any, idx: number) => ({
                        id: idx + 1,
                        antecedente: a.antecedente || '',
                        parentesco: a.parentesco || '',
                    })),
                    alergias: (d.alergias || []).map((a: any, idx: number) => ({
                        id: idx + 1,
                        alergia: a.alergia || a || '',
                    })),
                    habitosToxicos: (d.habitosToxicos || []).map((h: any, idx: number) => ({
                        id: idx + 1,
                        habito: h.habito || '',
                        intensidad: h.intensidad || 'Leve',
                    })),
                    estanciaExtranjero: (d.estanciaExtranjero || []).map((e: any, idx: number) => ({
                        id: idx + 1,
                        fecha: e.fecha || '',
                        pais: e.pais || '',
                        estadia: e.estadia || '',
                        motivo: e.motivo || '',
                    })),
                    donacionesPrevias: (d.donacionesPrevias || []).map((don: any, idx: number) => ({
                        id: idx + 1,
                        fecha: don.fecha || '',
                        lugar: don.lugar || '',
                        reaccion: don.reaccion || '',
                        /*motivo: don.motivo || '',*/
                    })),
                    transfusionesPrevias: (d.transfusionesPrevias || []).map((t: any, idx: number) => ({
                        id: idx + 1,
                        fecha: t.fecha || '',
                        lugar: t.lugar || '',
                        diagnostico: t.diagnostico || '',
                        reaccion: t.reaccion || '',
                        observaciones: t.observaciones || '',
                    })),
                });
                setLoading(false);
            })
            .catch(() => setLoading(false));
        axios.get(`http://localhost:3000/registro-donacion/historia-clinica/${id}`)
            .then(res => {
                // Mapea los datos para el DataGrid
                const donaciones = (res.data || []).map((don, idx) => ({
                    id: idx + 1,
                    fecha: don.fechaD ? new Date(don.fechaD).toLocaleDateString() : '',
                    lugar: don.lugar || '',
                    reaccion: don.reaccion || '',
                    /* motivo: don.motivo || '', // si tienes motivo en el backend*/
                }));
                setDonacionesPrevias(donaciones);
            });
    }, [id, sexos, provincias, coloresPiel, gruposSanguineos, factores]);


    // Maneja cambios en los campos de texto y select en Datos Generales
    const handleGeneralChange = (field, value) => {
        setHistoryData((prev) => ({
            ...prev,
            generalData: { ...prev.generalData, [field]: value },
        }));
    };



    // Maneja la edición en la tabla de Hábitos Tóxicos (intensidad editable)
    const handleHabitoEditCommit = (params) => {
        setHistoryData((prev) => ({
            ...prev,
            habitosToxicos: prev.habitosToxicos.map((row) =>
                row.id === params.id ? { ...row, [params.field]: params.value } : row
            ),
        }));
    };

    // Función para verificar campos vacíos en datos generales
    const hasEmptyGeneralFields = () => {
        const gd = historyData.generalData;
        return (
            gd.ci.trim() === '' ||
            gd.nombre.trim() === '' ||
            gd.primer_apellido.trim() === '' ||
            gd.segundo_apellido.trim() === '' ||
            gd.edad === '' ||
            gd.sexo.trim() === '' ||
            gd.color_piel.trim() === '' ||
            gd.no_hc.trim() === '' ||
            gd.estado_civil.trim() === '' ||
            gd.consejo_popular.trim() === '' ||
            gd.no_consultorio.trim() === '' ||
            gd.ocupacion.trim() === '' ||
            gd.telefono.trim() === '' ||
            gd.municipio.trim() === '' ||
            gd.centro_laboral.trim() === '' ||
            gd.telefonoLaboral.trim() === '' ||
            gd.grupo_sanguine.trim() === '' ||
            gd.factor.trim() === '' ||
            gd.cat_ocupacional.trim() === '' ||
            gd.estilo_vida.trim() === '' ||
            gd.alimentacion.trim() === '' ||
            gd.genero_vida.trim() === '' ||
            gd.donante.trim() === ''
        );
    };


    // Función principal de validación
    const validateForm = () => {
        const errors = [];

        if (hasEmptyGeneralFields()) {
            errors.push("Existen campos vacíos en los Datos Generales");
        }

        return errors;
    };


    const handleGuardar = async () => {
        const errors = validateForm();
        if (errors.length > 0) {
            setErrorMessage(errors.join('\n'));
            setOpenErrorModal(true);
            return;
        }
        if (hayCamposVacios()) {
            setErrorMsg("Por favor complete todos los campos.");
            setModalType("error");
            setOpenModal(true);
            return;
        }

        try {
            // Validación adicional para la edad
            const edad = parseInt(historyData.generalData.edad);
            if (isNaN(edad)) {
                throw new Error('La edad debe ser un número válido');
            }

            const dataToSend = {
                ci: historyData.generalData.ci,
                nombre: historyData.generalData.nombre,
                primer_apellido: historyData.generalData.primer_apellido,
                segundo_apellido: historyData.generalData.segundo_apellido,
                sexo: historyData.generalData.sexo,
                edad: edad,
                estado_civil: historyData.generalData.estado_civil,
                municipio: historyData.generalData.municipio,
                provincia: historyData.generalData.provincia,
                color_piel: historyData.generalData.color_piel,
                no_hc: historyData.generalData.no_hc,
                grupo_sanguine: historyData.generalData.grupo_sanguine,
                factor: historyData.generalData.factor,
                consejo_popular: historyData.generalData.consejo_popular,
                no_consultorio: historyData.generalData.no_consultorio,
                ocupacion: historyData.generalData.ocupacion,
                telefono: historyData.generalData.telefono,
                telefonoLaboral: historyData.generalData.telefonoLaboral,
                centro_laboral: historyData.generalData.centro_laboral,
                otra_localizacion: historyData.generalData.otra_localizacion,
                cat_ocupacional: historyData.generalData.cat_ocupacional,
                estilo_vida: historyData.generalData.estilo_vida,
                alimentacion: historyData.generalData.alimentacion,
                genero_vida: historyData.generalData.genero_vida,
                es_donanteControlado: historyData.generalData.donante === 'Donante Controlado',
                es_posibleDonante: historyData.generalData.donante === 'Posible Donante',
                es_donanteActivo: historyData.generalData.donante === 'Donante Activo',

                alergias: historyData.alergias
                    .filter(item => item.alergia && item.alergia.trim() !== '')
                    .map(item => item.alergia),

                antecedentesPersonales: historyData.antecedentesPersonales
                    .filter(ap => ap.antecedente && ap.año)
                    .map(ap => ({
                        antecedente: ap.antecedente,
                        año: ap.año
                    })),

                antecedentesFamiliares: historyData.antecedentesFamiliares
                    .filter(af => af.antecedente && af.parentesco)
                    .map(af => ({
                        antecedente: af.antecedente,
                        parentesco: af.parentesco
                    })),
                habitosToxicos: historyData.habitosToxicos
                    .filter(ht => ht.habito && ht.intensidad)
                    .map(ht => ({
                        habito: ht.habito,
                        intensidad: ht.intensidad
                    })),
                estanciaExtranjero: historyData.estanciaExtranjero
                    .filter(ee => ee.fecha && ee.pais && ee.estadia && ee.motivo)
                    .map(ee => ({
                        fecha: ee.fecha,
                        pais: ee.pais,
                        estadia: ee.estadia,
                        motivo: ee.motivo
                    }))
            };
            await axios.put(`http://localhost:3000/historia-clinica/${historiaClinicaId}`, dataToSend);

            // 2. Guardar prechequeo/interrogatorio
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
            setModalType("success");
            setOpenModal(true);
            setTimeout(() => {
                navigate('/resultadosprechequeo');
            }, 1200);
        } catch (error) {
            setErrorMessage('Error al guardar la historia clínica y el prechequeo');
            setOpenErrorModal(true);
        }
    };
    useEffect(() => {
        const fetchTransfusiones = async () => {
            try {
                const response = await axios.get('http://localhost:3000/transfusiones');
                setHistoryData(prev => ({
                    ...prev,
                    transfusionesPrevias: response.data.map((item: any, idx: number) => ({
                        id: item.id ?? idx + 1,
                        fecha: item.fecha ?? '',
                        lugar: item.lugar ?? '',
                        diagnostico: item.diagnostico ?? '',
                        reaccion: item.reaccion ?? '',
                        observaciones: item.observaciones ?? ''
                    }))
                }));
            } catch (error) {
                setErrorMessage('Error al cargar las transfusiones previas');
                setOpenErrorModal(true);
            }
        };

        fetchTransfusiones();
    }, []);


    const onlyLetters = (value: string) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value);

    // Maneja el cambio en el radio group Donante
    const handleDonanteChange = (event) => {
        setHistoryData((prev) => ({
            ...prev,
            generalData: { ...prev.generalData, donante: event.target.value },
        }));
    };

    // Antecedentes personales
    const addAntecedentePersonalRow = () => {
        setHistoryData(prev => {
            const personales = Array.isArray(prev.antecedentesPersonales) ? prev.antecedentesPersonales : [];
            const newId = personales.length > 0
                ? Math.max(...personales.map(r => Number(r.id) || 0)) + 1
                : 1;
            return {
                ...prev,
                antecedentesPersonales: [...personales, { id: newId, antecedente: '', año: '' }] // Añadido año inicial
            };
        });
    };

    // Antecedentes familiares
    const addAntecedenteFRow = () => {
        setHistoryData(prev => {
            const antecedentes = Array.isArray(prev.antecedentesFamiliares) ? prev.antecedentesFamiliares : [];
            const newId = antecedentes.length > 0
                ? Math.max(...antecedentes.map(r => Number(r.id) || 0)) + 1
                : 1;
            return {
                ...prev,
                antecedentesFamiliares: [...antecedentes, { id: newId, antecedente: '', parentesco: '' }]
            };
        });
    };

    // Alergias
    const addAlergiaRow = () => {
        setHistoryData(prev => {
            const alergias = Array.isArray(prev.alergias) ? prev.alergias : [];
            const newId = alergias.length > 0
                ? Math.max(...alergias.map(r => Number(r.id) || 0)) + 1
                : 1;
            return {
                ...prev,
                alergias: [...alergias, { id: newId, alergia: '' }]
            };
        });
    };

    // Hábitos tóxicos 
    const addHabitoRow = () => {
        setHistoryData(prev => {
            const habitosToxicos = Array.isArray(prev.habitosToxicos) ? prev.habitosToxicos : [];
            const newId = habitosToxicos.length > 0
                ? Math.max(...habitosToxicos.map(r => Number(r.id) || 0)) + 1
                : 1;
            return {
                ...prev,
                habitosToxicos: [...habitosToxicos, { id: newId, habito: '', intensidad: '' }]
            };
        });
    };

    // Estancia en el extranjero
    const addEstanciaRow = () => {
        setHistoryData(prev => {
            const estanciaExtranjero = Array.isArray(prev.estanciaExtranjero) ? prev.estanciaExtranjero : [];
            const newId = estanciaExtranjero.length > 0
                ? Math.max(...prev.estanciaExtranjero.map(r => r.id || 0)) + 1
                : 1;
            return {
                ...prev,
                estanciaExtranjero: [...estanciaExtranjero, { id: newId, fecha: '', pais: '', estadia: '', motivo: '' }]
            };
        });
    };

    // Maneja la edición en todas las tablas
    const handleTableEdit = (section, params) => {
        setHistoryData(prev => ({
            ...prev,
            [section]: prev[section].map(row =>
                row.id === params.id ? { ...row, [params.field]: params.value } : row
            )
        }));
    };

    // Columnas para las tablas DataGrid
    const appColumns = [
        {
            field: 'antecedente', headerName: 'Antecedente', flex: 1, editable: true, preProcessEditCellProps: (params) => {
                const isValid = onlyLetters(params.props.value || '');
                return { ...params.props, error: !isValid };
            },
        },
        {
            field: 'año', headerName: 'Año', width: 120, editable: true, preProcessEditCellProps: (params) => {
                const isValid = /^\d+$/.test(params.props.value || '');
                return { ...params.props, error: !isValid };
            },
        },
    ];

    const apfColumns = [
        {
            field: 'antecedente', headerName: 'Antecedente', flex: 1, editable: true, preProcessEditCellProps: (params) => {
                const isValid = onlyLetters(params.props.value || '');
                return { ...params.props, error: !isValid };
            },
        },
        {
            field: 'parentesco', headerName: 'Parentesco', flex: 1, editable: true, preProcessEditCellProps: (params) => {
                const isValid = onlyLetters(params.props.value || '');
                return { ...params.props, error: !isValid };
            },
        },
    ];

    const alergiasColumns = [
        {
            field: 'alergia', headerName: 'Alergia', flex: 1, editable: true, preProcessEditCellProps: (params) => {
                const isValid = onlyLetters(params.props.value || '');
                return { ...params.props, error: !isValid };
            },
        },
    ];

    const habitosColumns = [
        {
            field: 'habito', headerName: 'Hábito', flex: 1, editable: true, preProcessEditCellProps: (params) => {
                const isValid = onlyLetters(params.props.value || '');
                return { ...params.props, error: !isValid };
            },
        },
        {
            field: 'intensidad', headerName: 'Intensidad', width: 150, editable: true, renderEditCell: (params) => (
                <Select
                    value={params.value}
                    onChange={(e) => {
                        params.api.setEditCellValue({ id: params.id, field: params.field, value: e.target.value });
                    }}
                    autoFocus
                    fullWidth
                >
                    <MenuItem value="Leve">Leve</MenuItem>
                    <MenuItem value="Moderado">Moderado</MenuItem>
                    <MenuItem value="Severo">Severo</MenuItem>
                </Select>
            ),
        },
    ];

    const estanciaColumns = [
        { field: 'fecha', headerName: 'Fecha', width: 130, editable: true },
        {
            field: 'pais', headerName: 'País', flex: 1, editable: true, preProcessEditCellProps: (params) => {
                const isValid = onlyLetters(params.props.value || '');
                return { ...params.props, error: !isValid };
            },
        },
        { field: 'estadia', headerName: 'Estadía', flex: 1, editable: true },
        {
            field: 'motivo', headerName: 'Motivo', flex: 1, editable: true, preProcessEditCellProps: (params) => {
                const isValid = onlyLetters(params.props.value || '');
                return { ...params.props, error: !isValid };
            },
        },
    ];

    const donacionesColumns = [
        { field: 'fecha', headerName: 'Fecha', flex: 1, editable: true },
        {
            field: 'lugar', headerName: 'Lugar', flex: 1, editable: true, preProcessEditCellProps: (params) => {
                const isValid = onlyLetters(params.props.value || '');
                return { ...params.props, error: !isValid };
            },
        },
        { field: 'reaccion', headerName: 'Reacción', flex: 1, editable: true },
        /*{ field: 'motivo', headerName: 'Motivo', flex: 1, editable: true },*/
    ];

    const transfusionesColumns = [
        { field: 'fecha', headerName: 'Fecha', flex: 1, editable: true },
        {
            field: 'lugar', headerName: 'Lugar', flex: 1, editable: true, preProcessEditCellProps: (params) => {
                const isValid = onlyLetters(params.props.value || '');
                return { ...params.props, error: !isValid };
            },
        },
        { field: 'diagnostico', headerName: 'Diagnostico', flex: 1, editable: true },
        { field: 'reaccion', headerName: 'Reacción', flex: 1, editable: true },
        { field: 'observaciones', headerName: 'Observaciones', flex: 1, editable: true },
    ];

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
    //Carga los datos de prechequeo de la persona
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

    // Validación de CI
    const validarCI = (ci: string): string => {
        if (!/^\d{11}$/.test(ci))
            return "El CI debe tener exactamente 11 dígitos numéricos.";
        const mes = parseInt(ci.slice(2, 4), 10);
        const dia = parseInt(ci.slice(4, 6), 10);
        if (mes < 1 || mes > 12) return "El mes en el CI no es válido.";
        if (dia < 1 || dia > 31) return "El día en el CI no es válido.";
        return "";
    };


    // Validación simple
    const hayCamposVacios = () => {
        return !examenF_peso || !examenF_pulso || !examenF_temSublingual || !examenF_temAxilar || !examenF_hemoglobina || !getRespuestasInterrogatorio || apto_examenFisico === null || apto_interrogatorio === null;
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

            <Typography variant="h4" align="center" gutterBottom sx={{ mb: 2, color: 'primary.dark', mt: 8 }}>
                Historia Clínica
            </Typography>
            <Box sx={{ maxWidth: 1900, margin: 'auto', paddingBlockEnd: 1 }}>
                <Typography variant="h4" align="center" sx={{ color: 'white', backgroundColor: 'primary.dark' }}>
                    Datos Generales
                </Typography>
                <Paper sx={{ p: 3, mb: 4 }}>
                    <Grid container spacing={3}>
                        {/* Campos de texto */}
                        <Grid item xs={12} sm={3}>
                            <TextField
                                label="No. CI"
                                value={historyData.generalData.ci}
                                onChange={(e) => {
                                    // Solo permite números y máximo 11 caracteres
                                    const value = e.target.value.replace(/\D/g, '').slice(0, 11);
                                    handleGeneralChange('ci', value);
                                }}
                                fullWidth
                                error={!!validarCI(historyData.generalData.ci) && historyData.generalData.ci.length > 0}
                                helperText={historyData.generalData.ci.length > 0 ? validarCI(historyData.generalData.ci) : ""}
                                inputProps={{ maxLength: 11 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                label="Nombre"
                                value={historyData.generalData.nombre}
                                onChange={(e) => {
                                    if (onlyLetters(e.target.value) || e.target.value === '') {
                                        handleGeneralChange('nombre', e.target.value);
                                    }
                                }}
                                fullWidth
                                error={historyData.generalData.nombre && !onlyLetters(historyData.generalData.nombre)}
                                helperText={historyData.generalData.nombre && !onlyLetters(historyData.generalData.nombre) ? "Solo se permiten letras" : ""}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                label="Primer Apellido"
                                value={historyData.generalData.primer_apellido}
                                onChange={(e) => {
                                    if (onlyLetters(e.target.value) || e.target.value === '') {
                                        handleGeneralChange('primer_apellido', e.target.value);
                                    }
                                }}
                                fullWidth
                                error={historyData.generalData.primer_apellido && !onlyLetters(historyData.generalData.primer_apellido)}
                                helperText={historyData.generalData.primer_apellido && !onlyLetters(historyData.generalData.primer_apellido) ? "Solo se permiten letras" : ""}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                label="Segundo Apellido"
                                value={historyData.generalData.segundo_apellido}
                                onChange={(e) => {
                                    if (onlyLetters(e.target.value) || e.target.value === '') {
                                        handleGeneralChange('segundo_apellido', e.target.value);
                                    }
                                }}
                                fullWidth
                                error={historyData.generalData.segundo_apellido && !onlyLetters(historyData.generalData.segundo_apellido)}
                                helperText={historyData.generalData.segundo_apellido && !onlyLetters(historyData.generalData.segundo_apellido) ? "Solo se permiten letras" : ""}
                            />
                        </Grid>

                        <Grid item xs={12} sm={3}>
                            <TextField
                                label="Edad"
                                value={historyData.generalData.edad}
                                onChange={(e) => {
                                    // Solo permite números o vacío
                                    if (/^\d*$/.test(e.target.value)) {
                                        handleGeneralChange('edad', e.target.value);
                                    }
                                }}
                                fullWidth
                                error={historyData.generalData.edad && !/^\d+$/.test(historyData.generalData.edad)}
                                helperText={historyData.generalData.edad && !/^\d+$/.test(historyData.generalData.edad) ? "Solo se permiten números" : ""}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                label="Estado Civil"
                                value={historyData.generalData.estado_civil}
                                onChange={(e) => {
                                    if (onlyLetters(e.target.value) || e.target.value === '') {
                                        handleGeneralChange('estado_civil', e.target.value);
                                    }
                                }}
                                fullWidth
                                error={historyData.generalData.estado_civil && !onlyLetters(historyData.generalData.estado_civil)}
                                helperText={historyData.generalData.estado_civil && !onlyLetters(historyData.generalData.estado_civil) ? "Solo se permiten letras" : ""}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                label="No. HC"
                                value={historyData.generalData.no_hc}
                                onChange={(e) => handleGeneralChange('no_hc', e.target.value)}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={3}>
                            <TextField
                                label="Consejo Popular"
                                value={historyData.generalData.consejo_popular}
                                onChange={(e) => handleGeneralChange('consejo_Popular', e.target.value)}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={3}>
                            <TextField
                                label="No. Consultorio"
                                value={historyData.generalData.no_consultorio}
                                onChange={(e) => handleGeneralChange('noConsultorio', e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                label="Ocupación"
                                value={historyData.generalData.ocupacion}
                                onChange={(e) => {
                                    if (onlyLetters(e.target.value) || e.target.value === '') {
                                        handleGeneralChange('ocupacion', e.target.value);
                                    }
                                }}
                                fullWidth
                                error={historyData.generalData.ocupacion && !onlyLetters(historyData.generalData.ocupacion)}
                                helperText={historyData.generalData.ocupacion && !onlyLetters(historyData.generalData.ocupacion) ? "Solo se permiten letras" : ""}
                            />
                        </Grid>

                        <Grid item xs={12} sm={3}>
                            <TextField
                                label="Teléfono"
                                value={historyData.generalData.telefono}
                                onChange={(e) => {
                                    // Solo permite números o vacío
                                    if (/^\d*$/.test(e.target.value)) {
                                        handleGeneralChange('telefono', e.target.value);
                                    }
                                }}
                                fullWidth
                                error={historyData.generalData.telefono && !/^\d+$/.test(historyData.generalData.telefono)}
                                helperText={historyData.generalData.telefono && !/^\d+$/.test(historyData.generalData.telefono) ? "Solo se permiten números" : ""}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                label="Municipio"
                                value={historyData.generalData.municipio}
                                onChange={(e) => {
                                    if (onlyLetters(e.target.value) || e.target.value === '') {
                                        handleGeneralChange('municipio', e.target.value);
                                    }
                                }}
                                fullWidth
                                error={historyData.generalData.municipio && !onlyLetters(historyData.generalData.municipio)}
                                helperText={historyData.generalData.municipio && !onlyLetters(historyData.generalData.municipio) ? "Solo se permiten letras" : ""}

                            />
                        </Grid>

                        <Grid item xs={12} sm={3}>
                            <TextField
                                label="Centro Laboral"
                                value={historyData.generalData.centro_laboral}
                                onChange={(e) => handleGeneralChange('centro_laboral', e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                label="Teléfono Laboral"
                                value={historyData.generalData.telefonoLaboral}
                                onChange={(e) => {
                                    // Solo permite números o vacío
                                    if (/^\d*$/.test(e.target.value)) {
                                        handleGeneralChange('telefonoLaboral', e.target.value);
                                    }
                                }}
                                fullWidth
                                error={historyData.generalData.telefonoLaboral && !/^\d+$/.test(historyData.generalData.telefonoLaboral)}
                                helperText={historyData.generalData.telefonoLaboral && !/^\d+$/.test(historyData.generalData.telefonoLaboral) ? "Solo se permiten números" : ""}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                label="Otra Localización"
                                value={historyData.generalData.otra_localizacion}
                                onChange={(e) => handleGeneralChange('otra_localizacion', e.target.value)}
                                fullWidth
                            />
                        </Grid>



                        {/* Select Grupo Sanguíneo */}
                        <Grid item xs={12} sm={3}>
                            <FormControl fullWidth>
                                <FormLabel>Grupo sanguíneo</FormLabel>
                                <Select
                                    name="grupo_sanguine"
                                    value={historyData.generalData.grupo_sanguine}
                                    onChange={(e) => handleGeneralChange('grupo_sanguine', e.target.value)}
                                >
                                    {gruposSanguineos.map((grupo) => (
                                        <MenuItem key={grupo._id} value={grupo._id}>{grupo.nombre}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Select Factor */}
                        <Grid item xs={12} sm={3}>
                            <FormControl fullWidth>
                                <FormLabel>Factor</FormLabel>
                                <Select
                                    name="factor"
                                    value={historyData.generalData.factor}
                                    onChange={(e) => handleGeneralChange('factor', e.target.value)}
                                >
                                    {factores.map((factor) => (
                                        <MenuItem key={factor._id} value={factor._id}>{factor.signo}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={3}>
                            <FormControl fullWidth>
                                <FormLabel>Sexo</FormLabel>
                                <Select
                                    name="sexo"
                                    value={historyData.generalData.sexo}
                                    onChange={(e) => handleGeneralChange('sexo', e.target.value)}
                                >
                                    {sexos.map((sexo) => (
                                        <MenuItem key={sexo._id} value={sexo._id}>{sexo.nombre}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Select Categoría Ocupacional */}
                        <Grid item xs={12} sm={3}>
                            <FormControl fullWidth>
                                <FormLabel>Categoría Ocupacional</FormLabel>
                                <Select
                                    name="cat_ocupacional"
                                    value={historyData.generalData.cat_ocupacional}
                                    onChange={(e) => handleGeneralChange('cat_ocupacional', e.target.value)}
                                >
                                    <MenuItem value="Empleador">Empleador</MenuItem>
                                    <MenuItem value="Empleado">Empleado</MenuItem>
                                    <MenuItem value="Trabajador por cuenta propia">Trabajador por cuenta propia</MenuItem>
                                    <MenuItem value="Otro">Otro</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <FormControl fullWidth>
                                <FormLabel>Color de piel</FormLabel>
                                <Select
                                    name="color_piel"
                                    value={historyData.generalData.color_piel}
                                    onChange={(e) => handleGeneralChange('color_piel', e.target.value)}
                                >
                                    {coloresPiel.map((color) => (
                                        <MenuItem key={color._id} value={color._id}>{color.nombre}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Select Estilo de Vida */}
                        <Grid item xs={12} sm={3}>
                            <FormControl fullWidth>
                                <FormLabel>Estilo de Vida</FormLabel>
                                <Select
                                    name="estilo_vida"
                                    value={historyData.generalData.estilo_vida}
                                    onChange={(e) => handleGeneralChange('estilo_vida', e.target.value)}
                                >
                                    <MenuItem value="Activo">Activo</MenuItem>
                                    <MenuItem value="Sedentario">Sedentario</MenuItem>
                                    <MenuItem value="Moderado">Moderado</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Select Alimentación */}
                        <Grid item xs={12} sm={3}>
                            <FormControl fullWidth>
                                <FormLabel>Alimentación</FormLabel>
                                <Select
                                    name="alimentacion"
                                    value={historyData.generalData.alimentacion}
                                    onChange={(e) => handleGeneralChange('alimentacion', e.target.value)}
                                >
                                    {/* Opciones para que completes */}
                                    <MenuItem value="Buena">Buena</MenuItem>
                                    <MenuItem value="Regular">Regular</MenuItem>
                                    <MenuItem value="Mala">Mala</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Select Género de Vida */}
                        <Grid item xs={12} sm={3}>
                            <FormControl fullWidth>
                                <FormLabel>Género de Vida</FormLabel>
                                <Select
                                    name="genero_vida"
                                    value={historyData.generalData.genero_vida}
                                    onChange={(e) => handleGeneralChange('genero_vida', e.target.value)}
                                >
                                    <MenuItem value="Vida desordenada">Vida desordenada</MenuItem>
                                    <MenuItem value="Abusa de sus fuerzas">Abusa de sus fuerzas</MenuItem>
                                    <MenuItem value="Esfuerzo intenso">Esfuerzo intenso</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={3}>
                            <FormControl sx={{ width: 100 }}>
                                <FormLabel>Provincia</FormLabel>
                                <Select
                                    name="provincia"
                                    value={historyData.generalData.provincia}
                                    onChange={(e) => handleGeneralChange('provincia', e.target.value)}
                                >
                                    {provincias.map((prov) => (
                                        <MenuItem key={prov._id} value={prov._id}>{prov.nombre_provincia}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* RadioGroup Donante */}
                        <Grid item xs={12} sm={6}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Donante</FormLabel>
                                <RadioGroup
                                    row
                                    name="donante"
                                    value={historyData.generalData.donante}
                                    onChange={handleDonanteChange}
                                >
                                    <FormControlLabel value="Donante Controlado" control={<Radio />} label="Donante Controlado" />
                                    <FormControlLabel value="Posible Donante" control={<Radio />} label="Posible Donante" />
                                    <FormControlLabel value="Donante Activo" control={<Radio />} label="Donante Activo" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Paper>

                <IconButton onClick={handleClick} sx={{ color: "primary.dark", ml: 150, fontSize: 70 }}>
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
                                                width: 100,
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
                                                width: 100,
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
                        sx={{ display: "flex", backgroundColor: "white", alignItems: "center", "& .MuiAccordionSummary-content": { justifyContent: "center" }, marginBlockEnd: 1 }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3-content"
                        id="panel3-header"
                    >
                        <Typography component="span" sx={{ color: "primary.dark", alignContent: "center" }}>INTERROGATORIO</Typography>
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
                    </AccordionDetails>
                </Accordion>

                <Accordion  >
                    <AccordionSummary
                        sx={{ display: "flex", backgroundColor: "white", alignItems: "center", "& .MuiAccordionSummary-content": { justifyContent: "center" }, marginBlockEnd: 1 }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3-content"
                        id="panel3-header"
                    >
                        <Typography component="span" sx={{ color: "primary.dark", alignContent: "center" }}>ANTECEDENTES PERSONALES</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
                            <Button variant="outlined" onClick={addAntecedentePersonalRow}>Agregar Antecedente</Button>
                        </Box>
                        <Paper sx={{ height: 250, mb: 4 }}>
                            <DataGrid
                                rows={historyData.antecedentesPersonales}
                                columns={appColumns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                disableSelectionOnClick
                                hideFooterSelectedRowCount
                                processRowUpdate={(newRow, oldRow) => {
                                    setHistoryData(prev => ({
                                        ...prev,
                                        antecedentesPersonales: prev.antecedentesPersonales.map(row =>
                                            row.id === newRow.id ? newRow : row
                                        )
                                    }));
                                    return newRow;
                                }}
                                experimentalFeatures={{ newEditingApi: true }}
                            />
                        </Paper>
                    </AccordionDetails>
                </Accordion>

                <Accordion  >
                    <AccordionSummary
                        sx={{ display: "flex", backgroundColor: "white", alignItems: "center", "& .MuiAccordionSummary-content": { justifyContent: "center" }, marginBlockEnd: 1 }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3-content"
                        id="panel3-header"
                    >
                        <Typography component="span" sx={{ color: "primary.dark", alignContent: "center" }}>ANTECEDENTES FAMILIARES</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
                            <Button variant="outlined" onClick={addAntecedenteFRow}>Agregar Antecedente</Button>
                        </Box>
                        <Paper sx={{ height: 250, mb: 4 }}>
                            <DataGrid
                                rows={historyData.antecedentesFamiliares}
                                columns={apfColumns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                disableSelectionOnClick
                                hideFooterSelectedRowCount
                                processRowUpdate={(newRow, oldRow) => {
                                    setHistoryData(prev => ({
                                        ...prev,
                                        antecedentesFamiliares: prev.antecedentesFamiliares.map(row =>
                                            row.id === newRow.id ? newRow : row
                                        )
                                    }));
                                    return newRow;
                                }}
                                experimentalFeatures={{ newEditingApi: true }}
                            />
                        </Paper>
                    </AccordionDetails>
                </Accordion>
                <Accordion  >
                    <AccordionSummary
                        sx={{ display: "flex", backgroundColor: "white", alignItems: "center", "& .MuiAccordionSummary-content": { justifyContent: "center" }, marginBlockEnd: 1 }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3-content"
                        id="panel3-header"
                    >
                        <Typography component="span" sx={{ color: "primary.dark", alignContent: "center" }}>ALERGIAS</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
                            <Button variant="outlined" onClick={addAlergiaRow}>Agregar Alergia</Button>
                        </Box>
                        <Paper sx={{ height: 200, mb: 4 }}>
                            <DataGrid
                                rows={historyData.alergias}
                                columns={alergiasColumns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                disableSelectionOnClick
                                hideFooterSelectedRowCount
                                processRowUpdate={(newRow, oldRow) => {
                                    setHistoryData(prev => ({
                                        ...prev,
                                        alergias: prev.alergias.map(row =>
                                            row.id === newRow.id ? newRow : row
                                        )
                                    }));
                                    return newRow;
                                }}
                                experimentalFeatures={{ newEditingApi: true }}
                            />
                        </Paper>
                    </AccordionDetails>
                </Accordion>

                <Accordion  >
                    <AccordionSummary
                        sx={{ display: "flex", backgroundColor: "white", alignItems: "center", "& .MuiAccordionSummary-content": { justifyContent: "center" }, marginBlockEnd: 1 }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3-content"
                        id="panel3-header"
                    >
                        <Typography component="span" sx={{ color: "primary.dark", alignContent: "center" }}>HÁBITOS TÓXICOS</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
                            <Button variant="outlined" onClick={addHabitoRow}>Agregar Hábito</Button>
                        </Box>
                        <Paper sx={{ height: 250, mb: 4 }}>
                            <DataGrid
                                rows={historyData.habitosToxicos}
                                columns={habitosColumns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                disableSelectionOnClick
                                hideFooterSelectedRowCount
                                processRowUpdate={(newRow, oldRow) => {
                                    setHistoryData(prev => ({
                                        ...prev,
                                        habitosToxicos: prev.habitosToxicos.map(row =>
                                            row.id === newRow.id ? newRow : row
                                        )
                                    }));
                                    return newRow;
                                }}
                                experimentalFeatures={{ newEditingApi: true }}
                            />
                        </Paper>
                    </AccordionDetails>
                </Accordion>

                <Accordion  >
                    <AccordionSummary
                        sx={{ display: "flex", backgroundColor: "white", alignItems: "center", "& .MuiAccordionSummary-content": { justifyContent: "center" }, marginBlockEnd: 1 }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3-content"
                        id="panel3-header"
                    >
                        <Typography component="span" sx={{ color: "primary.dark", alignContent: "center" }}>ESTANCIAS EN EL EXTRANJERO</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
                            <Button variant="outlined" onClick={addEstanciaRow}>Agregar Estancia</Button>
                        </Box>
                        <Paper sx={{ height: 250, mb: 4 }}>
                            <DataGrid
                                rows={historyData.estanciaExtranjero}
                                columns={estanciaColumns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                disableSelectionOnClick
                                hideFooterSelectedRowCount
                                processRowUpdate={(newRow, oldRow) => {
                                    setHistoryData(prev => ({
                                        ...prev,
                                        estanciaExtranjero: prev.estanciaExtranjero.map(row =>
                                            row.id === newRow.id ? newRow : row
                                        )
                                    }));
                                    return newRow;
                                }}
                                experimentalFeatures={{ newEditingApi: true }}
                            />
                        </Paper>
                    </AccordionDetails>
                </Accordion>

                <Accordion  >
                    <AccordionSummary
                        sx={{ display: "flex", backgroundColor: "white", alignItems: "center", "& .MuiAccordionSummary-content": { justifyContent: "center" }, marginBlockEnd: 1 }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3-content"
                        id="panel3-header"
                    >
                        <Typography component="span" sx={{ color: "primary.dark", alignContent: "center" }}>DONACIONES PREVIAS</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Paper sx={{ height: 250, mb: 4 }}>
                            <DataGrid
                                rows={donacionesPrevias}
                                columns={donacionesColumns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                disableSelectionOnClick
                                hideFooterSelectedRowCount
                            />
                        </Paper>
                    </AccordionDetails>
                </Accordion>

                <Accordion  >
                    <AccordionSummary
                        sx={{ display: "flex", backgroundColor: "white", alignItems: "center", "& .MuiAccordionSummary-content": { justifyContent: "center" }, marginBlockEnd: 1 }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3-content"
                        id="panel3-header"
                    >
                        <Typography component="span" sx={{ color: "primary.dark", alignContent: "center" }}>TRANSFUSIONES PREVIAS</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Paper sx={{ height: 250, mb: 4 }}>
                            <DataGrid
                                rows={historyData.transfusionesPrevias}
                                columns={transfusionesColumns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                disableSelectionOnClick
                                hideFooterSelectedRowCount
                            />
                        </Paper>
                    </AccordionDetails>
                </Accordion>


                {/* Botón Guardar */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, bottom: 20, zIndex: 1 }}>
                    <BotonPersonalizado sx={{ width: '200px' }}
                        onClick={handleGuardar}>
                        Aceptar
                    </BotonPersonalizado>
                </Box>
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
            </Box >
        </>
    )
}

