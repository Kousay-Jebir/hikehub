
import axios from "axios";
import { ORGANIZATION_ID } from "../routes";


export default async function getOrganizatorId(accessToken,userId){
    try {
      const response = await axios.get(ORGANIZATION_ID + userId,
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