import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Menu,
  MenuItem
} from "@mui/material";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { useNavigate } from "react-router-dom";

import { getPedidos } from "../services/pedido.service";

const statusColors = {
  COTIZADO: {
    bg: "#E3F2FD",
    color: "#1976D2"
  },

  "EN PROCESO": {
    bg: "#FFF3E0",
    color: "#FF9800"
  },

  COMPLETADO: {
    bg: "#E8F5E9",
    color: "#4CAF50"
  },

  CANCELADO: {
    bg: "#FFEBEE",
    color: "#F44336"
  }
};

const OrdersTable = () => {

  const navigate = useNavigate();

  const [rows, setRows] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);

  const [selectedRow, setSelectedRow] =
    useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {

    try {

      const data = await getPedidos();

      const mapped = data.map((item) => {

        return {

          id: item.id,

          cliente:
            item.cliente
              ?.replace(' null', '')
              .trim() || '',

          fecha: item.fecha
            ? new Date(
                item.fecha
              ).toLocaleDateString()
            : "-",

          hora: item.fecha
            ? new Date(
                item.fecha
              ).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
              })
            : "-",

          items: item.items || 0,

          total: item.total || 0,

          estado:
            item.estado || "Sin estado"
        };
      });

      setRows(mapped);

    } catch (error) {

      console.error(
        "Error cargando dashboard:",
        error
      );
    }
  };

  const handleOpenMenu = (
    event,
    row
  ) => {

    setAnchorEl(event.currentTarget);

    setSelectedRow(row);
  };

  const handleCloseMenu = () => {

    setAnchorEl(null);

    setSelectedRow(null);
  };

  const handleVer = () => {

    navigate(
      `/nueva-cotizacion/${selectedRow.id}`
    );

    handleCloseMenu();
  };

  const handleEditar = () => {

    navigate(
      `/nueva-cotizacion/${selectedRow.id}`
    );

    handleCloseMenu();
  };

  return (

    <TableContainer>

      <Table>

        <TableHead>

          <TableRow>

            <TableCell
              sx={{
                color: "#999",
                fontWeight: 500
              }}
            >
              Cliente
            </TableCell>

            <TableCell
              sx={{
                color: "#999",
                fontWeight: 500
              }}
            >
              Fecha
            </TableCell>

            <TableCell
              sx={{
                color: "#999",
                fontWeight: 500
              }}
            >
              Items
            </TableCell>

            <TableCell
              sx={{
                color: "#999",
                fontWeight: 500
              }}
            >
              Total
            </TableCell>

            <TableCell
              sx={{
                color: "#999",
                fontWeight: 500
              }}
            >
              Estado
            </TableCell>

            <TableCell
              sx={{
                color: "#999",
                fontWeight: 500
              }}
            >
              Acción
            </TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {rows.map((row) => {

            const style =
              statusColors[row.estado] || {
                bg: "#eee",
                color: "#666"
              };

            return (

              <TableRow key={row.id}>

                <TableCell>

                  <div
                    style={{
                      fontWeight: 600
                    }}
                  >
                    {row.cliente}
                  </div>

                  <div
                    style={{
                      color: "#999",
                      fontSize: "12px"
                    }}
                  >
                    N.o: {row.id}
                  </div>

                </TableCell>

                <TableCell>

                  <div
                    style={{
                      fontWeight: 600
                    }}
                  >
                    {row.fecha}
                  </div>

                  <div
                    style={{
                      color: "#999",
                      fontSize: "12px"
                    }}
                  >
                    {row.hora}
                  </div>

                </TableCell>

                <TableCell
                  sx={{
                    color: "#5C6BC0",
                    fontWeight: 600
                  }}
                >
                  {row.items < 10
                    ? `0${row.items}`
                    : row.items}
                </TableCell>

                <TableCell
                  sx={{
                    fontWeight: 700
                  }}
                >
                  S/ {Number(row.total).toFixed(2)}
                </TableCell>

                <TableCell>

                  <Chip
                    label={row.estado}
                    sx={{
                      bgcolor: style.bg,
                      color: style.color,
                      fontWeight: 600,
                      borderRadius: "8px"
                    }}
                  />

                </TableCell>

                <TableCell>

                  <IconButton
                    size="small"
                    onClick={(event) =>
                      handleOpenMenu(
                        event,
                        row
                      )
                    }
                  >

                    <MoreHorizIcon
                      sx={{
                        color: "#D4E157"
                      }}
                    />

                  </IconButton>

                </TableCell>

              </TableRow>
            );
          })}

        </TableBody>

      </Table>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >

        <MenuItem onClick={handleVer}>
          Ver
        </MenuItem>

        <MenuItem onClick={handleEditar}>
          Editar
        </MenuItem>

      </Menu>

    </TableContainer>
  );
};

export default OrdersTable;