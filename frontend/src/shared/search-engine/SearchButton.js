import React from 'react';
import { Button, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchButton = ({ onClick }) => {
  const isLargeScreen = useMediaQuery('(min-width:600px)');

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<SearchIcon />}
      onClick={onClick}
    >
      {isLargeScreen ? 'Search for accounts or events' : <SearchIcon />}
    </Button>
  );
};

export default SearchButton;
