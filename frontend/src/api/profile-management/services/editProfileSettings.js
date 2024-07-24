import BASE_URL from "../../BASE_URL";
import axios from "axios";
import {USER_PROFILE_SETTINGS} from "../routes";


export default async function editProfileSettings(accessToken,userId,settings){
    try {
      const response = await axios.patch(USER_PROFILE_SETTINGS + userId,
        {...settings,
        id:userId
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