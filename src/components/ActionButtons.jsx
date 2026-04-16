import { TextField, Button, Stack, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';

const ActionButtons = () => (
  <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
    <TextField
      placeholder="Buscar Pedido"
      size="small"
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: '#999' }} />
          </InputAdornment>
        ),
      }}
      sx={{ 
        width: 300, 
        '& .MuiOutlinedInput-root': { borderRadius: '12px', bgcolor: '#f5f5f5', border: 'none' } 
      }}
    />
    
    <Stack direction="row" spacing={2}>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ 
          bgcolor: '#D4E157', 
          color: '#000', 
          textTransform: 'none', 
          fontWeight: 600,
          borderRadius: '12px',
          '&:hover': { bgcolor: '#C5D14B' }
        }}
      >
        Create Cotización
      </Button>
      <Button
        variant="outlined"
        startIcon={<FilterListIcon />}
        sx={{ 
          color: '#333', 
          borderColor: '#e0e0e0', 
          textTransform: 'none', 
          borderRadius: '12px' 
        }}
      >
        Filtros
      </Button>
    </Stack>
  </Stack>
);

export default ActionButtons;