import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RideHistoryRecord } from "../types";

export const historyApi = createApi({
  reducerPath: "historyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_MOCKAPI_BASE_URL,
  }),
  tagTypes: ["RideHistory"],
  endpoints: (builder) => ({
    getRideHistory: builder.query<RideHistoryRecord[], void>({
      query: () => "/ride-history",
      transformResponse: (res: RideHistoryRecord[]) =>
        [...res].sort(
          (a, b) =>
            new Date(b.createdAt ?? 0).getTime() -
            new Date(a.createdAt ?? 0).getTime(),
        ),
      providesTags: ["RideHistory"],
    }),

    saveRideHistory: builder.mutation<
      RideHistoryRecord,
      Omit<RideHistoryRecord, "id" | "createdAt">
    >({
      query: (body) => ({ url: "/ride-history", method: "POST", body }),
      invalidatesTags: ["RideHistory"],
    }),
  }),
});

export const { useGetRideHistoryQuery, useSaveRideHistoryMutation } =
  historyApi;
