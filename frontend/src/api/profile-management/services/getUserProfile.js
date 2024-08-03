
import axios from "axios";
import {PROFILE } from "../routes";

export default async function getUserProfile(accessToken,userId,isOrganization=false){

    try {
      const response = await axios.get(PROFILE + userId,
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