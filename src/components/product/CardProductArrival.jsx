import { Link } from "react-router-dom";

export const CardProductArrival = ({ product }) => {
  return (
    <>
      <div className="group relative">
        <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
          <img
            src={product.photos[0]}
            alt={product.name}
            className="w-full h-full object-center object-cover lg:w-full lg:h-full"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <Link to={`/product/${product.id}`}>
                <span aria-hidden="true" className="absolute inset-0" />
                {product.name}
              </Link>
            </h3>
          </div>
          <p className="text-sm font-medium text-gray-900">$ {product.price}</p>
        </div>
      </div>
    </>
  );
};
