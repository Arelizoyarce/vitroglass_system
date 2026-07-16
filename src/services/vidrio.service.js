import axios from "axios";

const API_URL = "http://localhost:8080/api/tipos-vidrio";

export const getVidrios = async () => {
    const res = await axios.get(`${API_URL}/admin`);
    return res.data;
};

export const crearVidrio = async (vidrio) => {
    const res = await axios.post(`${API_URL}/admin`, vidrio);
    return res.data;
};

export const actualizarVidrio = async (id, vidrio) => {
    const res = await axios.put(`${API_URL}/admin/${id}`, vidrio);
    return res.data;
};

export const desactivarVidrio = async (id) => {
    await axios.delete(`${API_URL}/admin/${id}`);
};