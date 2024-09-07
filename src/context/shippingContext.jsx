import { createContext, useReducer } from "react";
import { shippingReducer, shippingInitialState } from "../redux/reducers/shipping";
import axios from "axios";
import { GET_SHIPPING_OPTIONS_SUCCESS, GET_SHIPPING_OPTIONS_FAIL } from "../redux/actions/types";

//creando contexto
export const ShipingContext = createContext();

function useShipingContext() {
  const [state, dispatch] = useReducer(shippingReducer, shippingInitialState);

  const getShipping = async () => {
    const config = {
      headers: {
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/shipping/get-shipping-options`,
        config
      );

      if (res.status === 200) {
        dispatch({
          type: GET_SHIPPING_OPTIONS_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_SHIPPING_OPTIONS_FAIL,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_SHIPPING_OPTIONS_FAIL,
      });
      console.log(error);
    }
  };

  return {
    state,
    getShipping,
  };
}

//proveer contexto
export function ShippingProvider({ children }) {
  const { state, getShipping } = useShipingContext();
  return (
    <ShipingContext.Provider value={{ stateShipping: state, getShipping }}>
      {children}
    </ShipingContext.Provider>
  );
}
