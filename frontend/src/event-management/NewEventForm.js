import React, { useContext, useState } from "react";
import { Box, Button, Container, TextField, Typography, Grid, IconButton } from "@mui/material";
import AuthContext from "../auth/context/AuthContext";
import MapComponent from "../lib/leaflet/MapComponent";
import createEvent from "../api/event-management/services/createEvent";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

export default function NewEventForm() {
  const authData = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [hikes, setHikes] = useState([
    { title: "", description: "", startTime: "", endTime: "", location: "", markers: [] },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventData = {
      organizerId: authData.user.id,
      title,
      description,
      startDate,
      endDate,
      location,
      hikes,
    };
    console.log(authData);
    console.log(await createEvent(authData.user.accessToken, authData.user.userId, eventData));
  };

  const handleHikeChange = (index, field, value) => {
    const updatedHikes = [...hikes];
    updatedHikes[index][field] = value;
    setHikes(updatedHikes);
  };

  const addHike = () => {
    setHikes([...hikes, { title: "", description: "", startTime: "", endTime: "", location: "", markers: [] }]);
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

  return (
    <Container maxWidth="lg">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 4,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Create New Event
        </Typography>
        <TextField
          label="Event Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Event Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
        />
        <TextField
          label="Location"
          variant="outlined"
          fullWidth
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <Typography variant="h6">Hikes</Typography>
        {hikes.map((hike, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Hike Title"
                  variant="outlined"
                  fullWidth
                  value={hike.title}
                  onChange={(e) => handleHikeChange(index, "title", e.target.value)}
                  required
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
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 2 }}>
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
                />
              </Grid>
            </Grid>
            <TextField
              label="Hike Location"
              variant="outlined"
              fullWidth
              value={hike.location}
              onChange={(e) => handleHikeChange(index, "location", e.target.value)}
              required
            />
            <MapComponent handleMarkersChange={(markers) => handleMarkersChange(index, markers)} />
            <Box sx={{ mt: 2 }}>
              {hikes.length > 1 && (
                <IconButton color="error" onClick={() => removeHike(index)}>
                  <RemoveCircleIcon />
                </IconButton>
              )}
            </Box>
          </Box>
        ))}
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleIcon />}
          onClick={addHike}
        >
          Add Another Hike
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
        >
          Create Event
        </Button>
      </Box>
    </Container>
  );
}