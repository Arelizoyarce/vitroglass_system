import axios from "axios";

const API_URL = "http://localhost:8080/api/clientes";

export const buscarClientesPorNombre = async (nombre) => {

  const res = await axios.get(
    `${API_URL}/buscar`,
    {
      params: { nombre }
    }
  );

  return res.data;
};

export const crearCliente = async (cliente) => {

  const res = await axios.post(
    API_URL,
    cliente
  );

  return res.data;
};