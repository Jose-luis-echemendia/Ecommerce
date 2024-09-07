import { Dashboard } from "../../hocs/Dashboard";
import { useWishlist } from "../../hooks/useWishlist";
import { useEffect } from "react";
import { CardProductInWishlist } from "../../components/dashboard/CardProductInWishlist";

export const ProductsInWishlist = () => {
  const { stateWishlist, getWishlistItems, getWishlistItemTotal } =
    useWishlist();

  useEffect(() => {
    getWishlistItemTotal(), getWishlistItems();
  }, []);

  const { items } = stateWishlist;

  return (
    <Dashboard>
      <div className="bg-white">
        <div className="max-w-7xlmx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-10">
            Favorite Products
          </h1>

          <section>
            <div className="grid grid-cols-3 gap-5">
            {items &&
              items !== null &&
              items !== undefined &&
              items.map((item) => (
                <CardProductInWishlist key={item.id} product={item.product}></CardProductInWishlist>
              ))}
              </div>
          </section>
        </div>
      </div>
    </Dashboard>
  );
};
