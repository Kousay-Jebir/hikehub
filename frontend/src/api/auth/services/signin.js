import axios from 'axios';
import { LOGIN } from '../routes';


// Login function
export default async function signIn(email,password){
  try {
    const response = axios.post(
      LOGIN,
      { email:email, password:password }, // JSON body with email and password
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    // Handle error (e.g., show an alert or log it)
    throw error;
  }
};

