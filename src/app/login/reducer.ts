export const initialState = {
    name: '',
    username: '',
    password: '',
    showPassword: false,
    error: '',
};
  
type State = typeof initialState;
type Action =
    | { type: 'SET_NAME'; payload: string }
    | { type: 'SET_USERNAME'; payload: string }
    | { type: 'SET_PASSWORD'; payload: string }
    | { type: 'TOGGLE_SHOW_PASSWORD'; }
    | { type: 'SET_ERROR'; payload: string };
  
export function reducer(state: State, action: Action) {
    switch (action.type) {
      case 'SET_NAME':
        return { ...state, name: action.payload };
      case 'SET_USERNAME':
        return { ...state, username: action.payload };
      case 'SET_PASSWORD':
        return { ...state, password: action.payload };
      case 'TOGGLE_SHOW_PASSWORD':
        return { ...state, showPassword: !state.showPassword };
      case 'SET_ERROR':
        return { ...state, error: action.payload };
      default:
        return state;
    }
};