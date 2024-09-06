import { API_URI } from "@/app/constants"
import axios from "axios"

export const getCourses = async () => {
    try {
        const response = await axios.get(`${API_URI}/courses?page=1`);

        return {
            status: response.status,
            data: response.data["courses"]
        }
    } catch(error: any) {
        throw new Error(`Error while getting courses. ${error}`)
    }
}

export const getCoursesByCategory = async (categoryID: number) => {
    try {
        const response = await axios.get(`${API_URI}/courses?category=${categoryID}`);
        console.log(response.data["courses"])
        return {
            status: response.status,
            data: response.data["courses"]
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