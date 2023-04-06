import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseURL } from 'redux/constants'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    tagTypes: ['auth'],
    endpoints: (builder) => ({
        fetchCurrentUser: builder.query({
            query: () => 'users/current',
            providesTags: ['auth'],
        }),
        signup: builder.mutation({
            query: user => ({
                url: '/users/signup',
                method: 'POST',
                body: user,
            }),
            invalidatesTags: ['auth'],
        }),
        login: builder.mutation({
            query: user => ({
                url: '/users/login',
                method: 'POST',
                body: user,
            }),
            invalidatesTags: ['auth'],
        }),
        logout: builder.mutation({
            query: () => {
                return {
                    url: '/users/logout',
                    method: 'POST',
                }
            },
            invalidatesTags: ['auth'],
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useLazyFetchCurrentUserQuery,
    useFetchCurrentUserQuery,
    useSignupMutation,
    useLoginMutation,
    useLogoutMutation,
} = authApi;