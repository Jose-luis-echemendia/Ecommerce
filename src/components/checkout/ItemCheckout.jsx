import {
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useCart } from "../../hooks/useCart";
import { Modal } from "../Modal";
import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { useAlert } from "../../hooks/useAlert";
import { initialCountItemBuy } from "../../helpers/formInitialState";
import { AlertCircle } from "react-feather";
import { sizes } from "../../helpers/fixedSize";
 
export const ItemCheckout = ({ item }) => {
  const { product } = item;
  const { removeItem, updateItem, getTotal } = useCart();
  const { createdAlert } = useAlert();
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [size, setSize] = useState();

  const sizesArray = sizes.filter(size => size.symbol === item.size)[0]
  
  if(sizesArray){ ()=>setSize(sizes.name)}

  const { formState, onInputChange, setFormState } =
    useForm(initialCountItemBuy);

  const onChangeItem = async () => {
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
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-row items-start ml-10">
          <div className="mr-4">
            <div className="flex-shrink-0">
              <img
                src={product.photos[0]}
                alt={product.name}
                className="w-20 h-20 rounded-md object-center object-cover sm:w-32 sm:h-44"
              />
            </div>
          </div>

          <div className="flex flex-col justify-between w-40">
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
              <div className="mt-2 flex flex-col text-sm space-y-2">
                <p className="text-gray-500">{item.color}</p>
                {size ? (
                  <p className="border-gray-200 text-gray-500">
                    {size}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="mt-20">
              <p className="mt-1 font-medium text-gray-900">
                $ {product.price}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div className="ml-24">
            <button
              type="button"
              className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
              onClick={() => setDeleteConfirmation(true)}
            >
              <span className="sr-only">Remove</span>
              <TrashIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="flex flex-col justify-start ml-10">
            <form>
              <div className="flex flex-col  items-center">
                <div>
                  <label
                    htmlFor={`quantity-${product.quantity}`}
                    className="sr-only"
                  >
                    Quantity, {product.name}
                  </label>
                  <select
                    id={`quantity-${product.quantity}`}
                    name="count"
                    value={formState.count}
                    className="max-w-full rounded-md border p-4 border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                </div>
                <div>
                  <button
                    type="submit"
                    className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500 mt-1"
                    onClick={(e)=>{e.preventDefault(), onChangeItem()}}
                  >
                    <span className="sr-only">Update</span>
                    <small>Update Amount</small>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
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
