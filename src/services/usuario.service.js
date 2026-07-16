import axios from "axios";

const API_URL = "http://localhost:8080/api/usuarios";

export const getUsuarios = async () => {
    const res = await axios.get(API_URL);
    return res.data;
};

export const crearUsuario = async (usuario) => {
    const res = await axios.post(API_URL, usuario);
    return res.data;
};

export const actualizarUsuario = async (id, usuario) => {
    const res = await axios.put(`${API_URL}/${id}`, usuario);
    return res.data;
};

export const desactivarUsuario = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};