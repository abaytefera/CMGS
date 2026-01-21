import { APi } from "./CenteralAPI";

export const adminApi = APi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /api/admin/stats
    getAdminStats: builder.query({
      query: () => '/admin/stats',
      providesTags: ['AdminStats'],
    
      transformResponse: (response) => response || { totalUsers: 0, health: "0%" },
    }),
    
    // GET /api/admin/activities
    getSystemActivity: builder.query({
      query: () => '/admin/activities',
      providesTags: ['Complaints'],
      transformResponse: (response) => response || [],
    }),
  }),
});

export const { useGetAdminStatsQuery, useGetSystemActivityQuery } = adminApi;