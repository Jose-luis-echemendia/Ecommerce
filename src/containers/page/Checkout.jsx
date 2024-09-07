import { Layout } from "../../hocs/Layout";
import { useEffect, useState } from "react";
import { useCart } from "../../hooks/useCart";
import { ContactInformation } from "../../components/checkout/ContactInformation";
import { CheckoutProducts } from "../../components/checkout/CheckoutProducts";
import { useShipping } from "../../hooks/useShipping";
import { initialOrderForm } from "../../helpers/formInitialState";
import { useForm } from "../../hooks/useForm";
import { countries } from "../../helpers/fixedCountry";
import { Modal } from "../../components/Modal";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { Navigate } from "react-router-dom";
import { usePayment } from "../../hooks/usePayment";
import { useCoupon } from "../../hooks/useCoupon";

export const Checkout = () => {
  const [cartInfoTopOffset, setCartInfoTopOffset] = useState(0);
  const { stateCart, getItems, getTotal, getItemTotal } = useCart();
  const { stateCoupon, checkCoupon } = useCoupon();
  const { stateShipping, getShipping } = useShipping();
  const { statePayment, getPaymentTotal, processPayment } = usePayment();
  const { formState, onInputChange, setFormState } = useForm(initialOrderForm);
  const [selectedShipping, setSelectedShipping] = useState({ id: 0, price: 0 });
  const [openModalShipping, setOpenModalShipping] = useState(false);
  const [openModalItems, setOpenModalItems] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [taxe, setTaxe] = useState();


  const { totalAfterCoupon, originalPrice } = statePayment;


  useEffect(() => {
    window.scrollTo(0, 0);

    setRedirect(false);

    getShipping();

    const handleScroll = () => {
      // Calcula el desplazamiento del componente cartInformation
      const cartInfoTop = document
        .getElementById("checkout-product")
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
    getItems(), getTotal(), getItemTotal();
  }, [stateCart.totalItems]);

  useEffect(() => {
    if (formState.country.length > 1) {
      setTaxe(
        countries.filter((country) => country.name === formState.country)[0]
          .taxe
      );
    }
  }, [formState.country]);

  useEffect(() => {
    if (
      stateCoupon.coupon &&
      stateCoupon.coupon !== null &&
      stateCoupon.coupon !== undefined
    ) {
      getPaymentTotal(selectedShipping.id, stateCoupon.coupon.name, taxe);
    } else {
      getPaymentTotal(selectedShipping.id, "default", taxe);
    }
  }, [selectedShipping.id, stateCoupon.coupon, taxe, stateCart.totalItems]);

  const sendOrder = (e) => {
    e.preventDefault();
    if (stateCart.items.length === 0) {
      setOpenModalItems(true);
      return;
    }
    if (selectedShipping.id === 0 || selectedShipping.price === 0) {
      setOpenModalShipping(true);
      return;
    }
    processPayment(formState, totalAfterCoupon, originalPrice, selectedShipping.id, taxe);
    setRedirect(true);
  };

  if (redirect && stateCart.totalItems === 0)
    return <Navigate to="/shopping"></Navigate>;
  if (redirect && statePayment.madePayment)
    return <Navigate to="/thanks"></Navigate>;

  return (
    <Layout>
      <div className="bg-white -mx-16">
        <>
          <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <form action="" onSubmit={sendOrder}>
              <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
                <div
                  className="sticky top-0 lg:col-span-5 lg:pt-16 lg:pl-6"
                  id="checkout-product"
                >
                  <ContactInformation
                    shipping={stateShipping.shipping}
                    formState={formState}
                    onInputChange={onInputChange}
                    selectedShipping={selectedShipping}
                    setSelectedShipping={setSelectedShipping}
                  ></ContactInformation>
                </div>

                {/* Order summary */}

                <CheckoutProducts
                  shippingPrice={selectedShipping && selectedShipping.price}
                  coupon={formState.couponName}
                  onInputChange={onInputChange}
                ></CheckoutProducts>
              </div>
            </form>
          </div>
        </>
      </div>

      <Modal
        open={openModalShipping}
        onClose={() => setOpenModalShipping(false)}
      >
        <div className="text-center w-56">
          <CheckCircleIcon size={56} className="mx-auto text-yellow-500" />
          <div className="mx-auto my-4 w-48">
            <h3 className="text-lg font-black text-gray-800">Confirm option</h3>
            <p className="text-sm text-gray-500">
              Please, check options shipping and selected
            </p>
          </div>
          <div className="flex gap-4">
            <button
              className="btn btn-danger w-full"
              onClick={(e) => (e.preventDefault(), setOpenModalShipping(false))}
            >
              Confirm
            </button>
            <button
              className="btn btn-light w-full"
              onClick={(e) => (e.preventDefault(), setOpenModalShipping(false))}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
      <Modal open={openModalItems} onClose={() => setOpenModalItems(false)}>
        <div className="text-center w-56">
          <CheckCircleIcon size={56} className="mx-auto text-yellow-500" />
          <div className="mx-auto my-4 w-48">
            <h3 className="text-lg font-black text-gray-800">
              Confirm continue
            </h3>
            <p className="text-sm text-gray-500">Find products to buy</p>
          </div>
          <div className="flex gap-4">
            <button
              className="btn btn-danger w-full"
              onClick={(e) => (
                e.preventDefault(), setRedirect(true), setOpenModalItems(false)
              )}
            >
              Confirm
            </button>
            <button
              className="btn btn-light w-full"
              onClick={(e) => (e.preventDefault(), setOpenModalItems(false))}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};
