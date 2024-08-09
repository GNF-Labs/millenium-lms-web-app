import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '../store'

interface TokenState {
    username: string;
    token: string | null;
}


const initialState: TokenState = {
    username: "guest",
    token: null
}

export const tokenSlice = createSlice({
    name: 'jwt',
    initialState,
    reducers: {
        saveToken: (state, action)=> {
            state.token = action.payload.token;
            state.username = action.payload.username;
            localStorage.setItem('username', state.username);
            localStorage.setItem('token', state.token || '');
        },
        deleteToken: (state, action)=> {
            state = initialState;
            localStorage.removeItem('username');
            localStorage.removeItem('token');
        }
    }
})

export const {saveToken, deleteToken} = tokenSlice.actions

export const getToken = (state: RootState) => state.jwt
export default tokenSlice.reducer