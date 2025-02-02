import { base_Url } from "../database"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const ordersApi = createApi({
    reducerPath:"ordersApi",
    baseQuery:fetchBaseQuery({baseUrl:base_Url}),
    tagTypes:["newOrders", "addOrders"],
    endpoints:(builder)=> ({
        postOrders:builder.mutation({
            query:({localId,order}) => ({
                url:`orders/${localId}/.json`,
                method:"POST",
                body:order
            }),
            invalidatesTags:["newOrders"]
        }),
        getOrdersUser:builder.query({
            query:({localId}) => `orders/${localId}.json`,
            transformResponse:(response) => {
                if(!response){
                    return null
                }
                const data = Object.entries(response).map(item => ({...item[1],id:item[0]}))
                return data
            },
            providesTags:["newOrders"]
        }),
    })
})

export const {usePostOrdersMutation ,useGetOrdersUserQuery} = ordersApi