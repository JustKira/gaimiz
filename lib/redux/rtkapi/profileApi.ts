import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Replace with your API base URL

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    createProfile: builder.mutation<
      void,
      { uid: string; updateValues: Profile }
    >({
      query: ({ uid, updateValues }) => ({
        url: `profile?uid=${uid}`,
        method: "POST",
        body: updateValues,
      }),
    }),
    getProfile: builder.query<Profile, string>({
      query: (uid) => `profile?uid=${uid}`,
    }),
    deleteProfile: builder.mutation<void, string>({
      query: (uid) => ({
        url: `profile?uid=${uid}`,
        method: "DELETE",
      }),
    }),
    updateProfile: builder.mutation<
      void,
      { uid: string; updateValues: Partial<Profile> }
    >({
      query: ({ uid, updateValues }) => ({
        url: `profile?uid=${uid}`,
        method: "PUT",
        body: updateValues,
      }),
    }),
  }),
});

export const {
  useCreateProfileMutation,
  useGetProfileQuery,
  useDeleteProfileMutation,
  useUpdateProfileMutation,
} = profileApi;

export default profileApi;
