import { DeleteOutlineOutlined, Add } from '@mui/icons-material';
import {
  Box,
  Typography,
  Stack,
  TextField,
  Select,
  MenuItem,
  IconButton,
  Button
} from '@mui/material';

/* =========================
   CALCULO SUBTOTAL
========================= */

const cmToM = (v) => (Number(v) || 0) / 100;
const calcularSubtotal = (precio, ancho, alto, cantidad) => {
  const areaM2 =
    cmToM(ancho) * cmToM(alto);

  return areaM2 * (Number(precio) || 0) * (Number(cantidad) || 0);
};

/* =========================
   ITEM
========================= */
const OrderItem = ({
  item,
  tiposVidrio,
  onChange,
  onDelete,
  disabled
}) => {

  const handleChange = (field, value) => {
    if (disabled) return;

    let updated = { ...item, [field]: value };

    // si cambia tipo vidrio
    if (field === 'idTipoVidrio') {
      const vidrio = tiposVidrio.find(
        (g) => g.idTipoVidrio === Number(value)
      );

      updated.precioUnitario = vidrio?.precioMetroCuadrado || 0;
    }

updated.subtotal = calcularSubtotal(
  updated.precioUnitario,
  updated.ancho,
  updated.alto,
  updated.cantidad
);
    onChange(updated);
  };

  return (
    <Stack direction="row" spacing={2} sx={{ mb: 2 }}>

      {/* TIPO */}
      <Box sx={{ flex: 2 }}>
        <Typography variant="caption">Tipo</Typography>

        <Select
          fullWidth
          value={item.idTipoVidrio || ''}
          disabled={disabled}
          onChange={(e) =>
            handleChange('idTipoVidrio', e.target.value)
          }
        >
          {tiposVidrio.map((g) => (
            <MenuItem key={g.idTipoVidrio} value={g.idTipoVidrio}>
              {g.nombre}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* CANTIDAD */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="caption">Cantidad</Typography>

        <TextField
          fullWidth
          value={item.cantidad}
          disabled={disabled}
          onChange={(e) =>
            handleChange('cantidad', e.target.value)
          }
        />
      </Box>

      {/* ALTO */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="caption">Alto</Typography>

        <TextField
          fullWidth
          value={item.alto}
          disabled={disabled}
          onChange={(e) =>
            handleChange('alto', e.target.value)
          }
        />
      </Box>

      {/* ANCHO */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="caption">Ancho</Typography>

        <TextField
          fullWidth
          value={item.ancho}
          disabled={disabled}
          onChange={(e) =>
            handleChange('ancho', e.target.value)
          }
        />
      </Box>

      {/* SUBTOTAL */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="caption">Subtotal</Typography>

        <Box
          sx={{
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#f5f5f5',
            borderRadius: 2,
            fontWeight: 600
          }}
        >
          S/ {(item.subtotal || 0).toFixed(2)}
        </Box>
      </Box>

      {/* DELETE */}
      <IconButton
        disabled={disabled}
        onClick={onDelete}
        sx={{ height: 56 }}
      >
        <DeleteOutlineOutlined />
      </IconButton>

    </Stack>
  );
};

/* =========================
   ORDER DETAILS
========================= */
const OrderDetails = ({
  items = [],
  tiposVidrio = [],
  onChangeItem,
  onDeleteItem,
  onAddItem,
  disabled = false
}) => {

  const total = items.reduce(
    (acc, i) => acc + (i.subtotal || 0),
    0
  );

  return (
    <Box>

      {/* ITEMS */}
      {items.map((item, index) => (
        <OrderItem
          key={item.id}
          item={item}
          tiposVidrio={tiposVidrio}
          disabled={disabled}
          onChange={(updated) =>
            onChangeItem(index, updated)
          }
          onDelete={() => onDeleteItem(index)}
        />
      ))}

{/* ADD ITEM */}
{!disabled && (
  <Box
    sx={{
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-start',
      mt: 2,
    }}
  >
    <Button
      startIcon={<Add />}
      onClick={onAddItem}
      sx={{
        textTransform: 'capitalize',
        background: 'transparent',
        boxShadow: 'none',
        p: 0,
        minWidth: 'auto',
        color: '#2e7d32',
        '& .MuiButton-startIcon': {
          color: '#2e7d32',
        },
        '&:hover': {
          background: 'transparent',
          textDecoration: 'underline',
        },
      }}
    >
      Agregar item
    </Button>
  </Box>
)}

      {/* TOTAL */}
      <Box
        sx={{
          mt: 3,
          display: 'flex',
          justifyContent: 'flex-end',
          fontWeight: 700,
          fontSize: 18
        }}
      >
        Subtotal: {total.toFixed(2)}
      </Box>
            <Box
        sx={{
          mt: 3,
          display: 'flex',
          justifyContent: 'flex-end',
          fontWeight: 700,
          fontSize: 18
        }}
      >
        
Total +IGV: S/ {(total + (total * 0.18)).toFixed(2)}
      </Box>

    </Box>
  );
};

export default OrderDetails;