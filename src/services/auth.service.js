import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

export const login = async (correoElectronico, contrasena) => {
  const response = await axios.post(`${API_URL}/login`, {
    correoElectronico,
    contrasena,
  });

  // Guardar token separado para usarlo en todas las peticiones
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getToken = () => {
  return localStorage.getItem("token");
};