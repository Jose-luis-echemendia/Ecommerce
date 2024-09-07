import {useState} from "react";
import { ProductQuickview } from "../product/ProductQuickview"; 

export const CardProduct = ({ product }) => {
    
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="group relative">
        <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
          <img
            src={product.photos[0]}
            alt={product.name}
            className="w-full h-full object-center object-cover lg:w-full lg:h-full"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-white text-lg font-bold bg-black bg-opacity-50 p-2 rounded">Check Quick View</p>
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <button onClick={()=>setOpen(true)}>
                <span aria-hidden="true" className="absolute inset-0" />
                {product.name}
              </button>
            </h3>
          </div>
          <p className="text-sm font-medium text-gray-900">{product.price}</p>
          <ProductQuickview open={open} onClose={()=>setOpen(false)} product={product}></ProductQuickview>
        </div>
      </div>
    </div>
  );
};
