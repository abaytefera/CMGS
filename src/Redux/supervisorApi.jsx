// Redux/supervisorApi.js
import { APi } from "./CenteralAPI";

export const supervisorApi = APi.injectEndpoints({
  endpoints: (builder) => ({
    getSupervisorStats: builder.query({
      // Correct endpoint for supervisor-level metrics
      query: () => '/dashboard/management',
      providesTags: ['Complaints', 'Dashboard'],
      // Standardizing response to target the 'data' key
      transformResponse: (res) => res?.data?.stats || { total: 0, pending: 0, assigned: 0 },
    }),

    getOfficers: builder.query({
      // Correct endpoint to fetch staff with the officer role
      query: () => '/users?role=OFFICER',
      providesTags: ['User'],
      transformResponse: (response) => response?.data || [],
    }),

    // Mutation to assign the case
    assignComplaint: builder.mutation({
      query: (assignmentData) => ({
        // Correct endpoint for staff assignment
        url: `/staff/assign/${assignmentData.id}`,
        method: 'PATCH',
        body: assignmentData,
      }),
      // Refreshes the dashboard stats and complaint lists automatically
      invalidatesTags: ['Complaints', 'Dashboard'], 
    }),
  }),
  overrideExisting: false,
});

// Export the injected hook (Names kept exactly as requested)
export const { 
  useGetOfficersQuery, 
  useAssignComplaintMutation, 
  useGetSupervisorStatsQuery 
} = supervisorApi;