import axios from "axios";

const API_URL = "http://localhost:8080/api";

/*
  ACTUALIZAR ESTADO + FECHA ENTREGA
*/
export const updateEstadoCotizacion = async (
  id,
  estado,
  fechaEntrega
) => {

  const res = await axios.put(
    `${API_URL}/cotizaciones/${id}`,
    {
      estado,
      fechaEntrega
    }
  );

  return res.data;
};

export const getTiposVidrio = async () => {

  const res = await axios.get(
    `${API_URL}/tipos-vidrio`
  );

  return res.data;
};

export const createCotizacion = async (
  payload
) => {

  const res = await axios.post(
    `${API_URL}/cotizaciones`,
    payload
  );

  return res.data;
};

export const getCotizacionById = async (
  id
) => {

  const res = await axios.get(
    `${API_URL}/cotizaciones/${id}`
  );

  return res.data;
};