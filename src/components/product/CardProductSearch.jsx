import React from "react";
import { Link } from "react-router-dom";

export const CardProductSearch = ({ product }) => {
  return (
    <>
      <div className="group relative border-black border-spacing-1.5 bg-gray-50 shadow p-4 rounded-md">
        <div className="w-full aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
          <img
            src={product.photos[0]}
            alt={product.name}
            className="w-full h-full object-center object-cover lg:w-36 lg:h-36 mx-auto mt-5 rounded-xl"
          />
        </div>
        <div className="flex flex-col mt-12 items-center justify-center text-center space-y-6">
          <div>
            <h3 className="text-md text-black">
              <Link to={`/product/${product.id}`}>
                <span aria-hidden="true" className="absolute inset-0" />
                {product.name}
              </Link>
            </h3>
          </div>
          <div>
            <span>⭐⭐⭐⭐⭐</span>
            <p className="text-sm text-gray-400">20 reviews</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 mb-5">
              $ {product.price}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
