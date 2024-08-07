import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        width: '100%',
        padding: 2,
        backgroundColor: 'background.default',
        textAlign: 'center',
        bottom: 0,
        left: 0,
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        &copy; {new Date().getFullYear()} My Company. All rights reserved.
      </Typography>
      <Typography variant="body2" color="text.secondary">
        <Link href="/privacy" color="inherit">Privacy Policy</Link> | <Link href="/terms" color="inherit">Terms of Service</Link>
      </Typography>
    </Box>
  );
};

export default Footer;
