
import axios from "axios";
import {ORGANIZATION_PROFILE, USER_PROFILE } from "../routes";

export default async function getUserProfile(accessToken,userId,isOrganization=false){
    const URL = isOrganization ?   ORGANIZATION_PROFILE : USER_PROFILE
    try {
      const response = await axios.get(URL + userId,
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