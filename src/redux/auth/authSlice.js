import { createSlice } from '@reduxjs/toolkit';
import { authApi } from './authApi';

const initialState = {
    user: { name: null, email: null },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
    forCurrent: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder
            .addMatcher(
                authApi.endpoints.fetchCurrentUser.matchFulfilled,
                (state, { payload }) => {
                    state.user = payload;
                    state.isLoggedIn = true;
                    state.forCurrent = true;
                }
            )
            .addMatcher(
                authApi.endpoints.signup.matchFulfilled,
                (state, { payload }) => {
                    state.token = payload.token;
                    state.user = payload.user;
                    state.isLoggedIn = true;
                    state.forCurrent = true;
                }
            )
            .addMatcher(
                authApi.endpoints.login.matchFulfilled,
                (state, { payload }) => {
                    state.token = payload.token;
                    state.user = payload.user;
                    state.isLoggedIn = true;
                    state.forCurrent = true;
                }
            )
            .addMatcher(
                authApi.endpoints.logout.matchFulfilled,
                (state, { payload }) => {
                    return (state = initialState);
                }
            )
    },
})

export default authSlice.reducer
