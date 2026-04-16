import { Box, Typography, TextField, Stack } from '@mui/material';

const QuoteInfo = () => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '16px' }}>Información de cotización</Typography>
    <Typography variant="caption" color="textSecondary" sx={{ mb: 2, display: 'block' }}>
      Ingresa la información requerida
    </Typography>
    
    <Typography sx={{ fontWeight: 600, mt: 3, mb: 1 }}>Cliente</Typography>
    <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
      <TextField fullWidth label="Nombre" placeholder="Mahfuzul Islam" variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
      <TextField fullWidth label="Apellido" placeholder="Nabil" variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
    </Stack>
    <TextField label="Teléfono" placeholder="+123 456 7890" variant="outlined" sx={{ width: '50%', '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
  </Box>
);

export default QuoteInfo;