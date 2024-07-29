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

const trailsGeoJSON = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [-122.0838, 37.3861],
          [-122.0840, 37.3858],
          [-122.0845, 37.3855],
          [-122.0850, 37.3850]
        ]
      },
      "properties": {
        "name": "Trail A",
        "difficulty": "Easy",
        "length_km": 2.5,
        "trailId": 1
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [-122.0850, 37.3850],
          [-122.0855, 37.3845],
          [-122.0860, 37.3840],
          [-122.0865, 37.3835]
        ]
      },
      "properties": {
        "name": "Trail B",
        "difficulty": "Medium",
        "length_km": 3.0,
        "trailId": 2
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [-122.0865, 37.3835],
          [-122.0870, 37.3830],
          [-122.0875, 37.3825],
          [-122.0880, 37.3820]
        ]
      },
      "properties": {
        "name": "Trail C",
        "difficulty": "Hard",
        "length_km": 5.0,
        "trailId": 3
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [-122.0880, 37.3820],
          [-122.0885, 37.3815],
          [-122.0890, 37.3810],
          [-122.0895, 37.3805]
        ]
      },
      "properties": {
        "name": "Trail D",
        "difficulty": "Easy",
        "length_km": 1.8,
        "trailId": 4
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [-122.0895, 37.3805],
          [-122.0900, 37.3800],
          [-122.0905, 37.3795],
          [-122.0910, 37.3790]
        ]
      },
      "properties": {
        "name": "Trail E",
        "difficulty": "Medium",
        "length_km": 4.2,
        "trailId": 5
      }
    }
  ]
};

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
