import {useEffect} from 'react'
import { Link } from "react-router-dom";
import { useProductStore } from "../hooks";

export const Header = () => {
  const {setActiveProduct,startLoadingProducts} = useProductStore()

  useEffect(() => {
    const loadingInfo = async ()=>{
      await startLoadingProducts();
    }
    loadingInfo()
  }, []);
  return (
    <header className="bg-green-800 py-5 flex gap-6 flex-col md:flex-row justify-between items-center">
      <Link to="/" className="text-3xl text-white px-2 font-semibold">
        CRUD - REACT,REDUX TOOLKIT, REST API & AXIOS
      </Link>
      <Link
        to="/add-product"
        className="py-4 px-3 bg-orange-500 text-white text-lg uppercase rounded-lg shadow font-semibold md:mr-3"
         onClick={()=>{
         setActiveProduct({})
        }}
      >
        Agregar Producto +
      </Link>
    </header>
  );
};
