import React from "react";
import { Link } from "react-router-dom";

export const CardProductSold = ({product}) => {
  return (
    <>
      <div className="group relative">
        <div className="w-full min-h-96 rounded-lg overflow-hidden group-hover:opacity-75 sm:h-auto sm:aspect-w-2 sm:aspect-h-3">
          <img
            src={product.photos[0]}
            alt={product.name}
            className="w-full h-96 object-center object-cover"
          />
        </div>
        <h3 className="mt-4 text-base font-semibold text-gray-900">
          <Link to={`product/${product.id}`}>
            <span className="absolute inset-0" />
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-gray-500">$ {product.price}</p>
      </div>
    </>
  );
};
