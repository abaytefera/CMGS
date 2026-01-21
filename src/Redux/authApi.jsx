import { APi } from "./CenteralAPI";

export const authApi = APi.injectEndpoints({
  endpoints: (builder) => ({
    // Update Password Mutation
    changePassword: builder.mutation({
      query: (passwords) => ({
        url: '/auth/change-password',
        method: 'POST',
        body: passwords, // Sends { currentPass, newPass }
      }),
    }),
  }),
});

export const { useChangePasswordMutation } = authApi;