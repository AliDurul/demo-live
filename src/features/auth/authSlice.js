import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    token: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        fillAuth: (state, { payload }) => {
            state.currentUser = payload.user;
            state.token = payload.token
        },
        cleanAuth: (state) => {
            state.currentUser = null;
            state.token = null
        },
    },
})

export const { fillAuth, cleanAuth } = authSlice.actions

export const selectCurrentUser = (state) => state.auth.currentUser
export const selectToken = (state) => state.auth.token

export default authSlice.reducer