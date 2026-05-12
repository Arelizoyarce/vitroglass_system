import axios from "axios";

const API_URL = "http://localhost:8080/api/cotizaciones";

export const createCotizacion = async (payload) => {
  const res = await axios.post(API_URL, payload);
  return res.data;
};

export const updateEstadoCotizacion = async (id, estado) => {
  const res = await axios.put(`${API_URL}/${id}`, { estado });
  return res.data;
};