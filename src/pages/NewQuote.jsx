import React from 'react';
import { Box, Typography, Stack, Grid, Button, TextField } from '@mui/material';
import UserMenu from 'src/components/UserMenu';
import QuoteInfo from 'src/components/QuoteInfo';
import OrderDetails from 'src/components/OrderDetails';
import DownloadIcon from '@mui/icons-material/GetApp';

const NewQuote = () => {
  return (
    <Box sx={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>Cotización</Typography>
        <UserMenu />
      </Stack>

      <Grid container spacing={4}>
        {/* Lado Izquierdo: Formulario Principal */}
        <Grid item xs={12} md={8}>
          <Box sx={{ bgcolor: '#fff', p: 4, borderRadius: '24px' }}>
            <QuoteInfo />
            <OrderDetails />
            
            {/* Totales */}
            <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <Stack direction="row" spacing={10} sx={{ mb: 1 }}>
                <Typography sx={{ color: '#666' }}>Subtotal</Typography>
                <Typography sx={{ fontWeight: 700 }}>S/ 50</Typography>
              </Stack>
              <Stack direction="row" spacing={10}>
                <Typography sx={{ color: '#666' }}>Total</Typography>
                <Typography sx={{ fontWeight: 700 }}>S/ 50</Typography>
              </Stack>
            </Box>
          </Box>
        </Grid>

        {/* Lado Derecho: Info de Entrega */}
        <Grid item xs={12} md={4}>
          <Box sx={{ bgcolor: '#fff', p: 3, borderRadius: '24px', border: '1px solid #f0f0f0' }}>
            <Typography sx={{ fontWeight: 700, mb: 3 }}>Información de entrega</Typography>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="caption" color="textSecondary">Fecha de registro</Typography>
              <TextField fullWidth type="text" value="14 Abr 2022" sx={{ mt: 1, '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
            </Box>

            <Box>
              <Typography variant="caption" color="textSecondary">Fecha de entrega</Typography>
              <TextField fullWidth type="text" value="20 Abr 2022" sx={{ mt: 1, '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Botones de Acción Inferiores */}
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 6 }}>
        <Button 
          variant="contained" 
          sx={{ 
            bgcolor: '#38A169', 
            px: 6, py: 1.5, 
            borderRadius: '12px', 
            textTransform: 'none',
            '&:hover': { bgcolor: '#2F855A' }
          }}
        >
          Cotizar
        </Button>
        <Button 
          variant="outlined" 
          startIcon={<DownloadIcon />}
          sx={{ 
            color: '#666', 
            borderColor: '#e0e0e0', 
            px: 4, 
            borderRadius: '12px', 
            textTransform: 'none' 
          }}
        >
          Descargar Detalle
        </Button>
      </Stack>
    </Box>
  );
};

export default NewQuote;