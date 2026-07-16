import React, { useState, useContext } from 'react';
import {
  Drawer, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, Box, Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  MenuBook as PedidosIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon,
  People as UsersIcon,
  Window as VidriosIcon,
  ListAlt as AllOrdersIcon
} from '@mui/icons-material';
import { AuthContext } from '../context/AuthContext';

const drawerWidth = 260;

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('Pedidos');
  const navigate = useNavigate();
  const { logoutUser, user } = useContext(AuthContext);

  const vendedorMenu = [
    { text: 'Pedidos', icon: <PedidosIcon />, path: '/pedidos' },
  ];

  const adminMenu = [
    { text: 'Pedidos', icon: <AllOrdersIcon />, path: '/admin/pedidos' },
    { text: 'Usuarios', icon: <UsersIcon />, path: '/admin/usuarios' },
    { text: 'Vidrios', icon: <VidriosIcon />, path: '/admin/vidrios' },
  ];

  const menuItems = user?.rol === 'ADMIN' ? adminMenu : vendedorMenu;

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  const handleNavigate = (item) => {
    setActiveItem(item.text);
    navigate(item.path);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: '1px solid #e0e0e0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '20px',
        },
      }}
    >
      <Box>


  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4, px: 1 }}>
    <Box
      sx={{
        width: 38, height: 38,
        background: 'linear-gradient(135deg, #1a1a1a 0%, #3a3a3a 100%)',
        borderRadius: '10px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        flexShrink: 0
      }}
    >
      <Typography sx={{
        color: '#D4E157',
        fontWeight: 800,
        fontSize: '18px',
        fontFamily: 'cursive',
        lineHeight: 1
      }}>
        V
      </Typography>
    </Box>
    <Box>
      <Typography sx={{
        fontWeight: 700,
        fontSize: '15px',
        color: '#1a1a1a',
        lineHeight: 1.1
      }}>
        VitraGlass
      </Typography>
      <Typography sx={{
        fontSize: '10px',
        color: '#9ea3ac',
        letterSpacing: '0.5px',
        textTransform: 'uppercase'
      }}>
        Sistema de gestión
      </Typography>
    </Box>
  </Box>

        <Box
  sx={{
    display: 'inline-flex',
    alignItems: 'center',
    gap: 0.8,
    px: 1.5,
    py: 0.6,
    borderRadius: '20px',
    mb: 2,
    backgroundColor: user?.rol === 'ADMIN' ? '#EDE7F6' : '#E8F5E9',
    border: `1px solid ${user?.rol === 'ADMIN' ? '#B39DDB' : '#A5D6A7'}`,
  }}
>
  <Box
    sx={{
      width: 7,
      height: 7,
      borderRadius: '50%',
      backgroundColor: user?.rol === 'ADMIN' ? '#7E57C2' : '#66BB6A',
    }}
  />
  <Typography
    sx={{
      fontSize: '11px',
      fontWeight: 600,
      color: user?.rol === 'ADMIN' ? '#7E57C2' : '#388E3C',
      letterSpacing: '0.3px',
    }}
  >
    {user?.rol === 'ADMIN' ? 'Administrador' : 'Vendedor'}
  </Typography>
</Box>

        <List>
          {menuItems.map((item) => {
            const isActive = activeItem === item.text;
            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  onClick={() => handleNavigate(item)}
                  sx={{
                    borderRadius: '12px',
                    backgroundColor: isActive ? '#D4E157' : 'transparent',
                    color: isActive ? '#000' : '#9ea3ac',
                    py: 1.5
                  }}
                >
                  <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Box>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                color: '#9ea3ac',
                borderRadius: '12px',
                '&:hover': { backgroundColor: '#f5f5f5' }
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;