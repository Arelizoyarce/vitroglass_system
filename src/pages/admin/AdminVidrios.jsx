import { useEffect, useState } from "react";
import {
    Box, Typography, Button, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Chip, IconButton,
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Stack, FormControl, InputLabel, Select, MenuItem
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";
import { getVidrios, crearVidrio, actualizarVidrio, desactivarVidrio } from "../../services/vidrio.service";

const emptyForm = {
    nombre: "", descripcion: "", grosorMm: "", precioMetroCuadrado: "", estado: "ACTIVO"
};

const AdminVidrios = () => {
    const [vidrios, setVidrios] = useState([]);
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);

    useEffect(() => { loadData(); }, []);

    const loadData = async () => {
        try {
            const data = await getVidrios();
            setVidrios(data);
        } catch (e) {
            console.error(e);
        }
    };

    const handleOpen = (vidrio = null) => {
        if (vidrio) {
            setForm({
                nombre: vidrio.nombre,
                descripcion: vidrio.descripcion || "",
                grosorMm: vidrio.grosorMm,
                precioMetroCuadrado: vidrio.precioMetroCuadrado,
                estado: vidrio.estado
            });
            setEditId(vidrio.idTipoVidrio);
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
            const payload = {
                ...form,
                grosorMm: parseFloat(form.grosorMm),
                precioMetroCuadrado: parseFloat(form.precioMetroCuadrado)
            };
            if (editId) {
                await actualizarVidrio(editId, payload);
            } else {
                await crearVidrio(payload);
            }
            handleClose();
            loadData();
        } catch (e) {
            console.error(e);
        }
    };

    const handleDesactivar = async (id) => {
        if (window.confirm("¿Desactivar este tipo de vidrio?")) {
            await desactivarVidrio(id);
            loadData();
        }
    };

    return (
        <Box sx={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4, justifyContent: 'space-between' }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: "#1a1a1a" }}>
                    Catálogo de Vidrios
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
                    Nuevo Vidrio
                </Button>
            </Stack>

            <Box sx={{ bgcolor: "#fff", borderRadius: "24px", p: 4, boxShadow: "0px 4px 20px rgba(0,0,0,0.02)" }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: "#999", fontWeight: 500 }}>Nombre</TableCell>
                                <TableCell sx={{ color: "#999", fontWeight: 500 }}>Descripción</TableCell>
                                <TableCell sx={{ color: "#999", fontWeight: 500 }}>Grosor (mm)</TableCell>
                                <TableCell sx={{ color: "#999", fontWeight: 500 }}>Precio m²</TableCell>
                                <TableCell sx={{ color: "#999", fontWeight: 500 }}>Estado</TableCell>
                                <TableCell sx={{ color: "#999", fontWeight: 500 }}>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {vidrios.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center" sx={{ py: 6, color: "#999" }}>
                                        No hay vidrios registrados
                                    </TableCell>
                                </TableRow>
                            ) : (
                                vidrios.map((v) => (
                                    <TableRow key={v.idTipoVidrio}>
                                        <TableCell>
                                            <div style={{ fontWeight: 600 }}>{v.nombre}</div>
                                        </TableCell>
                                        <TableCell sx={{ color: "#666", fontSize: "13px" }}>
                                            {v.descripcion || "-"}
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 600, color: "#5C6BC0" }}>
                                            {v.grosorMm} mm
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 700 }}>
                                            S/ {Number(v.precioMetroCuadrado).toFixed(2)}
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={v.estado}
                                                sx={{
                                                    bgcolor: v.estado === "ACTIVO" ? "#E8F5E9" : "#FFEBEE",
                                                    color: v.estado === "ACTIVO" ? "#388E3C" : "#F44336",
                                                    fontWeight: 600, borderRadius: "8px", fontSize: "11px"
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <IconButton size="small" onClick={() => handleOpen(v)}
                                                sx={{ color: "#7E57C2", mr: 1 }}>
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton size="small" onClick={() => handleDesactivar(v.idTipoVidrio)}
                                                sx={{ color: "#F44336" }}>
                                                <BlockIcon fontSize="small" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            {/* Modal */}
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth
                PaperProps={{ sx: { borderRadius: "16px", p: 1 } }}>
                <DialogTitle sx={{ fontWeight: 700 }}>
                    {editId ? "Editar Vidrio" : "Nuevo Vidrio"}
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <TextField fullWidth label="Nombre" name="nombre"
                            value={form.nombre} onChange={handleChange} size="small" />
                        <TextField fullWidth label="Descripción" name="descripcion"
                            value={form.descripcion} onChange={handleChange} size="small" multiline rows={2} />
                        <Stack direction="row" spacing={2}>
                            <TextField fullWidth label="Grosor (mm)" name="grosorMm"
                                type="number" value={form.grosorMm} onChange={handleChange} size="small" />
                            <TextField fullWidth label="Precio por m²" name="precioMetroCuadrado"
                                type="number" value={form.precioMetroCuadrado} onChange={handleChange} size="small" />
                        </Stack>
                        <FormControl fullWidth size="small">
                            <InputLabel>Estado</InputLabel>
                            <Select name="estado" value={form.estado} label="Estado" onChange={handleChange}>
                                <MenuItem value="ACTIVO">Activo</MenuItem>
                                <MenuItem value="INACTIVO">Inactivo</MenuItem>
                            </Select>
                        </FormControl>
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
                        {editId ? "Guardar cambios" : "Crear vidrio"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AdminVidrios;