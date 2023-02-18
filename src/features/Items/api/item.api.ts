import { createApi } from "@reduxjs/toolkit/query/react";
import { authFetchBaseQuery } from "../../../common/utils/authFetchBaseQuery";

export interface IItem {
  collectionId: string;
  id: string;
  name: string;
  imgSrc: string;
  comments: [];
  likes: [];
  tags: [];
}

export const itemApi = createApi({
  reducerPath: "itemApi",
  baseQuery: authFetchBaseQuery,
  tagTypes: ["Item"],
  endpoints: (build) => ({
    getItems: build.query<IItem[], string>({
      query(id) {
        return {
          url: `/items/all/${id}`,
        };
      },
      providesTags: ["Item"],
    }),
    getItem: build.query<IItem, string>({
      query(id) {
        return {
          url: `/items/${id}`,
        };
      },
      providesTags: ["Item"],
    }),
    createItem: build.mutation<
      void,
      Omit<IItem, "id" | "comments" | "tags" | "likes">
    >({
      query(item) {
        return {
          url: `/items/${item.collectionId}`,
          method: "PUT",
          body: item,
        };
      },
      invalidatesTags: ["Item"],
    }),
    // deleteCollection: build.mutation<void, string>({
    //     query(id) {
    //         return {
    //             url: "/collections",
    //             method: "DELETE",
    //             body: { id },
    //         };
    //     },
    //     invalidatesTags: ["Collection"],
    // }),
  }),
});

export const { useCreateItemMutation, useGetItemsQuery, useGetItemQuery } =
  itemApi;
