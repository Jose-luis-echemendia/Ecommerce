import { useEffect } from "react";
import { useProduct } from "../../hooks/useProduct";
import { CardProduct } from "../store/CardProduct";
import { useFilters } from "../../hooks/useFilters";

export const Products = () => {
  
  const { filters, HandleChangeisFiltered } = useFilters()
  const { stateProduct, getProducts } = useProduct();

  useEffect(() => {
    getProducts();
    HandleChangeisFiltered(false)
  }, []);

  const { products: allProducts  , filteredProducts } = stateProduct;
  
  const showProducts = () => {
    if(
      filters.filtered &&
      filteredProducts &&
      filteredProducts !== null &&
      filteredProducts !== undefined
    ){
      return filteredProducts
    }else if(
      !filters.filtered &&
      allProducts &&
      allProducts !== null &&
      allProducts !== undefined
    ){
      return allProducts
    }else{
      return null
    }
  }
 
  return (
    <>
      <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {showProducts() !== null ? (
          showProducts().map((product) => (
            <CardProduct key={product.id} product={product}></CardProduct>
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
