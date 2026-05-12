import React, { useState, useContext } from 'react';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Box, 
  Typography 
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

import { 
  MenuBook as PedidosIcon, 
  Settings as SettingsIcon, 
  ExitToApp as LogoutIcon 
} from '@mui/icons-material';

import { AuthContext } from '../context/AuthContext';

const drawerWidth = 260;

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('Pedidos');
  const navigate = useNavigate();

  const { logoutUser } = useContext(AuthContext);

  const menuItems = [
    { text: 'Pedidos', icon: <PedidosIcon />, path: '/pedidos' },
    { text: 'Configuraciones', icon: <SettingsIcon />, path: '/configuraciones' },
  ];

  const handleLogout = () => {
    console.log("🚪 Cerrando sesión...");

    logoutUser();

    navigate("/");

    console.log("➡️ Redirigido a login");
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

        <Box 
          sx={{ 
            width: 40, 
            height: 40, 
            backgroundColor: '#1a1a1a', 
            borderRadius: '8px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            mb: 4,
            ml: 2
          }}
        >
          <Typography sx={{ color: 'white', fontWeight: 'bold', fontSize: '20px', fontFamily: 'cursive' }}>
            v
          </Typography>
        </Box>

        {/* MENU */}
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

      {/* LOGOUT */}
      <Box>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                color: '#9ea3ac',
                borderRadius: '12px',
                '&:hover': {
                  backgroundColor: '#f5f5f5'
                }
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