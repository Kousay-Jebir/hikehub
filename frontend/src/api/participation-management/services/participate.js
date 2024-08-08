import axios from "axios";
import {PARTICIPATE} from "../routes";


export default async function participate(accessToken,eventId,userProfileId,didAttend){
    try {
      const response = await axios.post(PARTICIPATE,
        {userProfileId,eventId
        },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      // Handle error (e.g., show an alert or log it)
      throw error;
    }
  };