import { useEffect } from "react";
import { Alerta, Pagination, ProductItem } from "../components";
import { useProductStore } from "../hooks";

export const ListItems = () => {
  const { loading, productsList } = useProductStore();


  if (loading) return <Alerta alert={{ error: false, msg: "Cargando" }} />;

  return (
    <>
      <h2 className="text-4xl text-gray-600 text-center py-3 mb-5">
        Listado de productos
      </h2>
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-green-800 text-white text-xl">
            <th className="py-2">Nombre</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-gray-200">
          {productsList?.map((product) => (
            <ProductItem product={product} key={product.id} />
          ))}
        </tbody>
      </table>
      <Pagination/>
    </>
  );
};
