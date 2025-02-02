import { auth_base_url, api_key } from "../database";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl: auth_base_url }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (credentials) => ({
        url: `accounts:signUp?key=${api_key}`,
        method: "POST",
        body: credentials,
      }),
    }),
    Login: builder.mutation({
      query: (credentials) => ({
        url: `accounts:signInWithPassword?key=${api_key}`,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useSignUpMutation, useLoginMutation } = authApi;