import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useTheme } from '@emotion/react';

import trailsGeoJSON from '../lib/leaflet/data.json'
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const HikeCard = ({ hike }) => {
  const [expanded, setExpanded] = useState(false);
  const [trail, setTrail] = useState(null);
  const theme = useTheme();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const trailData = trailsGeoJSON.features.find((feature) => feature.properties.trailId === parseInt(hike.location));
    if (trailData) {
      setTrail(trailData);
    }
  }, [hike.location]);

  const center = trail ? trail.geometry.coordinates[Math.floor(trail.geometry.coordinates.length / 2)] : [0, 0];

  return (
    <Card sx={{ margin: '20px', border: `1px solid ${theme.palette.secondary.main}` }} elevation={0}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }}>
            <AccessTimeIcon />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={hike.title}
        subheader={`Starts: ${new Date(hike.startTime).toLocaleString()}`}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {hike.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>End Time: {new Date(hike.endTime).toLocaleString()}</Typography>
          {trail && (
            <div style={{ height: '300px', width: '100%', marginTop: '20px', position: 'relative' }}>
              <MapContainer
                center={[center[1], center[0]]}
                zoom={16}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={true}
                dragging={false}
                zoomControl={true}
                attributionControl={true}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Polyline positions={trail.geometry.coordinates.map(coord => [coord[1], coord[0]])} color="blue" />
                {hike.locations.map((loc, index) => (
                  <Marker key={index} position={[loc.coordinates.lat, loc.coordinates.lng]}>
                    <Popup>{loc.label}</Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default HikeCard;
