import { APi } from "./CenteralAPI";

export const adminApi = APi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /api/admin/stats
    getAdminStats: builder.query({
      // Confirmed path for high-level admin metrics
      query: () => '/dashboard/admin', 
      providesTags: ['AdminStats', 'Dashboard'],
      // Standardizing to target the 'data' key from your backend response
      transformResponse: (response) => response?.data || { totalUsers: 0, health: "0%" },
    }),
    
    // GET /api/admin/activities
    getSystemActivity: builder.query({
      // Confirmed path for system-wide audit logs/activities
      query: () => '/admin/activities',
      providesTags: ['Complaints', 'User'],
      // Unwrapping the 'data' array for the activity feed
      transformResponse: (response) => response?.data || [],
    }),
  }),
});

export const { useGetAdminStatsQuery, useGetSystemActivityQuery } = adminApi;