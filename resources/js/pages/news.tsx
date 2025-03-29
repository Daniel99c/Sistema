import React, { useState, useRef } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import {
    TextField,
    Button,
    Paper,
    Typography,
    CircularProgress,
    Box,
    Alert,
    IconButton,
    Input,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PhotoCamera } from '@mui/icons-material';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'News', href: '/news' },
    { title: 'Create', href: '/news/create' },
];

const darkTheme = createTheme({
    palette: { mode: 'dark' },
});

export default function CreateNews() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<{ title?: string; content?: string; image?: string; category?: string }>({});
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [category, setCategory] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});
        setSuccessMessage(null);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('category', category);
        if (image) {
            formData.append('image', image);
        }

        router.post('/news', formData, {
            onSuccess: () => {
                setIsSubmitting(false);
                setSuccessMessage('News created successfully!');
                setTitle('');
                setContent('');
                setImage(null);
                setPreview(null);
                setCategory('');
                fileInputRef.current && (fileInputRef.current.value = ''); // Reset file input
            },
            onError: (err) => {
                setIsSubmitting(false);
                setErrors(err);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create News" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <ThemeProvider theme={darkTheme}>
                    <Paper elevation={3} className="p-4">
                        <Typography variant="h6" gutterBottom>
                            Create New News
                        </Typography>
                        {successMessage && <Alert severity="success">{successMessage}</Alert>}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <TextField
                                label="Title"
                                variant="outlined"
                                fullWidth
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                error={!!errors.title}
                                helperText={errors.title}
                            />
                            <TextField
                                label="Content"
                                variant="outlined"
                                multiline
                                rows={4}
                                fullWidth
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                error={!!errors.content}
                                helperText={errors.content}
                            />
                            <FormControl fullWidth variant="outlined">
                                <InputLabel id="category-label">Category</InputLabel>
                                <Select
                                    labelId="category-label"
                                    id="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value as string)}
                                    label="Category"
                                    error={!!errors.category}
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value="sports">Sports</MenuItem>
                                    <MenuItem value="politics">Politics</MenuItem>
                                    <MenuItem value="technology">Technology</MenuItem>
                                    <MenuItem value="entertainment">Entertainment</MenuItem>
                                </Select>
                                {errors.category && <Typography color="error">{errors.category}</Typography>}
                            </FormControl>
                            <Box display="flex" flexDirection="column" alignItems="flex-start">
                                <Input
                                    id="contained-button-file"
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={handleImageChange}
                                    inputRef={fileInputRef}
                                />
                                <label htmlFor="contained-button-file">
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <PhotoCamera />
                                    </IconButton>
                                </label>
                                {preview && <img src={preview} alt="Preview" style={{ maxWidth: '200px', marginTop: '10px' }} />}
                                {errors.image && <Typography color="error">{errors.image}</Typography>}
                            </Box>
                            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                                {isSubmitting ? <CircularProgress size={24} /> : 'Create'}
                            </Button>
                        </form>
                    </Paper>
                </ThemeProvider>
            </div>
        </AppLayout>
    );
}