import React from 'react';
import { Box, Grid, TextField, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const ProfileSetupAdditionalInfo = ({ formData, handleChange }) => (
  <Box sx={{ mt: 2 }}>
    <Typography variant="h3" gutterBottom fontWeight={'bold'}>
      Additional Information
    </Typography>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl fullWidth required>
          <InputLabel>Nationality</InputLabel>
          <Select
            label="Nationality"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
          >
            <MenuItem value="Tunisia">Tunisia</MenuItem>
            <MenuItem value="International">International</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          fullWidth
          required={formData.nationality === 'Tunisia'}
          disabled={formData.nationality === 'International'}
          inputProps={{ maxLength: 8 }}
          helperText={formData.nationality === 'International' ? 'Phone number is not required for International' : 'Please enter an 8-digit phone number'}
        />
      </Grid>
      <Grid item xs={12}>
      <FormControl fullWidth required>
          <InputLabel>Gender</InputLabel>
          <Select
            label="Gender"
            name="genderCode"
            value={formData.genderCode}
            onChange={handleChange}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Birthday"
          name="birthday"
          type="date"
          value={formData.birthday}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
          required
        />
      </Grid>
    </Grid>
  </Box>
);

export default ProfileSetupAdditionalInfo;
