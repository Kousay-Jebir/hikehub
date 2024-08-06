
import axios from "axios";
import { GET_EVENT_PARTICIPATIONS} from "../routes";



export default async function getEventParticipants(accessToken,eventId){
    try {
      const response = await axios.get(GET_EVENT_PARTICIPATIONS + eventId,
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