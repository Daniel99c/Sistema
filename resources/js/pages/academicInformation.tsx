import React, { useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Skeleton,
  Paper,
  Box,
  Container
} from '@mui/material';

// Definir la estructura de los Breadcrumbs
const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Información Académica',
    href: '/academic-information',
  },
];

// Definir la interfaz de las noticias
interface News {
  id: number;
  title: string;
  content: string;
  image: string | null;
  user_id: number;
  created_at: string;
  user?: {
    id: number;
    name: string;
  };
}

export default function AcademicInformation() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/news')
      .then(response => setNews(response.data))
      .catch(error => console.error('Error fetching news:', error))
      .finally(() => setLoading(false));
  }, []);

  // Estilos inline para resolver el problema de pantalla negra
  const containerStyle = {
    backgroundColor: '#ffffff',
    color: '#333333',
    minHeight: '100vh'
  };

  const welcomeBoxStyle = {
    padding: '24px',
    marginBottom: '32px',
    backgroundColor: '#f8f9fa'
  };

  const cardStyle = {
    height: '100%', 
    display: 'flex', 
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    color: '#333333'
  };

  return (
    <div style={containerStyle}>
      {/* @ts-expect-error - Ignorando temporalmente errores de tipo */}
      <AppLayout title="Información Académica" breadcrumbs={breadcrumbs}>
        <Head title="Información Académica" />
        
        {/* Mensaje de Bienvenida */}
        <Paper elevation={2} sx={welcomeBoxStyle}>
          <Container maxWidth="lg">
            <Typography variant="h4" component="h1" gutterBottom sx={{color: '#2c3e50'}}>
              Bienvenido a Información Académica
            </Typography>
            <Typography variant="body1" paragraph sx={{color: '#333333'}}>
              En esta sección encontrarás las últimas noticias académicas, eventos importantes, 
              y recursos educativos para mantenerte informado sobre todo lo relacionado con tu formación.
            </Typography>
          </Container>
        </Paper>
        
        <Typography variant="h5" component="h2" gutterBottom sx={{marginBottom: '24px', color: '#2c3e50'}}>
          Noticias Académicas
        </Typography>
        
        <Grid container spacing={3}>
          {loading ? (
            Array.from(new Array(6)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Skeleton variant="rectangular" height={200} sx={{backgroundColor: '#e0e0e0'}} />
              </Grid>
            ))
          ) : news.length > 0 ? (
            news.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card sx={cardStyle}>
                  {item.image && (
                    <Box
                      component="img"
                      sx={{
                        height: 140,
                        objectFit: 'cover',
                      }}
                      src={item.image}
                      alt={item.title}
                    />
                  )}
                  <CardContent sx={{flexGrow: 1}}>
                    <Typography variant="h6" component="div" gutterBottom sx={{color: '#2c3e50'}}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{color: '#666666'}}>
                      {item.content}
                    </Typography>
                    {item.user && (
                      <Typography variant="caption" sx={{marginTop: '16px', display: 'block', color: '#666666'}}>
                        Publicado por: {item.user.name}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="body1" sx={{textAlign: 'center', color: '#666666'}}>
                No hay noticias académicas disponibles en este momento.
              </Typography>
            </Grid>
          )}
        </Grid>
      </AppLayout>
    </div>
  );
}