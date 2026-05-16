import { Routes, Route, Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard.jsx";
import NewQuote from "./pages/NewQuote.jsx";
import ProtectedRoute from "./components/ProtectedRoute";

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

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/pedidos" element={<Dashboard />} />
        <Route path="/nueva-cotizacion" element={<NewQuote />} />
        <Route
  path="/nueva-cotizacion/:idQuotation"
  element={<NewQuote />}
/>
      </Route>
    </Routes>
  );
}

export default App;