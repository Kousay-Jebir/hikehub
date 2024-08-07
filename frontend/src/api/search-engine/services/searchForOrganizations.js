import { SEARCH_ORGANIZATIONS } from "../routes";
import axios from "axios";

const searchForOrganizations = (query) => {
    return axios.get(SEARCH_ORGANIZATIONS, {
      params: { q: query },
    });
  };

export default searchForOrganizations