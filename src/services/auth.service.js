import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

export const login = async (correoElectronico, contrasena) => {
  const response = await axios.post(`${API_URL}/login`, {
    correoElectronico,
    contrasena,
  });

  return response.data;
};