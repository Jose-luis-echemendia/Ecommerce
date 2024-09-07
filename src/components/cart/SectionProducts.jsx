
import { useCart } from "../../hooks/useCart";
import { ItemCart } from "./ItemCart";



export const SectionProducts = () => {
  const { stateCart } = useCart();

  const { items, totalItems } = stateCart;


  return (
    <>
      <section aria-labelledby="cart-heading" className="lg:col-span-7">
        <h2 id="cart-heading" className="sr-only">
          Items in your shopping cart
        </h2>

        <>
          {items && (
            <h4 className="text-gray-400 text-xl font-mono">
              your cart has {totalItems} items
            </h4>
          )}
        </>

        <ul
          role="list"
          className="border-t border-b border-gray-200 divide-y divide-gray-200"
        >
          {items && items !== null && items !== undefined ? (
            items.map((item) => (
              <li key={item.id} className="flex py-6 sm:py-10">
                <ItemCart item={item}></ItemCart>
              </li>
            ))
          ) : (
            <></>
          )}
        </ul>
      </section>
    </>
  );
};
