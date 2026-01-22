import { APi } from "./CenteralAPI";

export const authApi = APi.injectEndpoints({
  endpoints: (builder) => ({
    // Update Password Mutation
    changePassword: builder.mutation({
      query: (passwords) => ({
        // Updated to the standard password update path
        url: '/auth/update-password', 
        method: 'PATCH',
        body: passwords, // Sends { currentPass, newPass }
      }),
    }),
  }),
});

export const { useChangePasswordMutation } = authApi;