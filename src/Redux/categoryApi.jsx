import { APi } from "./CenteralAPI";

export const categoryApi = APi.injectEndpoints({
  endpoints: (builder) => ({
    // GET all categories
    getCategories: builder.query({
      query: () => '/categories',
      providesTags: ['Category'],
      // Updated to target the 'data' array in your API response
      transformResponse: (res) => res?.data || [], 
    }),
    // CREATE category
    createCategory: builder.mutation({
      query: (newCat) => ({
        url: '/categories',
        method: 'POST',
        body: newCat,
      }),
      // Invalidates both Category list and Dashboard stats
      invalidatesTags: ['Category', 'Dashboard'],
    }),
    // UPDATE/TOGGLE category
    updateCategory: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/categories/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: ['Category'],
    }),
  }),
});

export const { 
  useGetCategoriesQuery, 
  useCreateCategoryMutation, 
  useUpdateCategoryMutation 
} = categoryApi;