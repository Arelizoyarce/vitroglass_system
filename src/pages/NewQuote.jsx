import React, { useState } from 'react';
import { Box, Typography, Stack, Grid, Button, TextField } from '@mui/material';
import UserMenu from 'src/components/UserMenu';
import QuoteInfo from 'src/components/QuoteInfo';
import OrderDetails from 'src/components/OrderDetails';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/GetApp';

const newItem = () => ({
  id: Date.now(),
  tipo: '',
  cantidad: '',
  alto: '',
  ancho: '',
  precio: 0,
});

const NewQuote = () => {
  const [items, setItems] = useState([newItem()]);

  const handleChangeItem = (index, updated) => {
    setItems((prev) => prev.map((item, i) => (i === index ? updated : item)));
  };

  const handleAddItem = () => {
    setItems((prev) => [...prev, newItem()]);
  };

  const handleDeleteItem = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.precio || 0), 0);

  return (
    <Box sx={{ width: '100%', maxWidth: '1200px', margin: '0 auto', px: { xs: 2, md: 4 }, py: 4 }}>

      <Stack direction="row"  alignItems="center" sx={{ mb: 4, justifyContent: 'space-between' }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>Cotización</Typography>
        <UserMenu />
      </Stack>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <Box sx={{ bgcolor: '#fff', p: 4, borderRadius: '16px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', height: '100%' }}>
            <QuoteInfo />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ bgcolor: '#fff', p: 4, borderRadius: '16px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', height: '100%', width: '100%', textAlign: 'left' }}>
            <Typography sx={{ fontWeight: 700, fontSize: '1rem', mb: 3, textAlign: 'center' }}>
              Información de entrega
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mb: 1 }}>
                Fecha de registro
              </Typography>
              <TextField
                fullWidth
                value="14 Abr 2022"
                InputProps={{ readOnly: true }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px', bgcolor: '#fafafa' } }}
              />
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mb: 1 }}>
                Fecha de entrega
              </Typography>
              <TextField
                fullWidth
                value="20 Abr 2022"
                InputProps={{ readOnly: true }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px', bgcolor: '#fafafa' } }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ bgcolor: '#fff', borderRadius: '16px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', p: 4, mb: 3 }}>
        <Typography sx={{ fontWeight: 700, fontSize: '1rem', textAlign: 'center', mb: 3 }}>
          Detalle de pedido
        </Typography>

        <OrderDetails
          items={items}
          onChangeItem={handleChangeItem}
          onDeleteItem={handleDeleteItem}
        />

        <Stack
          direction="row"
          sx={{ mt: 3, pt: 2.5, borderTop: '1px solid #f0f0f0', justifyContent: 'space-between' }}
        >
          <Button
            startIcon={<AddIcon />}
            onClick={handleAddItem}
            sx={{
              color: '#2E7D32',
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.95rem',
              px: 1,
              '&:hover': { bgcolor: 'rgba(46,125,50,0.06)' },
            }}
          >
            Agregar Item
          </Button>

          <Box sx={{ mr: 8}}>
            <Stack direction="row" justifyContent="space-between" spacing={8}>
              <Typography sx={{ color: '#888', fontSize: '0.9rem' }}>Total</Typography>
              <Typography sx={{ fontWeight: 700 }}>S/ {subtotal.toFixed(2)}</Typography>
            </Stack>
          </Box>
        </Stack>
      </Box>

      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
        <Button
          variant="contained"
          sx={{
            bgcolor: '#38A169',
            px: 6,
            py: 1.5,
            borderRadius: '10px',
            textTransform: 'none',
            fontWeight: 600,
            '&:hover': { bgcolor: '#2F855A' },
          }}
        >
          Cotizar
        </Button>
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          sx={{
            color: '#555',
            borderColor: '#ddd',
            px: 4,
            py: 1.5,
            borderRadius: '10px',
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': { borderColor: '#bbb', bgcolor: '#fafafa' },
          }}
        >
          Descargar Detalle
        </Button>
      </Stack>
    </Box>
  );
};

export default NewQuote;