// Redux/settingsApi.js
import { APi } from "./CenteralAPI";

export const settingsApi = APi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch global settings
    getSystemSettings: builder.query({
      // Corrected endpoint path
      query: () => '/settings',
      providesTags: ['Settings'],
      // Standardized to unwrap 'data' and provide fallback defaults
      transformResponse: (res) => res?.data || {
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
        // Corrected endpoint path
        url: '/settings',
        method: 'PATCH',
        body: newSettings,
      }),
      // Invalidates Settings to refresh UI and Dashboard for maintenance status
      invalidatesTags: ['Settings', 'Dashboard'],
    }),
  }),
});

export const { useGetSystemSettingsQuery, useUpdateSettingsMutation } = settingsApi;