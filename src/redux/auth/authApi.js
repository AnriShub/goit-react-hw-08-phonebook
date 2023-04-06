import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseURL } from 'redux/constants'
import { REHYDRATE } from 'redux-persist'


const baseQuery = fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    },
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    return result
}
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQuery,
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