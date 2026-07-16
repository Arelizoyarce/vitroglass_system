import { Box, Typography, Stack } from '@mui/material';
import UserMenu from 'src/components/UserMenu';
import ActionButtons from 'src/components/ActionButtons';
import OrdersTable from 'src/components/OrdersTable';

const Dashboard = ({ isAdmin = false }) => {
  return (
    <Box sx={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      <Stack direction="row" alignItems="center" sx={{ mb: 4, justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
            Pedidos
          </Typography>
        </Box>
        <UserMenu />
      </Stack>

      <Box sx={{
        bgcolor: '#fff',
        borderRadius: '24px',
        p: 4,
        boxShadow: '0px 4px 20px rgba(0,0,0,0.02)'
      }}>
        {!isAdmin && <ActionButtons />}
        <OrdersTable isAdmin={isAdmin} />
      </Box>
    </Box>
  );
};

export default Dashboard;