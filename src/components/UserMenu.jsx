import { Box, Typography, Avatar } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const UserMenu = () => {
    const { user } = useContext(AuthContext);

    const initials = user
        ? `${user.nombres?.charAt(0) ?? ''}${user.apellidos?.charAt(0) ?? ''}`
        : '';

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            backgroundColor: '#f8f9fa',
            padding: '8px 14px',
            borderRadius: '50px',
            cursor: 'pointer'
        }}>
            <Avatar sx={{
                width: 30, height: 30,
                backgroundColor: '#D4E157',
                color: '#1a1a1a',
                fontSize: '12px',
                fontWeight: 700
            }}>
                {initials}
            </Avatar>
            <Box>
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#1a1a1a', lineHeight: 1.2 }}>
                    {user?.nombres} {user?.apellidos}
                </Typography>
                <Typography sx={{ fontSize: '11px', color: '#9ea3ac', lineHeight: 1.2 }}>
                    {user?.rol === 'ADMIN' ? 'Administrador' : 'Vendedor'}
                </Typography>
            </Box>
            <KeyboardArrowDownIcon sx={{ fontSize: 16, color: '#9ea3ac' }} />
        </Box>
    );
};

export default UserMenu;