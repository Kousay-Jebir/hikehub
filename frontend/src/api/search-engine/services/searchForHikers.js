import { SEARCH_HIKERS } from "../routes";
import axios from "axios";
const searchForHikers = (query, nationality="") => {
    return axios.get(SEARCH_HIKERS, {
      params: { q: query, nationality },
    });
  };
  
export default searchForHikers;