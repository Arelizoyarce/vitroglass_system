import { Box, Typography, Stack } from '@mui/material';
import UserMenu from 'src/components/UserMenu';
import ActionButtons from 'src/components/ActionButtons';
import OrdersTable from 'src/components/OrdersTable';

const Dashboard = () => {
  return (
    <Box sx={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header Superior */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
          Pedidos
        </Typography>
        <UserMenu />
      </Stack>

      {/* Contenido Blanco (Card de la tabla) */}
      <Box sx={{ 
        bgcolor: '#fff', 
        borderRadius: '24px', 
        p: 4, 
        boxShadow: '0px 4px 20px rgba(0,0,0,0.02)' 
      }}>
      <ActionButtons />
      <OrdersTable/>
      </Box>
    </Box>
  );
};

export default Dashboard;