import { useReviews } from "../../hooks/useReviews";
import { useAddtoCart } from "../../hooks/useAddtoCart";
import { useProduct } from "../../hooks/useProduct";
import { useAuth } from "../../hooks/useAuth";
import { initialReviewsForm } from "../../helpers/formInitialState";
import { useForm } from "../../hooks/useForm";
import { useEffect, useState } from "react";
import { Modal } from "../Modal";
import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export const Reviews = () => {
  const { stateReviews, createReview, updateReview } = useReviews();
  const { stateAuth } = useAuth();
  const { stateProduct } = useProduct();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [openModal, setOpenModal] = useState({
    open: false,
    type: "authenticated",
  });

  const { isAuthenticated } = stateAuth;
  const { product } = stateProduct;

  const { handleAddtoCart } = useAddtoCart(product, setLoading, "black", "XL");

  const { formState, onInputChange, setFormState } =
    useForm(initialReviewsForm);

  const { rating, comment } = formState;

  const { review, reviews, permissionsMakeReview } = stateReviews;

  const onSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setOpenModal({ ...openModal, open: true, type: "authenticated" });
    }
    if (review) {
      updateReview(product.id, rating, comment);
      return;
    }
    if (permissionsMakeReview && review === null) {
      createReview(product.id, rating, comment);
    } else {
      setOpenModal({ ...openModal, open: true, type: "buy" });
    }
  };

  return (
    <>
      <section className="my-5 max-w-7xl">
        <Modal
          open={openModal.open}
          onClose={() => setOpenModal({ ...openModal, open: false })}
        >
          <div className="text-center w-56">
            <CheckCircleIcon size={56} className="mx-auto text-yellow-500" />
            <div className="mx-auto my-4 w-48">
              <h3 className="text-lg font-black text-gray-800">
                {openModal.type === "authenticated"
                  ? "please, you do need authenticated"
                  : "before rating or product, please buy it"}
              </h3>
              <p className="text-sm text-gray-500">
                {openModal.type === "authenticated"
                  ? "click on continue for authenticated"
                  : product.quantity === 0
                  ? "in this moment no has stoock it"
                  : "click on continue for add to cart"}
              </p>
            </div>
            <div className="flex gap-4">
              <button
                className="btn btn-danger w-full"
                onClick={
                  openModal.type === "authenticated"
                    ? (e) => (
                        e.preventDefault(),
                        navigate("/login/"),
                        setOpenModal({ ...openModal, open: false })
                      )
                    : (e, product) => (
                        e.preventDefault(),
                        handleAddtoCart(),
                        setOpenModal({ ...openModal, open: false })
                      )
                }
              >
                Continue
              </button>
              <button
                className="btn btn-light w-full"
                onClick={(e) => (
                  e.preventDefault(),
                  setOpenModal({ ...openModal, open: false })
                )}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
        <div className="grid grid-cols-5">
          <div className="col-span-2 p-4">
            <form onSubmit={onSubmit}>
              <div className="flex flex-col">
                <label
                  htmlFor="comment"
                  className="block mx-auto text-sm font-medium text-gray-700"
                >
                  Add your review
                </label>
                <div className="mt-2 ml-2">
                  <textarea
                    rows={4}
                    name="comment"
                    id="comment"
                    required
                    value={comment}
                    onChange={onInputChange}
                    placeholder={review ? review.comment : "write your comment"}
                    className="shadow-sm bg-gray-50 p-2 focus:ring-indigo-500 w-80 h-36 focus:border-indigo-500 block  sm:text-sm border-gray-300 border-2 rounded-md"
                    defaultValue={""}
                  />
                </div>
                <div className="flex justify-around">
                  <button
                    type="submit"
                    className="mt-4  inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {review ? "Update" : "add"}
                  </button>
                  <Rating
                    className="mt-4"
                    name="rating"
                    defaultValue={0.0}
                    precision={0.5}
                    value={rating}
                    onChange={onInputChange}
                    required
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="col-span-3">
            <div className="grid grid-cols-2 gap-5">
              {reviews &&
                reviews.map((review, index) => (
                  <div key={index} className="flex">
                    <div className="mx-4 flex-shrink-0">
                      <span className="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                        <svg
                          className="h-full w-full text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                    </div>
                    <div>
                      <Rating
                        name="half-rating-read"
                        defaultValue={review.rating}
                        value={review.rating}
                        precision={0.5}
                        readOnly
                      />
                      <h4 className="text-lg font-bold">{review.user}</h4>
                      <p className="mt-1">{review.comment}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
