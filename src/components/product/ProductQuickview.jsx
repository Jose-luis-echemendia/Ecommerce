import { Fragment, useEffect, useState } from "react";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { useAddtoCart } from "../../hooks/useAddtoCart";
import { Modal } from "../Modal";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const ProductQuickview = ({ open, onClose, product }) => {
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedSizes, setSelectedSizes] = useState("XL");
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { handleAddtoCart } = useAddtoCart(
    product,
    setLoading,
    selectedColor,
    selectedSizes
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await handleAddtoCart();
      if (res === "this item is already in cart") {
        onClose();
        setOpenModal(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div className="text-center w-56">
          <ShoppingBagIcon size={56} className="mx-auto text-yellow-500" />
          <div className="mx-auto my-4 w-48">
            <h3 className="text-lg font-black text-gray-800">
              this item is already in cart
            </h3>
            <p className="text-sm text-gray-500">
              Do you want to check the shopping cart?
            </p>
          </div>
          <div className="flex gap-4">
            <button
              className="btn btn-danger w-full"
              onClick={(e) => (
                e.preventDefault(), navigate("/cart"), setOpenModal(false)
              )}
            >
              Continue
            </button>
            <button
              className="btn btn-light w-full"
              onClick={(e) => (e.preventDefault(), setOpenModal(false))}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
      <Transition.Root show={open} as={Fragment} className="z-50">
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                enterTo="opacity-100 translate-y-0 md:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              >
                <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                  <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                    <button
                      type="button"
                      className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                      onClick={onClose}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                      <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                        <img
                          src={product.photos[0]}
                          alt={product.name}
                          className="object-cover object-center"
                        />
                      </div>
                      <div className="sm:col-span-8 lg:col-span-7">
                        <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                          {product.name}
                        </h2>

                        <section
                          aria-labelledby="information-heading"
                          className="mt-2"
                        >
                          <h3 id="information-heading" className="sr-only">
                            Product information
                          </h3>

                          <p className="text-2xl text-gray-900">
                            $ {product.price}
                          </p>

                          {/* Reviews */}
                          <div className="mt-6">
                            <h4 className="sr-only">Reviews</h4>
                            <div className="flex items-center">
                              <div className="flex items-center">
                                {[0, 1, 2, 3, 4].map((rating) => (
                                  <StarIcon
                                    key={rating}
                                    className={classNames(
                                      product.rating > rating
                                        ? "text-gray-900"
                                        : "text-gray-200",
                                      "h-5 w-5 flex-shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </section>

                        <section
                          aria-labelledby="options-heading"
                          className="mt-4"
                        >
                          <h3 id="options-heading" className="sr-only">
                            Product options
                          </h3>

                          <div className="mt-2">
                            <h3 className="sr-only">Description</h3>

                            <div
                              className="text-base text-gray-700 space-y-6"
                              dangerouslySetInnerHTML={{
                                __html: product.description,
                              }}
                            />
                          </div>

                          <form onSubmit={onSubmit}>
                            {/* Colors */}
                            <div>
                              <h4 className="text-sm font-medium text-gray-900">
                                Color
                              </h4>

                              <RadioGroup
                                value={selectedColor}
                                onChange={setSelectedColor}
                                className="mt-4"
                              >
                                <RadioGroup.Label className="sr-only">
                                  Choose a color
                                </RadioGroup.Label>
                                <span className="flex items-center space-x-3">
                                  {product.colors.map((color) => (
                                    <RadioGroup.Option
                                      key={color}
                                      value={color}
                                      className={({ active, checked }) =>
                                        classNames(
                                          color.selectedClass,
                                          active && checked
                                            ? "ring ring-offset-1"
                                            : "",
                                          !active && checked ? "ring-2" : "",
                                          `ring-${color} relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none`
                                        )
                                      }
                                    >
                                      <RadioGroup.Label
                                        as="span"
                                        className="sr-only"
                                      >
                                        {color.name}
                                      </RadioGroup.Label>
                                      <span
                                        aria-hidden="true"
                                        className={`bg-${color} h-8 w-8 rounded-full border border-black border-opacity-10`}
                                      />
                                    </RadioGroup.Option>
                                  ))}
                                </span>
                              </RadioGroup>
                            </div>

                            <div className="flex flex-col space-y-2 items-center">
                              {!loading && product.quantity == 0 && (
                                <div className="mt-6 flex w-full items-center justify-center px-8 py-3 text-base font-medium">
                                  <p className="text-gray-500">
                                    Ships in 3-4 weeks
                                  </p>
                                </div>
                              )}
                              {!loading && product.quantity > 0 && (
                                <button
                                  type="submit"
                                  className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                  Add to bag
                                </button>
                              )}
                              {loading && (
                                <button
                                  type="button"
                                  className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                  <Oval
                                    visible={true}
                                    height="20"
                                    width="20"
                                    color="#fff"
                                    ariaLabel="oval-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                  />
                                </button>
                              )}

                              <Link
                                to={`/product/${product.id}`}
                                className="text-blue-600 font-medium hover:text-blue-900"
                              >
                                {" "}
                                View full details{" "}
                              </Link>
                            </div>
                          </form>
                        </section>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
