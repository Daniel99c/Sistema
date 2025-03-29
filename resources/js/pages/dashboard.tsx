import React, { useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box, 
  Skeleton, 
  Chip,
  Grid,
  Divider
} from '@mui/material';
import { CalendarToday, Person } from '@mui/icons-material';

// Definir la interfaz para las noticias
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

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

export default function Dashboard() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        // Obtener noticias desde la API
        const response = await axios.get('/api/news');
        setNews(response.data);
      } catch (error) {
        console.error("Error al cargar noticias:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Función para truncar texto
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Función para formatear la fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard - Últimas Noticias" />
      <div className="flex h-full flex-1 flex-col gap-2 rounded-xl p-2">
        <Typography variant="h4" component="h1" sx={{ mt: 0, mb: 1 }}>
          Últimas Noticias
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {loading ? (
          // Skeleton de carga
          <Grid container spacing={2}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <Skeleton variant="rectangular" height={180} animation="wave" />
                                      <CardContent sx={{ py: 1.5 }}>
                    <Skeleton animation="wave" height={32} width="80%" />
                    <Skeleton animation="wave" height={20} width="60%" />
                    <Skeleton animation="wave" height={20} width="40%" />
                    <Box mt={2}>
                      <Skeleton animation="wave" height={15} width="70%" />
                      <Skeleton animation="wave" height={15} width="50%" />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          // Tarjetas de noticias
          <Grid container spacing={2}>
            {news.length > 0 ? (
              news.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <Card 
                    sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                      }
                    }}
                  >
                    {item.image ? (
                      <CardMedia
                        component="img"
                        height="180"
                        image={item.image}
                        alt={item.title}
                        sx={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <Box 
                        sx={{ 
                          height: 180, 
                          bgcolor: 'grey.300',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Sin imagen
                        </Typography>
                      </Box>
                    )}
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography 
                        gutterBottom 
                        variant="h5" 
                        component="h2"
                        sx={{ 
                          fontWeight: 'bold',
                          minHeight: '54px',
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 2,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        paragraph
                        sx={{
                          minHeight: '70px',
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 4,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {truncateText(item.content.replace(/<[^>]*>?/gm, ''), 150)}
                      </Typography>
                      <Box mt={1} display="flex" flexDirection="column" gap={0.5}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Person fontSize="small" color="action" />
                          <Typography variant="caption" color="text.secondary">
                            Por: {item.user?.name || 'Autor desconocido'}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <CalendarToday fontSize="small" color="action" />
                          <Typography variant="caption" color="text.secondary">
                            {formatDate(item.created_at)}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Box width="100%" textAlign="center" py={8}>
                <Typography variant="h6" color="text.secondary">
                  No hay noticias disponibles
                </Typography>
              </Box>
            )}
          </Grid>
        )}
      </div>
    </AppLayout>
  );
}