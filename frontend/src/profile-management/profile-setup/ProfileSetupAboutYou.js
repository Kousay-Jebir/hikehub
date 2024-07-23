import React from 'react';
import { Box, Grid, TextField, Typography } from '@mui/material';

const ProfileSetupAboutYou = ({ formData, handleChange }) => (
  <Box sx={{ mt: 2 }}>
    <Typography variant="h3" gutterBottom fontWeight={'bold'}>
      Tell us about yourself!
    </Typography>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          What should we call you?
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          More about yourself...
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
          required
        />
      </Grid>
    </Grid>
  </Box>
);

export default ProfileSetupAboutYou;
