import { API_URI } from '@/app/constants'
import { fetchUserInteractions } from '@/services/handlers'
import axios from 'axios'
import React from 'react'


const UserBehaviourContext = React.createContext<UserBehaviourContextType | undefined>(undefined);

type UserCourseInteraction =  {
    id: number | null,
    lastInteraction: Date | null,
    timeSpent: number,
    viewed: boolean,
    registered: boolean,
    completed: boolean,
    completionRate: number,
    userID: number | null,
    courseID: number | null,
    nCompletedChapters: number,
    nCompletedSubChapters: number
}

type UserBehaviourAction = {
    type: 'SET', payload: UserCourseInteraction
}

const UserBehaviourInitState: UserCourseInteraction = {
    id: null,
    lastInteraction: null,
    timeSpent: 0,
    viewed: false,
    registered: false,
    completed: false,
    completionRate: 0,
    userID: null,
    courseID: null,
    nCompletedChapters: 0,
    nCompletedSubChapters: 0


}

type UserBehaviourContextType = {
    state: UserCourseInteraction;
    updateData: (data:  {[key:string]:any}, token:string) => Promise<void>;
    fetchData: (username: string, token: string, courseID?: number) => Promise<void>;
}


const updateUserInteraction = async (payload: {[key:string]:any}, token: string) => {
    const response = await axios.put(`${API_URI}/interact`, payload, {headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}});
    if (response.status !== axios.HttpStatusCode.Ok) {
        throw new Error('Error while updating user interaction');
    }

    return response.data;
}

const fetchUserInteraction = async (username:string, token:string, courseID?:number) => {
    const response = await fetchUserInteractions(username, token, courseID);
    if (response.status !== axios.HttpStatusCode.Ok) {
        throw new Error('Error while fetching user interaction');
    }
    const interactionData = response.data.interactions[0] || response.data.interaction;
    const payload:UserCourseInteraction = {
        id: interactionData.id,
        lastInteraction: interactionData.last_interaction,
        timeSpent: interactionData.time_spent,
        viewed: interactionData.viewed,
        registered: interactionData.registered,
        completed: interactionData.completed,
        completionRate: interactionData.completion_rate,
        userID: interactionData.user_id,
        courseID: interactionData.course_id,
        nCompletedChapters: interactionData.n_completed_chapters,
        nCompletedSubChapters: interactionData.n_completed_subchapters
    }
    return payload
}

const UserBehaviourReducer = (state: UserCourseInteraction, action: UserBehaviourAction) => {
    switch (action.type) {
        case 'SET':
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
/**
 * The UserBehaviourProvider component provides a context for user interaction
 * with courses. It keeps track of the last interaction, the time spent, and
 * whether the course has been viewed, registered, or completed. It also
 * provides a function to update the user interaction.
 *
 * @param {{children: React.ReactNode}} props - The props for the UserBehaviourProvider component
 * @returns A React component representing the user behaviour provider
 */
const UserBehaviourProvider: React.FC<{children: React.ReactNode}> = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = React.useReducer(UserBehaviourReducer, UserBehaviourInitState)

    const updateData = async (data: {[key:string]:any}, token:string) => {
        try {
            const updatedData = await updateUserInteraction(data, token);
            dispatch({ type: 'SET', payload: updatedData });
        } catch (error) {
            console.error('Failed to update user interaction', error);
        }
    }

    const fetchData = async (username:string, token:string, courseID?:number) => {
        try {
            const data = await fetchUserInteraction(username, token, courseID);
            dispatch({ type: 'SET', payload: data });
        } catch (error) {
            console.error('Failed to fetch user interaction', error);
        }
    }
    

    const value = { state, updateData, fetchData }

    return (
        <UserBehaviourContext.Provider value={value}>
            {children}
        </UserBehaviourContext.Provider>
    )
}

export const useUserBehaviour = (): UserBehaviourContextType => {
    const context = React.useContext(UserBehaviourContext);
    if (!context) {
        throw new Error('useUserBehaviour must be used within a UserBehaviourProvider');
    }
    return context;
}


export default UserBehaviourProvider;
export { UserBehaviourContext };
