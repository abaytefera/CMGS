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
      invalidatesTags: ['User'],
    }),

 
updateUser: builder.mutation({
  query: ({ id, ...patch }) => ({
 
    url: `api/users/${id}`,
    
    method: 'PUT',
    body: patch,
  }),

  invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
}),

    // 4. DELETE: Remove user
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `api/users/${id}`, // Uses the specific ID path from your docs
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
 
       getProfile: builder.query({
      query: () => '/api/users/profile',
      providesTags: ['profile'],
   
      transformResponse: (res) => res  
    }),

 updateUserPassword: builder.mutation({
      query: (body) => ({
        url: '/api/users/change-password', 
        method: 'PUT',
        body,
      }),
    }),


  
  }),
});

export const { 
  useGetUsersQuery, 
  useCreateUserMutation, 
  useUpdateUserMutation, 
  useDeleteUserMutation ,
  useGetProfileQuery,
useUpdateUserPasswordMutation
  
} = userApi;