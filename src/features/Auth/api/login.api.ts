import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IAuthRecord {
  status: boolean;
}

interface ILoginApiResponse {
  token: string;
  record: IAuthRecord;
}

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL }),
  endpoints: (build) => ({
    login: build.mutation<
      ILoginApiResponse,
      { email: string; password: string }
    >({
      query(data) {
        return {
          url: "/auth/login",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useLoginMutation } = loginApi;
