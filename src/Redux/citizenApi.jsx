import { APi } from "./CenteralAPI";

export const citizenApi = APi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Submit a new complaint
    submitComplaint: builder.mutation({
      query: (formData) => ({
        url: '/api/public/submit', // Added 'api/' because CenteralAPI doesn't have it
        method: 'POST',
        body: formData, 
      }),
      invalidatesTags: ['Complaints', 'Dashboard'],
    }),

    // 2. Track a complaint
    trackComplaint: builder.query({
      query: (refId) => `/api/public/track/${refId}`,
      providesTags: (result, error, refId) => [{ type: 'Complaints', id: refId }],
      transformResponse: (res) => res ,
    }),

    
   submiFeddBack: builder.mutation({
      query: (feedbackData) => ({
        url: '/api/public/feedback', // Matches the pattern of your working submit endpoint
        method: 'POST',
        body: feedbackData,
      }),
    })
  }),
});

export const { 
  useLazyTrackComplaintQuery, 
useSubmiFeddBackMutation,
  useSubmitComplaintMutation 
} = citizenApi;