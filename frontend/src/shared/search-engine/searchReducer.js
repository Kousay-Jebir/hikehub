import { useReducer } from 'react';

const initialState = {
  query: '',
  searchType: 'hiker',
  filters: {
    nationality: '',
    isEventOpen: false,
    eventStartDate: null,
  },
};

function searchReducer(state, action) {
  switch (action.type) {
    case 'SET_QUERY':
      return { ...state, query: action.payload };
    case 'SET_SEARCH_TYPE':
      return { ...state, searchType: action.payload, filters: {} };
    case 'SET_FILTER':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    default:
      return state;
  }
}

export default searchReducer;
export { initialState };
