import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: true,
    productsList: [
         ],
    products: [
        ],
    productSelected: {},
    alert: {
      error: null,
      msg: "",
    },
  },
  reducers: {
    onAddNewProduct: (state, { payload }) => {
      state.products.unshift(payload);
    },
    onActiveAlert: (state, { payload }) => {
      state.alert.error = payload.error;
      state.alert.msg = payload.msg;
    },
    onLoadEvents: (state, { payload = [] }) => {
      state.loading = false;
      state.productSelected = {}
      payload.forEach((product) => {
        const exist = state.products.some(
          (dbProduct) => dbProduct.id === product.id
        );
        if (!exist) {
          state.products.push(product);
        }
      });
    },
    onDeleteProduct: (state, { payload }) => {
      state.products = state.products.filter((value) => value.id !== payload);
    },
    onSetActiveProduct: (state, { payload }) => {
      state.productSelected = payload;
    },
    onUpdateEvent:(state,{payload})=>{
      state.products = state.products.map((value)=> value.id === payload.id ? payload : value)
    },
    onLoadProductsList: (state, { payload = [] }) => {
      state.loading = false;
      state.productSelected = {}
      state.productsList = payload
    },
  },
});
export const {
  onAddNewProduct,
  onActiveAlert,
  onLoadEvents,
  onDeleteProduct,
  onSetActiveProduct,
  onUpdateEvent,
  onLoadProductsList
} = productSlice.actions;

