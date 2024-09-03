export interface CoursesState {
    courses:{[key:string]:any} | null;
    error: string | null;
}

export const initialState: CoursesState = {
    courses: null,
    error: null,
};

type Action =
    | {type: 'SET_COURSES', payload: CoursesState["courses"]}
    | {type: 'SET_ERROR', payload: string}

export function reducer(state: CoursesState, action: Action) {
    switch (action.type) {
        case 'SET_COURSES':
            return {...state, courses:action.payload}
        case 'SET_ERROR':
            return {...state, error:action.payload}
    }
}