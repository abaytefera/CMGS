import { APi } from "./CenteralAPI";

export const citizenApi = APi.injectEndpoints({
  endpoints: (builder) => ({
    // Submit a new complaint
    submitComplaint: builder.mutation({
      query: (formData) => ({
        // Corrected to the specific submission endpoint
        url: '/complaints/create',
        method: 'POST',
        body: formData, // FormData supports attachments/images
      }),
      // Refreshing 'Complaints' and 'Dashboard' tags ensures staff see new entries
      invalidatesTags: ['Complaints', 'Dashboard'],
    }),

    trackComplaint: builder.query({
      // Corrected to use the tracking reference ID path
      query: (refId) => `/complaints/track/${refId}`,
      providesTags: (result, error, refId) => [{ type: 'Complaints', id: refId }],
      // Unwrapping data to get the status and details directly
      transformResponse: (res) => res?.data || null,
    }),

    sendFeedback: builder.mutation({
      query: (feedbackData) => ({
        // Verified feedback endpoint
        url: '/feedback/submit',
        method: 'POST',
        body: feedbackData,
      }),
    })
  }),
});

export const { 
  useLazyTrackComplaintQuery, 
  useSendFeedbackMutation, 
  useSubmitComplaintMutation 
} = citizenApi;