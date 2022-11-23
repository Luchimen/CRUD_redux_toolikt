import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./";

export const store = configureStore({
  reducer: {
    products: productSlice.reducer,
  },
});
