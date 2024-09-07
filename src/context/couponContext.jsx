import { createContext, useReducer } from "react";
import { couponReducer, couponInitialState } from "../redux/reducers/coupons";
import axios from "axios";
import { GET_COUPON_SUCCESS, GET_COUPON_FAIL } from "../redux/actions/types";
import { useAlert } from "../hooks/useAlert";
import { AlertCircle } from "react-feather";

//creando contexto
export const CouponContext = createContext();

function useCouponContext() {
  const [state, dispatch] = useReducer(couponReducer, couponInitialState);

  const { createdAlert } = useAlert()

  const checkCoupon =  async (coupon_name ) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    };

    try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/coupons/check-coupon?coupon_name=${coupon_name}`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_COUPON_SUCCESS,
                payload: res.data
            });
            createdAlert(
                "Coupon applied",
                { color: "green", type: "Action Success" }
              );
      } else {
        dispatch({
          type: GET_COUPON_FAIL,
        });
        createdAlert(
            "This coupon does not exist",
            { color: "red", type: "Action Failed" },
            AlertCircle
          );
      }
    } catch (error) {
      dispatch({
        type: GET_COUPON_FAIL,
      });
      createdAlert(
        "This coupon does not exist",
        { color: "red", type: "Action Failed" },
        AlertCircle
      );
      console.log(error);
    }
  };

  return {
    state,
    checkCoupon,
  };
}

//proveer contexto
export function CouponProvider({ children }) {
  const { state, checkCoupon } = useCouponContext();
  return (
    <CouponContext.Provider value={{ stateCoupon: state, checkCoupon }}>
      {children}
    </CouponContext.Provider>
  );
}
