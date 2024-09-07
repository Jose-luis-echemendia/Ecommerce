import { useCart } from "../../hooks/useCart";
import { ItemCheckout } from "./ItemCheckout";
import { usePayment } from "../../hooks/usePayment";

import { TicketIcon } from "@heroicons/react/24/solid";
import { useCoupon } from "../../hooks/useCoupon";

export const CheckoutProducts = ({ shippingPrice, coupon, onInputChange }) => {
  const { stateCart } = useCart();

  const { items } = stateCart;

  const { stateCoupon, checkCoupon } = useCoupon();
  const { statePayment } = usePayment();
  const { originalPrice, totalAfterCoupon, totalCost, estimatedTax } =
    statePayment;

  const applicateCupon = () => {
    if (coupon.length > 0) return checkCoupon(coupon);
  };


  return (
    <>
      <section aria-labelledby="cart-heading" className="lg:col-span-7">
        <h2 className="p-2 font-semibold text-xl">Order summary</h2>

        <ul
          role="list"
          className="border border-gray-200 shadow-2xl rounded-xl px-5 mt-6 b divide-y divide-gray-200"
        >
          {items && items !== null && items !== undefined ? (
            items.map((item) => (
              <li key={item.id} className="flex py-6 sm:py-10">
                <ItemCheckout item={item}></ItemCheckout>
              </li>
            ))
          ) : (
            <></>
          )}
          <div className="flex flex-col items-center justify-between py-7 px-3">
            <form>
              <div className="flex justify-center mb-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Discount Coupon
                </label>
              </div>
              <div className="mt-1 flex rounded-md shadow-sm">
                <div className="relative flex items-stretch flex-grow focus-within:z-10 shadow-2x">
                  <input
                    name="couponName"
                    required
                    type="text"
                    onChange={onInputChange}
                    value={coupon}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-4 sm:text-sm border-gray-300 border-2"
                    placeholder="Enter Code"
                  />
                </div>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault(), applicateCupon();
                  }}
                  className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <TicketIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <span>Apply Coupon</span>
                </button>
              </div>
            </form>

            {stateCoupon.coupon &&
              stateCoupon.coupon !== null &&
              stateCoupon.coupon !== undefined && (
                <>
                  <div className="text-green-500 bg-green-50 px-2 rounded-lg mt-1.5">
                    <p>Coupon: {stateCoupon.coupon.name} is applied.</p>
                  </div>
                </>
              )}
          </div>

          <div className="flex flex-col mt-2 space-y-2 px-3">
            <div className="flex justify-between mt-6">
              <div>
                <p className="">Sub total</p>
              </div>
              <div>
                <p className="font-medium text-gray-900 text-xl">
                  ${originalPrice}
                </p>
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <p className="">Shipping</p>
              </div>
              <div>
                <p className="font-medium text-gray-900 text-xl">
                  ${shippingPrice && shippingPrice}
                </p>
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <p className="">Estimated Tax</p>
              </div>
              <div>
                <p className="font-medium text-gray-900 text-xl">
                  ${estimatedTax}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 px-3">
            <div className="flex justify-between my-4">
              <div>
                <p className="">Total</p>
              </div>
              <div>
                <p className="font-medium text-gray-900 text-xl">
                  ${totalCost}
                </p>
              </div>
            </div>
            {stateCoupon.coupon &&
              stateCoupon.coupon !== null &&
              stateCoupon.coupon !== undefined && (
                <div className="flex justify-between my-4">
                  <div>
                    <p className="">Discounted Total</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-xl">
                      ${parseFloat(totalAfterCoupon)}
                    </p>
                  </div>
                </div>
              )}
          </div>

          <div className="mt-6 px-3">
            <div className="w-full my-4">
              <>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 font-serif border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                >
                  Confirm Order
                </button>
              </>
            </div>
          </div>
        </ul>
      </section>
    </>
  );
};
