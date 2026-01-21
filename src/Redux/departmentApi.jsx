import { APi } from "./CenteralAPI";

export const departmentApi = APi.injectEndpoints({
  endpoints: (builder) => ({
    // GET all departments
    getDepartments: builder.query({
      query: () => '/departments',
      providesTags: ['Department'],
      transformResponse: (response) => response || [], // Real default value
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
      invalidatesTags: ['Department'],
    }),
    // DELETE department
    deleteDepartment: builder.mutation({
      query: (id) => ({
        url: `/departments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Department'],
    }),
  }),
});

export const {
  useGetDepartmentsQuery,
  useAddDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentApi;