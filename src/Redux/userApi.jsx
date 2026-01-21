// Redux/userApi.js
import { APi } from "./CenteralAPI";

export const userApi = APi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. READ: Get all users
    getUsers: builder.query({
      query: () => '/users',
      providesTags: ['User'],
      transformResponse: (res) => res || [],
    }),

    // 2. CREATE: Add new user
    createUser: builder.mutation({
      query: (newUser) => ({
        url: '/users',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['User'],
    }),

    // 3. UPDATE: Update existing user
    updateUser: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: ['User'],
    }),

    // 4. DELETE: Remove user
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { 
  useGetUsersQuery, 
  useCreateUserMutation, 
  useUpdateUserMutation, 
  useDeleteUserMutation 
} = userApi;