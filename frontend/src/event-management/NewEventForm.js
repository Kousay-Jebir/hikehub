import React, { useContext, useState } from "react";
import { Box, Button, Container, TextField, Typography, Grid, IconButton, useTheme } from "@mui/material";
import AuthContext from "../auth/context/AuthContext";
import MapComponent from "../lib/leaflet/MapComponent";
import createEvent from "../api/event-management/services/createEvent";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

export default function NewEventForm() {
  const theme = useTheme();
  const authData = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [hikes, setHikes] = useState([
    { title: "", description: "", startTime: "", endTime: "", markers: [], trail: null },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const processedHikes = hikes.map(hike => ({
      title: hike.title,
      description: hike.description,
      startTime: hike.startTime,
      endTime: hike.endTime,
      locations: hike.markers.map(marker => ({
        label: marker.getPopup().getContent(),
        coordinates: {
          lat: marker.getLatLng().lat,
          lng: marker.getLatLng().lng
        }
      })),
      /* location: hike.trail ? hike.trail.trailId : null */
    }));

    const eventData = {
      organizerId: authData.user.id,
      title,
      description,
      startDate,
      endDate,
      location,
      hikes: processedHikes,
    };

    console.log("Processed Event Data:", eventData);
    console.log(hikes);
    console.log(await createEvent(authData.user.accessToken, authData.user.userId, eventData));
  };

  const handleHikeChange = (index, field, value) => {
    const updatedHikes = [...hikes];
    updatedHikes[index][field] = value;
    setHikes(updatedHikes);
  };

  const addHike = () => {
    setHikes([...hikes, { title: "", description: "", startTime: "", endTime: "", markers: [], trail: null }]);
  };

  const removeHike = (index) => {
    const updatedHikes = hikes.filter((_, i) => i !== index);
    setHikes(updatedHikes);
  };

  const handleMarkersChange = (index, markers) => {
    const updatedHikes = [...hikes];
    updatedHikes[index].markers = markers;
    setHikes(updatedHikes);
  };

  const handleTrailChange = (index, trail) => {
    const updatedHikes = [...hikes];
    updatedHikes[index].trail = { trailId: trail.properties.trailId };
    setHikes(updatedHikes);
  };

  return (
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing(2),
          p: theme.spacing(1),
        }}
      >
        <Typography variant="h3" align="center" fontWeight={theme.typography.fontWeightBold} color={theme.palette.text.primary}>
          Create New Event
        </Typography>
        <TextField
          label="Event Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          sx={{ mb: theme.spacing(2) }}
        />
        <TextField
          label="Event Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: theme.spacing(2) }}
        />
        <TextField
          label="Start Date & Time"
          type="datetime-local"
          variant="outlined"
          fullWidth
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          required
          sx={{ mb: theme.spacing(2) }}
        />
        <TextField
          label="End Date & Time"
          type="datetime-local"
          variant="outlined"
          fullWidth
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          required
          sx={{ mb: theme.spacing(2) }}
        />
        <TextField
          label="Location"
          variant="outlined"
          fullWidth
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          sx={{ mb: theme.spacing(2) }}
        />
        <Typography variant="h6" color={theme.palette.text.secondary} sx={{ mb: theme.spacing(2) }}>
          Hikes
        </Typography>
        {hikes.map((hike, index) => (
          <Box key={index} sx={{ mb: theme.spacing(2) }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Hike Title"
                  variant="outlined"
                  fullWidth
                  value={hike.title}
                  onChange={(e) => handleHikeChange(index, "title", e.target.value)}
                  required
                  sx={{ mb: theme.spacing(2) }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Hike Description"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={2}
                  value={hike.description}
                  onChange={(e) => handleHikeChange(index, "description", e.target.value)}
                  sx={{ mb: theme.spacing(2) }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: theme.spacing(2) }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Start Time"
                  type="datetime-local"
                  variant="outlined"
                  fullWidth
                  value={hike.startTime}
                  onChange={(e) => handleHikeChange(index, "startTime", e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  required
                  sx={{ mb: theme.spacing(2) }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="End Time"
                  type="datetime-local"
                  variant="outlined"
                  fullWidth
                  value={hike.endTime}
                  onChange={(e) => handleHikeChange(index, "endTime", e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  required
                  sx={{ mb: theme.spacing(2) }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: theme.spacing(2) }}>
              <Grid item xs={12}>
                <MapComponent
                  handleMarkersChange={(markers) => handleMarkersChange(index, markers)}
                  handleTrailChange={(trail) => handleTrailChange(index, trail)} 
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: theme.spacing(2) }}>
              <Grid item>
                <IconButton onClick={addHike} color="primary" aria-label="add hike">
                  <AddCircleIcon />
                </IconButton>
              </Grid>
              {hikes.length > 1 && (
                <Grid item>
                  <IconButton onClick={() => removeHike(index)} color="secondary" aria-label="remove hike">
                    <RemoveCircleIcon />
                  </IconButton>
                </Grid>
              )}
            </Grid>
          </Box>
        ))}
        <Button type="submit" variant="contained" color="primary">
          Create Event
        </Button>
      </Box>
  );
}
