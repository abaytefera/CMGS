import { APi } from "./CenteralAPI";

const complaintApi = APi.injectEndpoints({
  endpoints: (builder) => ({
  
    getComplaintById: builder.query({
      query: (id) => `api/staff/details/${id}`,
      providesTags: (result, error, id) => [{ type: 'Complaints', id }],
    
      transformResponse: (res) => res || null,
    }),

    // PATCH /api/staff/update-status/:id
    updateComplaintStatus: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/api/workflow/status/${id}`, 
        method: 'PATCH',
        body: patch, 
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
        url: 'api/staff/list', 
        method: 'GET',
        params: params, 
      }),
      providesTags: ['Complaints'],
      // Unwraps the nested results array common in your backend responses
      transformResponse: (res) => res ,
    }),
    

    // GET /api/staff/unassigned
    getUnassignedComplaints: builder.query({
      query: (params) => ({
        url: '/staff/unassigned',
        method: 'GET',
        params: params,
      }),
      providesTags: ['Complaints'],
      transformResponse: (res) => res || [],
    }),
        // GET /api/staff/list
    getComplaintsDashboard: builder.query({
      query: (params) => ({
        url: `/api/dashboard/${params}`, 
        method: 'GET',
        params: params, 
      }),
      providesTags: ['Complaints'],
      // Unwraps the nested results array common in your backend responses
      transformResponse: (res) => res ,
    }),
    getComplaintsList: builder.query({
      query: (params) => ({
        url: `api/staff/list${params}`, 
        method: 'GET',
        params: params, 
      }),
      providesTags: ['Complaints'],
   
      transformResponse: (res) => res ,
    }),
   getComplaintsbyCatagory: builder.query({
  query: ({ role, type }) => ({
    // Fixed the slashes and formatting
    url: `/api/dashboard/${role}/list/`, 
    method: 'GET',
    // Using the 'params' object is the cleanest way to handle ?type=value
    params: { type: type }, 
  }),
  providesTags: ['Complaints'],
  transformResponse: (res) => res,
}),
  }),

});

export const { 
  useGetComplaintByIdQuery, 
  useGetComplaintsQuery, 
  useGetUnassignedComplaintsQuery, 
  useUpdateComplaintStatusMutation ,
 useGetComplaintsDashboardQuery,
 useGetComplaintsListQuery,
useGetComplaintsbyCatagoryQuery
 
} = complaintApi;