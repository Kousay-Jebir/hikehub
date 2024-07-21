import BASE_URL from "../../BASE_URL";
import axios from "axios";

export default async function signUp(email, password, roles){
    try {
      const response = await axios.post(BASE_URL, {
        email,
        password,
        roles
      });
      return response.data;
    } catch (error) {
      // Handle error (e.g., show an alert or log it)
      throw error;
    }
  };