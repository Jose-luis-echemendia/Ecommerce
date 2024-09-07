import { createContext, useReducer } from "react";
import { ordersReducer, ordersInitialState } from "../redux/reducers/orders";
import axios from "axios";
import {
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAIL,
  GET_ORDER_DETAIL_SUCCESS,
  GET_ORDER_DETAIL_FAIL,
} from "../redux/actions/types";

//creando contexto
export const OrdersContext = createContext();

function useOrdersContext() {
  const [state, dispatch] = useReducer(ordersReducer, ordersInitialState);

  const getOrders = async () => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          Accept: "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      };

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/orders/get-orders`,
          config
        );

        if (res.status === 200) {
          dispatch({
            type: GET_ORDERS_SUCCESS,
            payload: res.data,
          });
        } else {
          dispatch({
            type: GET_ORDERS_FAIL,
          });
        }
      } catch (error) {
        dispatch({
          type: GET_ORDERS_FAIL,
        });
        console.log(error);
      }
    }
  };

  const getOrderDetail = async (transactionId) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          Accept: "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      };

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/orders/get-order/${transactionId}`,
          config
        );

        if (res.status === 200) {
          dispatch({
            type: GET_ORDER_DETAIL_SUCCESS,
            payload: res.data,
          });
        } else {
          dispatch({
            type: GET_ORDER_DETAIL_FAIL,
          });
        }
      } catch (error) {
        dispatch({
          type: GET_ORDER_DETAIL_FAIL,
        });
        console.log(error);
      }
    }
  };

  return {
    state,
    getOrders,
    getOrderDetail
  };
}

//proveer contexto
export function OrdersProvider({ children }) {
  const { state, getOrders, getOrderDetail } = useOrdersContext();
  return (
    <OrdersContext.Provider value={{ stateOrders: state, getOrders, getOrderDetail }}>
      {children}
    </OrdersContext.Provider>
  );
}
