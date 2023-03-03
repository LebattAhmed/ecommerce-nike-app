import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { cartSlice } from "./CartSlice";
import { productSlice } from './productSlice'

export const store = configureStore({

    reducer: {
        products: productSlice.reducer,
        cart : cartSlice.reducer,
        api: apiSlice.reducer,
    },

    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(apiSlice.middleware),

});