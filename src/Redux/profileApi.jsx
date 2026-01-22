import { APi } from "./CenteralAPI";

export const profileApi = APi.injectEndpoints({
  endpoints: (builder) => ({
    // Get logged-in user profile
    getProfile: builder.query({
      // Confirmed /auth/profile as the correct endpoint
      query: () => '/auth/profile',
      providesTags: ['UserProfile'],
      // Standardizing to target the 'data' object in the response
      transformResponse: (res) => res?.data || null,
    }),
    // Update profile details
    updateProfile: builder.mutation({
      query: (body) => ({
        url: '/auth/profile',
        method: 'PATCH',
        body,
      }),
      // Invalidation ensures all components showing the user's name/photo refresh
      invalidatesTags: ['UserProfile', 'User'],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;