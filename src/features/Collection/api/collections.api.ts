import { createApi } from "@reduxjs/toolkit/query/react";
import { authFetchBaseQuery } from "../../../common/utils/authFetchBaseQuery";
import { ICollectionFieldsForm } from "../components/CollectionFields";

export interface IItem {
  id: string;
  name: string;
  imgSrc: string;
  comments: [];
  likes: [];
  tags: [];
}

export interface ICollection {
  id: string;
  fields: ICollectionFieldsForm[];
  optionFields: ICollectionFieldsForm[];
  name: string;
  description: string;
  theme: string;
  imgSrc?: string;
  date: string;
  items?: IItem[];
}

export const collectionApi = createApi({
  reducerPath: "collectionApi",
  baseQuery: authFetchBaseQuery,
  tagTypes: ["Collection"],
  endpoints: (build) => ({
    getCollections: build.query<ICollection[], void>({
      query() {
        return {
          url: "/collections",
        };
      },
      providesTags: ["Collection"],
    }),
    getCollection: build.query<ICollection, string>({
      query(id) {
        return {
          url: `/collections/${id}`,
        };
      },
      providesTags: ["Collection"],
    }),
    createCollection: build.mutation<void, Omit<ICollection, "id" | "date">>({
      query(collection) {
        return {
          url: "/collections",
          method: "PUT",
          body: collection,
        };
      },
      invalidatesTags: ["Collection"],
    }),
    deleteCollection: build.mutation<void, string>({
      query(id) {
        return {
          url: "/collections",
          method: "DELETE",
          body: { id },
        };
      },
      invalidatesTags: ["Collection"],
    }),
  }),
});

export const {
  useCreateCollectionMutation,
  useGetCollectionsQuery,
  useDeleteCollectionMutation,
  useGetCollectionQuery,
} = collectionApi;
