import {
  CheckIcon,
  ClockIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useCart } from "../../hooks/useCart";
import { Modal } from "../Modal";
import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { useAlert } from "../../hooks/useAlert";
import { initialCountItemBuy } from "../../helpers/formInitialState";
import { AlertCircle } from "react-feather";

export const ItemCart = ({ item }) => {
  const { product } = item;
  const { removeItem, updateItem, getTotal } = useCart();
  const { createdAlert } = useAlert();
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const { formState, onInputChange, setFormState } =
    useForm(initialCountItemBuy);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (item.product.quantity >= formState.count) {
        await updateItem(item, formState.count);
      } else {
        createdAlert(
          "Not enough in stock",
          { color: "red", type: "Action Failed" },
          AlertCircle
        );
      }
    } catch (error) {
      console.log(error);
    }
    getTotal();
  };

  return (
    <>
      <div className="flex-shrink-0">
        <img
          src={product.photos[0]}
          alt={product.name}
          className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48"
        />
      </div>

      <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div>
            <div className="flex justify-between">
              <h3 className="text-sm">
                <a
                  href="#"
                  className="font-medium text-gray-700 hover:text-gray-800"
                >
                  {product.name}
                </a>
              </h3>
            </div>
            <div className="mt-1 flex text-sm">
              <p className="text-gray-500">{item.color}</p>
              {item.size ? (
                <p className="ml-4 pl-4 border-l border-gray-200 text-gray-500">
                  {item.size}
                </p>
              ) : null}
            </div>
            <p className="mt-1 text-sm font-medium text-gray-900">
              $ {product.price}
            </p>
          </div>

          <div className="mt-4 sm:mt-0 sm:pr-9 flex justify-between">
            <div>
              <form onSubmit={onSubmit}>
                <div className="flex flex-col items-center justify-center">
                  <label htmlFor="count" className="sr-only">
                    Quantity, {product.name}
                  </label>
                  <select
                    id={`quantity-${product.quantity}`}
                    name="count"
                    value={formState.count}
                    className="max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={onInputChange}
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                  </select>
                  <button
                    type="submit"
                    className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500 mt-1"
                  >
                    <span className="sr-only">Update</span>
                    <small>Update Amount</small>
                  </button>
                </div>
              </form>
            </div>

            <div className="absolute top-0 right-0">
              <button
                type="button"
                className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
                onClick={() => setDeleteConfirmation(true)}
              >
                <span className="sr-only">Remove</span>
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <p className="mt-4 flex text-sm text-gray-700 space-x-2">
          {product.quantity > 0 ? (
            <CheckIcon
              className="flex-shrink-0 h-5 w-5 text-green-500"
              aria-hidden="true"
            />
          ) : (
            <ClockIcon
              className="flex-shrink-0 h-5 w-5 text-gray-300"
              aria-hidden="true"
            />
          )}

          <span>
            {product.quantity > 0 ? "In stock" : `Ships in 3-4 weeks`}
          </span>
        </p>
      </div>
      <Modal
        open={deleteConfirmation}
        onClose={() => setDeleteConfirmation(false)}
      >
        <div className="text-center w-56">
          <TrashIcon size={56} className="mx-auto text-red-500" />
          <div className="mx-auto my-4 w-48">
            <h3 className="text-lg font-black text-gray-800">Confirm Delete</h3>
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this item?
            </p>
          </div>
          <div className="flex gap-4">
            <button
              className="btn btn-danger w-full"
              onClick={(e) => (
                e.preventDefault(),
                removeItem(item),
                setDeleteConfirmation(false)
              )}
            >
              Delete
            </button>
            <button
              className="btn btn-light w-full"
              onClick={(e) => (
                e.preventDefault(), setDeleteConfirmation(false)
              )}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
