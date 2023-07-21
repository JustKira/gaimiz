import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useEffect } from "react";

// Create the gaimizApi instance
export const gaimizApi = createApi({
  reducerPath: "gaimizApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/gaimiz" }),
  endpoints: (builder) => ({
    //SECTION - ORDER
    getCurrentLaptopOrder: builder.query<{ data: LaptopOrder }, string>({
      query: (uid) => ({
        url: `order/laptop/create?uid=${uid}`,
        method: "GET",
      }),
    }),
    updateLaptopOrder: builder.mutation<
      void,
      { did: string; body: Partial<LaptopOrder> }
    >({
      query: ({ did, body }) => ({
        url: `order/laptop/create?did=${did}`,
        method: "PATCH",
        body: { ...body },
      }),
    }),
    //SECTION - COMPANY
    // Create a company
    createCompany: builder.mutation<void, Omit<Company, "docid">>({
      query: (updateValues) => ({
        url: "/laptop/company",
        method: "POST",
        body: updateValues,
      }),
    }),
    // Get a company by ID
    getCompany: builder.query<Company, { cid: string }>({
      query: ({ cid }) => `/laptop/company?cid=${cid}`,
    }),
    // Get all companies
    getAllCompanies: builder.query<{ data: Company[]; count: number }, void>({
      query: () => "/laptop/company",
    }),
    // Update a company
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
    // Delete a company
    deleteCompany: builder.mutation<void, { cid: string }>({
      query: ({ cid }) => ({
        url: `/laptop/company?cid=${cid}`,
        method: "DELETE",
      }),
    }),
    // Create a model
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

    //SECTION - MODELS
    // Get a model by ID
    getModel: builder.query<Model, { cid: string; mid: string }>({
      query: ({ cid, mid }) => `/laptop/model?cid=${cid}?mid=${mid}`,
    }),
    // Get all models for a company
    getAllModels: builder.query<
      { data: Model[]; count: number },
      { cid: string }
    >({
      query: ({ cid }) => `/laptop/model?cid=${cid}`,
    }),
    // Update a model
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
    // Delete a model
    deleteModel: builder.mutation<void, { cid: string; mid: string }>({
      query: ({ cid, mid }) => ({
        url: `/laptop/model?cid=${cid}?mid=${mid}`,
        method: "DELETE",
      }),
    }),

    //SECTION - DESIGNS
    // Create a design
    createDesign: builder.mutation<void, Omit<Design, "docid">>({
      query: (createValues) => ({
        url: "/designs/",
        method: "POST",
        body: createValues,
      }),
    }),
    // Get a design by ID
    getDesign: builder.query<Design, { did: string }>({
      query: ({ did }) => `/designs/?did=${did}`,
    }),
    // Get all designs
    getAllDesigns: builder.query<
      { data: Design[]; firstDoc?: string; lastDoc?: string; count: number },
      { nextid?: string; previd?: string; limit: number }
    >({
      query: ({ nextid, previd, limit }) =>
        `/designs?limit=${limit}${nextid ? `&nextid=${nextid}` : ""}${
          previd ? `&previd=${previd}` : ""
        }`,
    }),
    // Update a design
    updateDesign: builder.mutation<
      void,
      { did: string; updateValues: Partial<Design> }
    >({
      query: ({ did, updateValues }) => ({
        url: `/designs/?did=${did}`,
        method: "PUT",
        body: updateValues,
      }),
    }),
    // Delete a design
    deleteDesign: builder.mutation<void, { did: string }>({
      query: ({ did }) => ({
        url: `/designs/?did=${did}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Destructure and export the generated hooks
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
  useCreateDesignMutation,
  useGetDesignQuery,
  useGetAllDesignsQuery,
  useLazyGetAllDesignsQuery,
  useUpdateDesignMutation,
  useDeleteDesignMutation,
  useLazyGetCurrentLaptopOrderQuery,
  useUpdateLaptopOrderMutation,
} = gaimizApi;

export default gaimizApi;
