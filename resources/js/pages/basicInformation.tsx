import React, { useState, useEffect } from 'react';
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
    Alert,
    Snackbar,
    CircularProgress,
    Tooltip,
    Divider,
    Card,
    CardContent,
    Avatar,
    Fade,
} from '@mui/material';
import { createTheme, ThemeProvider, alpha } from '@mui/material/styles';
import { Head, useForm } from '@inertiajs/react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import SaveIcon from '@mui/icons-material/Save';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import InfoIcon from '@mui/icons-material/Info';

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Información Básica', href: '/basicInformation' },
];

const darkTheme = createTheme({
    palette: { 
        mode: 'dark',
        primary: {
            main: '#3f80ea',
        },
        secondary: {
            main: '#6f42c1',
        },
        background: {
            paper: '#1e1e2d',
            default: '#151521',
        },
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                outlined: {
                    borderRadius: 8,
                },
            },
        },
    },
});

// Definición de las interfaces para los tipos
interface UserData {
    first_name: string;
    last_name: string;
}

interface BasicInfo {
    id?: number;
    first_name: string;
    last_name: string;
    document_type: string;
    document_number: string;
    graduation_date: string | null;
    address: string;
    phone: string;
    city: string;
    department: string;
    country: string;
    additional_info: string;
}

interface Props {
    userData: UserData;
    basicInfo: BasicInfo | null;
    progress: number;
}

