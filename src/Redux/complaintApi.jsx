import { APi } from "./CenteralAPI";

const complaintApi = APi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /api/staff/details/:id
    getComplaintById: builder.query({
      query: (id) => `/staff/details/${id}`,
      providesTags: (result, error, id) => [{ type: 'Complaints', id }],
      // Targets the 'data' key which contains the specific complaint object
      transformResponse: (res) => res?.data || null,
    }),

    // PATCH /api/staff/update-status/:id
    updateComplaintStatus: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/staff/update-status/${id}`, 
        method: 'PATCH',
        body: patch, // Expects { status, comment }
      }),
      // Invalidates specific ID to refresh the detail page and Dashboard to update totals
      invalidatesTags: (result, error, { id }) => [
        { type: 'Complaints', id }, 
        'Complaints', 
        'Dashboard'
      ],
    }),

    // GET /api/staff/list
    getComplaints: builder.query({
      query: (params) => ({
        url: '/staff/list', 
        method: 'GET',
        params: params, 
      }),
      providesTags: ['Complaints'],
      // Unwraps the nested results array common in your backend responses
      transformResponse: (res) => res?.data?.results || [],
    }),

    // GET /api/staff/unassigned
    getUnassignedComplaints: builder.query({
      query: (params) => ({
        url: '/staff/unassigned',
        method: 'GET',
        params: params,
      }),
      providesTags: ['Complaints'],
      transformResponse: (res) => res?.data?.results || [],
    }),
  }),
});

export const { 
  useGetComplaintByIdQuery, 
  useGetComplaintsQuery, 
  useGetUnassignedComplaintsQuery, 
  useUpdateComplaintStatusMutation 
} = complaintApi;