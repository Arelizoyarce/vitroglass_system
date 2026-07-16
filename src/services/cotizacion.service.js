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
    `${API_URL}/cotizaciones/${id}/estado`,
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

export const descargarPdf = async (id) => {
    const res = await axios.get(
        `${API_URL}/cotizaciones/${id}/pdf`,
        { responseType: 'blob' }
    );
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Cotizacion_${String(id).padStart(6, '0')}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
};

export const enviarPorCorreo = async (id) => {
    const res = await axios.post(
        `${API_URL}/cotizaciones/${id}/enviar-correo`
    );
    return res.data;
};

export const descargarBoleta = async (id) => {
    const res = await axios.get(
        `${API_URL}/cotizaciones/${id}/boleta-pdf`,
        { responseType: 'blob' }
    );
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Boleta_B001-${String(id).padStart(6, '0')}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
};

export const enviarBoletaPorCorreo = async (id) => {
    const res = await axios.post(
        `${API_URL}/cotizaciones/${id}/enviar-boleta`
    );
    return res.data;
};