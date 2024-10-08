import React, { useState, useReducer } from 'react';
import { Container, Button } from '@mui/material';
import SearchModal from './SearchModal';
import searchReducer, { initialState } from './searchReducer';
import searchForHikers from '../../api/search-engine/services/searchForHikers';
import searchForOrganizations from '../../api/search-engine/services/searchForOrganizations';
import searchForEvents from '../../api/search-engine/services/searchForEvents';
const Search = () => {
  const [open, setOpen] = useState(false);
  const [state, dispatch] = useReducer(searchReducer, initialState);
  const [results, setResults] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSearch = async () => {
    try {
      let response;
      if (state.searchType === 'hiker') {
        response = await searchForHikers(state.query, state.filters.nationality);
      } else if (state.searchType === 'organization') {
        response = await searchForOrganizations(state.query);
      }
        else if (state.searchType === 'event') {
            response = await searchForEvents(state.query,state.filters.openForParticipation)
        }
      // Add logic for event search if needed
      console.log(response.data)
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <Container >
      <Button onClick={handleOpen} variant="contained" color='secondary'>
        Search for accounts or events
      </Button>
      <SearchModal 
        open={open} 
        onClose={handleClose} 
        state={state} 
        dispatch={dispatch} 
        onSearch={handleSearch} 
        results={results} 
      />
    </Container>
  );
};

export default Search;
