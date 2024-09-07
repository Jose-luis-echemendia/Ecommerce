import {
  GET_WISHLIST_ITEMS_SUCCESS,
  GET_WISHLIST_ITEMS_FAIL,
  ADD_WISHLIST_ITEM_SUCCESS,
  ADD_WISHLIST_ITEM_FAIL,
  GET_WISHLIST_ITEM_TOTAL_SUCCESS,
  GET_WISHLIST_ITEM_TOTAL_FAIL,
  REMOVE_WISHLIST_ITEM_SUCCESS,
  REMOVE_WISHLIST_ITEM_FAIL,
  CLEAR_WISHLIST,
} from "../redux/actions/types";

import { createContext, useReducer } from "react";
import {
  wishlistReducer,
  wishlistInitialState,
} from "../redux/reducers/wishlist";
import axios from "axios";

//creando contexto
export const WishlistContext = createContext();

function useWishlistContext() {
  const [state, dispatch] = useReducer(wishlistReducer, wishlistInitialState);

  const getWishlistItems = async () => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          Accept: "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      };

      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_API_URL
          }/api/wishlist/wishlist-items`,
          config
        );

        if (res.status === 200) {
          dispatch({
            type: GET_WISHLIST_ITEMS_SUCCESS,
            payload: res.data,
          });
        } else {
          dispatch({
            type: GET_WISHLIST_ITEMS_FAIL,
          });
        }
      } catch (error) {
        console.log(error);
        dispatch({
          type: GET_WISHLIST_ITEMS_FAIL,
        });
      }
    }
  };

  const addWishlistItem = async (productId) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          Authorization: `JWT ${localStorage.getItem("access")}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };

      const body = JSON.stringify({
        productId,
      });

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/wishlist/add-item`,
          body,
          config
        );

        if (res.status === 201) {
          dispatch({
            type: ADD_WISHLIST_ITEM_SUCCESS,
            payload: res.data,
          });
        } else {
          dispatch({
            type: ADD_WISHLIST_ITEM_FAIL,
          });
        }
      } catch (error) {
        console.log(error);
        dispatch({
          type: ADD_WISHLIST_ITEM_FAIL,
        });
      }
    }
  };

  const getWishlistItemTotal = async () => {
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
          }/api/wishlist/get-item-total`,
          config
        );

        if (res.status === 200) {
          dispatch({
            type: GET_WISHLIST_ITEM_TOTAL_SUCCESS,
            payload: res.data,
          });
        } else {
          dispatch({
            type: GET_WISHLIST_ITEM_TOTAL_FAIL,
          });
        }
      } catch (err) {
        dispatch({
          type: GET_WISHLIST_ITEM_TOTAL_FAIL,
        });
      }
    }
  };

  const removeWishlistItem = async (productId) => {
    if (localStorage.getItem("access")) {
      const body = JSON.stringify({
        productId,
      });

      const config = {
        headers: {
          Authorization: `JWT ${localStorage.getItem("access")}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: body,
      };

      try {
        const res = await axios.delete(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/wishlist/remove-item`,
          config
        );

        if (res.status === 200) {
          dispatch({
            type: REMOVE_WISHLIST_ITEM_SUCCESS,
            payload: res.data,
          });
        } else {
          dispatch({
            type: REMOVE_WISHLIST_ITEM_FAIL,
          });
        }
      } catch (error) {
        console.log(error);
        dispatch({
          type: REMOVE_WISHLIST_ITEM_FAIL,
        });
      }
    }
  };

  const clearWishlist = () => {
    dispatch({
      type: CLEAR_WISHLIST,
    });
  };

  return {
    state,
    getWishlistItems,
    addWishlistItem,
    getWishlistItemTotal,
    removeWishlistItem,
    clearWishlist,
  };
}

//proveer contexto
export function WishlistProvider({ children }) {
  const { state, getWishlistItems, addWishlistItem, getWishlistItemTotal, removeWishlistItem, clearWishlist } = useWishlistContext();
  return (
    <WishlistContext.Provider
      value={{ stateWishlist: state, getWishlistItems, addWishlistItem, getWishlistItemTotal, removeWishlistItem, clearWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
