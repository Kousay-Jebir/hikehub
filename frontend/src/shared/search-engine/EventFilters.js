import React from 'react';
import { Box, TextField, Checkbox, FormControlLabel } from '@mui/material';

const EventFilters = ({ state, dispatch }) => {
  const handleDateChange = (e) => {
    dispatch({ type: 'SET_DATE', payload: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    dispatch({ type: 'SET_OPEN_FOR_PARTICIPATION', payload: e.target.checked });
  };

  return (
    <Box>
      <FormControlLabel
        control={<Checkbox checked={state.openForParticipation} onChange={handleCheckboxChange} />}
        label="Still Open for Participation"
      />
      <TextField
        label="Beginning Date"
        type="date"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        value={state.date}
        onChange={handleDateChange}
      />
    </Box>
  );
};

export default EventFilters;
