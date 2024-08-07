import React, { useState } from 'react';
import { Modal, Box, Typography, Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useTheme } from '@emotion/react';
import AccountSearchResults from './AccountSearchResults';
import EventSearchResults from './EventSearchResults';
import EventFilters from './EventFilters';
import HikerFilters from './HikerFilters';
import OrganizationFilters from './OrganizationFilters';

const SearchModal = ({ open, onClose, state, dispatch, onSearch, results }) => {
  const theme = useTheme();
  const [searchPerformed, setSearchPerformed] = useState(false);
  const mapSearchTypeToUrl = (searchType) => {
    if(searchType === "organization") {
        return "organizer"
    }
    else{
        return searchType
    }
}
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxHeight: '80%',
    bgcolor: 'background.paper',
    border: `2px solid ${theme.palette.primary.main}`,
    boxShadow: 24,
    p: 4,
    overflow: 'auto',
  };

  const handleInputChange = (e) => {
    dispatch({ type: 'SET_QUERY', payload: e.target.value });
  };

  const handleTypeChange = (e) => {
    dispatch({ type: 'SET_SEARCH_TYPE', payload: e.target.value });
  };

  const handleSearch = async () => {
    setSearchPerformed(true);
    await onSearch(); // Execute the search operation
  };

  const renderResults = () => {
    if (!searchPerformed) {
      return null; // Don't show results until the search button is pressed
    }

    if (results.length === 0) {
      return <Typography>No results found</Typography>;
    }

    switch (state.searchType) {
      case 'hiker':
      case 'organization':
        return <AccountSearchResults results={results} profilePath={mapSearchTypeToUrl(state.searchType)}/>;
      case 'event':
        return <EventSearchResults results={results} />;
      default:
        return null;
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Search
        </Typography>
        <TextField 
          label="Search" 
          fullWidth 
          margin="normal" 
          value={state.query} 
          onChange={handleInputChange} 
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Search Type</InputLabel>
          <Select 
            value={state.searchType} 
            onChange={handleTypeChange}
          >
            <MenuItem value="hiker">Hiker</MenuItem>
            <MenuItem value="organization">Organization</MenuItem>
            <MenuItem value="event">Event</MenuItem>
          </Select>
        </FormControl>

        {state.searchType === 'hiker' && <HikerFilters state={state} dispatch={dispatch} />}
        {state.searchType === 'organization' && <OrganizationFilters />}
        {state.searchType === 'event' && <EventFilters state={state} dispatch={dispatch} />}

        <Button 
          variant="contained" 
          onClick={handleSearch} 
          fullWidth
        >
          Search
        </Button>

        {renderResults()}
      </Box>
    </Modal>
  );
};

export default SearchModal;


