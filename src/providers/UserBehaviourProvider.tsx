import { API_URI } from '@/app/constants'
import axios from 'axios'
import React from 'react'


const UserBehaviourContext = React.createContext({})

type UserCourseInteraction = {
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

const updateUserInteraction = async (payload: UserCourseInteraction) => {
    const response = await axios.put(`${API_URI}/interact`, payload);
    if (response.status !== axios.HttpStatusCode.Ok) {
        throw new Error('Error while updating user interaction');
    }

    return response.data;
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

    const updateData = async (data: UserCourseInteraction) => {
        try {
            const updatedData = await updateUserInteraction(data);
            dispatch({ type: 'SET', payload: updatedData });
        } catch (error) {
            console.error('Failed to update user interaction', error);
        }
    }

    const value = { state, updateData }

    return (
        <UserBehaviourContext.Provider value={value}>
            {children}
        </UserBehaviourContext.Provider>
    )
}

export default UserBehaviourProvider;
export { UserBehaviourContext };
