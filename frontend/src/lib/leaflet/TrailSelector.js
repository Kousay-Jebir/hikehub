import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

// TrailSelector.js
const TrailSelector = ({ trails, onSelect }) => {
  const [selectedTrail, setSelectedTrail] = React.useState("");

  const handleChange = (event) => {
    const trailName = event.target.value;
    setSelectedTrail(trailName);
    const trail = trails.find(feature => feature.properties.name === trailName);
    onSelect(trail);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Select a Trail</InputLabel>
      <Select
        value={selectedTrail}
        onChange={handleChange}
        label="Select a Trail"
      >
        <MenuItem value="">None</MenuItem>
        {trails.map((feature, index) => (
          <MenuItem key={index} value={feature.properties.name}>
            {feature.properties.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TrailSelector;
