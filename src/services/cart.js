import { base_Url } from "../database";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
    reducerPath: "cartApi",
    baseQuery: fetchBaseQuery({ baseUrl: base_Url }),
    tagTypes: ["addProduct","deleteProduct"],
    endpoints: (builder) => ({
        getCart: builder.query({
            query: (localId) => `carts/${localId}.json`,
            providesTags: ["addProduct","deleteProduct"]
        }),
        postCart:builder.mutation({
            query:({localId,cartProduct}) => ({
                url:`carts/${localId}/${cartProduct.id}.json`,
                method:"PUT",
                body:cartProduct
            }),
            invalidatesTags:["addProduct"]
        }),
        deleteCartProduct:builder.mutation({
            query:({localId,productId})=> ({
                url:`carts/${localId}/${productId}.json`,
                method:"DELETE",
            }),
            invalidatesTags:["deleteProduct"]
        }),
        deleteCart:builder.mutation({
            query:({localId})=> ({
                url:`carts/${localId}.json`,
                method:"DELETE",
            }),
            invalidatesTags:["deleteProduct"]
        })
    }),
});

export const { useGetCartQuery, usePostCartMutation, useDeleteCartMutation, useDeleteCartProductMutation } = cartApi;