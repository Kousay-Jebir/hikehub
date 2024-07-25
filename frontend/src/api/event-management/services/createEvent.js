
import axios from "axios";
import { CREATE_EVENT } from "../routes";
import getOrganizatorId from "../../profile-management/services/getOrganizatorId";


export default async function createEvent(accessToken,userId,data){
    try {
     
      const organizerId = await getOrganizatorId(accessToken,userId);
      console.log(organizerId)
      const eventData = {...data,organizerId}
      const response = await axios.post(CREATE_EVENT,eventData,
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