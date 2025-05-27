import React, { useMemo, useState } from "react";
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
  CircularProgress,
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

// --- Tipos ---
type PlanDonacion = {
  id: number;
  fechaHora: string;
  areaSalud: string;
  consejoPopular: string;
  consultoriosAfectados: number;
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
type PedidosPorFila = Record<number, Quantities>;
type BooleanMap = Record<number, boolean>;

// --- Datos iniciales ---
const initialPlanDonaciones: PlanDonacion[] = [
  {
    id: 1,
    fechaHora: "2025-05-01 14:30",
    areaSalud: "Centro",
    consejoPopular: "CP1",
    consultoriosAfectados: 3,
    lugarDonacion: "Policlínico Central",
    compromiso: 10,
    responsableSalud: "Dr. Pérez",
    cdr: "CDR 1",
  },
  {
    id: 2,
    fechaHora: "2025-05-01 09:15",
    areaSalud: "Norte",
    consejoPopular: "CP2",
    consultoriosAfectados: 2,
    lugarDonacion: "Consultorio 5",
    compromiso: 8,
    responsableSalud: "Dra. Gómez",
    cdr: "CDR 2",
  },
  {
    id: 3,
    fechaHora: "2025-05-02 10:00",
    areaSalud: "Centro",
    consejoPopular: "CP3",
    consultoriosAfectados: 1,
    lugarDonacion: "Policlínico Sur",
    compromiso: 5,
    responsableSalud: "Dr. Ruiz",
    cdr: "CDR 3",
  },
];

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
  const cantidadValida = cantidad > 0 && cantidad <= maxCantidad;
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
              ? `Debe ser entre 1 y ${maxCantidad}`
              : " "
          }
          inputProps={{
            min: 1,
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
  const [planDonaciones, setPlanDonaciones] = useState<PlanDonacion[]>(initialPlanDonaciones);

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

  const [currentOrderId, setCurrentOrderId] = useState<number | null>(null);

  const [pedidosConfirmados, setPedidosConfirmados] = useState<BooleanMap>({});
  const [pedidosPorFila, setPedidosPorFila] = useState<PedidosPorFila>({});

  const sortedRows = useMemo(() => {
    return [...planDonaciones].sort((a, b) => {
      const dateA = dayjs(a.fechaHora).startOf("day").valueOf();
      const dateB = dayjs(b.fechaHora).startOf("day").valueOf();
      if (dateA !== dateB) return dateA - dateB;
      return dayjs(a.fechaHora).valueOf() - dayjs(b.fechaHora).valueOf();
    });
  }, [planDonaciones]);

  const columns: GridColDef[] = [
    {
      field: "fechaHora",
      headerName: "Fecha y Hora",
      width: 160,
      valueFormatter: (params: { value: any }) => dayjs(params.value as string).format("DD/MM/YYYY HH:mm"),
    },
    { field: "areaSalud", headerName: "Área de salud", width: 130 },
    { field: "consejoPopular", headerName: "Consejo popular", width: 130 },
    { field: "consultoriosAfectados", headerName: "Consultorios afectados", width: 170 },
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

  const confirmPedidoMensual = () => {
    if (pedidoMensualSelectedItems.length === 0) {
      setSnackbarMsg("Seleccione al menos un elemento para hacer el pedido.");
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
    setPedidoMensualModalOpen(false);
    mostrarExito("Pedido mensual realizado con éxito.");
  };

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

  const onPedidoQuantityChange = (id: number, cantidad: number) => {
    setPedidoQuantities((prev) => ({ ...prev, [id]: cantidad }));
  };

  const confirmPedido = () => {
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
    setPedidoModalOpen(false);
    mostrarExito(`Pedido confirmado para ${pedidoSelectedItems.length} elemento(s).`);
    setPedidosConfirmados((prev) => ({
      ...prev,
      [currentOrderId as number]: true,
    }));
    setPedidosPorFila((prev) => ({
      ...prev,
      [currentOrderId as number]: { ...pedidoQuantities },
    }));
    setPedidoSelectedItems([]);
    setPedidoQuantities({});
  };

  const confirmPedidoCentral = () => {
    if (pedidoSelectedItems.length === 0) {
      setSnackbarMsg("Seleccione al menos un elemento para hacer el pedido central.");
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
    setPedidoCentralModalOpen(false);
    mostrarExito(`Pedido central confirmado para ${pedidoSelectedItems.length} elemento(s).`);
    setPedidoSelectedItems([]);
    setPedidoQuantities({});
  };

  const confirmDevolucionCantidad = () => {
    if (devolucionCantidad < 1 || devolucionCantidad > devolucionMaxCantidad) {
      setSnackbarMsg(`Cantidad inválida. Debe ser entre 1 y ${devolucionMaxCantidad}`);
      setSnackbarOpen(true);
      return;
    }
    setDevolucionCantidadModalOpen(false);
    mostrarExito(`Devolución confirmada de ${devolucionCantidad} elemento(s).`);
    if (currentOrderId !== null) {
      setPlanDonaciones(prev => prev.filter(row => row.id !== currentOrderId));
      setPedidosConfirmados((prev) => {
        const copy = { ...prev };
        delete copy[currentOrderId as number];
        return copy;
      });
      setPedidosPorFila((prev) => {
        const copy = { ...prev };
        delete copy[currentOrderId as number];
        return copy;
      });
    }
  };

  // --- Función para mostrar la unidad personalizada en Farmacia y Central ---
  const getUnidadFarmaciaCentral = (item: AlmacenItem) => item.unidad || "unidades";

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
            Pedido Mensual
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
            <Button onClick={() => setExitoModalOpen(false)} variant="contained" color="success">
              Cerrar
            </Button>
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