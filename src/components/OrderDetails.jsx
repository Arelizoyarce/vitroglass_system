import { Box, Typography, Stack, TextField, Select, MenuItem, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const OrderDetails = () => (
  <Box sx={{ mt: 4 }}>
    <Typography sx={{ fontWeight: 600, mb: 2 }}>Detalle de pedido</Typography>
    <Stack direction="row" spacing={2} sx={{ mb: 2, alignItems: 'center' }}>
      <Box sx={{ flex: 2 }}>
        <Typography variant="caption" sx={{ color: '#999' }}>Item</Typography>
        <Select fullWidth value="Templado" sx={{ borderRadius: '12px', mt: 0.5 }}>
          <MenuItem value="Templado">Templado</MenuItem>
        </Select>
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="caption" sx={{ color: '#999' }}>Cantidad</Typography>
        <TextField fullWidth placeholder="01" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="caption" sx={{ color: '#999' }}>Alto (cm)</Typography>
        <TextField fullWidth placeholder="24" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="caption" sx={{ color: '#999' }}>Ancho (cm)</Typography>
        <TextField fullWidth placeholder="24" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="caption" sx={{ color: '#999' }}>Precio (S/)</Typography>
        <Box sx={{ bgcolor: '#eee', p: 1.5, borderRadius: '12px', textAlign: 'center', fontWeight: 600 }}>50</Box>
      </Box>
    </Stack>
    
    <Button startIcon={<AddIcon />} sx={{ color: '#2E7D32', textTransform: 'none', fontWeight: 600 }}>
      Agregar Item
    </Button>
  </Box>
);

export default OrderDetails;