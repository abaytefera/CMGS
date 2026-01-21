// Redux/settingsApi.js
import { APi } from "./CenteralAPI";

export const settingsApi = APi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch global settings
    getSystemSettings: builder.query({
      query: () => '/settings',
      providesTags: ['Settings'],
      // Real Default: Ensure the UI doesn't break if DB is empty
      transformResponse: (res) => res || {
        smsEnabled: false,
        smsApiKey: '',
        smtpHost: '',
        language: 'English (US)',
        twoFactor: false,
        maintenanceMode: false
      },
    }),
    // Update global settings
    updateSettings: builder.mutation({
      query: (newSettings) => ({
        url: '/settings',
        method: 'PATCH',
        body: newSettings,
      }),
      invalidatesTags: ['Settings'],
    }),
  }),
});

export const { useGetSystemSettingsQuery, useUpdateSettingsMutation } = settingsApi;