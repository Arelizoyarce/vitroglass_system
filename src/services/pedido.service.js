import axios from "axios";

const API_URL = "http://localhost:8080/api/pedidos";

export const getPedidos = async () => {
  const res = await axios.get(`${API_URL}/dashboard`);
  return res.data;
};

export const getPedidoById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const getPedidosByEstado = async (estado) => {
  const res = await axios.get(`${API_URL}/estado/${estado}`);
  return res.data;
};