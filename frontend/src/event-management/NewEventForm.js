import { useContext, useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import AuthContext from "../auth/context/AuthContext";
import HikeForm from "../hike-management/HikeForm";
import createEvent from "../api/event-management/services/createEvent";

export default function NewEventForm() {
  const authData = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [hikes, setHikes] = useState([
    { title: "", description: "", startTime: "", endTime: "", location: "" },
  ]);

  const handleSubmit =  async (e) => {
    e.preventDefault();
    const eventData = {
        organizerId: authData.user.id,
        title,
        description,
        startDate,
        endDate,
        location,
        hikes,
      }
      console.log(authData)
    console.log(await(createEvent(authData.user.accessToken,authData.user.userId,eventData)))
  };

  const handleHikeChange = (index, field, value) => {
    const updatedHikes = [...hikes];
    updatedHikes[index][field] = value;
    setHikes(updatedHikes);
  };

  const addHike = () => {
    setHikes([...hikes, { title: "", description: "", startTime: "", endTime: "", location: "" }]);
  };

  const removeHike = (index) => {
    const updatedHikes = hikes.filter((_, i) => i !== index);
    setHikes(updatedHikes);
  };

  return (
    <Container maxWidth="sm">
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
        <Typography variant="h4" component="h1" align="center">
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
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
        <TextField
          label="End Date & Time"
          type="datetime-local"
          variant="outlined"
          fullWidth
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Location"
          variant="outlined"
          fullWidth
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <Typography variant="h5" component="h2" align="center" sx={{ mt: 2 }}>
          Hikes
        </Typography>
        {hikes.map((hike, index) => (
          <HikeForm
            key={index}
            hike={hike}
            index={index}
            handleHikeChange={handleHikeChange}
            removeHike={removeHike}
          />
        ))}
        <Button variant="contained" color="primary" onClick={addHike} fullWidth>
          Add Hike
        </Button>
        <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
          Create Event
        </Button>
      </Box>
    </Container>
  );
}
