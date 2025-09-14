import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const quickNotesApi = createApi({
  reducerPath: "quickNotesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/topics`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.user?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["QuickNotes"],
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => "/getNotes",
      transformResponse: (response) => response.topics || [],
      providesTags: ["QuickNotes"],
    }),
    addNote: builder.mutation({
      query: (topic) => ({
        url: "/topicNotes",
        method: "POST",
        body: { topic },
      }),
      invalidatesTags: ["QuickNotes"],
    }),
  }),
});

export const { useGetNotesQuery, useAddNoteMutation } = quickNotesApi;
