import { APi } from "./CenteralAPI";

const complaintApi = APi.injectEndpoints({
  endpoints: (builder) => ({
    getComplaintById: builder.query({
      query: (id) => `/complaints/${id}`,
      providesTags: (result, error, id) => [{ type: 'Complaints', id }],
    }),
    updateComplaintStatus: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/complaints/${id}/status`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Complaints', id }],
    }),
    getComplaints: builder.query({
      query: (params) => ({
        url: '/complaintsByType',
        method: 'GET',
        params: params, // Pass { status, search, page }
      }),
      providesTags: ['Complaints'],
      transformResponse: (res) => res || { data: [], total: 0 },
    }),
    getUnassignedComplaints: builder.query({
      query: (params) => ({
        url: '/complaints/unassigned',
        method: 'GET',
        params: params, // { search, page }
      }),
      providesTags: ['Complaints'],
      transformResponse: (res) => res || { data: [], total: 0 },
    }),

    
  }),
});

export const { useGetComplaintByIdQuery,useGetComplaintsQuery,useGetUnassignedComplaintsQuery ,useUpdateComplaintStatusMutation } = complaintApi;