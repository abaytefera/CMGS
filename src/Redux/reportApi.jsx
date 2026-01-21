import { APi } from "./CenteralAPI";

export const reportApi = APi.injectEndpoints({
  endpoints: (builder) => ({
    // GET Filtered Reports
    getReports: builder.query({
      // The 'params' argument will contain { period, department, location }
      query: (params) => ({
        url: '/reports',
        method: 'GET',
        params: params, // Automatically adds ?key=value to the URL
      }),
      providesTags: ['Complaints'],
      transformResponse: (res) => res || { data: [], totalCount: 0 },
    }),
  }),
});

export const { useGetReportsQuery } = reportApi;