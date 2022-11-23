import { useEffect, useState } from "react"
import { useProductStore } from "../hooks"


export const Pagination = () => {

    const { products,startLoadingProductsList} =useProductStore()
    

    const [pagination, setPagination] = useState(1)

    const [num, setNum] = useState(1)
    let [cur, setCur] = useState(1)
    let totalPages = Math.ceil(products.length/5);
    //const [pages, setPages] = useState([])
    let pages = []
    for (let index = 0; index < totalPages; index++) {
        pages = [ ...pages,
        {page: num + index}
        ]
    }
    const handlePagination = (value)=>{
        if(pagination === 1 && value === -1){
          return
        }
        if(pagination === Math.ceil(products.length/5) && value === +1){
          return
        }
            setCur(pagination+value)
          setPagination(pagination + value)
      }
    const next = async ()=>{
        handlePagination(1)
    }
    useEffect(()=>{
        startLoadingProductsList(pagination)
    },[pagination])
  return (
    <div className="flex rounded-lg mt-10 justify-center">
         <button onClick={()=>{
            handlePagination(-1);
         }} className="h-12 border-2 border-r-0 border-green-600
               px-4 rounded-l-lg hover:bg-green-600 hover:text-white">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" fillRule="evenodd"></path>
            </svg>
         </button>
         {
           
         
            pages.map((pg, i) => (
               <button key={i} onClick={() => {setCur(pg.page); setPagination(pg.page)}} className={`h-12 border-2 border-r-0 border-green-600
               w-12 ${cur === pg.page && 'bg-green-600 text-white'}`}>{pg.page}</button>
            ))
         }
         <button onClick={next} className="h-12 border-2  border-green-600
               px-4 rounded-r-lg hover:bg-green-600 hover:text-white">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" fillRule="evenodd"></path></svg>
         </button>
      </div>
  )
}
