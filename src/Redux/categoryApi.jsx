import { APi } from "./CenteralAPI";

export const categoryApi = APi.injectEndpoints({
  endpoints: (builder) => ({
    // GET all categories
    getCategories: builder.query({
      query: () => '/categories',
      providesTags: ['Category'],
      transformResponse: (res) => res || [], // Real Default Value
    }),
    // CREATE category
    createCategory: builder.mutation({
      query: (newCat) => ({
        url: '/categories',
        method: 'POST',
        body: newCat,
      }),
      invalidatesTags: ['Category'],
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