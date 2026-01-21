import { APi } from "./CenteralAPI";

export const citizenApi = APi.injectEndpoints({
  endpoints: (builder) => ({
    // Submit a new complaint
    submitComplaint: builder.mutation({
      query: (formData) => ({
        url: '/complaints/submit',
        method: 'POST',
        body: formData, // Sending FormData object for file support
      }),
      // Invalidate complaints list so the officer/admin sees the new entry
      invalidatesTags: ['Complaints'],
    }),
    trackComplaint: builder.query({
      query: (refId) => `/complaints/track/${refId}`,
      
    }),
    sendFeedback: builder.mutation({
      query: (feedbackData) => ({
        url: '/citizen/feedback',
        method: 'POST',
        body: feedbackData,
      }),
    })
  }),
});

export const {useLazyTrackComplaintQuery,useSendFeedbackMutation, useSubmitComplaintMutation } = citizenApi;