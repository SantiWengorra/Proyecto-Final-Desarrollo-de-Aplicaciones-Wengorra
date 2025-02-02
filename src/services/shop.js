import { base_Url } from "../database";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react" 

export const shopApi = createApi({
    reducerPath: "shopApi",
    baseQuery:fetchBaseQuery({baseUrl:base_Url}),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: 'products.json'
            })
        }),
        getCategories: builder.query({
            query: () => ({
                url: 'categories.json'
            })
        }),
    })
})

export const { useGetCategoriesQuery, useGetProductsQuery, usePatchImageProfileMutation } = shopApi;