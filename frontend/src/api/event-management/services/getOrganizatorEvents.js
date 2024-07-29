
import axios from "axios";
import { ORGANIZATION_EVENTS, USER_PROFILE } from "../routes";
import getOrganizatorId from "../../profile-management/services/getOrganizatorId";


export default async function getOrganizatorEvents(accessToken,userId){
    try {
      const organizerId = await getOrganizatorId(accessToken,userId);
      console.log(organizerId)
      const response = await axios.get(ORGANIZATION_EVENTS + organizerId,
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