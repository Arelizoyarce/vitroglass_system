import { useEffect, useState } from "react";
import {
    Box, Typography, Button, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Chip, IconButton,
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, MenuItem, Select, FormControl, InputLabel, Stack
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";
import { getUsuarios, crearUsuario, actualizarUsuario, desactivarUsuario } from "../../services/usuario.service";

const estadoColors = {
    ACTIVO: { bg: "#E8F5E9", color: "#388E3C" },
    INACTIVO: { bg: "#FFEBEE", color: "#F44336" }
};

const emptyForm = {
    dni: "", nombres: "", apellidos: "", correoElectronico: "",
    contrasena: "", rol: "VENDEDOR", estado: "ACTIVO"
};

const AdminUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);

    useEffect(() => { loadData(); }, []);

    const loadData = async () => {
        try {
            const data = await getUsuarios();
            setUsuarios(data);
        } catch (e) {
            console.error(e);
        }
    };

    const handleOpen = (usuario = null) => {
        if (usuario) {
setForm({
    dni: usuario.dni || "",
    nombres: usuario.nombres,
    apellidos: usuario.apellidos,
    correoElectronico: usuario.correoElectronico,
    contrasena: "",
    rol: usuario.rol,
    estado: usuario.estado
});
            setEditId(usuario.idUsuario);
        } else {
            setForm(emptyForm);
            setEditId(null);
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setForm(emptyForm);
        setEditId(null);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            if (editId) {
                await actualizarUsuario(editId, form);
            } else {
                await crearUsuario(form);
            }
            handleClose();
            loadData();
        } catch (e) {
            console.error(e);
        }
    };

    const handleDesactivar = async (id) => {
        if (window.confirm("¿Desactivar este usuario?")) {
            await desactivarUsuario(id);
            loadData();
        }
    };

    return (
        <Box sx={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4, justifyContent: 'space-between' }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: "#1a1a1a" }}>
                    Gestión de Usuarios
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpen()}
                    sx={{
                        bgcolor: "#D4E157", color: "#000", textTransform: "none",
                        fontWeight: 600, borderRadius: "12px",
                        "&:hover": { bgcolor: "#C5D14B" }
                    }}
                >
                    Nuevo Usuario
                </Button>
            </Stack>

            <Box sx={{ bgcolor: "#fff", borderRadius: "24px", p: 4, boxShadow: "0px 4px 20px rgba(0,0,0,0.02)" }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: "#999", fontWeight: 500 }}>Nombre</TableCell>
                                <TableCell sx={{ color: "#999", fontWeight: 500 }}>DNI</TableCell>
                                <TableCell sx={{ color: "#999", fontWeight: 500 }}>Correo</TableCell>
                                <TableCell sx={{ color: "#999", fontWeight: 500 }}>Rol</TableCell>
                                <TableCell sx={{ color: "#999", fontWeight: 500 }}>Estado</TableCell>
                                <TableCell sx={{ color: "#999", fontWeight: 500 }}>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {usuarios.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} align="center" sx={{ py: 6, color: "#999" }}>
                                        No hay usuarios registrados
                                    </TableCell>
                                </TableRow>
                            ) : (
                                usuarios.map((u) => {
                                    const style = estadoColors[u.estado] || { bg: "#eee", color: "#666" };
                                    return (
                                        <TableRow key={u.idUsuario}>
                                            <TableCell>
                                                <div style={{ fontWeight: 600 }}>{u.nombres} {u.apellidos}</div>
                                            </TableCell>
                                            <TableCell sx={{ color: "#666" }}>{u.dni || "-"}</TableCell>
                                            <TableCell sx={{ color: "#666" }}>{u.correoElectronico}</TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={u.rol}
                                                    sx={{
                                                        bgcolor: u.rol === "ADMIN" ? "#EDE7F6" : "#E3F2FD",
                                                        color: u.rol === "ADMIN" ? "#7E57C2" : "#1976D2",
                                                        fontWeight: 600, borderRadius: "8px", fontSize: "11px"
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={u.estado}
                                                    sx={{
                                                        bgcolor: style.bg, color: style.color,
                                                        fontWeight: 600, borderRadius: "8px", fontSize: "11px"
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <IconButton size="small" onClick={() => handleOpen(u)}
                                                    sx={{ color: "#7E57C2", mr: 1 }}>
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton size="small" onClick={() => handleDesactivar(u.idUsuario)}
                                                    sx={{ color: "#F44336" }}>
                                                    <BlockIcon fontSize="small" />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            {/* Modal */}
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth
                PaperProps={{ sx: { borderRadius: "16px", p: 1 } }}>
                <DialogTitle sx={{ fontWeight: 700 }}>
                    {editId ? "Editar Usuario" : "Nuevo Usuario"}
                </DialogTitle>
                <DialogContent>
<Stack spacing={2} sx={{ mt: 1 }}>
    <TextField fullWidth label="DNI" name="dni"
        value={form.dni} onChange={handleChange} size="small"
        inputProps={{ maxLength: 8 }} />
    <Stack direction="row" spacing={2}>
        <TextField fullWidth label="Nombres" name="nombres"
            value={form.nombres} onChange={handleChange} size="small" />
        <TextField fullWidth label="Apellidos" name="apellidos"
            value={form.apellidos} onChange={handleChange} size="small" />
    </Stack>
    <TextField fullWidth label="Correo electrónico" name="correoElectronico"
        value={form.correoElectronico} onChange={handleChange} size="small" />
    <TextField fullWidth label={editId ? "Nueva contraseña (opcional)" : "Contraseña"}
        name="contrasena" type="password"
        value={form.contrasena} onChange={handleChange} size="small" />
    <Stack direction="row" spacing={2}>
        <FormControl fullWidth size="small">
            <InputLabel>Rol</InputLabel>
            <Select name="rol" value={form.rol} label="Rol" onChange={handleChange}>
                <MenuItem value="VENDEDOR">Vendedor</MenuItem>
                <MenuItem value="ADMIN">Administrador</MenuItem>
            </Select>
        </FormControl>
        <FormControl fullWidth size="small">
            <InputLabel>Estado</InputLabel>
            <Select name="estado" value={form.estado} label="Estado" onChange={handleChange}>
                <MenuItem value="ACTIVO">Activo</MenuItem>
                <MenuItem value="INACTIVO">Inactivo</MenuItem>
            </Select>
        </FormControl>
    </Stack>
</Stack>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={handleClose} sx={{ color: "#999", textTransform: "none" }}>
                        Cancelar
                    </Button>
                    <Button onClick={handleSubmit} variant="contained"
                        sx={{
                            bgcolor: "#D4E157", color: "#000", textTransform: "none",
                            fontWeight: 600, borderRadius: "10px",
                            "&:hover": { bgcolor: "#C5D14B" }
                        }}>
                        {editId ? "Guardar cambios" : "Crear usuario"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AdminUsuarios;