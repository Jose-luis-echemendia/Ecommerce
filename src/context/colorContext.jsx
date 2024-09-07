import { GET_COLORS_SUCCESS, GET_COLORS_FAIL } from "../redux/actions/types";
import { createContext, useReducer } from "react";
import { colorsReducer, colorsInitialState } from "../redux/reducers/colors";
import axios from "axios";

//creando contexto
export const ColorsContext = createContext();

function useColorsContext() {
  const [state, dispatch] = useReducer(colorsReducer, colorsInitialState);

  const getColors = async () => {
    const config = {
      headers: {
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/product/colors`,
        config
      );

      if (res.status === 200) {
        dispatch({
          type: GET_COLORS_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_COLORS_FAIL,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_COLORS_FAIL,
      });
      console.log(error);
    }
  };

  return {
    state,
    getColors,
  };
}

//proveer contexto
export function ColorsProvider({ children }) {
  const { state, getColors } = useColorsContext();
  return (
    <ColorsContext.Provider value={{ stateColors: state, getColors }}>
      {children}
    </ColorsContext.Provider>
  );
}
