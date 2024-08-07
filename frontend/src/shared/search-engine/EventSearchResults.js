import React from 'react';
import { List, ListItem, ListItemText, Typography, Box } from '@mui/material';

const EventSearchResults = ({ results }) => {
  if (results.length === 0) {
    return <Typography>No results found.</Typography>;
  }

  return (
    <List>
      {results.map((result) => (
        <ListItem key={result.id} alignItems="flex-start">
          <ListItemText
            primary={result.eventName}
            secondary={
              <React.Fragment>
                <Typography component="span" variant="body2" color="textPrimary">
                  {result.date}
                </Typography>
                {result.additionalInfo && (
                  <Box component="span" ml={1}>
                    {result.additionalInfo}
                  </Box>
                )}
              </React.Fragment>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default EventSearchResults;
