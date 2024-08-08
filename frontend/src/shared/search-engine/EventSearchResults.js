import React from 'react';
import { List, ListItem, ListItemText, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EventSearchResults = ({ results }) => {
  const navigate = useNavigate()
  const handleNavigation = (id) => {
    navigate(`/setup  `);
    setTimeout(()=>{
      navigate(`/events/${id}`);
    },0)
  };
  if (results.length === 0) {
    return <Typography>No results found.</Typography>;
  }

  return (
    <List>
      {results.map((result) => (
        <ListItem key={result.id} alignItems="flex-start" button onClick={()=>{handleNavigation(result.id)}}>
          <ListItemText
            primary={result.title}
            secondary={
              <React.Fragment>
                <Typography component="span" variant="body2" color="textPrimary">
                  {result.startDate}
                </Typography>
                {(
                  <Box component="span" ml={1}>
                    {result.location}
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
