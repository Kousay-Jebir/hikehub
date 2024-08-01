
import axios from "axios";
import { EVENT_REVIEWS } from "../routes";

export default async function getEventReviews(accessToken,eventId){
    try {
      const response = await axios.get(EVENT_REVIEWS + eventId,
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