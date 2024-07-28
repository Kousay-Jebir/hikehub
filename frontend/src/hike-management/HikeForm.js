// HikeForm.js
import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import HikeMap from "./HikeMap";

const HikeForm = ({ hike, index, handleHikeChange, removeHike }) => {
  return (
    <Box sx={{ mt: 3, border: '1px solid #ccc', p: 2, borderRadius: '4px' }}>
      <Typography variant="h6" component="h3">
        Hike {index + 1}
      </Typography>
      <TextField
        label="Hike Title"
        variant="outlined"
        fullWidth
        value={hike.title}
        onChange={(e) => handleHikeChange(index, "title", e.target.value)}
        required
        sx={{ mt: 2 }}
      />
      <TextField
        label="Hike Description"
        variant="outlined"
        fullWidth
        multiline
        rows={3}
        value={hike.description}
        onChange={(e) => handleHikeChange(index, "description", e.target.value)}
        sx={{ mt: 2 }}
      />
      <TextField
        label="Start Date & Time"
        type="datetime-local"
        variant="outlined"
        fullWidth
        value={hike.startTime}
        onChange={(e) => handleHikeChange(index, "startTime", e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        required
        sx={{ mt: 2 }}
      />
      <TextField
        label="End Date & Time"
        type="datetime-local"
        variant="outlined"
        fullWidth
        value={hike.endTime}
        onChange={(e) => handleHikeChange(index, "endTime", e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        sx={{ mt: 2 }}
      />
      <TextField
        label="Location"
        variant="outlined"
        fullWidth
        value={hike.location}
        onChange={(e) => handleHikeChange(index, "location", e.target.value)}
        sx={{ mt: 2 }}
      />
      <HikeMap
        hike={hike}
        handleHikeChange={handleHikeChange}
        index={index}
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={() => removeHike(index)}
        fullWidth
        sx={{ mt: 2 }}
      >
        Remove Hike
      </Button>
    </Box>
  );
};

export default HikeForm;
