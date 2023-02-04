import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseQueryFn } from "@reduxjs/toolkit/src/query/baseQueryTypes";
import { AUTH_TOKEN_KEY } from "../constans/localStorage";

export const authFetchBaseQuery: BaseQueryFn = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
