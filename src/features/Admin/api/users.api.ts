import { createApi } from "@reduxjs/toolkit/query/react";
import { authFetchBaseQuery } from "../../../common/utils/authFetchBaseQuery";

export interface IUser {
  id: string;
  email: string;
  username: string;
  banned: boolean;
  avatarSrc: string;
  roles: string;
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
    deleteUser: build.mutation<void, string>({
      query(id) {
        return {
          url: "/admin/users",
          method: "DELETE",
          body: { id },
        };
      },
      invalidatesTags: ["User"],
    }),
    banUser: build.mutation<void, string>({
      query(id) {
        return {
          url: "/admin/users/ban",
          method: "POST",
          body: { id },
        };
      },
      invalidatesTags: ["User"],
    }),
    unBanUser: build.mutation<void, string>({
      query(id) {
        return {
          url: "/admin/users/unban",
          method: "POST",
          body: { id },
        };
      },
      invalidatesTags: ["User"],
    }),
    appointAdmin: build.mutation<void, string>({
      query(id) {
        return {
          url: "/admin/users/appoint-admin",
          method: "POST",
          body: { id },
        };
      },
      invalidatesTags: ["User"],
    }),
    removeAdmin: build.mutation<void, string>({
      query(id) {
        return {
          url: "/admin/users/remove-admin",
          method: "POST",
          body: { id },
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
  useAppointAdminMutation,
  useRemoveAdminMutation,
} = usersApi;
