import { APi } from "./CenteralAPI";

export const managementApi = APi.injectEndpoints({
  endpoints: (builder) => ({
    // GET Dashboard Stats (Cards)
    getManagementStats: builder.query({
      query: () => '/management/stats',
      providesTags: ['Complaints'],
      transformResponse: (res) => res || { total: 0, sla: "0%", trend: 0 },
    }),
    // GET Chart Data (Trend and Pie)
    getDashboardCharts: builder.query({
      query: () => '/management/charts',
      providesTags: ['Complaints'],
      transformResponse: (res) => res || { trends: [], resolution: [] },
    }),
  }),
});

export const { useGetManagementStatsQuery, useGetDashboardChartsQuery } = managementApi;