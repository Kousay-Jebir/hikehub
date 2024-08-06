import axios from "axios";
import { SET_ATTENDANCE } from "../routes";


export default async function setParticipantAttendance(accessToken,eventId,userProfileId,didAttend){
    try {
      const response = await axios.patch(SET_ATTENDANCE + eventId + "/" + userProfileId,
        {didAttend
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