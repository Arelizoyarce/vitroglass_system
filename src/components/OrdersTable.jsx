import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Chip, 
  IconButton 
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const statusColors = {
  'En proceso': { bg: '#FFF3E0', color: '#FF9800' },
  'Completado': { bg: '#E8F5E9', color: '#4CAF50' },
  'Cancelado': { bg: '#FFEBEE', color: '#F44336' },
  'Cotizado': { bg: '#E0F7FA', color: '#00BCD4' },
};

const rows = [
  { id: 'MGL524874', cliente: 'Areliz Oyarce', entrega: '14 Abr 2022', hora: '8:00 PM', items: 20, total: '420.84', estado: 'En proceso' },
  { id: 'MGL524250', cliente: 'Galería San Miguel', entrega: '12 Abr 2022', hora: '8:00 PM', items: 1, total: '244.80', estado: 'Completado' },
];

const OrdersTable = () => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: '#999', fontWeight: 500 }}>Cliente</TableCell>
            <TableCell sx={{ color: '#999', fontWeight: 500 }}>Entrega</TableCell>
            <TableCell sx={{ color: '#999', fontWeight: 500 }}>Items</TableCell>
            <TableCell sx={{ color: '#999', fontWeight: 500 }}>Total</TableCell>
            <TableCell sx={{ color: '#999', fontWeight: 500 }}>Estado</TableCell>
            <TableCell sx={{ color: '#999', fontWeight: 500 }}>Acción</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            // Protección: Si el estado no existe en statusColors, usamos un gris por defecto
            const style = statusColors[row.estado] || { bg: '#eee', color: '#666' };

            return (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <div style={{ fontWeight: 600 }}>{row.cliente}</div>
                  <div style={{ color: '#999', fontSize: '12px' }}>N.o: {row.id}</div>
                </TableCell>
                <TableCell>
                  <div style={{ fontWeight: 600 }}>{row.entrega}</div>
                  <div style={{ color: '#999', fontSize: '12px' }}>at {row.hora}</div>
                </TableCell>
                <TableCell sx={{ color: '#5C6BC0', fontWeight: 600 }}>
                  {row.items < 10 ? `0${row.items}` : row.items}
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }}>{row.total}</TableCell>
                <TableCell>
                  <Chip 
                    label={row.estado} 
                    sx={{ 
                      bgcolor: style.bg, 
                      color: style.color,
                      fontWeight: 600,
                      borderRadius: '8px'
                    }} 
                  />
                </TableCell>
                <TableCell>
                  <IconButton size="small">
                    <MoreHorizIcon sx={{ color: '#D4E157' }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrdersTable;