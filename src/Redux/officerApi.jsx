import { APi } from "./CenteralAPI.jsx";

const dashboardApi = APi.injectEndpoints({
  endpoints: (builder) => ({
    getOfficerStats: builder.query({
      // Corrected API endpoint for operational staff/officer stats
      query: () => '/dashboard/operational', 
      // Added 'Complaints' tag to ensure stats refresh when a complaint is updated
      providesTags: ['ComplaintsOfficer', 'Complaints', 'Dashboard'], 
      // Targets the 'data' property to return the clean stats object
      transformResponse: (res) => res?.data || { total: 0, pending: 0, resolved: 0 },
    }),
  }),
});

export const { useGetOfficerStatsQuery } = dashboardApi;