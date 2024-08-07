import React, { useState, useRef } from 'react';
import {
  TextField,
  IconButton,
  MenuItem,
  Paper,
  List,
  ListItem,
  ListItemText,
  ClickAwayListener,
  InputAdornment,
  Box,
  FormControl,
  Select,
  InputLabel,
  useMediaQuery,
  useTheme
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import searchForHikers from '../../api/search-engine/services/searchForHikers';
import searchForOrganizations from '../../api/search-engine/services/searchForOrganizations';

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('hiker'); // Default to 'hiker'
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      let response;
      if (searchType === 'hiker') {
        response = await searchForHikers(searchQuery.trim());
      } else if (searchType === 'organization') {
        response = await searchForOrganizations(searchQuery.trim());
      }
      setResults(response.data || []);
      setShowResults(true);
    } catch (error) {
      console.error('Search failed:', error);
      setResults([]);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
    setSearchQuery('');
    setResults([]);
    setShowResults(false);
  };

  const handleClickAway = () => {
    setShowResults(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: isMobile ? '100%' : 600,
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <FormControl
          variant="outlined"
          size="small"
          sx={{ mr: 1, minWidth: isMobile ? 'auto' : 120, mb: isMobile ? 1 : 0 }}
        >
          <InputLabel id="search-type-label">Search Type</InputLabel>
          <Select
            labelId="search-type-label"
            value={searchType}
            onChange={handleSearchTypeChange}
            label="Search Type"
          >
            <MenuItem value="hiker">Hikers</MenuItem>
            <MenuItem value="organization">Organizations</MenuItem>
          </Select>
        </FormControl>
        <TextField
          placeholder="Search..."
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ flexGrow: 1 }}
        />
        {showResults && (
          <Paper
            sx={{
              maxHeight: 300,
              overflow: 'auto',
              position: 'absolute',
              top: '100%',
              left: 0,
              width: '100%',
              bgcolor: 'background.paper',
              zIndex: 1300,
              mt: 1
            }}
          >
            <List>
              {results.length > 0 ? (
                results.map((item, index) => (
                  <ListItem button key={index}>
                    <ListItemText primary={item.userName} />
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="No results found" />
                </ListItem>
              )}
            </List>
          </Paper>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default SearchComponent;
