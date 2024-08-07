import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const HikerFilters = ({ state, dispatch }) => {
  const handleNationalityChange = (e) => {
    dispatch({ type: 'SET_NATIONALITY', payload: e.target.value });
  };

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel>Nationality</InputLabel>
      <Select value={state.filters.nationality} onChange={handleNationalityChange}>
        <MenuItem value="US">US</MenuItem>
        <MenuItem value="CA">Canada</MenuItem>
        {/* Add more nationalities as needed */}
      </Select>
    </FormControl>
  );
};

export default HikerFilters;
