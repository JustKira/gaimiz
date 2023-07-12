import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/admin" }),
  endpoints: (builder) => ({
    createCompany: builder.mutation<void, Omit<Company, "docid">>({
      query: (updateValues) => ({
        url: "/laptop/company",
        method: "POST",
        body: updateValues,
      }),
    }),
    getCompany: builder.query<Company, { cid: string }>({
      query: ({ cid }) => `/laptop/company?cid=${cid}`,
    }),
    getAllCompanies: builder.query<{ data: Company[]; count: number }, void>({
      query: () => "/laptop/company",
    }),
    updateCompany: builder.mutation<
      void,
      { cid: string; updateValues: Partial<Company> }
    >({
      query: ({ cid, updateValues }) => ({
        url: `/laptop/company?cid=${cid}`,
        method: "PUT",
        body: updateValues,
      }),
    }),
    deleteCompany: builder.mutation<void, { cid: string }>({
      query: ({ cid }) => ({
        url: `/laptop/company?cid=${cid}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateCompanyMutation,
  useGetCompanyQuery,
  useGetAllCompaniesQuery,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} = adminApi;

export default adminApi;
