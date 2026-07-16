import React, { useContext, useEffect, useState } from 'react';

import {
  Box,
  Typography,
  Stack,
  Grid,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';

import { useParams, useNavigate } from 'react-router-dom';

import DownloadIcon from '@mui/icons-material/GetApp';
import SendIcon from '@mui/icons-material/Send';

import UserMenu from 'src/components/UserMenu';
import QuoteInfo from 'src/components/QuoteInfo';
import OrderDetails from 'src/components/OrderDetails';

import {
  createCotizacion,
  getTiposVidrio,
  getCotizacionById,
  updateEstadoCotizacion,
  descargarPdf,
  enviarPorCorreo,
  descargarBoleta,
  enviarBoletaPorCorreo
} from 'src/services/cotizacion.service';

import {
  buscarClientesPorNombre,
  crearCliente
} from 'src/services/cliente.service';

import { AuthContext } from '../context/AuthContext';

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
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const isEditMode = Boolean(idQuotation);

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

  const [descargandoPdf, setDescargandoPdf] = useState(false);
  const [enviandoCorreo, setEnviandoCorreo] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

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

  const estadoCambio = estadoInicial !== estadoCotizacion;
  const requiereFechaEntrega = estadoCotizacion === 'EN PROCESO';
  const fechaValida = !requiereFechaEntrega || (fechaEntrega && fechaEntrega.trim() !== '');
  const puedeActualizar = isEditMode && estadoCambio && fechaValida && !loading;
  const bloquearFechaEntrega = !requiereFechaEntrega;

  /* ========================= HANDLERS ========================= */

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
        idUsuario: user.idUsuario,
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

      const created = await createCotizacion(payload);
      setSnackbar({ open: true, message: 'Cotización creada correctamente', severity: 'success' });

      setTimeout(() => {
        navigate(`/nueva-cotizacion/${created.idCotizacion}`);
      }, 1000);

    } catch (error) {
      console.error(error);
      setSnackbar({ open: true, message: 'Error al guardar la cotización', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleActualizarCotizacion = async () => {
    try {
      setLoading(true);

      const fecha = estadoCotizacion === 'EN PROCESO' ? fechaEntrega : null;

      await updateEstadoCotizacion(idQuotation, estadoCotizacion, fecha);

      setSnackbar({ open: true, message: 'Estado actualizado correctamente', severity: 'success' });
      setEstadoInicial(estadoCotizacion);

    } catch (error) {
      console.error(error);
      setSnackbar({ open: true, message: 'Error al actualizar', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDescargarPdf = async () => {
    try {
      setDescargandoPdf(true);
      await descargarPdf(idQuotation);
      setSnackbar({ open: true, message: 'Cotización descargada correctamente', severity: 'success' });
    } catch (error) {
      console.error(error);
      setSnackbar({ open: true, message: 'Error al descargar la cotización', severity: 'error' });
    } finally {
      setDescargandoPdf(false);
    }
  };

  const handleEnviarCorreo = async () => {
    if (!cliente.correoElectronico) {
      setSnackbar({
        open: true,
        message: 'El cliente no tiene correo registrado. Descargue el PDF manualmente.',
        severity: 'warning'
      });
      return;
    }

    try {
      setEnviandoCorreo(true);
      await enviarPorCorreo(idQuotation);
      setSnackbar({
        open: true,
        message: `Cotización enviada a ${cliente.correoElectronico}`,
        severity: 'success'
      });
    } catch (error) {
      console.error(error);
      setSnackbar({ open: true, message: 'Error al enviar la cotización', severity: 'error' });
    } finally {
      setEnviandoCorreo(false);
    }
  };

  const handleDescargarBoleta = async () => {
    try {
      setDescargandoPdf(true);
      await descargarBoleta(idQuotation);
      setSnackbar({ open: true, message: 'Boleta descargada correctamente', severity: 'success' });
    } catch (error) {
      console.error(error);
      setSnackbar({ open: true, message: 'Error al descargar la boleta', severity: 'error' });
    } finally {
      setDescargandoPdf(false);
    }
  };

  const handleEnviarBoleta = async () => {
    if (!cliente.correoElectronico) {
      setSnackbar({
        open: true,
        message: 'El cliente no tiene correo registrado. Descargue la boleta manualmente.',
        severity: 'warning'
      });
      return;
    }

    try {
      setEnviandoCorreo(true);
      await enviarBoletaPorCorreo(idQuotation);
      setSnackbar({
        open: true,
        message: `Boleta enviada a ${cliente.correoElectronico}`,
        severity: 'success'
      });
    } catch (error) {
      console.error(error);
      setSnackbar({ open: true, message: 'Error al enviar la boleta', severity: 'error' });
    } finally {
      setEnviandoCorreo(false);
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

  /* ========================= RENDER ========================= */

  return (
    <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto', p: 3 }}>

      {/* HEADER */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
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
  <Box sx={{
    p: 3,
    bgcolor: '#fff',
    borderRadius: 3,
    display: 'flex',
    flexDirection: 'column',
    gap: 2.5
  }}>
    <Typography fontWeight={700} sx={{ fontSize: '16px', color: '#1a1a1a' }}>
      Información de entrega
    </Typography>

    {/* Fecha de registro */}
    <Box>
      <Typography sx={{ fontSize: '12px', fontWeight: 600, color: '#999', mb: 0.8, letterSpacing: '0.3px', textTransform: 'uppercase' }}>
        Fecha de registro
      </Typography>
      <Box sx={{
        px: 2, py: 1.4,
        borderRadius: '10px',
        bgcolor: '#f5f5f5',
        border: '1px solid #eee'
      }}>
        <Typography sx={{ fontSize: '14px', color: '#555', fontWeight: 500 }}>
          {new Date().toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric' })}
        </Typography>
      </Box>
    </Box>

    {/* Fecha de entrega */}
    <Box>
      <Typography sx={{ fontSize: '12px', fontWeight: 600, color: '#999', mb: 0.8, letterSpacing: '0.3px', textTransform: 'uppercase' }}>
        Fecha de entrega
      </Typography>

      {estadoInicial === 'EN PROCESO' ? (
        <>
          <TextField
            fullWidth
            type="date"
            size="small"
            value={fechaEntrega}
            onChange={(e) => setFechaEntrega(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
                fontSize: '14px',
                '& fieldset': { borderColor: '#D4E157' },
                '&:hover fieldset': { borderColor: '#C5D14B' },
                '&.Mui-focused fieldset': { borderColor: '#C5D14B' }
              }
            }}
          />
          <Typography sx={{ fontSize: '11px', color: '#4CAF50', mt: 0.5, fontWeight: 500 }}>
            Editable mientras esté en proceso
          </Typography>
        </>
      ) : fechaEntrega ? (
        <Box sx={{
          px: 2, py: 1.4,
          borderRadius: '10px',
          bgcolor: '#f5f5f5',
          border: '1px solid #eee'
        }}>
          <Typography sx={{ fontSize: '14px', color: '#555', fontWeight: 500 }}>
            {new Date(fechaEntrega + 'T00:00:00').toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric' })}
          </Typography>
        </Box>
      ) : (
        <Box sx={{
          px: 2, py: 1.4,
          borderRadius: '10px',
          bgcolor: '#fafafa',
          border: '1px dashed #ddd'
        }}>
          <Typography sx={{ fontSize: '13px', color: '#bbb', fontStyle: 'italic' }}>
            Se asigna al pasar a "En proceso"
          </Typography>
        </Box>
      )}
    </Box>

    {/* Estado visual */}
    {isEditMode && (
      <Box sx={{
        px: 2, py: 1.2,
        borderRadius: '10px',
        bgcolor: estadoInicial === 'COTIZADO' ? '#E3F2FD'
               : estadoInicial === 'EN PROCESO' ? '#FFF3E0'
               : estadoInicial === 'COMPLETADO' ? '#E8F5E9'
               : '#FFEBEE',
        textAlign: 'center'
      }}>
        <Typography sx={{
          fontSize: '12px',
          fontWeight: 700,
          letterSpacing: '0.5px',
          color: estadoInicial === 'COTIZADO' ? '#1976D2'
               : estadoInicial === 'EN PROCESO' ? '#FF9800'
               : estadoInicial === 'COMPLETADO' ? '#4CAF50'
               : '#F44336'
        }}>
          {estadoInicial === 'COTIZADO' && 'Pendiente de aprobación'}
          {estadoInicial === 'EN PROCESO' && 'En producción / instalación'}
          {estadoInicial === 'COMPLETADO' && 'Venta completada'}
          {estadoInicial === 'CANCELADO' && 'Cotización cancelada'}
        </Typography>
      </Box>
    )}
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
<Stack
  direction="row"
  justifyContent="center"
  spacing={2}
  sx={{
    p: 2,
    bgcolor: '#fff',
    borderRadius: 3,
    boxShadow: '0px 4px 20px rgba(0,0,0,0.02)'
  }}
>

  {!isEditMode ? (
    <Button
      variant="contained"
      onClick={handleGuardarCotizacion}
      disabled={loading}
      sx={{
        bgcolor: '#D4E157', color: '#1a1a1a', textTransform: 'none',
        fontWeight: 600, borderRadius: '12px', px: 5, py: 1.2,
        fontSize: '14px', boxShadow: 'none',
        '&:hover': { bgcolor: '#C5D14B', boxShadow: 'none' },
        '&:disabled': { bgcolor: '#e0e0e0', color: '#999' }
      }}
    >
      {loading ? <CircularProgress size={20} sx={{ color: '#1a1a1a' }} /> : 'Cotizar'}
    </Button>
  ) : (
    <>
      {/* COTIZADO */}
      {estadoInicial === 'COTIZADO' && !estadoCambio && (
        <>
          <Button
            variant="contained"
            startIcon={enviandoCorreo ? <CircularProgress size={16} sx={{ color: '#1a1a1a' }} /> : <SendIcon sx={{ fontSize: 18 }} />}
            onClick={handleEnviarCorreo}
            disabled={enviandoCorreo || descargandoPdf}
            sx={{
              bgcolor: '#D4E157', color: '#1a1a1a', textTransform: 'none',
              fontWeight: 600, borderRadius: '12px', px: 3, py: 1.2,
              fontSize: '13px', boxShadow: 'none',
              '&:hover': { bgcolor: '#C5D14B', boxShadow: 'none' },
              '&:disabled': { bgcolor: '#e0e0e0', color: '#999' }
            }}
          >
            {enviandoCorreo ? 'Enviando...' : 'Enviar cotización'}
          </Button>
          <Button
            variant="outlined"
            startIcon={descargandoPdf ? <CircularProgress size={16} sx={{ color: '#666' }} /> : <DownloadIcon sx={{ fontSize: 18 }} />}
            onClick={handleDescargarPdf}
            disabled={descargandoPdf || enviandoCorreo}
            sx={{
              color: '#555', borderColor: '#ddd', textTransform: 'none',
              fontWeight: 600, borderRadius: '12px', px: 3, py: 1.2,
              fontSize: '13px', bgcolor: '#fafafa',
              '&:hover': { borderColor: '#bbb', bgcolor: '#f5f5f5' },
              '&:disabled': { borderColor: '#eee', color: '#bbb' }
            }}
          >
            {descargandoPdf ? 'Descargando...' : 'Descargar PDF'}
          </Button>
        </>
      )}

      {/* EN PROCESO */}
      {estadoInicial === 'EN PROCESO' && !estadoCambio && (
        <Button
          variant="outlined"
          startIcon={descargandoPdf ? <CircularProgress size={16} sx={{ color: '#666' }} /> : <DownloadIcon sx={{ fontSize: 18 }} />}
          onClick={handleDescargarPdf}
          disabled={descargandoPdf}
          sx={{
            color: '#555', borderColor: '#ddd', textTransform: 'none',
            fontWeight: 600, borderRadius: '12px', px: 3, py: 1.2,
            fontSize: '13px', bgcolor: '#fafafa',
            '&:hover': { borderColor: '#bbb', bgcolor: '#f5f5f5' },
            '&:disabled': { borderColor: '#eee', color: '#bbb' }
          }}
        >
          {descargandoPdf ? 'Descargando...' : 'Descargar cotización'}
        </Button>
      )}

      {/* COMPLETADO */}
      {estadoInicial === 'COMPLETADO' && !estadoCambio && (
        <>
          <Button
            variant="contained"
            startIcon={enviandoCorreo ? <CircularProgress size={16} sx={{ color: '#fff' }} /> : <SendIcon sx={{ fontSize: 18 }} />}
            onClick={handleEnviarBoleta}
            disabled={enviandoCorreo || descargandoPdf}
            sx={{
              bgcolor: '#4CAF50', color: '#fff', textTransform: 'none',
              fontWeight: 600, borderRadius: '12px', px: 3, py: 1.2,
              fontSize: '13px', boxShadow: 'none',
              '&:hover': { bgcolor: '#43A047', boxShadow: 'none' },
              '&:disabled': { bgcolor: '#e0e0e0', color: '#999' }
            }}
          >
            {enviandoCorreo ? 'Enviando...' : 'Enviar boleta'}
          </Button>
          <Button
            variant="outlined"
            startIcon={descargandoPdf ? <CircularProgress size={16} sx={{ color: '#4CAF50' }} /> : <DownloadIcon sx={{ fontSize: 18 }} />}
            onClick={handleDescargarBoleta}
            disabled={descargandoPdf || enviandoCorreo}
            sx={{
              color: '#4CAF50', borderColor: '#C8E6C9', textTransform: 'none',
              fontWeight: 600, borderRadius: '12px', px: 3, py: 1.2,
              fontSize: '13px', bgcolor: '#f8fdf8',
              '&:hover': { borderColor: '#A5D6A7', bgcolor: '#f1f8f1' },
              '&:disabled': { borderColor: '#eee', color: '#bbb' }
            }}
          >
            {descargandoPdf ? 'Descargando...' : 'Descargar boleta'}
          </Button>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon sx={{ fontSize: 16 }} />}
            onClick={handleDescargarPdf}
            sx={{
              color: '#999', borderColor: '#eee', textTransform: 'none',
              fontWeight: 500, borderRadius: '12px', px: 2.5, py: 1.2,
              fontSize: '12px', bgcolor: '#fafafa',
              '&:hover': { borderColor: '#ddd', bgcolor: '#f5f5f5' }
            }}
          >
            Cotización original
          </Button>
        </>
      )}

      {/* ACTUALIZAR ESTADO */}
      {estadoCambio && estadoCotizacion !== 'CANCELADO' && (
        <Button
          variant="contained"
          onClick={handleActualizarCotizacion}
          disabled={!puedeActualizar}
          sx={{
            bgcolor: '#1a1a1a', color: '#fff', textTransform: 'none',
            fontWeight: 600, borderRadius: '12px', px: 3, py: 1.2,
            fontSize: '13px', boxShadow: 'none',
            '&:hover': { bgcolor: '#333', boxShadow: 'none' },
            '&:disabled': { bgcolor: '#e0e0e0', color: '#999' }
          }}
        >
          Actualizar estado
        </Button>
      )}
    </>
  )}

</Stack>

      {/* Snackbar de feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ borderRadius: '12px' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

    </Box>
  );
};

export default NewQuote;