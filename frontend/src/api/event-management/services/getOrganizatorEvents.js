
import axios from "axios";
import { ORGANIZATION_EVENTS, USER_PROFILE } from "../routes";


export default async function getOrganizatorEvents(accessToken,userId){
    try {
      const response = await axios.get(ORGANIZATION_EVENTS + userId,
        {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            }
          }
      )
      console.log(response.data)
      return response.data;
    } catch (error) {
      // Handle error (e.g., show an alert or log it)
      throw error;
    }
  };