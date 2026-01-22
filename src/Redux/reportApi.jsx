import { APi } from "./CenteralAPI";

export const reportApi = APi.injectEndpoints({
  endpoints: (builder) => ({
    // GET Filtered Reports
    getReports: builder.query({
      // Corrected endpoint for report data/exports
      query: (params) => ({
        url: '/reports/export',
        method: 'GET',
        params: params, 
      }),
      providesTags: ['Complaints'],
      // Standardized to unwrap 'data' and handle counts from your JSON response
      transformResponse: (res) => res?.data || { results: [], count: 0 },
    }),

    // Added Export to Excel (Keeping names consistent with your query style)
    exportToExcel: builder.mutation({
      query: (params) => ({
        url: '/reports/excel',
        method: 'GET',
        params: params,
        responseHandler: (response) => response.blob(), // Handles binary file data
      }),
    }),

    // Added Export to PDF
    exportToPdf: builder.mutation({
      query: (params) => ({
        url: '/reports/pdf',
        method: 'GET',
        params: params,
        responseHandler: (response) => response.blob(), // Handles binary file data
      }),
    }),
  }),
});

export const { 
  useGetReportsQuery, 
  useExportToExcelMutation, 
  useExportToPdfMutation 
} = reportApi;