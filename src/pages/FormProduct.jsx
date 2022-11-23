import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alerta } from "../components";
import { useForm, useProductStore } from "../hooks/";

export const FormProduct = () => {
  const [initialValue, setInitialValue] = useState({ name: "", price: "" });
  const { startSavinProduct, showAlert, alert, productSelected,onLoadOneProduct } = useProductStore();
   const {id} = useParams()
  useEffect(()=>{
    if(productSelected.id){
      setInitialValue(productSelected)
      return
    }else{
      setInitialValue({
        name: "", price: ""
      })
    }
  },[productSelected])
  useEffect(()=>{
    if(id){
      onLoadOneProduct(id)
    }
  },[])
  const { name, price, onInputChange, onResetForm, formState } =
  useForm(initialValue);
 
  const submitForm = async (e) => {
    e.preventDefault();
    if ([name, price].includes("")) {
      showAlert({
        error: true,
        msg: "Los campos deben ser obligatorios",
      });
      return;
    }
    await startSavinProduct(formState);
    onResetForm();
  };
  
  return (
    <form
      className="bg-white w-10/12 m-auto flex flex-col gap-2 rounded-lg shadow"
      onSubmit={submitForm}
    >
      <h2 className="text-4xl text-gray-600 text-center py-3">
        {productSelected.name ? "Editando Producto" : "Agregar nuevo producto"}
      </h2>
      <div className="w-11/12 m-auto">
        <label htmlFor="name" className="text-lg text-gray-500 block mb-3">
          Nombre del Producto
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Nombre del producto"
          className="block w-full border border-gray-200 outline-gray-500 rounded py-2 px-3 placeholder:text-gray-400 mb-3 "
          value={name}
          onChange={onInputChange}
        />
      </div>
      <div className="w-11/12 m-auto">
        <label htmlFor="price" className="text-lg text-gray-500 block mb-3">
          Precio del Producto
        </label>
        <input
          type="number"
          name="price"
          id="price"
          placeholder="Precio del producto"
          className="block w-full border border-gray-200 outline-gray-500 rounded py-2 px-3 placeholder:text-gray-400 mb-3"
          value={price}
          onChange={onInputChange}
        />
      </div>
      {alert.msg && <Alerta alert={alert} />}
      <input
        type="submit"
        value={productSelected.price ? "Editar Producto" : "Agregar Producto"}
        className="px-4 py-3 bg-sky-500 rounded-lg text-lg text-white font-semibold w-2/3 m-auto mb-6 cursor-pointer hover:bg-sky-600 transition-colors uppercase"
      />
    </form>
  );
};
