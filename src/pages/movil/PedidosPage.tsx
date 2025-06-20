import React, { useMemo, useState, useEffect } from "react";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import {
  Button,
  Box,
  Container,
  Typography,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import Navbar from "../../components/navbar/Navbar";
import dayjs from "dayjs";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";

// --- Tipos ---
type PlanDonacion = {
  id: string;
  fechaHora: string;
  areaSalud: string;
  consejoPopular: string;
  consultoriosAfectados: string[] | string | number;
  lugarDonacion: string;
  compromiso: number;
  responsableSalud: string;
  cdr: string;
};

type AlmacenItem = {
  id: number;
  nombre: string;
  unidad?: string;
};

type Quantities = Record<number, number>;
type PedidosPorFila = Record<string, Quantities>;
type BooleanMap = Record<string, boolean>;

// Elementos para cada tipo de pedido
const almacenMensualItems: AlmacenItem[] = [
  { id: 401, nombre: "Tohallas" },
  { id: 402, nombre: "Jabón" },
  { id: 403, nombre: "Detergente" },
  { id: 404, nombre: "Vasos" },
  { id: 405, nombre: "Cubiertos" },
  { id: 406, nombre: "Platos" },
  { id: 407, nombre: "Termos" },
  { id: 408, nombre: "Jarras" },
  { id: 409, nombre: "Bandejas pesas" },
];

// Junta los elementos de farmacia y central
const almacenFarmaciaCentralItems: AlmacenItem[] = [
  // Farmacia
  { id: 201, nombre: "Bolsas colectoras", unidad: "unidades" },
  { id: 202, nombre: "Alcohol", unidad: "litros" },
  { id: 203, nombre: "Hemoclasificadores", unidad: "unidades" },
  { id: 204, nombre: "Hipoclorito de sodio", unidad: "litros" },
  { id: 205, nombre: "Tubos de ensayo", unidad: "unidades" },
  { id: 206, nombre: "Gradillas", unidad: "unidades" },
  { id: 207, nombre: "Sulfato de cobre", unidad: "frasco" },
  { id: 208, nombre: "Ligaduras", unidad: "unidades" },
  { id: 209, nombre: "Lancetas", unidad: "unidades" },
  { id: 210, nombre: "Laminas portaobjeto", unidad: "unidades" },
  { id: 211, nombre: "Cloruro de sodio", unidad: "unidades" },
  { id: 212, nombre: "Ringer lactato", unidad: "unidades" },
  { id: 213, nombre: "Equipos de suero", unidad: "unidades" },
  // Central
  { id: 301, nombre: "Torundas de algodón", unidad: "paquete" },
  { id: 302, nombre: "Torundas de gaza", unidad: "paquete" },
  { id: 303, nombre: "Apositos", unidad: "unidades" },
  { id: 304, nombre: "Guantes", unidad: "paquete" },
  { id: 305, nombre: "Equipos de pinza", unidad: "unidades" },
  { id: 306, nombre: "Frascos estériles", unidad: "unidades" },
];

// Elementos para Pedido Viveres
const almacenViveresItems: AlmacenItem[] = [
  { id: 501, nombre: "Sirope", unidad: "gramos" },
  { id: 502, nombre: "Pan", unidad: "gramos" },
  { id: 503, nombre: "Embutido", unidad: "gramos" },
  { id: 504, nombre: "Queso", unidad: "gramos" },
  { id: 505, nombre: "Leche", unidad: "gramos" },
  { id: 506, nombre: "Yogurt", unidad: "gramos" },
  { id: 507, nombre: "Azucar", unidad: "gramos" },
  { id: 508, nombre: "Cafe", unidad: "gramos" },
  { id: 509, nombre: "Helado", unidad: "gramos" },
];

// --- Mapeo de campos para central y farmacia ---
const FIELD_MAP_CENTRAL: Record<string, string> = {
  "Torundas de algodón": "torundas_algodon",
  "Torundas de gaza": "torundas_gaza",
  "Apositos": "apósitos",
  "Guantes": "guantes",
  "Equipos de pinza": "equipos_pinza",
  "Frascos estériles": "frascos_estériles",
};

const FIELD_MAP_FARMACIA: Record<string, string> = {
  "Bolsas colectoras": "bolsas_colectoras",
  "Alcohol": "alcohol",
  "Hemoclasificadores": "hemoclasificadores",
  "Hipoclorito de sodio": "hipoclorito_sodio",
  "Tubos de ensayo": "tubos_ensayo",
  "Gradillas": "gradillas",
  "Sulfato de cobre": "sulfato_cobre",
  "Ligaduras": "ligaduras",
  "Lancetas": "lancetas",
  "Laminas portaobjeto": "laminas_portaobjeto",
  "Cloruro de sodio": "cloruro_sodio",
  "Ringer lactato": "ringer_lactato",
  "Equipos de suero": "equipos_suero",
};

// --- Modal de selección de elementos ---
type SeleccionElementosModalConCantidadProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  items: AlmacenItem[];
  selectedItems: number[];
  quantities: Quantities;
  onToggleItem: (id: number) => void;
  onQuantityChange: (id: number, cantidad: number) => void;
  onConfirm: () => void;
  icon: React.ReactNode;
  iconColor: string;
  readOnlyQuantities?: boolean;
  maxQuantities?: Quantities;
  unidadesLabel?: boolean;
  customUnidad?: (item: AlmacenItem) => string | undefined;
};

