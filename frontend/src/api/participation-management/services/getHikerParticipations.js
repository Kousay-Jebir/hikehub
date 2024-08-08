
import axios from "axios";
import { GET_HIKER_PARTICIPATIONS } from "../routes";


export default async function getHikerParticipations(accessToken,userProfileId){
    try {
      const response = await axios.get(GET_HIKER_PARTICIPATIONS  + userProfileId,
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