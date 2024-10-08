import BASE_URL from "../../BASE_URL";
import axios from "axios";
import { USER_PROFILE } from "../routes";
import { ORGANIZATION_PROFILE } from "../routes";

export default async function editProfile(accessToken,userId,profileData,isOrganization=false){
    const URI = isOrganization ? ORGANIZATION_PROFILE : USER_PROFILE;
    try {
      const response = await axios.patch(URI + userId,
        {...profileData,
        userId
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