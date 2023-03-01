import { createApi } from "@reduxjs/toolkit/query/react";
import { authFetchBaseQuery } from "../../../common/utils/authFetchBaseQuery";
import { IItem } from "../../Items/api/item.api";

export interface IOptionalFields {
  name: string;
  type: string;
}

export interface ICollection {
  id: string;
  optionalFields: IOptionalFields[];
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
    getAllCollections: build.query<ICollection[], void>({
      query() {
        return {
          url: "/collections/all/collection",
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
    createCollection: build.mutation<
      void,
      Pick<ICollection, "name" | "description" | "imgSrc" | "theme">
    >({
      query(collection) {
        return {
          url: "/collections",
          method: "PUT",
          body: collection,
        };
      },
      invalidatesTags: ["Collection"],
    }),
    settingsCollection: build.mutation<
      void,
      {
        collectionId: string;
        settingsCollectionForm: Omit<ICollection, "id" | "date" | "items">;
      }
    >({
      query({ collectionId, settingsCollectionForm }) {
        return {
          url: `/collections/settings/${collectionId}`,
          method: "PUT",
          body: settingsCollectionForm,
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
    deleteItem: build.mutation<void, string[]>({
      query(id) {
        return {
          url: "/items",
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
  useGetAllCollectionsQuery,
  useSettingsCollectionMutation,
  useDeleteItemMutation,
} = collectionApi;
