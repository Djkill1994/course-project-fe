import { createApi } from "@reduxjs/toolkit/query/react";
import { authFetchBaseQuery } from "../../../common/utils/authFetchBaseQuery";

type Role = "admin" | "user";

export interface IUser {
  id: string;
  email: string;
  username: string;
  banned: boolean;
  avatarSrc: string;
  roles: Role[];
}

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: authFetchBaseQuery,
  tagTypes: ["User"],
  endpoints: (build) => ({
    authRefresh: build.query<IUser, void>({
      query() {
        return {
          url: "/auth/auth-user",
        };
      },
    }),
    getUsers: build.query<IUser[], void>({
      query() {
        return {
          url: "/admin/users",
        };
      },
      providesTags: ["User"],
    }),
    deleteUser: build.mutation<void, string[]>({
      query(ids) {
        return {
          url: "/admin/users",
          method: "DELETE",
          body: { ids },
        };
      },
      invalidatesTags: ["User"],
    }),
    banUser: build.mutation<void, string[]>({
      query(ids) {
        return {
          url: "/admin/users/ban",
          method: "POST",
          body: { ids },
        };
      },
      invalidatesTags: ["User"],
    }),
    unBanUser: build.mutation<void, string[]>({
      query(ids) {
        return {
          url: "/admin/users/unban",
          method: "POST",
          body: { ids },
        };
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useDeleteUserMutation,
  useBanUserMutation,
  useUnBanUserMutation,
  useAuthRefreshQuery,
} = usersApi;
