import { APi } from "./CenteralAPI";

export const profileApi = APi.injectEndpoints({
  endpoints: (builder) => ({
    // Get logged-in user profile
    getProfile: builder.query({
      query: () => '/auth/profile',
      providesTags: ['UserProfile'],
    }),
    // Update profile details
    updateProfile: builder.mutation({
      query: (body) => ({
        url: '/auth/profile',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['UserProfile'],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;