const initialState = {
  query: '',
  searchType: 'hiker',
  filters: {
    nationality: '',
    openForParticipation: false,
    date: '',
  },
};

function searchReducer(state, action) {
  switch (action.type) {
    case 'SET_QUERY':
      return { ...state, query: action.payload };
    case 'SET_SEARCH_TYPE':
      return { ...state, searchType: action.payload, filters: initialState.filters };
    case 'SET_NATIONALITY':
      return { ...state, filters: { ...state.filters, nationality: action.payload } };
    case 'SET_OPEN_FOR_PARTICIPATION':
      return { ...state, filters: { ...state.filters, openForParticipation: action.payload } };
    case 'SET_DATE':
      return { ...state, filters: { ...state.filters, date: action.payload } };
    default:
      return state;
  }
}

export default searchReducer;
export { initialState };
