import { useEffect, useState } from "react";
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
import { getPedidos } from "../services/pedido.service";

const statusColors = {
  'EN PROCESO': { bg: '#FFF3E0', color: '#FF9800' },
  'COMPLETADO': { bg: '#E8F5E9', color: '#4CAF50' },
  'CANCELADO': { bg: '#FFEBEE', color: '#F44336' },
  'COTIZADO': { bg: '#E0F7FA', color: '#00BCD4' },
};

const OrdersTable = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    loadPedidos();
  }, []);

  const loadPedidos = async () => {
    try {
      const data = await getPedidos();

      const mapped = data.map((p) => ({
        id: p.idPedido,
        cliente: `${p.cotizacion?.cliente?.nombres || ""} ${p.cotizacion?.cliente?.apellidos || ""}`,
        entrega: p.fechaEntrega ? new Date(p.fechaEntrega).toLocaleDateString() : "-",
        hora: p.fechaEntrega ? new Date(p.fechaEntrega).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "-",
        items: p.cotizacion?.detalleCotizaciones?.length || 0,
        total: p.total,
        estado: p.estadoPedido?.nombreEstado || "Sin estado"
      }));

      setRows(mapped);
    } catch (error) {
      console.error("Error cargando pedidos:", error);
    }
  };

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
            const style = statusColors[row.estado] || { bg: '#eee', color: '#666' };

            return (
              <TableRow key={row.id}>
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

                <TableCell sx={{ fontWeight: 700 }}>
                  S/ {row.total}
                </TableCell>

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