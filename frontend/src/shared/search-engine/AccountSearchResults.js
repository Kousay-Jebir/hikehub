import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AccountSearchResults = ({ results, profilePath }) => {
  const navigate = useNavigate();

  const handleNavigation = (id) => {
    navigate(`/setup  `);
    setTimeout(()=>{
      navigate(`/profiles/${profilePath}/${id}`);
    },0)
  };

  if (results.length === 0) {
    return <Typography>No results found.</Typography>;
  }

  return (
    <List>
      {results.map((result) => (
        <ListItem key={result.id} alignItems="flex-start" button onClick={() => handleNavigation(result.id)}>
          <ListItemText
            primary={result.userName}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default AccountSearchResults;
