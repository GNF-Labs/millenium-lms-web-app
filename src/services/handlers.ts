import { API_URI } from "@/app/constants"
import axios from "axios"

export const fetchProfile = async (username:string, token:string) => {
    try {
        const response = await axios.get(`${API_URI}/profile/${username}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          timeout: 10000,
        });
    
        // Return the status and data
        return {
          status: response.status,
          data: response.data,
        };
      } catch (error: any) {
        // Check if the error response has a status code
        if (error.response) {
          return {
            status: error.response.status,
            data: error.response.data,
          };
        }
    
        // For other errors (e.g., network errors)
        throw new Error(`Error fetching profile data: ${error.message}`);
      }
}