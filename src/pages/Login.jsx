import { Box, Grid, TextField, Button, Typography } from "@mui/material"

function Login() {
  return (
    <Grid container sx={{ height: "100vh" }}>
      
      {/* LADO IZQUIERDO */}
      <Grid item xs={12} md={6} display="flex" alignItems="center" justifyContent="center">
        <Box width="70%">
          
          <Typography variant="h5" fontWeight="bold" mb={1}>
            Bienvenido
          </Typography>
          <Typography variant="body2" color="gray" mb={3}>
            Por favor ingresa tus datos
          </Typography>

          <Box display="flex" flexDirection="column" gap={2}>
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
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#B7E02D",
                color: "#000",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#a5cc28",
                },
                borderRadius: "8px",
                mt: 1
              }}
            >
              Ingresar
            </Button>
          </Box>
        </Box>
      </Grid>

      {/* LADO DERECHO (IMAGEN) */}
      <Grid item xs={false} md={6}>
        <Box
          component="img"
          src="https://images.unsplash.com/photo-1581090700227-4c4b6d6b7d42"
          alt="vidrieria"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Grid>
    </Grid>
  )
}

export default Login