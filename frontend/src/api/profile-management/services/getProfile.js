
import axios from "axios";
import {ORGANIZATION_PROFILE, USER_PROFILE } from "../routes";
import { USER_INFO } from "../../account-management/routes";


export default async function getProfile(accessToken,userId,isOrganization=false){
    const URL = isOrganization ?   ORGANIZATION_PROFILE : USER_PROFILE
    try {
      const response = await axios.get(USER_INFO + userId,
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