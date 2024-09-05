import { API_URI } from "@/app/constants"
import axios from "axios"
import { headers } from "next/headers";

export const fetchProfile = async (username: string, token: string) => {
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

export const fetchCourses = async () => {
  try {
    const response = await axios.get(`${API_URI}/courses`, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });

    return {
      status: response.status,
      data: response.data["courses"],
    };
  } catch (error: any) {
    if (error.response) {
      return {
        status: error.response.status,
        data: error.response.data,
      };
    }
    throw new Error(`Error fetching courses: ${error.message}`);

  }
}

export const fetchCourseById = async (id:number) => {
  try {
    const response = await axios.get(`${API_URI}/courses/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });

    return {
      status: response.status,
      data: response.data["course"],
    };
  } catch (error: any) {
    if (error.response) {
      return {
        status: error.response.status,
        data: error.response.data,
      };
    }
    throw new Error(`Error fetching courses: ${error.message}`);

  }
}
export const handleRegister = async (formData: FormData) => {
  try {

    const response = await axios.post(`${API_URI}/register`, formData, { timeout: 10000 });

    return {
      status: response.status,
      data: response.data
    }
  } catch (error: any) {
    if (error.response) {
      return {
        status: error.response.status,
        data: error.response.data,
      }
    }

    // For other errors (e.g., network errors)
    throw new Error(`Error whilst register: ${error.message}`);
  }
}

export const handleLogin = async (formData: FormData) => {
  try {
    const response = await axios.post(`${API_URI}/login`, formData, {timeout: 10000});

    return {
      status: response.status,
      data: response.data,
    };
  } catch( error: any) {
    if (error.response) {
      return {
        status: error.response.status,
        data: error.response.data,
      }
    }

  throw new Error(`Error whilst login: ${error.message}`)
  }
}

export const handleUpdateProfile = async (username: string, token: string, data: {[key: string]: any}) => {
  try {
    console.log(token);
    console.log(data);
    console.log(username);
    const response = await axios.put(`${API_URI}/profile/${username}`, data,  {headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }});

    console.log(response.data)
    return {
      status: response.status,
      data: response.data,
    };
  } catch(error: any) {
    throw new Error(`Error updating profile: ${error.message}`)
  }
}