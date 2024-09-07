import { Layout } from "../../hocs/Layout";
import { useEffect, useState } from "react";
import { useCart } from "../../hooks/useCart";
import { SectionProducts } from "../../components/cart/sectionProducts";
import { CartInformation } from "../../components/cart/CartInformation";

export const Cart = () => {
  const [cartInfoTopOffset, setCartInfoTopOffset] = useState(0);
  const { stateCart, getItems, getTotal, getItemTotal } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => {
      // Calcula el desplazamiento del componente cartInformation
      const cartInfoTop = document
        .getElementById("cart-info")
        .getBoundingClientRect().top;
      setCartInfoTopOffset(cartInfoTop);
    };

    // Agrega el event listener para el scroll
    window.addEventListener("scroll", handleScroll);

    // Limpia el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    getItems(), getTotal(), getItemTotal()
  }, [stateCart.totalItems,]);


  return (
    <Layout>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Shopping Cart
          </h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
            <SectionProducts></SectionProducts>

            {/* Order summary */}

            <div
              id="cart-info"
              className="sticky top-0 lg:col-span-5 lg:pt-16 lg:pl-6"
            >
              <CartInformation totalCost={stateCart.totalCost} compareTotalCost={stateCart.compareTotalCost}></CartInformation>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
