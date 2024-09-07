import { createContext, useReducer } from "react";
import { cartReducer, cartInitialState } from "../redux/reducers/cart";
import axios from "axios";
import {
  ADD_ITEM,
  GET_TOTAL,
  GET_ITEM_TOTAL,
  GET_ITEMS,
  UPDATE_ITEM,
  REMOVE_ITEM,
  EMPTY_CART,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAIL,
  GET_TOTAL_SUCCESS,
  GET_TOTAL_FAIL,
  GET_ITEM_TOTAL_SUCCESS,
  GET_ITEM_TOTAL_FAIL,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAIL,
  UPDATE_ITEM_SUCCESS,
  UPDATE_ITEM_FAIL,
  REMOVE_ITEM_SUCCESS,
  REMOVE_ITEM_FAIL,
  EMPTY_CART_SUCCESS,
  EMPTY_CART_FAIL,
  SYNCH_CART_SUCCESS,
  SYNCH_CART_FAIL,
} from "../redux/actions/types";
import { useAlert } from "../hooks/useAlert";
import { AlertCircle, ShoppingBag } from "react-feather";

//creando contexto
export const CartContext = createContext();

function useCartContext() {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState);

  const { createdAlert } = useAlert();

  const addItemTocART = async (product, color, size) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      };

      const product_id = product.id;
      const body = JSON.stringify({ product_id, color, size });

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/cart/add-item`,
          body,
          config
        );

        if (res.status === 201) {
          dispatch({
            type: ADD_ITEM_SUCCESS,
            payload: res.data,
          });
          return true;
        } else {
          dispatch({
            type: ADD_ITEM_FAIL,
          });
          return false;
        }
      } catch (error) {
        dispatch({
          type: ADD_ITEM_FAIL,
        });
        console.log(error);
        if (error.request.status == 409) {
          /**
           * createdAlert(
            "this item is already in cart",
            { color: "red", type: "Warning" },
            ShoppingBag
          );
           */
          return "this item is already in cart";
        } else {
          createdAlert(
            "Error",
            { color: "red", type: "Action Failed" },
            AlertCircle
          );
        }
        return false;
      }
    } else {
      let cart = [];

      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      let shouldAddItem = true;

      cart.map((item) => {
        if (product.id.toString() === item.product.id.toString()) {
          shouldAddItem = false;
        }
      });

      const order_item = {
        product: product,
        count: 1,
      };

      if (shouldAddItem) {
        cart.push(order_item);
      }

      dispatch({
        type: ADD_ITEM,
        payload: cart,
      });

      return true;
    }
  };

  const getItems = async () => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          Accept: "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      };

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/cart/cart-items`,
          config
        );
        if (res.status === 200) {
          dispatch({
            type: GET_ITEMS_SUCCESS,
            payload: res.data,
          });
        } else {
          dispatch({
            type: GET_ITEMS_FAIL,
          });
        }
      } catch (error) {
        console.log(error);
        dispatch({
          type: GET_ITEMS_FAIL,
        });
      }
    } else {
      dispatch({
        type: GET_ITEMS,
      });
    }
  };

  const getTotal = async () => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          Accept: "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      };

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/cart/get-total`,
          config
        );
        if (res.status === 200) {
          dispatch({
            type: GET_TOTAL_SUCCESS,
            payload: res.data,
          });
        } else {
          dispatch({
            type: GET_TOTAL_FAIL,
          });
        }
      } catch (error) {
        console.log(error);
        dispatch({
          type: GET_TOTAL_FAIL,
        });
      }
    } else {
      let total = 0.0;
      let compare_total = 0.0;
      let cart = [];

      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));

        cart.map((item) => {
          total += parseFloat(item.product.price) * parseFloat(item.count);
          compare_total +=
            parseFloat(item.product.compare_price) * parseFloat(item.count);
        });
      }

      dispatch({
        type: GET_TOTAL,
        payload: [
          parseFloat(total.toFixed(2)),
          parseFloat(compare_total.toFixed(2)),
        ],
      });
    }
  };

  const getItemTotal = async () => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          Accept: "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      };

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/cart/get-item-total`,
          config
        );

        if (res.status === 200) {
          dispatch({
            type: GET_ITEM_TOTAL_SUCCESS,
            payload: res.data,
          });
        } else {
          dispatch({
            type: GET_ITEM_TOTAL_FAIL,
          });
        }
      } catch (error) {
        console.log(error);
        dispatch({
          type: GET_ITEM_TOTAL_FAIL,
        });
      }
    } else {
      let total = 0;

      if (localStorage.getItem("cart")) {
        total = JSON.parse(localStorage.getItem("cart")).length;
      }

      dispatch({
        type: GET_ITEM_TOTAL,
        payload: total,
      });
    }
  };

  const updateItem = async (item, count) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      };

      const product_id = item.product.id;
      const body = JSON.stringify({ product_id, count });

      try {
        const res = await axios.put(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/cart/update-item`,
          body,
          config
        );

        if (res.status === 200 && !res.data.error) {
          dispatch({
            type: UPDATE_ITEM_SUCCESS,
            payload: res.data,
          });
        } else {
          dispatch({
            type: UPDATE_ITEM_FAIL,
          });
        }
      } catch (error) {
        console.log(error);
        dispatch({
          type: UPDATE_ITEM_FAIL,
        });
      }
    } else {
      let cart = [];

      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));

        cart.map((cart_item, index) => {
          if (cart_item.product.id.toString() === item.product.id.toString()) {
            cart[index].count = parseInt(count);
          }
        });
      }

      dispatch({
        type: UPDATE_ITEM,
        payload: cart,
      });
    }
  };

  const removeItem = async (item) => {
    if (localStorage.getItem("access")) {
      const product_id = item.product.id;
      const body = JSON.stringify({ product_id });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
        data: body,
      };

      try {
        const res = await axios.delete(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/cart/remove-item`,
          config
        );

        if (res.status === 200) {
          dispatch({
            type: REMOVE_ITEM_SUCCESS,
            payload: res.data,
          });
        } else {
          dispatch({
            type: REMOVE_ITEM_FAIL,
          });
        }
      } catch (error) {
        console.log(error);
        dispatch({
          type: REMOVE_ITEM_FAIL,
        });
      }
    } else {
      let cart = [];
      let new_cart = [];

      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));

        cart.map((cart_item) => {
          if (cart_item.product.id.toString() !== item.product.id.toString()) {
            new_cart.push(cart_item);
          }
        });
      }

      dispatch({
        type: REMOVE_ITEM,
        payload: new_cart,
      });
    }
  };

  const emptyCart = async () => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          Accept: "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      };

      try {
        const res = await axios.delete(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/cart/empty-cart`,
          config
        );

        if (res.status === 200) {
          dispatch({
            type: EMPTY_CART_SUCCESS,
          });
        } else {
          dispatch({
            type: EMPTY_CART_FAIL,
          });
        }
      } catch (error) {
        console.log(error);
        dispatch({
          type: EMPTY_CART_FAIL,
        });
      }
    } else {
      dispatch({
        type: EMPTY_CART,
      });
    }
  };

  const synchCart = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };

    let cart_items = [];

    if (localStorage.getItem("cart")) {
      let cart = JSON.parse(localStorage.getItem("cart"));

      cart.map((cart_item) => {
        const item = {};
        item.product_id = cart_item.product.id;
        item.count = cart_item.count;
        cart_items.push(item);
      });
    }

    const body = JSON.stringify({ cart_items });

    try {
      const res = await axios.put(
        `${import.meta.env.REACT_APP_API_URL}/api/cart/synch`,
        body,
        config
      );

      if (res.status === 201) {
        dispatch({
          type: SYNCH_CART_SUCCESS,
        });
      } else {
        dispatch({
          type: SYNCH_CART_FAIL,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: SYNCH_CART_FAIL,
      });
    }
  };

  return {
    state,
    addItemTocART,
    getTotal,
    getItems,
    getItemTotal,
    updateItem,
    removeItem,
    emptyCart,
    synchCart,
  };
}

//proveer contexto
export function CartProvider({ children }) {
  const {
    state,
    addItemTocART,
    getTotal,
    getItems,
    getItemTotal,
    updateItem,
    removeItem,
    emptyCart,
    synchCart,
  } = useCartContext();
  return (
    <CartContext.Provider
      value={{
        stateCart: state,
        addItemTocART,
        getTotal,
        getItems,
        getItemTotal,
        updateItem,
        removeItem,
        emptyCart,
        synchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
