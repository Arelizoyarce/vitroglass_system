// OrderDetails.jsx
import { DeleteOutlineOutlined } from '@mui/icons-material';
import { Box, Typography, Stack, TextField, Select, MenuItem, IconButton } from '@mui/material';


const GLASS_TYPES = [
  { value: 'templado', label: 'Templado' },
  { value: 'laminado', label: 'Laminado' },
  { value: 'crudo', label: 'Crudo' },
  { value: 'esmerilado', label: 'Esmerilado' },
  { value: 'reflectivo', label: 'Reflectivo' },
  { value: 'insulado', label: 'Insulado' },
  { value: 'curvo', label: 'Curvo' },
];

const PRICE_PER_CM2 = {
  templado: 0.08,
  laminado: 0.10,
  crudo: 0.04,
  esmerilado: 0.09,
  reflectivo: 0.12,
  insulado: 0.15,
  curvo: 0.18,
};

export const calcularPrecio = (tipo, alto, ancho, cantidad) => {
  const rate = PRICE_PER_CM2[tipo] || 0;
  const area = (parseFloat(alto) || 0) * (parseFloat(ancho) || 0);
  return +(rate * area * (parseInt(cantidad) || 1)).toFixed(2);
};

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    bgcolor: '#fff',
  },
};

const OrderItem = ({ item, onChange, onDelete, showDelete }) => {
  const handleChange = (field, value) => {
    const updated = { ...item, [field]: value };
    if (['tipo', 'alto', 'ancho', 'cantidad'].includes(field)) {
      updated.precio = calcularPrecio(updated.tipo, updated.alto, updated.ancho, updated.cantidad);
    }
    onChange(updated);
  };

  return (
    <Stack direction="row" spacing={2} alignItems="flex-end" sx={{ mb: 2.5 }}>
      <Box sx={{ flex: 2 }}>
        <Typography variant="caption" sx={{ color: '#999', display: 'block', mb: 0.5 }}>Item</Typography>
        <Select
          fullWidth
          displayEmpty
          value={item.tipo}
          onChange={(e) => handleChange('tipo', e.target.value)}
          sx={{ borderRadius: '12px', bgcolor: '#fff' }}
          renderValue={(val) =>
            val
              ? GLASS_TYPES.find((g) => g.value === val)?.label
              : <span style={{ color: '#bbb' }}>Selecciona tipo</span>
          }
        >
          {GLASS_TYPES.map((g) => (
            <MenuItem key={g.value} value={g.value}>{g.label}</MenuItem>
          ))}
        </Select>
      </Box>

      <Box sx={{ flex: 1 }}>
        <Typography variant="caption" sx={{ color: '#999', display: 'block', mb: 0.5 }}>Cantidad</Typography>
        <TextField fullWidth placeholder="01" value={item.cantidad}
          onChange={(e) => handleChange('cantidad', e.target.value)} sx={fieldSx} />
      </Box>

      <Box sx={{ flex: 1 }}>
        <Typography variant="caption" sx={{ color: '#999', display: 'block', mb: 0.5 }}>Alto (cm)</Typography>
        <TextField fullWidth placeholder="0" value={item.alto}
          onChange={(e) => handleChange('alto', e.target.value)} sx={fieldSx} />
      </Box>

      <Box sx={{ flex: 1 }}>
        <Typography variant="caption" sx={{ color: '#999', display: 'block', mb: 0.5 }}>Ancho (cm)</Typography>
        <TextField fullWidth placeholder="0" value={item.ancho}
          onChange={(e) => handleChange('ancho', e.target.value)} sx={fieldSx} />
      </Box>

      <Box sx={{ flex: 1 }}>
        <Typography variant="caption" sx={{ color: '#999', display: 'block', mb: 0.5 }}>Precio (S/)</Typography>
        <Box sx={{
          bgcolor: '#f0f0f0',
          borderRadius: '12px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          fontSize: '0.95rem',
        }}>
          {item.precio > 0 ? item.precio.toFixed(2) : '—'}
        </Box>
      </Box>

      <Box sx={{ pb: 0.5 }}>
        <IconButton
          onClick={onDelete}
          disabled={!showDelete}
          size="small"
          sx={{
            color: showDelete ? '#e53e3e' : 'transparent',
            bgcolor: showDelete ? '#fff5f5' : 'transparent',
            border: showDelete ? '1px solid #fed7d7' : '1px solid transparent',
            borderRadius: '10px',
            width: 40,
            height: 56,
            transition: 'all 0.15s',
            '&:hover': { bgcolor: '#fee2e2' },
          }}
        >
          <DeleteOutlineOutlined fontSize="small" />
        </IconButton>
      </Box>
    </Stack>
  );
};

const OrderDetails = ({ items, onChangeItem, onDeleteItem }) => (
  <Box>
    {items.map((item, index) => (
      <OrderItem
        key={item.id}
        item={item}
        onChange={(updated) => onChangeItem(index, updated)}
        onDelete={() => onDeleteItem(index)}
        showDelete={items.length > 1}
      />
    ))}
  </Box>
);

export default OrderDetails;