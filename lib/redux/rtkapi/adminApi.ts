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
    createModel: builder.mutation<
      void,
      { cid: string; createValues: Omit<Model, "docid" | "verified"> }
    >({
      query: ({ cid, createValues }) => ({
        url: `/laptop/model?cid=${cid}`,
        method: "POST",
        body: createValues,
      }),
    }),
    getModel: builder.query<Model, { cid: string; mid: string }>({
      query: ({ cid, mid }) => `/laptop/model?cid=${cid}?mid=${mid}`,
    }),
    getAllModels: builder.query<
      { data: Model[]; count: number },
      { cid: string }
    >({
      query: ({ cid }) => `/laptop/model?cid=${cid}`,
    }),
    updateModel: builder.mutation<
      void,
      { cid: string; mid: string; updateValues: Partial<Model> }
    >({
      query: ({ cid, mid, updateValues }) => ({
        url: `/laptop/model?cid=${cid}?mid=${mid}`,
        method: "PUT",
        body: updateValues,
      }),
    }),
    deleteModel: builder.mutation<void, { cid: string; mid: string }>({
      query: ({ cid, mid }) => ({
        url: `/laptop/model?cid=${cid}?mid=${mid}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateModelMutation,
  useGetModelQuery,
  useGetAllModelsQuery,
  useLazyGetAllModelsQuery,
  useUpdateModelMutation,
  useDeleteModelMutation,
  useCreateCompanyMutation,
  useGetCompanyQuery,
  useGetAllCompaniesQuery,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} = adminApi;

export default adminApi;
