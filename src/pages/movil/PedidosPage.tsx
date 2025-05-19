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
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
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

const initialPlanDonaciones = [
  {
    id: 1,
    fechaHora: "2025-05-01 14:30",
    areaSalud: "Centro",
    consejoPopular: "CP1",
    consultoriosAfectados: 3,
    lugarDonacion: "Policlínico Central",
    compromiso: "10 donaciones",
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
    compromiso: "8 donaciones",
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
    compromiso: "5 donaciones",
    responsableSalud: "Dr. Ruiz",
    cdr: "CDR 3",
  },
];

const almacenItems = [
  { id: 101, nombre: "Guantes", cantidadDisponible: 100 },
  { id: 102, nombre: "Mascarillas", cantidadDisponible: 200 },
  { id: 103, nombre: "Alcohol en gel", cantidadDisponible: 50 },
  { id: 104, nombre: "Jeringuillas", cantidadDisponible: 150 },
];

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
}) {
  const isCantidadValida = (id) => {
    const cantidad = quantities[id];
    const item = items.find((i) => i.id === id);
    if (!item) return false;
    return cantidad > 0 && cantidad <= item.cantidadDisponible;
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
        <List dense>
          {items.map((item) => {
            const isSelected = selectedItems.includes(item.id);
            const cantidad = quantities[item.id] || 0;
            const cantidadValida = cantidad > 0 && cantidad <= item.cantidadDisponible;
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
                  secondary={`Disponible: ${item.cantidadDisponible}`}
                  sx={{ flexBasis: "40%", flexShrink: 0 }}
                />
                {isSelected && (
                  <TextField
                    label={readOnlyQuantities ? "Cantidad a devolver" : "Cantidad"}
                    type="number"
                    size="small"
                    value={cantidad}
                    onChange={(e) => {
                      if (readOnlyQuantities) return;
                      let val = parseInt(e.target.value, 10);
                      if (isNaN(val)) val = 0;
                      if (val < 0) val = 0;
                      if (val > item.cantidadDisponible) val = item.cantidadDisponible;
                      onQuantityChange(item.id, val);
                    }}
                    error={!cantidadValida}
                    helperText={
                      !cantidadValida
                        ? `Debe ser entre 1 y ${item.cantidadDisponible}`
                        : " "
                    }
                    sx={{ width: 130, ml: 2 }}
                    inputProps={{
                      min: 1,
                      max: item.cantidadDisponible,
                      readOnly: readOnlyQuantities,
                    }}
                  />
                )}
              </ListItem>
            );
          })}
        </List>
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

export default function PedidosPage() {
  const [planDonaciones, setPlanDonaciones] = useState(initialPlanDonaciones);

  const [pedidoHechoEsteMes, setPedidoHechoEsteMes] = useState(null);
  const [alertPedidoMensualOpen, setAlertPedidoMensualOpen] = useState(false);
  const [pedidoMensualModalOpen, setPedidoMensualModalOpen] = useState(false);
  const [pedidoMensualSelectedItems, setPedidoMensualSelectedItems] = useState([]);
  const [pedidoMensualQuantities, setPedidoMensualQuantities] = useState({});

  const [pedidoModalOpen, setPedidoModalOpen] = useState(false);
  const [pedidoSelectedItems, setPedidoSelectedItems] = useState([]);
  const [pedidoQuantities, setPedidoQuantities] = useState({});

  const [devolucionModalOpen, setDevolucionModalOpen] = useState(false);
  const [devolucionSelectedItems, setDevolucionSelectedItems] = useState([]);
  const [devolucionQuantities, setDevolucionQuantities] = useState({});

  const [devolucionResumenOpen, setDevolucionResumenOpen] = useState(false);
  const [devolucionRowId, setDevolucionRowId] = useState(null);

  const [exitoModalOpen, setExitoModalOpen] = useState(false);
  const [exitoMensaje, setExitoMensaje] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");

  const [currentOrderId, setCurrentOrderId] = useState(null);

  const [pedidosConfirmados, setPedidosConfirmados] = useState({});

  const sortedRows = useMemo(() => {
    return [...planDonaciones].sort((a, b) => {
      const dateA = dayjs(a.fechaHora).startOf("day").valueOf();
      const dateB = dayjs(b.fechaHora).startOf("day").valueOf();
      if (dateA !== dateB) return dateA - dateB;
      return dayjs(a.fechaHora).valueOf() - dayjs(b.fechaHora).valueOf();
    });
  }, [planDonaciones]);

  const columns = [
    {
      field: "fechaHora",
      headerName: "Fecha y Hora",
      width: 160,
      valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY HH:mm"),
    },
    { field: "areaSalud", headerName: "Área de salud", width: 130 },
    { field: "consejoPopular", headerName: "Consejo popular", width: 130 },
    { field: "consultoriosAfectados", headerName: "Consultorios afectados", width: 170 },
    { field: "lugarDonacion", headerName: "Lugar donación", width: 150 },
    { field: "compromiso", headerName: "Compromiso", width: 120 },
    { field: "responsableSalud", headerName: "Responsable de salud", width: 150 },
    { field: "cdr", headerName: "CDR", width: 90 },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 240,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
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
            Pedido
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
              setDevolucionSelectedItems([...pedidoSelectedItems]);
              setDevolucionQuantities({ ...pedidoQuantities });
              setDevolucionResumenOpen(true);
            }}
            disabled={!pedidosConfirmados[params.row.id]}
          >
            Devolución
          </Button>
        </Box>
      ),
    },
  ];

  useEffect(() => {
    const lastPedido = localStorage.getItem("ultimoPedidoMensual");
    if (lastPedido) {
      const lastDate = dayjs(lastPedido);
      const now = dayjs();
      if (lastDate.year() === now.year() && lastDate.month() === now.month()) {
        setPedidoHechoEsteMes(true);
      } else {
        localStorage.removeItem("ultimoPedidoMensual");
        setPedidoHechoEsteMes(false);
      }
    } else {
      setPedidoHechoEsteMes(false);
    }
  }, []);

  const mostrarExito = (mensaje) => {
    setExitoMensaje(mensaje);
    setExitoModalOpen(true);
  };

  const handlePedidoMensualClick = () => {
    if (pedidoHechoEsteMes === null) {
      setSnackbarMsg("Cargando estado, por favor espere...");
      setSnackbarOpen(true);
      return;
    }
    if (pedidoHechoEsteMes) {
      setAlertPedidoMensualOpen(true);
    } else {
      setPedidoMensualSelectedItems([]);
      setPedidoMensualQuantities({});
      setPedidoMensualModalOpen(true);
    }
  };

  const togglePedidoMensualItem = (id) => {
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

  const onPedidoMensualQuantityChange = (id, cantidad) => {
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
      const item = almacenItems.find((i) => i.id === id);
      if (!cantidad || cantidad < 1 || cantidad > (item?.cantidadDisponible ?? 0)) {
        setSnackbarMsg(`Cantidad inválida para ${item?.nombre}`);
        setSnackbarOpen(true);
        return;
      }
    }
    localStorage.setItem("ultimoPedidoMensual", dayjs().toISOString());
    setPedidoHechoEsteMes(true);
    setPedidoMensualModalOpen(false);
    mostrarExito("Pedido mensual realizado con éxito.");
  };

  const resetPedidoMensual = () => {
    localStorage.removeItem("ultimoPedidoMensual");
    setPedidoHechoEsteMes(false);
    setSnackbarMsg("Pedido mensual reseteado. Ahora puedes hacer un nuevo pedido.");
    setSnackbarOpen(true);
  };

  const togglePedidoItem = (id) => {
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

  const onPedidoQuantityChange = (id, cantidad) => {
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
      const item = almacenItems.find((i) => i.id === id);
      if (!cantidad || cantidad < 1 || cantidad > (item?.cantidadDisponible ?? 0)) {
        setSnackbarMsg(`Cantidad inválida para ${item?.nombre}`);
        setSnackbarOpen(true);
        return;
      }
    }
    setPedidoModalOpen(false);
    mostrarExito(`Pedido confirmado para ${pedidoSelectedItems.length} elemento(s).`);
    setPedidosConfirmados((prev) => ({
      ...prev,
      [currentOrderId]: true,
    }));
    setPedidoSelectedItems([]);
    setPedidoQuantities({});
  };

  const toggleDevolucionItem = (id) => {
    setDevolucionSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
    if (devolucionSelectedItems.includes(id)) {
      setDevolucionQuantities((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    } else {
      setDevolucionQuantities((prev) => ({ ...prev, [id]: 1 }));
    }
  };

  const onDevolucionQuantityChange = (id, cantidad) => {
    setDevolucionQuantities((prev) => ({ ...prev, [id]: cantidad }));
  };

  const confirmDevolucion = () => {
    if (devolucionSelectedItems.length === 0) {
      setSnackbarMsg("Seleccione al menos un elemento para hacer la devolución.");
      setSnackbarOpen(true);
      return;
    }
    for (const id of devolucionSelectedItems) {
      const cantidad = devolucionQuantities[id];
      const maxCantidad = pedidoQuantities[id] || 0;
      if (!cantidad || cantidad < 1 || cantidad > maxCantidad) {
        setSnackbarMsg(`Cantidad inválida para ${almacenItems.find(i => i.id === id)?.nombre}`);
        setSnackbarOpen(true);
        return;
      }
    }
    setDevolucionModalOpen(false);
    setSnackbarMsg(`Devolución confirmada para ${devolucionSelectedItems.length} elemento(s).`);
    setSnackbarOpen(true);
    if (currentOrderId !== null) {
      setPlanDonaciones(prev => prev.filter(row => row.id !== currentOrderId));
      setPedidosConfirmados((prev) => {
        const copy = { ...prev };
        delete copy[currentOrderId];
        return copy;
      });
    }
  };

  if (pedidoHechoEsteMes === null) {
    return (
      <>
        <Navbar />
        <Container maxWidth={false} sx={{ mt: 10, textAlign: "center" }}>
          <CircularProgress />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Cargando estado de pedido mensual...
          </Typography>
        </Container>
      </>
    );
  }

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
          <Button variant="outlined" color="warning" onClick={resetPedidoMensual}>
            Resetear Pedido Mensual
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
          items={almacenItems}
          selectedItems={pedidoMensualSelectedItems}
          quantities={pedidoMensualQuantities}
          onToggleItem={togglePedidoMensualItem}
          onQuantityChange={onPedidoMensualQuantityChange}
          onConfirm={confirmPedidoMensual}
          icon={<CheckCircleOutlineIcon sx={{ fontSize: 60 }} />}
          iconColor="success.main"
        />

        <SeleccionElementosModalConCantidad
          open={pedidoModalOpen}
          onClose={() => setPedidoModalOpen(false)}
          title="Seleccione elementos para el pedido"
          items={almacenItems}
          selectedItems={pedidoSelectedItems}
          quantities={pedidoQuantities}
          onToggleItem={togglePedidoItem}
          onQuantityChange={onPedidoQuantityChange}
          onConfirm={confirmPedido}
          icon={<CheckCircleOutlineIcon sx={{ fontSize: 60 }} />}
          iconColor="primary.main"
        />

        <SeleccionElementosModalConCantidad
          open={devolucionModalOpen}
          onClose={() => setDevolucionModalOpen(false)}
          title="Seleccione elementos para la devolución"
          items={almacenItems}
          selectedItems={devolucionSelectedItems}
          quantities={devolucionQuantities}
          onToggleItem={toggleDevolucionItem}
          onQuantityChange={onDevolucionQuantityChange}
          onConfirm={confirmDevolucion}
          icon={<WarningAmberIcon sx={{ fontSize: 60 }} />}
          iconColor="secondary.main"
          readOnlyQuantities={false}
        />

        <Dialog
          open={alertPedidoMensualOpen}
          onClose={() => setAlertPedidoMensualOpen(false)}
          aria-labelledby="pedido-hecho-dialog-title"
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
          <DialogTitle sx={{ textAlign: "center", pb: 0 }} id="pedido-hecho-dialog-title">
            <Box display="flex" flexDirection="column" alignItems="center" gap={1} color="warning.main">
              <WarningAmberIcon sx={{ fontSize: 60 }} />
              <Typography variant="h5" fontWeight="bold" color="warning.main">
                Pedido Mensual
              </Typography>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1" textAlign="center" sx={{ mt: 1, fontSize: "1.1rem" }}>
              Ya ha realizado el pedido mensual de este mes. No puede hacer más pedidos hasta el próximo mes.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button onClick={() => setAlertPedidoMensualOpen(false)} variant="contained" color="warning">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>

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
