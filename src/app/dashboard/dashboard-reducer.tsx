import React from "react";

interface DashboardState {
    recommendedCourses: any
    newestCourses: any
    lastCourse: any
    statistics: {
        coursesCompleted: number,
        coursesInProgress: number,
        learningHours: {date: string, hours: number}[]
    }
}

export const DashboardInitState: DashboardState = {
    recommendedCourses: [],
    newestCourses: [],
    lastCourse: {},
    statistics: {
        coursesCompleted: 0,
        coursesInProgress: 0,
        learningHours: []
    }
}

type Action = {type: any, payload: any}

export const DashboardReducer = (state: DashboardState, action: Action) => {
    switch (action.type) {
        case 'SET_RECOMMENDED_COURSES':
            return {...state, recommendedCourses: action.payload}
        case 'SET_NEWEST_COURSES':
            return {...state, newestCourses: action.payload}
        case 'SET_LAST_COURSE':
            return {...state, lastCourse: action.payload}
        case 'SET_STATISTICS':
            return {...state, statistics: action.payload}
        default:
            return state
    }
}