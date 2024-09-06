import { API_URI, MODEL_URI } from "@/app/constants"
import axios from "axios"

export const getCourses = async () => {
    try {
        const response = await axios.get(`${API_URI}/courses?page=1`, {
            headers: {
              'Content-Type': 'application/json',
            },
            timeout: 10000,
          });

        return {
            status: response.status,
            data: response.data
        }
    } catch(error: any) {
        throw new Error(`Error while getting courses. ${error}`)
    }
}

export const getRecommendedCourses = async (user_id:number, item_id:number) => {
    try {
        const modelResponse = await axios.get(`${MODEL_URI}/recommendations?user_id=${user_id}&item_id=${item_id}`, {
            headers: {
              'Content-Type': 'application/json',
            },
            timeout: 10000,
          });
        const recommendedCourses = modelResponse.data["recommended_items"];
        const requestBody = {
            courses_id: recommendedCourses
        };
        const response = await axios.post(`${API_URI}/courses-collection`, requestBody);
        return {
            status: response.status,
            data: response.data
        }
    } catch(error: any) {
        throw new Error(`Error while getting recommended courses. ${error}`)
    }
}
export const getCoursesByCategory = async (categoryID: number) => {
    try {
        const response = await axios.get(`${API_URI}/courses?category=${categoryID}`, {
            headers: {
              'Content-Type': 'application/json',
            },
            timeout: 10000,
          });
        // console.log(response.data["courses"])
        return {
            status: response.status,
            data: response.data
        }
    } catch(error: any) {
        throw new Error(`Error while getting courses by category. ${error}`)
    }
}

export const getDashboard = async (username: string, token: string) => {
    try {
        const response = await axios.get(`${API_URI}/dashboard/${username}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            timeout: 10000
        });

        return {
            status: response.status,
            data: response.data
        }
    } catch(error: any) {
        throw new Error(`Error while getting dashboard. ${error}`)
    }
}

export const searchCourses = async (params: URLSearchParams) => {
    try {
        const response = await axios.get(`${API_URI}/courses?${params.toString()}`);

        return {
            status: response.status,
            data: response.data
        }
    } catch(error: any) {
        throw new Error(`Error while searching courses. ${error}`)
    }
}