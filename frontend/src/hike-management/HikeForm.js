import React from 'react';
import {
  Box,
  Grid,
  TextField,
  IconButton
} from '@mui/material';
import { RemoveCircleOutline } from '@mui/icons-material';

const HikeForm = ({ hike, index, handleHikeChange, removeHike }) => {
  return (
    <Box sx={{ mb: 2, border: '1px solid #ddd', p: 2, borderRadius: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={10}>
          <TextField
            label="Hike Title"
            variant="outlined"
            fullWidth
            value={hike.title}
            onChange={(e) => handleHikeChange(index, 'title', e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={2}>
          <IconButton onClick={() => removeHike(index)} color="secondary">
            <RemoveCircleOutline />
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Hike Description"
            variant="outlined"
            fullWidth
            multiline
            rows={2}
            value={hike.description}
            onChange={(e) => handleHikeChange(index, 'description', e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Start Time"
            type="datetime-local"
            variant="outlined"
            fullWidth
            value={hike.startTime}
            onChange={(e) => handleHikeChange(index, 'startTime', e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="End Time"
            type="datetime-local"
            variant="outlined"
            fullWidth
            value={hike.endTime}
            onChange={(e) => handleHikeChange(index, 'endTime', e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Hike Location"
            variant="outlined"
            fullWidth
            value={hike.location}
            onChange={(e) => handleHikeChange(index, 'location', e.target.value)}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HikeForm;
