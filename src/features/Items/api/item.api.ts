import { createApi } from "@reduxjs/toolkit/query/react";
import { authFetchBaseQuery } from "../../../common/utils/authFetchBaseQuery";

interface ISender {
  userName: string;
  avatarSrc: string;
}

export interface IComment {
  id: string;
  sender: ISender;
  comment: string;
  date: string;
}

interface IAuthor {
  userName: string;
  avatarSrc: string;
}

interface ITag {
  id: string;
  tag: string;
}

export interface ILike {
  id: string;
  sender: string;
  count: number;
}

export interface IItem {
  id: string;
  author?: IAuthor;
  name: string;
  imgSrc: string;
  date: string;
  comments?: IComment[];
  likes: ILike;
  tags: ITag[];
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
    getTags: build.query<ITag[], void>({
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
    createComment: build.mutation<
      void,
      { itemId: string; newComment: IComment }
    >({
      query({ itemId, newComment }) {
        return {
          url: `/items/comment/${itemId}`,
          method: "PUT",
          body: newComment,
        };
      },
      invalidatesTags: ["Item"],
    }),

    like: build.mutation<void, { itemId: string; like: Pick<ILike, "sender"> }>(
      {
        query({ itemId, like }) {
          return {
            url: `/items/like/${itemId}`,
            method: "PUT",
            body: like,
          };
        },
        invalidatesTags: ["Item"],
      }
    ),

    unLike: build.mutation<
      void,
      { itemId: string; like: Pick<ILike, "sender"> }
    >({
      query({ itemId, like }) {
        return {
          url: `/items/unLike/${itemId}`,
          method: "PUT",
          body: like,
        };
      },
      invalidatesTags: ["Item"],
    }),

    settingsItem: build.mutation<
      void,
      { itemId: string; settingsItem: Pick<IItem, "name" | "imgSrc" | "tags"> }
    >({
      query({ itemId, settingsItem }) {
        return {
          url: `/items/settings/${itemId}`,
          method: "PUT",
          body: settingsItem,
        };
      },
      invalidatesTags: ["Item"],
    }),

    deleteItem: build.mutation<void, string[]>({
      query(id) {
        return {
          url: "/items",
          method: "DELETE",
          body: { id },
        };
      },
      invalidatesTags: ["Item"],
    }),
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
  useCreateCommentMutation,
  useDeleteItemMutation,
  useSettingsItemMutation,
  useLikeMutation,
  useUnLikeMutation,
} = itemApi;
