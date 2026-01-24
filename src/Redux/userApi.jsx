// Redux/userApi.js
import { APi } from "./CenteralAPI";

export const userApi = APi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. READ: Get all users
    getUsers: builder.query({
      query: () => 'api/users',
      providesTags: ['User'],
      // Updated to handle the nested data object in your API response
      transformResponse: (res) => res || [], 
    }),

    // 2. CREATE: Add new user
    createUser: builder.mutation({
      query: (newUser) => ({
        url: '/api/users', // Keep /users for creation
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['Userw'],
    }),

    // 3. UPDATE: Update existing user
    updateUser: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/users/${id}`, // Uses the specific ID path from your docs
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: ['User'],
    }),

    // 4. DELETE: Remove user
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `api/users/${id}`, // Uses the specific ID path from your docs
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