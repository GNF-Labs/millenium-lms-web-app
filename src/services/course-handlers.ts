import { API_URI } from "@/app/constants"
import axios from "axios"

export const getCourses = async () => {
    try {
        const response = await axios.get(`${API_URI}/courses?page=1`);

        return {
            status: response.status,
            data: response.data
        }
    } catch(error: any) {
        throw new Error(`Error while getting courses. ${error}`)
    }
}