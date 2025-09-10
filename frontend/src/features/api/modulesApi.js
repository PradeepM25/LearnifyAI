import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const modulesApi = createApi({
  reducerPath: "modulesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/modules",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.user?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Modules"],
  endpoints: (builder) => ({
    getModules: builder.query({
      query: () => "/getAll",
      transformResponse: (response) => response.modules || [],
      providesTags: ["Modules"],
    }),
    addModule: builder.mutation({
      query: ({ title, difficulty }) => ({
        url: "/generate",
        method: "POST",
        body: { title, difficulty },
      }),
      invalidatesTags: ["Modules"],
    }),
  }),
});

export const { useGetModulesQuery, useAddModuleMutation } = modulesApi;
