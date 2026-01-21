// Redux/supervisorApi.js
import { APi } from "./CenteralAPI";

export const supervisorApi = APi.injectEndpoints({
  endpoints: (builder) => ({
    getSupervisorStats: builder.query({
      query: () => '/complaints/stats/supervisor',
     
      providesTags: ['Complaints'], 
    }),
      getOfficers: builder.query({
      query: () => '/users/officers',
      transformResponse: (response) => response || [],
    }),
    // Mutation to assign the case
    assignComplaint: builder.mutation({
      query: (assignmentData) => ({
        url: `/complaints/assign/${assignmentData.id}`,
        method: 'PATCH',
        body: assignmentData,
      }),
      invalidatesTags: ['Complaints'], // Refreshes the dashboard stats automatically
    }),
  }),
  overrideExisting: false,
});

// Export the injected hook
export const {  useGetOfficersQuery, useAssignComplaintMutation,useGetSupervisorStatsQuery } = supervisorApi;


