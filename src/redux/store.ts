import { configureStore } from "@reduxjs/toolkit";
import {tokenSlice} from "@/redux/slices/tokenSlice"

const store = configureStore({
    reducer: {
        jwt: tokenSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store