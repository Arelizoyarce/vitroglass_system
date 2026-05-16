import React, { useEffect, useMemo, useState } from 'react';

import {
  Box,
  Typography,
  Stack,
  Grid,
  Button,
  TextField,
  MenuItem
} from '@mui/material';

import { useParams } from 'react-router-dom';

import DownloadIcon from '@mui/icons-material/GetApp';

import UserMenu from 'src/components/UserMenu';
import QuoteInfo from 'src/components/QuoteInfo';
import OrderDetails from 'src/components/OrderDetails';

import {
  createCotizacion,
  getTiposVidrio,
  getCotizacionById,
  updateEstadoCotizacion
} from 'src/services/cotizacion.service';

import {
  buscarClientesPorNombre,
  crearCliente
} from 'src/services/cliente.service';

/* =========================
   ITEM INIT
========================= */
const newItem = () => ({
  id: Date.now() + Math.random(),
  idTipoVidrio: '',
  descripcionProducto: '',
  cantidad: '',
  alto: '',
  ancho: '',
  precioUnitario: 0,
  subtotal: 0,
});

const estados = [
  'COTIZADO',
  'EN PROCESO',
  'COMPLETADO',
  'CANCELADO'
];

const NewQuote = () => {

  const { idQuotation } = useParams();
  const isEditMode = Boolean(idQuotation);

  /* =========================
     STATES
  ========================= */
  const [clientesEncontrados, setClientesEncontrados] = useState([]);

  const [cliente, setCliente] = useState({
    idCliente: null,
    nombres: '',
    apellidos: '',
    telefono: '',
    correoElectronico: '',
    direccion: '',
    tipoCliente: '',
  });

  const [tiposVidrio, setTiposVidrio] = useState([]);
  const [items, setItems] = useState([newItem()]);
  const [loading, setLoading] = useState(false);

  const [estadoCotizacion, setEstadoCotizacion] = useState('COTIZADO');
  const [estadoInicial, setEstadoInicial] = useState('COTIZADO');

  const [fechaEntrega, setFechaEntrega] = useState('');

  /* =========================
     LOAD DATA
  ========================= */
  useEffect(() => {
    loadTiposVidrio();

    if (idQuotation) {
      loadCotizacion();
    }
  }, [idQuotation]);

  const loadTiposVidrio = async () => {
    const data = await getTiposVidrio();
    setTiposVidrio(data);
  };

  const loadCotizacion = async () => {
    const data = await getCotizacionById(idQuotation);
    if (!data) return;

    setCliente({
      idCliente: data.cliente?.idCliente || null,
      nombres: data.cliente?.nombres || '',
      apellidos: data.cliente?.apellidos || '',
      telefono: data.cliente?.telefono || '',
      correoElectronico: data.cliente?.correoElectronico || '',
      direccion: data.cliente?.direccion || '',
      tipoCliente: data.cliente?.tipoCliente || '',
    });

    setEstadoCotizacion(data.estado || 'COTIZADO');
    setEstadoInicial(data.estado || 'COTIZADO');
    setFechaEntrega(data.fechaEntrega || '');

    const detalles = data.detalleCotizaciones?.map((detalle) => ({
      id: Date.now() + Math.random(),
      idTipoVidrio: detalle.tipoVidrio.idTipoVidrio,
      descripcionProducto: detalle.descripcionProducto,
      cantidad: detalle.cantidad,
      ancho: Number(detalle.anchoMetros) * 100,
      alto: Number(detalle.altoMetros) * 100,
      precioUnitario: detalle.precioUnitario,
      subtotal:
        Number(detalle.cantidad) *
        Number(detalle.precioUnitario) *
        Number(detalle.anchoMetros) *
        Number(detalle.altoMetros),
    })) || [];

    setItems(detalles);
  };

  /* =========================
     DETECT CHANGES
  ========================= */
  const estadoCambio = estadoInicial !== estadoCotizacion;

  const requiereFechaEntrega = estadoCotizacion === 'EN PROCESO';

  const fechaValida =
    !requiereFechaEntrega || (fechaEntrega && fechaEntrega.trim() !== '');

  const puedeActualizar =
    isEditMode &&
    estadoCambio &&
    fechaValida &&
    !loading;

  const bloquearFechaEntrega = !requiereFechaEntrega;

  /* =========================
     SAVE / UPDATE
  ========================= */
  const handleGuardarCotizacion = async () => {
    try {
      setLoading(true);

      let idCliente = cliente.idCliente;

      if (!idCliente) {
        const nuevo = await crearCliente(cliente);
        idCliente = nuevo.idCliente;
      }

      const payload = {
        idCliente,
        idUsuario: 1,
        estado: estadoCotizacion,
        fechaEntrega,
        detalles: items.map((item) => ({
          idTipoVidrio: Number(item.idTipoVidrio),
          descripcionProducto: item.descripcionProducto,
          anchoMetros: Number(item.ancho) / 100,
          altoMetros: Number(item.alto) / 100,
          cantidad: Number(item.cantidad),
          precioUnitario: Number(item.precioUnitario),
        })),
      };

      await createCotizacion(payload);
      alert('Cotización creada correctamente');

    } catch (error) {
      console.error(error);
      alert('Error al guardar');
    } finally {
      setLoading(false);
    }
  };

  const handleActualizarCotizacion = async () => {
    try {
      setLoading(true);

      const fecha =
        estadoCotizacion === 'EN PROCESO'
          ? fechaEntrega
          : null;

      await updateEstadoCotizacion(
        idQuotation,
        estadoCotizacion,
        fecha
      );

      alert('Actualizado correctamente');

      setEstadoInicial(estadoCotizacion);

    } catch (error) {
      console.error(error);
      alert('Error al actualizar');
    } finally {
      setLoading(false);
    }
  };
const handleBuscarCliente = async (nombre) => {
  if (!nombre || nombre.trim().length < 2) {
    setClientesEncontrados([]);
    return;
  }

  try {
    const data = await buscarClientesPorNombre(nombre);
    setClientesEncontrados(data);
  } catch (error) {
    console.error('ERROR BUSCANDO CLIENTES:', error);
  }
};

const handleChangeItem = (index, updated) => {
  const newItems = [...items];
  newItems[index] = updated;
  setItems(newItems);
};

const handleDeleteItem = (index) => {
  const newItems = items.filter((_, i) => i !== index);
  setItems(newItems);
};

const handleAddItem = () => {
  setItems([
    ...items,
    {
      id: Date.now() + Math.random(),
      idTipoVidrio: '',
      cantidad: '',
      alto: '',
      ancho: '',
      precioUnitario: 0,
      subtotal: 0,
    }
  ]);
};
  /* =========================
     RENDER
  ========================= */
  return (
    <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto', p: 3 }}>

      {/* HEADER */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 4 }}
      >
        <Typography variant="h4" fontWeight={700}>
          {isEditMode ? 'Detalle Cotización' : 'Cotización'}
        </Typography>

        <Stack direction="row" spacing={2} alignItems="center">

          {isEditMode && (
            <TextField
              select
              size="small"
              label="Estado"
              value={estadoCotizacion}
              onChange={(e) => setEstadoCotizacion(e.target.value)}
              sx={{ minWidth: 180 }}
            >
              {estados.map((e) => (
                <MenuItem key={e} value={e}>{e}</MenuItem>
              ))}
            </TextField>
          )}

          <UserMenu />
        </Stack>
      </Stack>

      {/* CLIENTE + ENTREGA */}
      <Grid container spacing={3} sx={{ mb: 3 }}>

        <Grid item xs={12} md={8}>
          <Box sx={{ p: 3, bgcolor: '#fff', borderRadius: 3 }}>
            <QuoteInfo
  cliente={cliente}
  onChange={setCliente}
  clientesEncontrados={clientesEncontrados}
  onBuscarCliente={handleBuscarCliente}
/>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ p: 3, bgcolor: '#fff', borderRadius: 3 }}>

            <Typography fontWeight={700} mb={2}>
              Información de entrega
            </Typography>

            <TextField
              fullWidth
              disabled
              value={new Date().toLocaleDateString()}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              type="date"
              disabled={bloquearFechaEntrega}
              value={fechaEntrega}
              onChange={(e) => setFechaEntrega(e.target.value)}
            />

          </Box>
        </Grid>

      </Grid>

      {/* DETALLE */}
      <Box sx={{ p: 3, bgcolor: '#fff', borderRadius: 3, mb: 3 }}>
        <Typography fontWeight={700} textAlign="center" mb={2}>
          Detalle de pedido
        </Typography>

<OrderDetails
  items={items}
  tiposVidrio={tiposVidrio}
  onChangeItem={handleChangeItem}
  onDeleteItem={handleDeleteItem}
  onAddItem={handleAddItem}
  disabled={isEditMode}
/>
      </Box>

      {/* BOTONES */}
      <Stack direction="row" justifyContent="center" spacing={2}>

        {!isEditMode ? (
          <Button
            variant="contained"
            onClick={handleGuardarCotizacion}
            disabled={loading}
          >
            Cotizar
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleActualizarCotizacion}
            disabled={!puedeActualizar}
          >
            Actualizar
          </Button>
        )}

        {estadoCotizacion === 'COTIZADO' && (
          <Button variant="outlined" startIcon={<DownloadIcon />}>
            Descargar
          </Button>
        )}

      </Stack>

    </Box>
  );
};

export default NewQuote;