// TrailCard.js
import React from 'react';
import { Card, CardContent, CardActions, Typography, IconButton, Tooltip, Box } from '@mui/material';
import { DirectionsWalk, Hiking, Nature, Difficulty } from '@mui/icons-material';
import HikeMap from './HikeMap'; // Adjust the import path as needed

// Helper function to get difficulty icon
const getDifficultyIcon = (difficulty) => {
  switch (difficulty) {
    case 'Easy':
      return <Nature color="success" />;
    case 'Moderate':
      return <Hiking color="warning" />;
    case 'Hard':
      return <DirectionsWalk color="error" />;
    default:
      return <DirectionsWalk color="action" />;
  }
};

// Helper function to get trail type icon
const getTrailTypeIcon = (type) => {
  return type === 'Loop' ? <DirectionsWalk /> : <Hiking />;
};

const TrailCard = ({ trail }) => {
  const { name, difficulty, length_km, elevation_gain_m, type, coordinates } = trail.properties;

  // Convert GeoJSON coordinates to an array of objects for locations
  const locations = coordinates.map((coord, index) => ({
    coordinates: { lat: coord[1], lng: coord[0] },
    label: `Point ${index + 1}`
  }));

  return (
    <Card sx={{ maxWidth: 345, borderRadius: '16px', boxShadow: 3, overflow: 'hidden' }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {name}
        </Typography>
        <Box display="flex" alignItems="center" mt={1}>
          <Tooltip title={`Difficulty: ${difficulty}`}>
            <IconButton>{getDifficultyIcon(difficulty)}</IconButton>
          </Tooltip>
          <Typography variant="body2" color="text.secondary" ml={1}>
            {difficulty}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mt={1}>
          <Tooltip title={`Length: ${length_km} km`}>
            <IconButton><Hiking /></IconButton>
          </Tooltip>
          <Typography variant="body2" color="text.secondary" ml={1}>
            {length_km} km
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mt={1}>
          <Tooltip title={`Elevation Gain: ${elevation_gain_m} m`}>
            <IconButton><Nature /></IconButton>
          </Tooltip>
          <Typography variant="body2" color="text.secondary" ml={1}>
            {elevation_gain_m} m
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mt={1}>
          <Tooltip title={`Type: ${type}`}>
            <IconButton>{getTrailTypeIcon(type)}</IconButton>
          </Tooltip>
          <Typography variant="body2" color="text.secondary" ml={1}>
            {type}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <HikeMap hike={{ geometry: trail.geometry, locations }} />
      </CardActions>
    </Card>
  );
};

export default TrailCard;
