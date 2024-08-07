import React from 'react';
import { List, ListItem, ListItemText, Avatar, Typography, Box } from '@mui/material';

const SearchResults = ({ results }) => {
  if (results.length === 0) {
    return <Typography>No results found.</Typography>;
  }

  return (
    <List>
      {results.map((result) => (
        <ListItem key={result.id} alignItems="flex-start">
          <Avatar alt={result.name} src={result.avatar || ''} />
          <ListItemText
            primary={result.name}
            secondary={
              <React.Fragment>
                <Typography component="span" variant="body2" color="textPrimary">
                  {result.email}
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

export default SearchResults;
