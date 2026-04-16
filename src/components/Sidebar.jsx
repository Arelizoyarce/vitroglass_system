import React, { useState } from 'react';
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
import { 
  MenuBook as PedidosIcon, 
  Settings as SettingsIcon, 
  ExitToApp as LogoutIcon 
} from '@mui/icons-material';

const drawerWidth = 260;

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('Pedidos');

  const menuItems = [
    { text: 'Pedidos', icon: <PedidosIcon /> },
    { text: 'Configuraciones', icon: <SettingsIcon /> },
  ];

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

        {/* Lista de Navegación */}
        <List sx={{ pt: 0 }}>
          {menuItems.map((item) => {
            const isActive = activeItem === item.text;
            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  onClick={() => setActiveItem(item.text)}
                  sx={{
                    borderRadius: '12px',
                    backgroundColor: isActive ? '#D4E157' : 'transparent', // Color Lima
                    '&:hover': {
                      backgroundColor: isActive ? '#C5D14B' : '#f5f5f5',
                    },
                    color: isActive ? '#000' : '#9ea3ac',
                    py: 1.5
                  }}
                >
                  <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                    primaryTypographyProps={{ fontWeight: isActive ? 600 : 500 }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Botón Logout al final */}
      <Box>
        <List>
          <ListItem disablePadding>
            <ListItemButton sx={{ color: '#9ea3ac', borderRadius: '12px' }}>
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