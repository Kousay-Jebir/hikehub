
import axios from "axios";
import { USER_ID } from "../routes";

export default async function getUserId(accessToken,userProfileId){

    try {
      const response = await axios.get(USER_ID + userProfileId,
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