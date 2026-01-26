import { APi } from "./CenteralAPI";

export const profileApi = APi.injectEndpoints({
  endpoints: (builder) => ({
    // Get logged-in user profile
    getProfile: builder.query({
      // Confirmed /auth/profile as the correct endpoint
      query: () => '/api/users/profile',
      providesTags: ['UserProfile'],
 
      transformResponse: (res) => res
    }),

    updateProfile: builder.mutation({
      query: (body) => ({
        url: '/api/users/profile',
        method: 'PUT',
        body,
      }),
      
      invalidatesTags: ['UserProfile', 'User'],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;