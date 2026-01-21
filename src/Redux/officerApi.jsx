import { APi } from "./CenteralAPI.jsx";

const dashboardApi = APi.injectEndpoints({
  endpoints: (builder) => ({
    getOfficerStats: builder.query({
      query: () => '/officer/stats', 
      providesTags: ['ComplaintsOfficer'], 
    }),
  }),
});

export const { useGetOfficerStatsQuery } = dashboardApi;