import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import {
    TextField,
    Button,
    Paper,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Box,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Head, router } from '@inertiajs/react';

const breadcrumbs = [
    { title: 'Egresados', href: '/egresados' },
    { title: 'Registrar', href: '/egresados/registrar' },
];

const darkTheme = createTheme({
    palette: { mode: 'dark' },
});

export default function RegistrarEgresado() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [programaAcademico, setProgramaAcademico] = useState('');
    const [anioGraduacion, setAnioGraduacion] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [puesto, setPuesto] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        direccion: '',
        programaAcademico: '',
        anioGraduacion: '',
        empresa: '',
        puesto: '',
    });

    // Se cambia el tipo de `successMessage` a `string | null`
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Se tipa correctamente el evento como `React.FormEvent<HTMLFormElement>`
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({
            nombre: '',
            apellido: '',
            email: '',
            telefono: '',
            direccion: '',
            programaAcademico: '',
            anioGraduacion: '',
            empresa: '',
            puesto: '',
        });
        setSuccessMessage(null);

        const formData = {
            nombre,
            apellido,
            email,
            telefono,
            direccion,
            programaAcademico,
            anioGraduacion,
            empresa,
            puesto,
        };

        // Simulación de petición exitosa.
        setTimeout(() => {
            setIsSubmitting(false);
            setSuccessMessage("Egresado registrado correctamente.");
            setNombre('');
            setApellido('');
            setEmail('');
            setTelefono('');
            setDireccion('');
            setProgramaAcademico('');
            setAnioGraduacion('');
            setEmpresa('');
            setPuesto('');
        }, 1000);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Registrar Egresado" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <ThemeProvider theme={darkTheme}>
                    <Paper elevation={3} className="p-4">
                        <Typography variant="h6" gutterBottom>
                            Registrar Egresado
                        </Typography>
                        {successMessage && (
                            <Box sx={{ color: 'success.main' }}>{successMessage}</Box>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Nombre"
                                        variant="outlined"
                                        fullWidth
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        error={!!errors?.nombre}
                                        helperText={errors?.nombre}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Apellido"
                                        variant="outlined"
                                        fullWidth
                                        value={apellido}
                                        onChange={(e) => setApellido(e.target.value)}
                                        error={!!errors?.apellido}
                                        helperText={errors?.apellido}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Email"
                                        variant="outlined"
                                        fullWidth
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        error={!!errors?.email}
                                        helperText={errors?.email}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Teléfono"
                                        variant="outlined"
                                        fullWidth
                                        value={telefono}
                                        onChange={(e) => setTelefono(e.target.value)}
                                        error={!!errors?.telefono}
                                        helperText={errors?.telefono}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Dirección"
                                        variant="outlined"
                                        fullWidth
                                        value={direccion}
                                        onChange={(e) => setDireccion(e.target.value)}
                                        error={!!errors?.direccion}
                                        helperText={errors?.direccion}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel id="programa-label">Programa Académico</InputLabel>
                                        <Select
                                            labelId="programa-label"
                                            id="programaAcademico"
                                            value={programaAcademico}
                                            onChange={(e) => setProgramaAcademico(e.target.value)}
                                            label="Programa Académico"
                                            error={!!errors?.programaAcademico}
                                        >
                                            <MenuItem value=""><em>Ninguno</em></MenuItem>
                                            <MenuItem value="Ingenieria Sistemas">Ingeniería de Sistemas</MenuItem>
                                            <MenuItem value="Administracion Empresas">Administración de Empresas</MenuItem>
                                            <MenuItem value="Medicina">Medicina</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Año de Graduación"
                                        variant="outlined"
                                        fullWidth
                                        value={anioGraduacion}
                                        onChange={(e) => setAnioGraduacion(e.target.value)}
                                        error={!!errors?.anioGraduacion}
                                        helperText={errors?.anioGraduacion}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Empresa"
                                        variant="outlined"
                                        fullWidth
                                        value={empresa}
                                        onChange={(e) => setEmpresa(e.target.value)}
                                        error={!!errors?.empresa}
                                        helperText={errors?.empresa}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Puesto"
                                        variant="outlined"
                                        fullWidth
                                        value={puesto}
                                        onChange={(e) => setPuesto(e.target.value)}
                                        error={!!errors?.puesto}
                                        helperText={errors?.puesto}
                                    />
                                </Grid>
                            </Grid>
                            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                                {isSubmitting ? 'Enviando...' : 'Registrar'}
                            </Button>
                        </form>
                    </Paper>
                </ThemeProvider>
            </div>
        </AppLayout>
    );
}
