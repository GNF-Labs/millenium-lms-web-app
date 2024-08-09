import { error } from "console";

export const initialState = {
    name: '',
    email: '',
    username: '',
    password: '',
    showPassword: false,
    passwordConditionFullfiled: false,
    confirmPassword: '',
    showConfirmPassword: false,
    samePasswordConfirmed: false,
    error: '',
};
  
type State = typeof initialState;
type Action =
    | { type: 'SET_NAME'; payload: string }
    | { type: 'SET_EMAIL'; payload: string }
    | { type: 'SET_USERNAME'; payload: string }
    | { type: 'SET_PASSWORD'; payload: string }
    | { type: 'TOGGLE_SHOW_PASSWORD'; }
    | { type: 'SET_CONFIRM_PASSWORD'; payload: string }
    | { type: 'TOGGLE_SHOW_CONFIRM_PASSWORD'; }
    | { type: 'SET_ERROR'; payload: string };
  
export function reducer(state: State, action: Action) {
    switch (action.type) {
      case 'SET_NAME':
        return { ...state, name: action.payload };
      case 'SET_EMAIL':
        return { ...state, email: action.payload };
      case 'SET_USERNAME':
        return { ...state, username: action.payload };
      case 'SET_PASSWORD':
        if(action.payload.length < 8 || !/[A-Z]/.test(action.payload) || !/[a-z]/.test(action.payload) || !/[0-9]/.test(action.payload) || !/[!@#$%^&*]/.test(action.payload)){
          return { ...state, password: action.payload, passwordConditionFullfiled: false, error: 'Password harus terdiri dari 8 karakter, huruf besar, huruf kecil, angka, dan karakter spesial' };
        } else {
          if(state.confirmPassword !== '' && action.payload !== state.confirmPassword){
            return { ...state, password: action.payload, passwordConditionFullfiled: true, error: 'Password tidak sama' };
          } else {
            return { ...state, password: action.payload, passwordConditionFullfiled: true, error: '' };
          }
        }
      case 'TOGGLE_SHOW_PASSWORD':
        return { ...state, showPassword: !state.showPassword };
      case 'SET_CONFIRM_PASSWORD':
        if(state.passwordConditionFullfiled === false){
          return { ...state, confirmPassword: action.payload, samePasswordConfirmed: false};
        } else if(action.payload !== state.password){
          return { ...state, confirmPassword: action.payload, samePasswordConfirmed: false, error: 'Password tidak sama' };
        } else {
          return { ...state, confirmPassword: action.payload, samePasswordConfirmed: true, error: '' };
        }
      case 'TOGGLE_SHOW_CONFIRM_PASSWORD':
        return { ...state, showConfirmPassword: !state.showConfirmPassword };
      case 'SET_ERROR':
        return { ...state, error: action.payload };
      default:
        return state;
    }
};