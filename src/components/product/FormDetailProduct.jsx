import { HeartIcon } from "@heroicons/react/24/outline";
import {
  HeartIcon as CorazonRellenito,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import { RadioGroup } from "@headlessui/react";
import { useState, useEffect } from "react";
import { Oval } from "react-loader-spinner";
import { useProduct } from "../../hooks/useProduct";
import { useAddtoCart } from "../../hooks/useAddtoCart";
import { useNavigate } from "react-router-dom";
import { Modal } from "../Modal";
import { useWishlist } from "../../hooks/useWishlist";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const FormDetailProduct = ({ colors, sizes, productId }) => {
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedSizes, setSelectedSizes] = useState("X");
  const [openModal, setOpenModal] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { stateWishlist, addWishlistItem, removeWishlistItem } = useWishlist();
  const { stateProduct } = useProduct();
  const { product } = stateProduct;

  const { items } = stateWishlist;

  const { handleAddtoCart } = useAddtoCart(
    product,
    setLoading,
    selectedColor,
    selectedSizes
  );

  useEffect(() => {
    if (items && items !== null && items !== undefined) {
      items.map((item) => {
        if (item.product.id === productId) {
          setInWishlist(true);
        }
      });
    }
  }, [stateWishlist]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await handleAddtoCart();
      if (res === "this item is already in cart") {
        setOpenModal(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <form className="mt-6" onSubmit={onSubmit}>
        <div className="flex flex-col space-y-4">
          {/* Colors */}
          <div>
            <h3 className="text-sm text-gray-600">Color</h3>

            <RadioGroup
              value={selectedColor}
              onChange={setSelectedColor}
              className="mt-2"
            >
              <RadioGroup.Label className="sr-only">
                Choose a color
              </RadioGroup.Label>
              <div className="flex items-center space-x-3">
                {colors.map((color) => (
                  <RadioGroup.Option
                    key={color}
                    value={color}
                    className={({ active, checked }) =>
                      classNames(
                        color.selectedColor,
                        active && checked ? "ring ring-offset-1" : "",
                        !active && checked ? "ring-2" : "",
                        `ring-${color} -m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none`
                      )
                    }
                  >
                    <RadioGroup.Label as="p" className="sr-only">
                      {color}
                    </RadioGroup.Label>
                    <span
                      aria-hidden="true"
                      className={`bg-${color} h-8 w-8 border border-black border-opacity-10 rounded-full`}
                    />
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </div>
          <div>
            <h3 className="text-sm text-gray-600 mb-2">Sizes</h3>
            <RadioGroup value={selectedSizes} onChange={setSelectedSizes}>
              <RadioGroup.Label className="sr-only">sizes</RadioGroup.Label>
              <div className="flex flex-wrap space-x-4">
                {sizes.map((size) => (
                  <RadioGroup.Option
                    key={size}
                    value={size}
                    className={
                      ({ active, checked }) =>
                        `${
                          active
                            ? "outline-none ring-2 ring-offset-2 ring-indigo-500"
                            : ""
                        }
        ${checked ? "bg-indigo-600 text-white" : "bg-white"}
        relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none w-20
        ${checked ? "border border-indigo-600" : "border border-gray-300"}` // Agrega una clase de borde para crear el efecto de cuadrado
                    }
                  >
                    {({ active, checked }) => (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="font-semibold">
                            <RadioGroup.Label
                              as="p"
                              className={`font-medium ${
                                checked ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {size}
                            </RadioGroup.Label>
                          </div>
                        </div>
                      </div>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="mt-8 py-1">
          {product &&
          product !== null &&
          product !== undefined &&
          product.quantity > 0 ? (
            <p className="text-xl ">
              <span className="text-green-700 bg-green-200 p-2 rounded-md">
                {product.quantity < 20 && <>{product.quantity}</>}
                In Stock
              </span>
            </p>
          ) : (
            <p className="text-xl ">
              <span className="text-red-700 bg-red-200 p-2 rounded-md">
                Out of Stock
              </span>
            </p>
          )}
        </div>

        <div className="mt-6 flex sm:flex-col1">
          {!loading && product.quantity == 0 && (
            <div className="mt-6 flex w-full items-center justify-center px-8 py-3 text-base font-medium">
              <p className="text-gray-500">Ships in 3-4 weeks</p>
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

          {product.quantity > 0 && (
            <button
              type="button"
              onClick={() => {
                if (inWishlist) {
                  removeWishlistItem(productId);
                  return setInWishlist(false);
                }
                addWishlistItem(productId);
                return setInWishlist(true);
              }}
              className="ml-4 py-3 px-3 rounded-md flex items-center justify-center mt-5 text-gray-400  hover:text-gray-900"
            >
              {inWishlist ? (
                <CorazonRellenito
                  className="h-6 w-6 flex-shrink- text-red-500"
                  aria-hidden="true"
                />
              ) : (
                <HeartIcon
                  className="h-6 w-6 flex-shrink- "
                  aria-hidden="true"
                />
              )}
              <span className="sr-only">Add to favorites</span>
            </button>
          )}
        </div>
      </form>
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
    </>
  );
};
