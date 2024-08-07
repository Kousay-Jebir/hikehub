import React from 'react';
import { Container, Typography, Button, Box, Grid, Card, CardContent, CardMedia } from '@mui/material';

const LandingPage = () => {
  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/1600x900/?hiking)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          padding: 2,
        }}
      >
        <Container>
          <Box sx={{ maxWidth: '600px', margin: '0 auto' }}>
            <Typography variant="h2" component="h1">
              Discover Amazing Hiking Trails
            </Typography>
            <Typography variant="h5" component="p" paragraph>
              Explore the best hiking routes and share your experiences with a community of enthusiasts.
            </Typography>
            <Button variant="contained" color="primary" size="large">
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
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                sx={{ height: 140 }}
                image="https://source.unsplash.com/345x200/?trail,forest"
                title="Trail 1"
              />
              <CardContent>
                <Typography variant="h6">Trail Name 1</Typography>
                <Typography variant="body2" color="text.secondary">
                  Short description of the trail.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                sx={{ height: 140 }}
                image="https://source.unsplash.com/345x200/?mountain,hiking"
                title="Trail 2"
              />
              <CardContent>
                <Typography variant="h6">Trail Name 2</Typography>
                <Typography variant="body2" color="text.secondary">
                  Short description of the trail.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                sx={{ height: 140 }}
                image="https://source.unsplash.com/345x200/?path,adventure"
                title="Trail 3"
              />
              <CardContent>
                <Typography variant="h6">Trail Name 3</Typography>
                <Typography variant="body2" color="text.secondary">
                  Short description of the trail.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* About Us Section */}
      <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
        <Container>
          <Typography variant="h4" component="h2" gutterBottom align="center">
            About Us
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            We are passionate hikers dedicated to sharing the best trails and experiences with others. Our platform connects hikers, helps you discover new trails, and provides a community to share your adventures.
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default LandingPage;
