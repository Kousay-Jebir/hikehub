import { SEARCH_EVENTS } from "../routes";
import axios from "axios";
const searchForEvents = (query, openForParticipation) => {
    console.log(openForParticipation)
    return axios.get(SEARCH_EVENTS, {
      params: { q: query, openForParticipation},
    });
  };
  
export default searchForEvents;