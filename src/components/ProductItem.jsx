import { useNavigate } from "react-router-dom";
import { formatMoney } from "../helpers";
import { useProductStore } from "../hooks";

export const ProductItem = ({ product }) => {
  const navigate = useNavigate()
  const { name, price, id } = product;
  const { startDeletingOneProduct,setActiveProduct } = useProductStore();
  return (
    <tr>
      <td className="py-8 md:py-4 text-center">{name}</td>
      <td className="text-center">{formatMoney(price)}</td>
      <td className="text-center xl:w-3/12 lg:w-4/12">
        <div className="flex justify-evenly md:gap-8 flex-col md:flex-row gap-2">
          <button className="bg-green-800 text-white text-lg rounded-lg shadow flex-auto md:text-2xl px-2 hover:bg-green-600" onClick={()=>{

            setActiveProduct(product)
            navigate(`/edit-product/${id}`)
          }}>
            EDITAR
          </button>
          <button
            className="bg-orange-500 text-white text-lg rounded-lg shadow flex-auto md:text-2xl px-2 hover:bg-orange-600"
            onClick={() => {
              startDeletingOneProduct(id);
            }}
          >
            ELIMINAR
          </button>
        </div>
      </td>
    </tr>
  );
};
