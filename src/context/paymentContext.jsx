import { createContext, useReducer } from "react";
import { paymentReducer, paymentInitialState } from "../redux/reducers/payment";
import axios from "axios";
import {
  PAYMENT_SUCCESS,
  PAYMENT_FAIL,
  RESET_PAYMENT_INFO,
  GET_PAYMENT_TOTAL_FAIL,
  GET_PAYMENT_TOTAL_SUCCESS,
  SET_PAYMENT_LOADING,
  REMOVE_PAYMENT_LOADING,
  GET_HISTORY_PAYMENT_FAIL,
  GET_HISTORY_PAYMENT_SUCCESS
} from "../redux/actions/types";
import { AlertCircle, DollarSign } from "react-feather";
import { useAlert } from "../hooks/useAlert";
import { useCart } from "../hooks/useCart"

//creando contexto
export const PaymentContext = createContext();

function usePaymentContext() {
  const [state, dispatch] = useReducer(paymentReducer, paymentInitialState);

  const { getItemTotal } = useCart()

  const {createdAlert} = useAlert()

  const getHistoryPayment = async () => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          Accept: "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      };

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/payment/get-history-payment`,
          config
        );


        if (res.status === 200) {
          dispatch({
            type: GET_HISTORY_PAYMENT_SUCCESS,
            payload: res.data,
          });
        } else {
          dispatch({
            type: GET_HISTORY_PAYMENT_FAIL,
          });
        }
      } catch (error) {
        dispatch({
          type: GET_HISTORY_PAYMENT_FAIL,
        });
        console.log(error);
      }
    }
  };

  const getPaymentTotal = async (shipping_id, coupon_name, taxe) => {
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
        }/api/payment/get-payment-total?shipping_id=${shipping_id}&coupon_name=${coupon_name}&tax=${
          taxe === undefined ? 0.19 : taxe
        }`,
        config
      );

      if (res.status === 200 && !res.data.error) {
        dispatch({
          type: GET_PAYMENT_TOTAL_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_PAYMENT_TOTAL_FAIL,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_PAYMENT_TOTAL_FAIL,
      });
      console.log(error);
    }
  };

  const processPayment = async (formOrder, totalCost, originalPrice, shippingId, taxe) => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };


    const {
      email,
      couponName,
      firstName,
      lastName,
      company,
      address,
      apartament,
      city,
      country,
      province,
      postalCode,
      phone,
      payment,
      cardNumber,
      nameCard,
      expirationDate,
      CVC,
    } = formOrder;

    const body = JSON.stringify({
      email,
      shippingId,
      couponName,
      totalCost,
      originalPrice,
      taxe,
      firstName,
      lastName,
      company,
      address,
      apartament,
      city,
      country,
      province,
      postalCode,
      phone,
      payment,
      cardNumber,
      nameCard,
      expirationDate,
      CVC,
    });


    dispatch({
      type: SET_PAYMENT_LOADING,
    });

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/payment/make-payment`,
        body,
        config
      );
      if (res.status === 200 && res.data.success) {
        dispatch({
          type: PAYMENT_SUCCESS,
        });
        createdAlert(
          res.data.success,
          { color: "green", type: "Action Success" },
          DollarSign
        );
        getItemTotal();
      } else {
        dispatch({
          type: PAYMENT_FAIL,
        });
        createdAlert(
          "Error processing payment",
          { color: "red", type: "Action Failed" },
          AlertCircle
        );
      }
    } catch (err) {
      console.log(err)
      dispatch({
        type: PAYMENT_FAIL,
      });
      createdAlert(
        "Error processing payment",
        { color: "red", type: "Action Failed" },
        AlertCircle
      );
    }

    dispatch({
      type: REMOVE_PAYMENT_LOADING,
    });
    window.scrollTo(0, 0);
  };

  const reset = () => {
    dispatch({
      type: RESET_PAYMENT_INFO,
    });
  };

  return {
    state,
    processPayment,
    reset,
    getPaymentTotal,
    getHistoryPayment
  };
}

//proveer contexto
export function PaymentProvider({ children }) {
  const { state, processPayment, reset, getPaymentTotal, getHistoryPayment } = usePaymentContext();
  return (
    <PaymentContext.Provider
      value={{ statePayment: state, processPayment, reset, getPaymentTotal, getHistoryPayment }}
    >
      {children}
    </PaymentContext.Provider>
  );
}