export default function BasicInformation({ userData, basicInfo, progress }: Props) {
    // Usar los datos proporcionados desde el servidor
    const initialFirstName = basicInfo?.first_name || userData?.first_name || '';
    const initialLastName = basicInfo?.last_name || userData?.last_name || '';

    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm<Partial<BasicInfo>>({
        first_name: initialFirstName,
        last_name: initialLastName,
        document_type: basicInfo?.document_type || '',
        document_number: basicInfo?.document_number || '',
        graduation_date: basicInfo?.graduation_date || null,
        address: basicInfo?.address || '',
        phone: basicInfo?.phone || '',
        city: basicInfo?.city || '',
        department: basicInfo?.department || '',
        country: basicInfo?.country || '',
        additional_info: basicInfo?.additional_info || '',
    });

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [formProgress, setFormProgress] = useState(progress || 0);
    const [isLoading, setIsLoading] = useState(false);
    const [activeSection, setActiveSection] = useState('personal');

    // Actualizamos el estado cuando cambian las props
    useEffect(() => {
        if (userData || basicInfo) {
            // Usamos los datos proporcionados por el controlador
            setData('first_name', initialFirstName);
            setData('last_name', initialLastName);
        }
        
        if (basicInfo) {
            setData(prevData => ({
                ...prevData,
                document_type: basicInfo.document_type || '',
                document_number: basicInfo.document_number || '',
                graduation_date: basicInfo.graduation_date || null,
                address: basicInfo.address || '',
                phone: basicInfo.phone || '',
                city: basicInfo.city || '',
                department: basicInfo.department || '',
                country: basicInfo.country || '',
                additional_info: basicInfo.additional_info || '',
            }));
        }
        
        setFormProgress(progress || 0);
    }, [userData, basicInfo, progress, initialFirstName, initialLastName]);

    // Muestra el snackbar cuando el formulario se envía exitosamente
    useEffect(() => {
        if (wasSuccessful) {
            setSuccessMessage("La información básica ha sido guardada correctamente");
            setOpenSnackbar(true);
            setIsLoading(false);
        }
    }, [wasSuccessful]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        post('/basicInformation', {
            onSuccess: () => {
                setSuccessMessage("La información básica ha sido guardada correctamente");
                setOpenSnackbar(true);
                setIsLoading(false);
            },
            onError: () => {
                setIsLoading(false);
            }
        });
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    // Función para determinar el color de la barra de progreso
    const getProgressColor = (value: number) => {
        if (value < 30) return '#f44336'; // Rojo
        if (value < 70) return '#ff9800'; // Naranja
        return '#4caf50'; // Verde
    };

    // Obtener las iniciales para el avatar
    const getInitials = () => {
        const firstName = data.first_name || '';
        const lastName = data.last_name || '';
        
        if (firstName && lastName) {
            return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
        } else if (firstName) {
            return firstName.charAt(0).toUpperCase();
        } else if (lastName) {
            return lastName.charAt(0).toUpperCase();
        }
        
        return 'U';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Información Básica" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <ThemeProvider theme={darkTheme}>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                        {/* Panel lateral */}
                        <Box sx={{ width: { xs: '100%', md: 280 } }}>
                            <Card 
                                sx={{ 
                                    mb: 3, 
                                    p: 2, 
                                    borderRadius: 3,
                                    background: 'linear-gradient(135deg, #1e1e2d 0%, #2d2d44 100%)',
                                }}
                            >
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 2 }}>
                                    <Avatar 
                                        sx={{ 
                                            width: 80, 
                                            height: 80, 
                                            mb: 2, 
                                            bgcolor: 'primary.main',
                                            fontSize: 28,
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {getInitials()}
                                    </Avatar>
                                    <Typography variant="h6" fontWeight="bold" align="center">
                                        {data.first_name} {data.last_name}
                                    </Typography>
                                    {data.document_type && data.document_number && (
                                        <Typography variant="body2" color="text.secondary" align="center">
                                            {data.document_type}: {data.document_number}
                                        </Typography>
                                    )}
                                </Box>
                                
                                {/* Barra de progreso mejorada */}
                                <Box sx={{ px: 2, mb: 2 }}>
                                    <Box sx={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'space-between',
                                        mb: 1
                                    }}>
                                        <Typography variant="body2" fontWeight="medium">
                                            Perfil Completado
                                        </Typography>
                                        <Typography 
                                            variant="body2" 
                                            fontWeight="bold"
                                            sx={{ color: getProgressColor(formProgress) }}
                                        >
                                            {Math.round(formProgress)}%
                                        </Typography>
                                    </Box>
                                    
                                    <Box 
                                        sx={{ 
                                            height: 8, 
                                            width: '100%', 
                                            backgroundColor: alpha('#fff', 0.1),
                                            borderRadius: 4,
                                            position: 'relative',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        <Box 
                                            sx={{ 
                                                height: '100%', 
                                                width: `${formProgress}%`, 
                                                position: 'absolute',
                                                borderRadius: 4,
                                                background: `linear-gradient(90deg, ${getProgressColor(formProgress-20)} 0%, ${getProgressColor(formProgress)} 100%)`,
                                                transition: 'width 0.8s ease-in-out, background 0.8s ease-in-out',
                                                boxShadow: `0 0 8px ${getProgressColor(formProgress)}`
                                            }}
                                        />
                                    </Box>
                                </Box>
                                
                                <Divider sx={{ my: 2 }} />
                                
                                {/* Navegación por secciones */}
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Button
                                        variant={activeSection === 'personal' ? "contained" : "text"}
                                        startIcon={<PersonIcon />}
                                        fullWidth
                                        sx={{ 
                                            justifyContent: 'flex-start', 
                                            py: 1.5,
                                            bgcolor: activeSection === 'personal' ? alpha('#3f80ea', 0.1) : 'transparent',
                                            '&:hover': {
                                                bgcolor: activeSection === 'personal' ? alpha('#3f80ea', 0.2) : alpha('#fff', 0.05)
                                            }
                                        }}
                                        onClick={() => setActiveSection('personal')}
                                    >
                                        Información Personal
                                    </Button>
                                    <Button
                                        variant={activeSection === 'location' ? "contained" : "text"}
                                        startIcon={<HomeIcon />}
                                        fullWidth
                                        sx={{ 
                                            justifyContent: 'flex-start', 
                                            py: 1.5,
                                            bgcolor: activeSection === 'location' ? alpha('#3f80ea', 0.1) : 'transparent',
                                            '&:hover': {
                                                bgcolor: activeSection === 'location' ? alpha('#3f80ea', 0.2) : alpha('#fff', 0.05)
                                            }
                                        }}
                                        onClick={() => setActiveSection('location')}
                                    >
                                        Ubicación
                                    </Button>
                                    <Button
                                        variant={activeSection === 'education' ? "contained" : "text"}
                                        startIcon={<SchoolIcon />}
                                        fullWidth
                                        sx={{ 
                                            justifyContent: 'flex-start', 
                                            py: 1.5,
                                            bgcolor: activeSection === 'education' ? alpha('#3f80ea', 0.1) : 'transparent',
                                            '&:hover': {
                                                bgcolor: activeSection === 'education' ? alpha('#3f80ea', 0.2) : alpha('#fff', 0.05)
                                            }
                                        }}
                                        onClick={() => setActiveSection('education')}
                                    >
                                        Fecha de Graduación
                                    </Button>
                                    <Button
                                        variant={activeSection === 'additional' ? "contained" : "text"}
                                        startIcon={<InfoIcon />}
                                        fullWidth
                                        sx={{ 
                                            justifyContent: 'flex-start', 
                                            py: 1.5,
                                            bgcolor: activeSection === 'additional' ? alpha('#3f80ea', 0.1) : 'transparent',
                                            '&:hover': {
                                                bgcolor: activeSection === 'additional' ? alpha('#3f80ea', 0.2) : alpha('#fff', 0.05)
                                            }
                                        }}
                                        onClick={() => setActiveSection('additional')}
                                    >
                                        Información Adicional
                                    </Button>
                                </Box>
                            </Card>
                        </Box>
                        
                        {/* Contenido principal */}
                        <Box sx={{ flex: 1 }}>
                            <Paper 
                                elevation={3} 
                                sx={{ 
                                    p: 3, 
                                    borderRadius: 3,
                                    background: 'linear-gradient(135deg, #1e1e2d 0%, #252537 100%)',
                                }}
                            >
                                <Box sx={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center',
                                    mb: 4
                                }}>
                                    <Typography variant="h5" fontWeight="bold">
                                        {activeSection === 'personal' && 'Información Personal'}
                                        {activeSection === 'location' && 'Ubicación'}
                                        {activeSection === 'education' && 'Fecha de Graduación'}
                                        {activeSection === 'additional' && 'Información Adicional'}
                                    </Typography>
                                </Box>
                                
                                <form onSubmit={handleSubmit}>
                                    {/* Sección: Información Personal */}
                                    <Fade in={activeSection === 'personal'} timeout={500}>
                                        <Box sx={{ display: activeSection === 'personal' ? 'block' : 'none' }}>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        label="Nombres"
                                                        variant="outlined"
                                                        fullWidth
                                                        value={data.first_name}
                                                        onChange={(e) => setData('first_name', e.target.value)}
                                                        error={!!errors.first_name}
                                                        helperText={errors.first_name}
                                                        required
                                                        sx={{ mb: 2 }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        label="Apellidos"
                                                        variant="outlined"
                                                        fullWidth
                                                        value={data.last_name}
                                                        onChange={(e) => setData('last_name', e.target.value)}
                                                        error={!!errors.last_name}
                                                        helperText={errors.last_name}
                                                        required
                                                        sx={{ mb: 2 }}
                                                    />
                                                </Grid>
                                                
                                                <Grid item xs={12} sm={6}>
                                                    <FormControl fullWidth variant="outlined" error={!!errors.document_type} required>
                                                        <InputLabel id="document-type-label">Tipo de Documento</InputLabel>
                                                        <Select
                                                            labelId="document-type-label"
                                                            value={data.document_type}
                                                            onChange={(e) => setData('document_type', e.target.value)}
                                                            label="Tipo de Documento"
                                                        >
                                                            <MenuItem value=""><em>Seleccionar</em></MenuItem>
                                                            <MenuItem value="CC">Cédula de Ciudadanía</MenuItem>
                                                            <MenuItem value="TI">Tarjeta de Identidad</MenuItem>
                                                            <MenuItem value="CE">Cédula de Extranjería</MenuItem>
                                                            <MenuItem value="Pasaporte">Pasaporte</MenuItem>
                                                        </Select>
                                                        {errors.document_type && (
                                                            <Typography variant="caption" color="error">
                                                                {errors.document_type}
                                                            </Typography>
                                                        )}
                                                    </FormControl>
                                                </Grid>
                                                
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        label="Número de Documento"
                                                        variant="outlined"
                                                        fullWidth
                                                        value={data.document_number}
                                                        onChange={(e) => setData('document_number', e.target.value)}
                                                        error={!!errors.document_number}
                                                        helperText={errors.document_number}
                                                        required
                                                    />
                                                </Grid>
                                                
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        label="Teléfono"
                                                        variant="outlined"
                                                        fullWidth
                                                        value={data.phone}
                                                        onChange={(e) => setData('phone', e.target.value)}
                                                        error={!!errors.phone}
                                                        helperText={errors.phone}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Fade>
                                    
                                    {/* Sección: Ubicación */}
                                    <Fade in={activeSection === 'location'} timeout={500}>
                                        <Box sx={{ display: activeSection === 'location' ? 'block' : 'none' }}>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        label="Dirección de Residencia"
                                                        variant="outlined"
                                                        fullWidth
                                                        value={data.address}
                                                        onChange={(e) => setData('address', e.target.value)}
                                                        error={!!errors.address}
                                                        helperText={errors.address}
                                                        sx={{ mb: 2 }}
                                                    />
                                                </Grid>
                                                
                                                <Grid item xs={12} sm={4}>
                                                    <TextField
                                                        label="Ciudad"
                                                        variant="outlined"
                                                        fullWidth
                                                        value={data.city}
                                                        onChange={(e) => setData('city', e.target.value)}
                                                        error={!!errors.city}
                                                        helperText={errors.city}
                                                    />
                                                </Grid>
                                                
                                                <Grid item xs={12} sm={4}>
                                                    <TextField
                                                        label="Departamento"
                                                        variant="outlined"
                                                        fullWidth
                                                        value={data.department}
                                                        onChange={(e) => setData('department', e.target.value)}
                                                        error={!!errors.department}
                                                        helperText={errors.department}
                                                    />
                                                </Grid>
                                                
                                                <Grid item xs={12} sm={4}>
                                                    <TextField
                                                        label="País"
                                                        variant="outlined"
                                                        fullWidth
                                                        value={data.country}
                                                        onChange={(e) => setData('country', e.target.value)}
                                                        error={!!errors.country}
                                                        helperText={errors.country}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Fade>
                                    
                                    {/* Sección: Fecha de Graduación */}
                                    <Fade in={activeSection === 'education'} timeout={500}>
                                        <Box sx={{ display: activeSection === 'education' ? 'block' : 'none' }}>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        label="Universidad"
                                                        variant="outlined"
                                                        fullWidth
                                                        value="Universidad Mariana"
                                                        InputProps={{
                                                            readOnly: true,
                                                        }}
                                                        sx={{ 
                                                            mb: 3,
                                                            '& .MuiInputBase-input': {
                                                                color: alpha('#fff', 0.7),
                                                            },
                                                            '& .MuiOutlinedInput-root': {
                                                                backgroundColor: alpha('#2d2d44', 0.4),
                                                            }
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DatePicker
                                                            label="Fecha de Graduación"
                                                            value={data.graduation_date ? dayjs(data.graduation_date) : null}
                                                            onChange={(date) => setData('graduation_date', date ? date.format('YYYY-MM-DD') : null)}
                                                            slotProps={{
                                                                textField: {
                                                                    fullWidth: true,
                                                                    variant: 'outlined',
                                                                    error: !!errors.graduation_date,
                                                                    helperText: errors.graduation_date
                                                                }
                                                            }}
                                                            sx={{
                                                                '& .MuiOutlinedInput-root': {
                                                                    backgroundColor: alpha('#2d2d44', 0.4),
                                                                }
                                                            }}
                                                        />
                                                    </LocalizationProvider>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Fade>
                                    
                                    {/* Sección: Información Adicional */}
                                    <Fade in={activeSection === 'additional'} timeout={500}>
                                        <Box sx={{ display: activeSection === 'additional' ? 'block' : 'none' }}>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        label="Información Adicional"
                                                        variant="outlined"
                                                        fullWidth
                                                        multiline
                                                        rows={6}
                                                        value={data.additional_info}
                                                        onChange={(e) => setData('additional_info', e.target.value)}
                                                        error={!!errors.additional_info}
                                                        helperText={errors.additional_info}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Fade>
                                    
                                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                                        <Button 
                                            type="submit" 
                                            variant="contained" 
                                            color="primary" 
                                            size="large"
                                            disabled={processing || isLoading}
                                            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                                            sx={{ 
                                                minWidth: '180px',
                                                textTransform: 'none', 
                                                fontWeight: 'bold',
                                                py: 1.5,
                                                borderRadius: 2,
                                                boxShadow: '0 4px 10px rgba(63, 128, 234, 0.3)'
                                            }}
                                        >
                                            {isLoading ? 'Guardando...' : 'Guardar Información'}
                                        </Button>
                                    </Box>
                                </form>
                            </Paper>
                        </Box>
                    </Box>
                    
                    {/* Snackbar para mensajes de éxito */}
                    <Snackbar
                        open={openSnackbar}
                        autoHideDuration={6000}
                        onClose={handleCloseSnackbar}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    >
                        <Alert 
                            onClose={handleCloseSnackbar} 
                            severity="success" 
                            sx={{ width: '100%' }}
                            variant="filled"
                        >
                            {successMessage}
                        </Alert>
                    </Snackbar>
                </ThemeProvider>
            </div>
        </AppLayout>
    );
}