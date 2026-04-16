import { Box, Typography, Avatar } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const UserMenu = () => (
  <Box sx={{ 
    display: 'flex', 
    alignItems: 'center', 
    gap: 1, 
    backgroundColor: '#f8f9fa', 
    padding: '8px 16px', 
    borderRadius: '50px' 
  }}>
    <Typography sx={{ fontSize: '14px', fontWeight: 500, color: '#333' }}>
      Carlo Sanchez
    </Typography>
    <KeyboardArrowDownIcon sx={{ fontSize: 18, color: '#666' }} />
  </Box>
);

export default UserMenu;