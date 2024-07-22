import BASE_URL from "../../BASE_URL";
import axios from "axios";
import { SIGNUP } from "../routes";

export default async function signUp(userName,email, password, roles){
    try {
      const response = await axios.post(SIGNUP, {
        email,
        userName,
        password,
        roles
      });
      return response.data;
    } catch (error) {
      // Handle error (e.g., show an alert or log it)
      throw error;
    }
  };