import { createApi } from "@reduxjs/toolkit/query/react";
import { authFetchBaseQuery } from "../../../common/utils/authFetchBaseQuery";

export interface ICollection {
  id: string;
  name: string;
  description: string;
  theme: string;
  imgSrc: string;
}

export const collectionApi = createApi({
  reducerPath: "collectionApi",
  baseQuery: authFetchBaseQuery,
  tagTypes: ["Collection"],
  endpoints: (build) => ({
    getCollections: build.query<ICollection[], void>({
      query() {
        return {
          url: "/collection/my",
        };
      },
      providesTags: ["Collection"],
    }),
    createCollection: build.mutation<void, Omit<ICollection, "id">>({
      query(collection) {
        return {
          url: "/collection/create",
          method: "POST",
          body: collection,
        };
      },
      invalidatesTags: ["Collection"],
    }),
  }),
});

export const { useCreateCollectionMutation, useGetCollectionsQuery } =
  collectionApi;
