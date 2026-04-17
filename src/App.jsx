import { Routes, Route, Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard.jsx";
import NewQuote from "./pages/NewQuote.jsx";


const MainLayout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      
      
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          backgroundColor: '#f9f9f9', 
          minHeight: '100vh' 
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route element={<MainLayout />}>
        <Route path="/pedidos" element={<Dashboard />} />
        <Route path="/nueva-cotizacion" element={<NewQuote />} />
        <Route path="/detalle-cotizacion" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;