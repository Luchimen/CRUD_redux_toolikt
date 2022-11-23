import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { clienteAxios } from "../config";
import { idGenerator } from "../helpers";
import {
  onActiveAlert,
  onLoadEvents,
  onDeleteProduct,
  onAddNewProduct,
  onSetActiveProduct,
  onUpdateEvent,
  onLoadProductsList,
} from "../store";

export const useProductStore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { loading, alert, products,productSelected,productsList } = useSelector((state) => state.products);

  const startSavinProduct = async (product) => {    
    try {
      if(product.id){
        const {data} = await clienteAxios.put(`products/${product.id}`,product)
        dispatch(onUpdateEvent(data))
      }else{
        product.id = idGenerator();
        const { data } = await clienteAxios.post("/products", { ...product });
        dispatch(onAddNewProduct({ ...product }));
      }     
    } catch (error) {
      console.log(error);
    }
    navigate("/")
  };
  const startLoadingProducts = async () => {
    try {
      const { data } = await clienteAxios("/products");
      dispatch(onLoadEvents(data));
    } catch (error) {
      console.log(error);
    }
  };
  const startLoadingProductsList =  async (pagination =1)=>{
    try {
      console.log(pagination);
      const { data } = await clienteAxios(`/products?_page=${pagination}&_limit=5`);
      dispatch(onLoadProductsList(data));
    } catch (error) {
      console.log(error);
    }
  }
  const startDeletingOneProduct = (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          await clienteAxios.delete(`/products/${id}`);
          dispatch(onDeleteProduct(id));
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const onLoadOneProduct = async (id)=>{
    try {
      const {data} = await clienteAxios(`/products/${id}`)
      dispatch(onSetActiveProduct(data));
    } catch (error) {
      console.log(error);
    }
  }
  const setActiveProduct = (product={}) => {
    dispatch(onSetActiveProduct(product));
  };
  const showAlert = (alert) => {
    dispatch(onActiveAlert(alert));
    setTimeout(() => {
      dispatch(
        onActiveAlert({
          error: null,
          msg: "",
        })
      );
    }, 1500);
  };

  return {
    startSavinProduct,
    loading,
    showAlert,
    alert,
    startLoadingProducts,
    products,
    startDeletingOneProduct,
    setActiveProduct,
    productSelected,
    onLoadOneProduct,
    productsList,
    startLoadingProductsList,
  };
};
