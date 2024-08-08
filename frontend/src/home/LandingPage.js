import React from 'react';
import { Container, Typography, Button, Box, Grid, Card, CardContent, CardActions } from '@mui/material';
import Navbar from '../shared/navbar/Navbar';
import geojsonData from '../lib/leaflet/data.json'; // Adjust the path as needed
import HikeMap from '../hike-management/HikeMap'

// TrailCard Component
const TrailCard = ({ trail }) => {
  // Convert GeoJSON coordinates to an array of objects for locations
  const locations = trail.geometry.coordinates.map((coord, index) => ({
    coordinates: { lat: coord[1], lng: coord[0] },
    label: `Point ${index + 1}`
  }));

  return (
    <Card sx={{ maxWidth: 345, borderRadius: '16px', boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6">{trail.properties.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          Difficulty: {trail.properties.difficulty}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Length: {trail.properties.length_km} km
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Elevation Gain: {trail.properties.elevation_gain_m} m
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Type: {trail.properties.type}
        </Typography>
      </CardContent>
      <CardActions>
        <HikeMap hike={{ geometry: trail.geometry, locations }} />
      </CardActions>
    </Card>
  );
};

const LandingPage = () => {
  // Slice the GeoJSON data to only include the first 3 trails
  const featuredTrails = geojsonData.features.slice(0, 3);

  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1463693396721-8ca0cfa2b3b5?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          padding: 2,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)', // Gradient overlay
          },
        }}
      >
        <Container sx={{ position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              maxWidth: '600px',
              margin: '0 auto',
              backgroundColor: 'rgba(0, 0, 0, 0.6)', // Background color for better text readability
              borderRadius: '8px',
              padding: 3,
              boxShadow: 3,
            }}
          >
            <Typography variant="h2" fontWeight={'bold'} color={'white'}>
              Discover Amazing Hiking Trails
            </Typography>
            <Typography variant="h5" paragraph color={'white'}>
              Explore the best hiking routes and share your experiences with a community of enthusiasts.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ borderRadius: '20px' }}
            >
              Get Started
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Featured Trails Section */}
      <Container sx={{ my: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Featured Trails
        </Typography>
        <Grid container spacing={4}>
          {featuredTrails.map((trail) => (
            <Grid item xs={12} sm={6} md={4} key={trail.properties.trailId}>
              <TrailCard trail={trail} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* About Us Section */}
      <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
        <Container>
          <Box
            sx={{
              maxWidth: '600px',
              margin: '0 auto',
              padding: 3,
              borderRadius: '16px',
              boxShadow: 3,
              backgroundColor: 'white',
            }}
          >
            <Typography variant="h4" component="h2" gutterBottom align="center">
              About Us
            </Typography>
            <Typography variant="body1" align="center" paragraph>
              We are passionate hikers dedicated to sharing the best trails and experiences with others. Our platform connects hikers, helps you discover new trails, and provides a community to share your adventures.
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default LandingPage;