import { CourseCardProps } from "@/components/cards/course-card";

export interface CoursesState {
    recommendedCourses: CourseCardProps[] | null;
    category1Courses: CourseCardProps[] | null;
    category2Courses: CourseCardProps[] | null;
    category3Courses: CourseCardProps[] | null;
    category4Courses: CourseCardProps[] | null;
    category5Courses: CourseCardProps[] | null;
    search: string;
    load: boolean;
    error: string | null;
}

export const initialState: CoursesState = {
    recommendedCourses: null,
    category1Courses: null,
    category2Courses: null,
    category3Courses: null,
    category4Courses: null,
    category5Courses: null,
    search: "",
    load: false,
    error: null,
};

type Action =
    | {type: 'SET_COURSES', payload: {index?: number, courses: any[] | null}}
    | {type: 'SET_SEARCH', payload: string}
    | {type: 'SET_LOAD', payload: boolean}
    | {type: 'SET_ERROR', payload: string}

export function reducer(state: CoursesState, action: Action) {
    switch (action.type) {
        case 'SET_COURSES':
            const courses = (action.payload.courses ?? []).map((course: any) => ({
                title: course.title,
                duration: course.duration,
                rating: course.rating,
                id: course.id,
                image: "https://cms-assets.themuse.com/media/lead/01212022-1047259374-coding-classes_scanrail.jpg"
            }));
            switch (action.payload.index) {
                case 1:
                    return {...state, category1Courses:courses}
                case 2:
                    return {...state, category2Courses:courses}
                case 3:
                    return {...state, category3Courses:courses}
                case 4:
                    return {...state, category4Courses:courses}
                case 5:
                    return {...state, category5Courses:courses}
                default:
                    return {...state, recommendedCourses:courses}
            }
        case 'SET_SEARCH':
            return {...state, search:action.payload}
        case 'SET_LOAD':
            return {...state, load:action.payload}
        case 'SET_ERROR':
            return {...state, error:action.payload}
    }
}