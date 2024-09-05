import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '../store'

interface TokenState {
    user_id?: number | null;
    username: string;
    token: string | null;
}


const initialState: TokenState = {
    username: "guest",
    token: null,
    user_id: null
}

export const tokenSlice = createSlice({
    name: 'jwt',
    initialState,
    reducers: {
        saveToken: (state, action)=> {
            state.token = action.payload.token;
            state.username = action.payload.username;
            state.user_id = action.payload.user_id;
            localStorage.setItem('username', state.username);
            localStorage.setItem('token', state.token || '');
        },
        deleteToken: (state)=> {
            localStorage.removeItem('username');
            localStorage.removeItem('token');
            state.username = 'guest';
            state.token = null;
            state.user_id = null;
        }
    }
})

export const {saveToken, deleteToken} = tokenSlice.actions

export const getToken = (state: RootState) => state.jwt
export default tokenSlice.reducer