function SeleccionElementosModalConCantidad({
  open,
  onClose,
  title,
  items,
  selectedItems,
  quantities,
  onToggleItem,
  onQuantityChange,
  onConfirm,
  icon,
  iconColor,
  readOnlyQuantities = false,
  unidadesLabel = false,
  customUnidad,
}: SeleccionElementosModalConCantidadProps) {
  const isCantidadValida = (id: number) => {
    const cantidad = quantities[id];
    return cantidad > 0;
  };

  const canConfirm = selectedItems.length > 0 && selectedItems.every(isCantidadValida);

  const allSelected = items.length > 0 && selectedItems.length === items.length;

  const toggleSelectAll = () => {
    if (allSelected) {
      selectedItems.forEach((id) => onToggleItem(id));
    } else {
      items.forEach((item) => {
        if (!selectedItems.includes(item.id)) onToggleItem(item.id);
      });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="seleccion-elementos-dialog-title"
      PaperProps={{
        sx: {
          borderRadius: 3,
          padding: 3,
          minWidth: 320,
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
        },
      }}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle sx={{ textAlign: "center", pb: 0 }} id="seleccion-elementos-dialog-title">
        <Box display="flex" flexDirection="column" alignItems="center" gap={1} color={iconColor}>
          {icon}
          <Typography variant="h5" fontWeight="bold" color={iconColor}>
            {title}
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        {!readOnlyQuantities && (
          <Box sx={{ mb: 1, textAlign: "center" }}>
            <Button size="small" onClick={toggleSelectAll}>
              {allSelected ? "Deseleccionar todos" : "Seleccionar todos"}
            </Button>
          </Box>
        )}
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Seleccione los elementos y cantidades para el pedido.
          </Typography>
        </Box>
        <Box>
          <List dense>
            {items.map((item) => {
              const isSelected = selectedItems.includes(item.id);
              const cantidad = quantities[item.id] || 0;
              const cantidadValida = cantidad > 0;
              const unidad = customUnidad ? customUnidad(item) : unidadesLabel ? "unidades" : undefined;
              return (
                <ListItem
                  key={item.id}
                  sx={{ borderBottom: "1px solid #eee", flexWrap: "wrap" }}
                >
                  {!readOnlyQuantities && (
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Checkbox
                        edge="start"
                        checked={isSelected}
                        tabIndex={-1}
                        disableRipple
                        onChange={() => onToggleItem(item.id)}
                        inputProps={{ "aria-labelledby": `checkbox-list-label-${item.id}` }}
                      />
                    </ListItemIcon>
                  )}
                  <ListItemText
                    id={`checkbox-list-label-${item.id}`}
                    primary={item.nombre}
                    sx={{ flexBasis: "40%", flexShrink: 0 }}
                  />
                  {isSelected && (
                    <TextField
                      label={
                        readOnlyQuantities
                          ? "Cantidad a devolver"
                          : unidad
                          ? `Cantidad (${unidad})`
                          : "Cantidad"
                      }
                      type="number"
                      size="small"
                      value={cantidad}
                      onChange={(e) => {
                        if (readOnlyQuantities) return;
                        let val = parseInt(e.target.value, 10);
                        if (isNaN(val)) val = 0;
                        if (val < 0) val = 0;
                        onQuantityChange(item.id, val);
                      }}
                      error={!cantidadValida}
                      helperText={
                        !cantidadValida
                          ? `Debe ser mayor que 0`
                          : " "
                      }
                      sx={{ width: 170, ml: 2 }}
                      inputProps={{
                        min: 1,
                        readOnly: readOnlyQuantities,
                      }}
                    />
                  )}
                </ListItem>
              );
            })}
          </List>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={onConfirm} disabled={!canConfirm}>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// --- Modal de devolución solo cantidad ---
type DevolucionCantidadModalProps = {
  open: boolean;
  onClose: () => void;
  maxCantidad: number;
  cantidad: number;
  onCantidadChange: (cantidad: number) => void;
  onConfirm: () => void;
  icon: React.ReactNode;
  iconColor: string;
};

function DevolucionCantidadModal({
  open,
  onClose,
  maxCantidad,
  cantidad,
  onCantidadChange,
  onConfirm,
  icon,
  iconColor,
}: DevolucionCantidadModalProps) {
  const cantidadValida = cantidad >= 0 && cantidad <= maxCantidad;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="devolucion-cantidad-dialog-title"
      PaperProps={{
        sx: {
          borderRadius: 3,
          padding: 3,
          minWidth: 320,
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
        },
      }}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle sx={{ textAlign: "center", pb: 0 }} id="devolucion-cantidad-dialog-title">
        <Box display="flex" flexDirection="column" alignItems="center" gap={1} color={iconColor}>
          {icon}
          <Typography variant="h5" fontWeight="bold" color={iconColor}>
            Devolución
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" textAlign="center" sx={{ mb: 2 }}>
          Ingrese la cantidad total a devolver:
        </Typography>
       <TextField
        label="Cantidad a devolver"
        type="number"
        fullWidth
        value={cantidad}
        onChange={(e) => {
          let val = parseInt(e.target.value, 10);
          if (isNaN(val)) val = 0;
          if (val < 0) val = 0;
          if (val > maxCantidad) val = maxCantidad;
          onCantidadChange(val);
        }}
        error={!cantidadValida}
        helperText={
          !cantidadValida
            ? `Debe ser entre 0 y ${maxCantidad}`
            : " "
        }
        inputProps={{
          min: 0,
          max: maxCantidad,
        }}
      />
      </DialogContent>
  <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={onConfirm} disabled={!cantidadValida}>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// --- Componente principal ---
export default function PedidosPage() {
  const [planDonaciones, setPlanDonaciones] = useState<PlanDonacion[]>([]);
  const [pedidoMensualModalOpen, setPedidoMensualModalOpen] = useState<boolean>(false);
  const [pedidoMensualSelectedItems, setPedidoMensualSelectedItems] = useState<number[]>([]);
  const [pedidoMensualQuantities, setPedidoMensualQuantities] = useState<Quantities>({});
  const [pedidoModalOpen, setPedidoModalOpen] = useState<boolean>(false);
  const [pedidoSelectedItems, setPedidoSelectedItems] = useState<number[]>([]);
  const [pedidoQuantities, setPedidoQuantities] = useState<Quantities>({});
  const [pedidoCentralModalOpen, setPedidoCentralModalOpen] = useState<boolean>(false);
  const [devolucionCantidadModalOpen, setDevolucionCantidadModalOpen] = useState<boolean>(false);
  const [devolucionCantidad, setDevolucionCantidad] = useState<number>(1);
  const [devolucionMaxCantidad, setDevolucionMaxCantidad] = useState<number>(1);
  const [exitoModalOpen, setExitoModalOpen] = useState<boolean>(false);
  const [exitoMensaje, setExitoMensaje] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMsg, setSnackbarMsg] = useState<string>("");
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
  const [pedidosConfirmados, setPedidosConfirmados] = useState<BooleanMap>({});
  const [pedidosPorFila, setPedidosPorFila] = useState<PedidosPorFila>({});

  // Cargar los planes desde el backend
  useEffect(() => {
    axios.get("http://localhost:3000/plan-trabajo")
      .then(res => {
        const data = res.data.map((item: any) => ({
          id: item._id || item.id,
          fechaHora: item.fecha || item.fechaHora,
          areaSalud: item.areasalud || item.areaSalud,
          consejoPopular: item.consejopopular || item.consejoPopular,
          consultoriosAfectados: item.consultoriosafectados || item.consultoriosAfectados,
          lugarDonacion: item.lugarDonacion,
          compromiso: item.compromiso,
          responsableSalud: item.responsableDeSalud || item.responsableSalud,
          cdr: item.cdr,
        }));
        setPlanDonaciones(data);
      })
      .catch(() => setPlanDonaciones([]));
  }, []);


const [devoluciones, setDevoluciones] = useState<{ planId: string }[]>([]);

useEffect(() => {
  const fetchDevoluciones = async () => {
    try {
      const res = await axios.get("http://localhost:3000/pedidos/devolucion");
      setDevoluciones(res.data);
    } catch (error) {
      // Puedes manejar el error si lo deseas
    }
  };
  fetchDevoluciones();
}, []);


// ...existing code...
const planesSinDevolucion = planDonaciones.filter(
  (plan) => !devoluciones.some((dev) => dev.planId === plan.id)
);

const sortedRows = useMemo(() => {
  return [...planesSinDevolucion].sort((a, b) => {
    const dateA = dayjs(a.fechaHora).startOf("day").valueOf();
    const dateB = dayjs(b.fechaHora).startOf("day").valueOf();
    if (dateA !== dateB) return dateA - dateB;
    return dayjs(a.fechaHora).valueOf() - dayjs(b.fechaHora).valueOf();
  });
}, [planesSinDevolucion]);
// ...existing code...

  const columns: GridColDef[] = [
    {
      field: "fechaHora",
      headerName: "Fecha y Hora",
      width: 160,
      renderCell: (params) =>
        params.value ? dayjs(params.value).format("DD/MM/YYYY 08:00 A") : "",
    },
    { field: "areaSalud", headerName: "Área de salud", width: 130 },
    { field: "consejoPopular", headerName: "Consejo popular", width: 130 },
    {
      field: "consultoriosAfectados",
      headerName: "Consultorios afectados",
      width: 170,
      renderCell: (params) => {
        if (Array.isArray(params.value)) {
          return params.value.join(", ");
        }
        return params.value || "";
      }
    },
    { field: "lugarDonacion", headerName: "Lugar donación", width: 150 },
    { field: "compromiso", headerName: "Compromiso", width: 120 },
    { field: "responsableSalud", headerName: "Responsable de salud", width: 150 },
    { field: "cdr", headerName: "CDR", width: 90 },
    {
      field: "pedidos",
      headerName: "Pedidos y Devolucion",
      width: 350,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => {
              setCurrentOrderId(params.row.id);
              setPedidoSelectedItems([]);
              setPedidoQuantities({});
              setPedidoModalOpen(true);
            }}
          >
            Farmacia y Central
          </Button>
          <Button
            variant="contained"
            color="info"
            size="small"
            onClick={() => {
              setCurrentOrderId(params.row.id);
              setPedidoSelectedItems([]);
              setPedidoQuantities({});
              setPedidoCentralModalOpen(true);
            }}
          >
             Viveres
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => {
              if (!pedidosConfirmados[params.row.id]) {
                setSnackbarMsg("No hay pedido confirmado para esta fila. No puede devolver.");
                setSnackbarOpen(true);
                return;
              }
              setCurrentOrderId(params.row.id);
              const fila = planDonaciones.find((row) => row.id === params.row.id);
              setDevolucionCantidad(1);
              setDevolucionMaxCantidad(fila ? fila.compromiso : 1);
              setDevolucionCantidadModalOpen(true);
            }}
            disabled={!pedidosConfirmados[params.row.id]}
          >
            Devolución
          </Button>
        </Box>
      ),
    },
  ];

  const mostrarExito = (mensaje: string) => {
    setExitoMensaje(mensaje);
    setExitoModalOpen(true);
  };

  const handlePedidoMensualClick = () => {
    setPedidoMensualSelectedItems([]);
    setPedidoMensualQuantities({});
    setPedidoMensualModalOpen(true);
  };

const FIELD_MAP_MENSUAL: Record<string, string> = {
  "Tohallas": "tohallas",
  "Jabón": "jabon",
  "Detergente": "detergente",
  "Vasos": "vasos",
  "Cubiertos": "cubiertos",
  "Platos": "platos",
  "Termos": "termos",
  "Jarras": "jarras",
  "Bandejas pesas": "bandejas_pesas",
};

// Para pedido víveres
const FIELD_MAP_VIVERES: Record<string, string> = {
  "Sirope": "sirope",
  "Pan": "pan",
  "Embutido": "embutido",
  "Queso": "queso",
  "Leche": "leche",
  "Yogurt": "yogurt",
  "Azucar": "azucar",
  "Cafe": "cafe",
  "Helado": "helado",
};



  // --- Confirmar Pedido Mensual ---
 const confirmPedidoMensual = async () => {
  if (pedidoMensualSelectedItems.length === 0) {
    setSnackbarMsg("Seleccione al menos un elemento para hacer el pedido mensual.");
    setSnackbarOpen(true);
    return;
  }
  for (const id of pedidoMensualSelectedItems) {
    const cantidad = pedidoMensualQuantities[id];
    if (!cantidad || cantidad < 1) {
      setSnackbarMsg(`Cantidad inválida`);
      setSnackbarOpen(true);
      return;
    }
  }
  try {
    const mensualItems = pedidoMensualSelectedItems
      .map((id) => ({
        id,
        nombre: almacenMensualItems.find((item) => item.id === id)?.nombre,
        cantidad: pedidoMensualQuantities[id],
      }));

    // No incluyas planId aquí
    const mensualPayload: any = {};
    Object.entries(FIELD_MAP_MENSUAL).forEach(([nombre, field]) => {
      mensualPayload[field] = 0;
    });
    mensualItems.forEach(item => {
      const field = FIELD_MAP_MENSUAL[item.nombre ?? ""];
      if (field) mensualPayload[field] = item.cantidad;
    });

    await axios.post("http://localhost:3000/pedidos/mensual", mensualPayload);
    setPedidoMensualModalOpen(false);
    mostrarExito(`Pedido mensual confirmado para ${pedidoMensualSelectedItems.length} elemento(s).`);
    setPedidoMensualSelectedItems([]);
    setPedidoMensualQuantities({});
  } catch (error) {
    setSnackbarMsg("Error al guardar el pedido mensual en la base de datos.");
    setSnackbarOpen(true);
  }
};


  const togglePedidoMensualItem = (id: number) => {
    setPedidoMensualSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
    if (pedidoMensualSelectedItems.includes(id)) {
      setPedidoMensualQuantities((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    } else {
      setPedidoMensualQuantities((prev) => ({ ...prev, [id]: 1 }));
    }
  };

  const onPedidoMensualQuantityChange = (id: number, cantidad: number) => {
    setPedidoMensualQuantities((prev) => ({ ...prev, [id]: cantidad }));
  };

  // --- INTEGRACIÓN CON BACKEND PARA GUARDAR PEDIDOS ---

  React.useEffect(() => {
    if (exitoModalOpen) {
      const timer = setTimeout(() => setExitoModalOpen(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [exitoModalOpen]);
const FIELD_MAP_CENTRAL: Record<string, string> = {
  "Torundas de algodón": "torundas_algodon",
  "Torundas de gaza": "torundas_gaza",
  "Apositos": "apositos",
  "Guantes": "guantes",
  "Equipos de pinza": "equipos_pinza",
  "Frascos estériles": "frascos_esteriles",
};

const FIELD_MAP_FARMACIA: Record<string, string> = {
  "Bolsas colectoras": "bolsas_colectoras",
  "Alcohol": "alcohol",
  "Hemoclasificadores": "hemoclasificadores",
  "Hipoclorito de sodio": "hipoclorito_sodio",
  "Tubos de ensayo": "tubos_ensayo",
  "Gradillas": "gradillas",
  "Sulfato de cobre": "sulfato_cobre",
  "Ligaduras": "ligaduras",
  "Lancetas": "lancetas",
  "Laminas portaobjeto": "laminas_portaobjeto",
  "Cloruro de sodio": "cloruro_sodio",
  "Ringer lactato": "ringer_lactato",
  "Equipos de suero": "equipos_suero",
};



  const confirmPedido = async () => {
  if (pedidoSelectedItems.length === 0) {
    setSnackbarMsg("Seleccione al menos un elemento para hacer el pedido.");
    setSnackbarOpen(true);
    return;
  }
  for (const id of pedidoSelectedItems) {
    const cantidad = pedidoQuantities[id];
    if (!cantidad || cantidad < 1) {
      setSnackbarMsg(`Cantidad inválida`);
      setSnackbarOpen(true);
      return;
    }
  }
  try {
    // Separa farmacia y central
    const farmaciaIds = almacenFarmaciaCentralItems
      .filter((item) => item.id < 300)
      .map((item) => item.id);
    const centralIds = almacenFarmaciaCentralItems
      .filter((item) => item.id >= 300)
      .map((item) => item.id);

    // --- FARMACIA ---
    const farmaciaItems = pedidoSelectedItems
      .filter((id) => farmaciaIds.includes(id))
      .map((id) => ({
        id,
        nombre: almacenFarmaciaCentralItems.find((item) => item.id === id)?.nombre,
        cantidad: pedidoQuantities[id],
        unidad: almacenFarmaciaCentralItems.find((item) => item.id === id)?.unidad,
      }));

    if (farmaciaIds.length > 0) {
      const farmaciaPayload: any = { planId: currentOrderId };
      // Inicializa todos los campos requeridos en 0
      Object.entries(FIELD_MAP_FARMACIA).forEach(([nombre, field]) => {
        farmaciaPayload[field] = 0;
      });
      // Asigna los valores seleccionados
      farmaciaItems.forEach(item => {
        const field = FIELD_MAP_FARMACIA[item.nombre ?? ""];
        if (field) farmaciaPayload[field] = item.cantidad;
      });
      await axios.post("http://localhost:3000/pedidos/farmacia", farmaciaPayload);
    }

    // --- CENTRAL ---
    const centralItems = pedidoSelectedItems
      .filter((id) => centralIds.includes(id))
      .map((id) => ({
        id,
        nombre: almacenFarmaciaCentralItems.find((item) => item.id === id)?.nombre,
        cantidad: pedidoQuantities[id],
        unidad: almacenFarmaciaCentralItems.find((item) => item.id === id)?.unidad,
      }));

    if (centralIds.length > 0) {
      const centralPayload: any = { planId: currentOrderId };
      // Inicializa todos los campos requeridos en 0
      Object.entries(FIELD_MAP_CENTRAL).forEach(([nombre, field]) => {
        centralPayload[field] = 0;
      });
      // Asigna los valores seleccionados
      centralItems.forEach(item => {
        const field = FIELD_MAP_CENTRAL[item.nombre ?? ""];
        if (field) centralPayload[field] = item.cantidad;
      });
      await axios.post("http://localhost:3000/pedidos/central", centralPayload);
    }

    setPedidoModalOpen(false);
    mostrarExito(`Pedido confirmado para ${pedidoSelectedItems.length} elemento(s).`);
    setPedidosConfirmados((prev) => ({
      ...prev,
      [currentOrderId as string]: true,
    }));
    setPedidosPorFila((prev) => ({
      ...prev,
      [currentOrderId as string]: { ...pedidoQuantities },
    }));
    setPedidoSelectedItems([]);
    setPedidoQuantities({});
  } catch (error) {
    setSnackbarMsg("Error al guardar el pedido en la base de datos.");
    setSnackbarOpen(true);
  }
};

  // --- Toggle para pedidos de farmacia, central y víveres ---
  const togglePedidoItem = (id: number) => {
    setPedidoSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
    if (pedidoSelectedItems.includes(id)) {
      setPedidoQuantities((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    } else {
      setPedidoQuantities((prev) => ({ ...prev, [id]: 1 }));
    }
  };

  // --- Cambio de cantidad para pedidos de farmacia, central y víveres ---
  const onPedidoQuantityChange = (id: number, cantidad: number) => {
    setPedidoQuantities((prev) => ({ ...prev, [id]: cantidad }));
  };

 const confirmPedidoCentral = async () => {
  if (pedidoSelectedItems.length === 0) {
    setSnackbarMsg("Seleccione al menos un elemento para hacer el pedido de víveres.");
    setSnackbarOpen(true);
    return;
  }
  for (const id of pedidoSelectedItems) {
    const cantidad = pedidoQuantities[id];
    if (!cantidad || cantidad < 1) {
      setSnackbarMsg(`Cantidad inválida`);
      setSnackbarOpen(true);
      return;
    }
  }
  try {
    const viveresItems = pedidoSelectedItems
      .map((id) => ({
        id,
        nombre: almacenViveresItems.find((item) => item.id === id)?.nombre,
        cantidad: pedidoQuantities[id],
      }));

    const viveresPayload: any = { planId: currentOrderId };
    Object.entries(FIELD_MAP_VIVERES).forEach(([nombre, field]) => {
      viveresPayload[field] = 0;
    });
    viveresItems.forEach(item => {
      const field = FIELD_MAP_VIVERES[item.nombre ?? ""];
      if (field) viveresPayload[field] = item.cantidad;
    });

    await axios.post("http://localhost:3000/pedidos/viveres", viveresPayload);
    setPedidoCentralModalOpen(false);
    mostrarExito(`Pedido de víveres confirmado para ${pedidoSelectedItems.length} elemento(s).`);
    setPedidoSelectedItems([]);
    setPedidoQuantities({});
  } catch (error) {
    setSnackbarMsg("Error al guardar el pedido de víveres en la base de datos.");
    setSnackbarOpen(true);
  }
};

  // --- Función para mostrar la unidad personalizada en Farmacia y Central ---
  const getUnidadFarmaciaCentral = (item: AlmacenItem) => item.unidad || "unidades";

const confirmDevolucionCantidad = async () => {
  if (!currentOrderId) {
    setSnackbarMsg("No hay pedido seleccionado para devolución.");
    setSnackbarOpen(true);
    return;
  }
  // Cambia la validación aquí:
  if (devolucionCantidad < 0 || devolucionCantidad > devolucionMaxCantidad) {
    setSnackbarMsg(`Cantidad inválida para devolución.`);
    setSnackbarOpen(true);
    return;
  }
  try {
    await axios.post("http://localhost:3000/pedidos/devolucion", {
      planId: currentOrderId,
      cantidad: devolucionCantidad,
    });
    setDevoluciones((prev) => [...prev, { planId: currentOrderId }]);
    setDevolucionCantidadModalOpen(false);
    mostrarExito(`Devolución confirmada de ${devolucionCantidad} elemento(s).`);
    setDevolucionCantidad(1);
  } catch (error) {
    setSnackbarMsg("Error al guardar la devolución en la base de datos.");
    setSnackbarOpen(true);
  }
};
  return (
    <>
      <Navbar />

      <Typography
        variant="h4"
        component="h5"
        sx={{
          fontSize: { xs: "2rem", md: "3rem" },
          backgroundColor: "primary.dark",
          color: "white",
          textAlign: "center",
          marginBlock: 5,
          mt: 8,
        }}
      >
        Pedidos y Devoluciones
      </Typography>

      <Container maxWidth={false}>
        <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ mt: 4, mb: 2 }}>
          <Button variant="contained" color="success" onClick={handlePedidoMensualClick}>
            Pedidos Mensuales
          </Button>
        </Stack>

        <Box sx={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={sortedRows}
            columns={columns}
            pageSizeOptions={[5, 10]}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            disableRowSelectionOnClick
            hideFooterSelectedRowCount
          />
        </Box>

        <SeleccionElementosModalConCantidad
          open={pedidoMensualModalOpen}
          onClose={() => setPedidoMensualModalOpen(false)}
          title="Seleccione elementos para el pedido mensual"
          items={almacenMensualItems}
          selectedItems={pedidoMensualSelectedItems}
          quantities={pedidoMensualQuantities}
          onToggleItem={togglePedidoMensualItem}
          onQuantityChange={onPedidoMensualQuantityChange}
          onConfirm={confirmPedidoMensual}
          icon={<CheckCircleOutlineIcon sx={{ fontSize: 60 }} />}
          iconColor="success.main"
          unidadesLabel={true}
        />

        <SeleccionElementosModalConCantidad
          open={pedidoModalOpen}
          onClose={() => setPedidoModalOpen(false)}
          title="Seleccione elementos para el pedido farmacia y central"
          items={almacenFarmaciaCentralItems}
          selectedItems={pedidoSelectedItems}
          quantities={pedidoQuantities}
          onToggleItem={togglePedidoItem}
          onQuantityChange={onPedidoQuantityChange}
          onConfirm={confirmPedido}
          icon={<CheckCircleOutlineIcon sx={{ fontSize: 60 }} />}
          iconColor="primary.main"
          customUnidad={getUnidadFarmaciaCentral}
        />

        <SeleccionElementosModalConCantidad
          open={pedidoCentralModalOpen}
          onClose={() => setPedidoCentralModalOpen(false)}
          title="Seleccione elementos para el pedido víveres"
          items={almacenViveresItems}
          selectedItems={pedidoSelectedItems}
          quantities={pedidoQuantities}
          onToggleItem={togglePedidoItem}
          onQuantityChange={onPedidoQuantityChange}
          onConfirm={confirmPedidoCentral}
          icon={<CheckCircleOutlineIcon sx={{ fontSize: 60 }} />}
          iconColor="info.main"
          customUnidad={(item) => item.unidad || "gramos"}
        />

        <DevolucionCantidadModal
          open={devolucionCantidadModalOpen}
          onClose={() => setDevolucionCantidadModalOpen(false)}
          maxCantidad={devolucionMaxCantidad}
          cantidad={devolucionCantidad}
          onCantidadChange={setDevolucionCantidad}
          onConfirm={confirmDevolucionCantidad}
          icon={<WarningAmberIcon sx={{ fontSize: 60 }} />}
          iconColor="secondary.main"
        />

        <Dialog
          open={exitoModalOpen}
          onClose={() => setExitoModalOpen(false)}
          PaperProps={{
            sx: {
              borderRadius: 3,
              padding: 3,
              minWidth: 320,
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            },
          }}
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle sx={{ textAlign: "center", pb: 0 }}>
            <Box display="flex" flexDirection="column" alignItems="center" gap={1} color="success.main">
              <CheckCircleOutlineIcon sx={{ fontSize: 60 }} />
              <Typography variant="h5" fontWeight="bold" color="success.main">
                ¡Éxito!
              </Typography>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1" textAlign="center" sx={{ mt: 1, fontSize: "1.1rem" }}>
              {exitoMensaje}
            </Typography>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMsg}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setSnackbarOpen(false)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </Container>
    </>
  );
}