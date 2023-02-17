import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IRegistrationApi {
  userName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  avatarSrc: string;
}

export const registrationApi = createApi({
  reducerPath: "registrationApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL }),
  endpoints: (build) => ({
    registration: build.mutation<void, IRegistrationApi>({
      query(data) {
        return {
          url: "/auth/registration",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useRegistrationMutation } = registrationApi;
