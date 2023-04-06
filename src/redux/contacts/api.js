import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseURL } from 'redux/constants'
export const contactsApi = createApi({
    reducerPath: 'contactsApi',
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
    tagTypes: ['Contact'],
    keepUnusedDataFor: 0,
    endpoints: (builder) => ({
        fetchContacts: builder.query({
            query: () => 'contacts',
            providesTags: ['Contact'],
        }),
        addContact: builder.mutation({
            query: contact => ({
                url: '/contacts',
                method: 'POST',
                body: contact,
            }),
            invalidatesTags: ['Contact'],
        }),
        deleteContact: builder.mutation({
            query: contactId => ({
                url: `/contacts/${contactId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Contact'],
        }),
        updateContact: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `/contacts/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidatesTags: ['Contact'],
        }),

    }),
})

export const {
    useFetchContactsQuery,
    useLazyFetchContactsQuery,
    useAddContactMutation,
    useDeleteContactMutation,
    useUpdateContactMutation,
} = contactsApi;