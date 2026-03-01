/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    token: null
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        fillAuth: (state, { payload }) => {
            if (payload.user) {
                const { password, ...userInfo } = payload.user
                state.currentUser = userInfo;
            } else {
                const { password, ...userInfo } = payload.data
                state.currentUser = userInfo;
            }
            state.token = payload.token;
        },
        cleanAuth: (state) => {
            state.currentUser = null;
            state.token = null;
        }
    }
})

export const { fillAuth, cleanAuth } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.currentUser;
export const selectAuthToken = (state) => state.auth.token;

export default authSlice.reducer;