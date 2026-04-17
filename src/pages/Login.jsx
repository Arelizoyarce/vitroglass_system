import { Box, Grid, TextField, Button, Typography } from "@mui/material";
import loginImg from "../assets/background_login.png";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/pedidos");
  };
  return (
    <Grid 
      container 
      alignItems="stretch"
    >
      <Grid 
        item 
        sm={12} 
        md={7}
        lg={7}
        sx={{
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          p: 4
        }}
      >
        <Box sx={{ p: 4, width: { lg: '500px', sm: '600px', md: '400px', xs: '500px' },}}>
          <Box sx={{
             pb: 5, 
             textAlign: 'left'
          }}>
          <Typography variant="h5" fontWeight="bold" mb={1}>
            Bienvenido
          </Typography>

          <Typography variant="body2" color="gray" mb={4}>
            Por favor ingresa tus datos
          </Typography>
</Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField 
              label="Email" 
              placeholder="Ingresa tu correo" 
              fullWidth 
            />

            <TextField 
              label="Contraseña" 
              type="password" 
              fullWidth 
            />

            <Button
            onClick={handleLogin}
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#C8EE44",
                color: "#000",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "A7C835" },
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

      <Grid 
        item 
        sm={false} 
        md={5} 
        sx={{ 
          display: { sm: 'none', md: 'block' },
          width: { md: '50%', lg: '62vw', sm: '40%' },
          height: '100vh',
        }}
      >
        <Box 
        component={"img"}
        sx={{ 
          display: { sm: 'none', md: 'block' },
          width: '100%',
          height: '100vh',
          backgroundImage: `url(${loginImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>

        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;