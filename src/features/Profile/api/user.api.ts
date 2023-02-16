import { createApi } from "@reduxjs/toolkit/query/react";
import { authFetchBaseQuery } from "../../../common/utils/authFetchBaseQuery";
import { IUser } from "../../Admin/api/users.api";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: authFetchBaseQuery,
  tagTypes: ["User"],
  endpoints: (build) => ({
    authRefresh: build.query<IUser, void>({
      query() {
        return {
          url: "/auth/auth-user",
        };
      },
      providesTags: ["User"],
    }),
    editingProfileUser: build.mutation<
      void,
      Omit<IUser, "id" | "role" | "banned">
    >({
      query(data) {
        return {
          url: "/user",
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["User"],
    }),
    deleteUser: build.mutation<void, string>({
      query(id) {
        return {
          url: "/user",
          method: "DELETE",
          body: { id },
        };
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useAuthRefreshQuery,
  useEditingProfileUserMutation,
  useDeleteUserMutation,
} = userApi;
