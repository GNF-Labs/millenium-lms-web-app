export interface ProfileState {
    profile: any;
    loading: boolean;
    error: string | null;
}

export const initialState: ProfileState = {
    profile: null,
    loading: false,
    error: null,
};

export type Action =
    | { type: 'CHANGE_STATE'; payload: any }
    | { type: 'FETCH_INIT' }
    | { type: 'FETCH_SUCCESS'; payload: any }
    | { type: 'FETCH_FAILURE'; payload: string };

export function profileReducer(state: ProfileState, action: Action): ProfileState {
    switch (action.type) {
        case 'CHANGE_STATE':
            return {...state, profile: action.payload}
        case 'FETCH_INIT':
            return { ...state, loading: true, error: null };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, profile: action.payload };
        case 'FETCH_FAILURE':
            return { ...state, loading: false, error: action.payload };
        default:
            throw new Error('Unhandled Action Type');
    }
}
