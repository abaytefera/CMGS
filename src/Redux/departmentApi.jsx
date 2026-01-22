import { APi } from "./CenteralAPI";

export const departmentApi = APi.injectEndpoints({
  endpoints: (builder) => ({
    // GET all departments
    getDepartments: builder.query({
      query: () => '/departments',
      providesTags: ['Department'],
      // Standardizing to target the 'data' array from the backend response
      transformResponse: (response) => response?.data || [], 
    }),
    // POST new department
    addDepartment: builder.mutation({
      query: (body) => ({
        url: '/departments',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Department'],
    }),
    // PATCH (Update) department
    updateDepartment: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/departments/${id}`,
        method: 'PATCH',
        body,
      }),
      // Invalidates 'Department' to refresh lists and 'Dashboard' to update stats
      invalidatesTags: ['Department', 'Dashboard'],
    }),
    // DELETE department
    deleteDepartment: builder.mutation({
      query: (id) => ({
        url: `/departments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Department', 'Dashboard'],
    }),
  }),
});

export const {
  useGetDepartmentsQuery,
  useAddDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentApi;