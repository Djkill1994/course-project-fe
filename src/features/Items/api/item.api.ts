import { createApi } from "@reduxjs/toolkit/query/react";
import { authFetchBaseQuery } from "../../../common/utils/authFetchBaseQuery";

interface IComments {
  id: string;
  sender: string;
  comment: string;
  date: string;
}

interface ITags {
  id: string;
  tag: string;
}

interface ILikes {
  id: string;
  sender: string;
}

export interface IItem {
  id: string;
  name: string;
  imgSrc: string;
  comments: IComments[];
  likes: ILikes[];
  tags: ITags[];
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
    getAllItems: build.query<IItem[], void>({
      query() {
        return {
          url: "/items/all",
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
    getTags: build.query<ITags[], void>({
      query() {
        return {
          url: "/items/tag/all",
        };
      },
    }),
    createItem: build.mutation<
      void,
      { collectionId: string; newItem: Pick<IItem, "name" | "imgSrc" | "tags"> }
    >({
      query({ collectionId, newItem }) {
        return {
          url: `/items/${collectionId}`,
          method: "PUT",
          body: newItem,
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

export const {
  useCreateItemMutation,
  useGetItemsQuery,
  useGetItemQuery,
  useGetAllItemsQuery,
  useLazyGetAllItemsQuery,
  useGetTagsQuery,
  useLazyGetTagsQuery,
} = itemApi;
