import { useState } from "react";
import { useAddtoCart } from "../../hooks/useAddtoCart";
import { Link } from "react-router-dom";
import { Modal } from "../Modal";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";

export const CardProductInWishlist = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedSizes, setSelectedSizes] = useState("X");
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState({ open: false, type: "inCart" });

  const { handleAddtoCart } = useAddtoCart(
    product,
    setLoading,
    selectedColor,
    selectedSizes
  );

  const addToCart = async () => {
    if (product.quantity === 0) {
      setOpenModal({
        ...openModal,
        open: true,
        type: "notStock",
      });
    }
    try {
      const res = await handleAddtoCart();
      if (res === "this item is already in cart") {
        setOpenModal({
          ...openModal,
          open: true,
          type: "inCart",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="group relative">
        <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
          <img
            src={product.photos[0]}
            alt={product.name}
            className="w-full h-full object-center object-cover lg:w-full lg:h-full"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex flex-col space-y-10">
              <button
                onClick={() => addToCart()}
                className="text-white text-lg font-bold bg-black bg-opacity-50 p-2 rounded"
              >
                <span aria-hidden="true" className="absolute  inset-0" />
                Add to Cart
              </button>

              <Link
                to={`/product/${product.id}`}
                className="text-white text-lg font-bold bg-black bg-opacity-50 p-2 rounded"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-1/2  inset-0"
                />
                View Product
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <div className="">
            <h3 className="text-sm text-gray-700">{product.name}</h3>
          </div>

          <p className="text-sm font-medium text-gray-900">{product.price}</p>
        </div>
      </div>
      <Modal
        open={openModal.open}
        onClose={() => setOpenModal({ ...openModal, open: false })}
      >
        <div className="text-center w-56">
          <ShoppingBagIcon size={56} className="mx-auto text-yellow-500" />
          <div className="mx-auto my-4 w-48">
            <h3 className="text-lg font-black text-gray-800">
              {openModal.type === "inCart"
                ? "this item is already in cart"
                : "this item not have stock"}
            </h3>
            <p className="text-sm text-gray-500">
              {openModal.type === "inCart"
                ? " Do you want to check the shopping cart?"
                : "Ships in 3-4 weeks"}
            </p>
          </div>
          <div className="flex gap-4">
            <button
              className="btn btn-danger w-full"
              onClick={
                openModal.type === "inCart"
                  ? (e) => (
                      e.preventDefault(),
                      navigate("/cart"),
                      setOpenModal({ ...openModal, open: false })
                    )
                  : (e) => (
                      e.preventDefault(),
                      setOpenModal({ ...openModal, open: false })
                    )
              }
            >
              Continue
            </button>
            <button
              className="btn btn-light w-full"
              onClick={(e) => (
                e.preventDefault(), setOpenModal({ ...openModal, open: false })
              )}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
