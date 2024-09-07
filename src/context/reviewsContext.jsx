import { createContext, useReducer, useState } from "react";
import { reviewsReducer, reviewsInitialState } from "../redux/reducers/reviews";
import { RefreshCw } from "react-feather";
import { useAlert } from "../hooks/useAlert"
import axios from "axios";
import {
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAIL,
  GET_REVIEW_SUCCESS,
  GET_REVIEW_FAIL,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAIL,
  UPDATE_REVIEW_SUCCESS,
  UPDATE_REVIEW_FAIL,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  FILTER_REVIEWS_SUCCESS,
  FILTER_REVIEWS_FAIL,
  GET_PERMISSIONS_REVIEW_MAKE_SUCCESS,
  GET_PERMISSIONS_REVIEW_MAKE_FAIL
} from "../redux/actions/types";
import { Smile } from "react-feather";

//creando contexto
export const ReviewsContext = createContext();

function useReviewsContext() {
  const [state, dispatch] = useReducer(reviewsReducer, reviewsInitialState);
  const [ratingState, setRatingState] = useState();
  const { createdAlert } = useAlert()

  const getReviews = async (productId) => {
    const config = {
      headers: {
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/api/reviews/get-reviews/${productId}`,
        config
      );

      if (res.status === 200) {
        dispatch({
          type: GET_REVIEWS_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_REVIEWS_FAIL,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_REVIEWS_FAIL,
      });
    }
  };

  const getReview = async (productId) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };

      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_API_URL
          }/api/reviews/get-review/${productId}`,
          config
        );

        if (res.status === 200) {
          dispatch({
            type: GET_REVIEW_SUCCESS,
            payload: res.data,
          });
        } else {
          dispatch({
            type: GET_REVIEW_FAIL,
          });
        }
      } catch (error) {
        console.log(error);
        dispatch({
          type: GET_REVIEW_FAIL,
        });
      }
    }
  };

  const getPermissionsReviewMake = async (productId) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };

      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_API_URL
          }/api/reviews/get-review-make/${productId}`,
          config
        );

        if (res.status === 200) {
          dispatch({
            type: GET_PERMISSIONS_REVIEW_MAKE_SUCCESS,
            payload: res.data,
          });
        } else {
          dispatch({
            type: GET_PERMISSIONS_REVIEW_MAKE_FAIL,
          });
        }
      } catch (error) {
        console.log(error);
        dispatch({
          type: GET_PERMISSIONS_REVIEW_MAKE_FAIL,
        });
      }
    }
  };


  const createReview = async (productId, rating, comment) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({
        rating,
        comment,
      });

      try {
        const res = await axios.post(
          `${
            import.meta.env.VITE_REACT_APP_API_URL
          }/api/reviews/create-review/${productId}`,
          body,
          config
        );

        if (res.status === 201) {
          createdAlert(
            "you do send rating, thank you for colaboration",
            { color: "green", type: "Colaboration" },
            Smile
          ); 
          dispatch({
            type: CREATE_REVIEW_SUCCESS,
            payload: res.data,
          });
        } else {
          dispatch({
            type: CREATE_REVIEW_FAIL,
          });
        }
      } catch (error) {
        console.log(error);
        dispatch({
          type: CREATE_REVIEW_FAIL,
        });
      }
    }
  };

  const updateReview = async (productId, rating, comment) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({
        rating,
        comment,
      });

      try {
        const res = await axios.put(
          `${
            import.meta.env.VITE_REACT_APP_API_URL
          }/api/reviews/update-review/${productId}`,
          body,
          config
        );

        if (res.status === 200) {
          createdAlert(
            "you do change your rating, thank you for colaboration",
            { color: "green", type: "Colaboration" },
            RefreshCw
          ); 
          dispatch({
            type: UPDATE_REVIEW_SUCCESS,
            payload: res.data,
          });
        } else {
          dispatch({
            type: UPDATE_REVIEW_FAIL,
          });
        }
      } catch (error) {
        console.log(error);
        dispatch({
          type: UPDATE_REVIEW_FAIL,
        });
      }
    }
  };

  const deleteReview = async (productId) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
        data: {},
      };

      try {
        const res = await axios.delete(
          `${
            import.meta.env.VITE_REACT_APP_API_URL
          }/api/reviews/delete-review/${productId}`,
          config
        );

        if (res.status === 200) {
          dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: res.data,
          });
        } else {
          dispatch({
            tye: DELETE_REVIEW_FAIL,
          });
        }
      } catch (error) {
        console.log(error);
        dispatch({
          tye: DELETE_REVIEW_FAIL,
        });
      }
    }
  };

  const filterReviews = async (productId, rating) => {
    const config = {
      headers: {
        Accept: "application/json",
      },
    };



    if (rating === 0.5) setRatingState("0.5");
    else if (rating === 1 || rating === 1.0) setRatingState("1.0");
    else if (rating === 1.5) setRatingState("1.5");
    else if (rating === 2 || rating === 2.0) setRatingState("2.0");
    else if (rating === 2.5) setRatingState("2.5");
    else if (rating === 3 || rating === 3.0) setRatingState("3.0");
    else if (rating === 3.5) setRatingState("3.5");
    else if (rating === 4 || rating === 4.0) setRatingState("4.0");
    else if (rating === 4.5) setRatingState("4.5");
    else setRatingState("5.0");

    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/api/reviews/filter-reviews/${productId}?rating=${ratingState}`,
        config
      );

      if (res.status === 200) {
        dispatch({
          type: FILTER_REVIEWS_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: FILTER_REVIEWS_FAIL,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: FILTER_REVIEWS_FAIL,
      });
    }
  };

  return {
    state,
    getReviews,
    getReview,
    getPermissionsReviewMake,
    createReview,
    updateReview,
    deleteReview,
    filterReviews,
  };
}

//proveer contexto
export function ReviewsProvider({ children }) {
  const {
    state,
    getReviews,
    getReview,
    getPermissionsReviewMake,
    createReview,
    updateReview,
    deleteReview,
    filterReviews,
  } = useReviewsContext();
  return (
    <ReviewsContext.Provider
      value={{
        stateReviews: state,
        getReviews,
        getReview,
        getPermissionsReviewMake,
        createReview,
        updateReview,
        deleteReview,
        filterReviews,
      }}
    >
      {children}
    </ReviewsContext.Provider>
  );
}
