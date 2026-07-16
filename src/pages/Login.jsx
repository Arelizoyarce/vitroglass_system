import { Box, Grid, TextField, Button, Typography } from "@mui/material";
import loginImg from "../assets/background_login.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import { login } from "../services/auth.service";

function Login() {
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

const handleLogin = async () => {
    try {
        const data = await login(correo, password);
        loginUser(data);

        if (data.rol === "ADMIN") {
            navigate("/admin/pedidos");
        } else {
            navigate("/pedidos");
        }
    } catch (error) {
        alert("Credenciales incorrectas o error del servidor");
    }
};

  return (
    <Grid container alignItems="stretch">

      <Grid item sm={12} md={7} lg={7}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center", p: 4 }}>

        <Box sx={{ p: 4, width: { lg: '500px', sm: '600px', md: '400px', xs: '500px' } }}>

          <Typography variant="h5" fontWeight="bold" mb={1}>
            Bienvenido
          </Typography>

          <Typography variant="body2" color="gray" mb={4}>
            Por favor ingresa tus datos
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>

            <TextField
              label="Email"
              fullWidth
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />

            <TextField
              label="Contraseña"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              onClick={handleLogin}
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#C8EE44",
                color: "#000",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#A7C835" },
                borderRadius: "8px",
                py: 1.5,
                mt: 1
              }}
            >
              Ingresar
            </Button>

          </Box>
        </Box>
      </Grid>

      <Grid item sm={false} md={5}
        sx={{ display: { sm: 'none', md: 'block' }, width: { md: '50%', lg: '62vw' }, height: '100vh' }}>

        <Box
          component="img"
          src={loginImg}
          sx={{ width: "100%", height: "100vh", objectFit: "cover" }}
        />

      </Grid>
    </Grid>
  );
}

export default Login;