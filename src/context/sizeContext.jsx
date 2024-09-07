import { createContext, useReducer } from "react";
import { sizesReducer, sizesInitialState } from "../redux/reducers/sizes";
import axios from "axios";
import { GET_SIZES_SUCCESS, GET_SIZES_FAIL } from "../redux/actions/types";

//creando contexto
export const SizesContext = createContext();

function useSizesContext() {
  const [state, dispatch] = useReducer(sizesReducer, sizesInitialState);

  const getSizes = async () => {
    const config = {
      headers: {
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/product/sizes`,
        config
      );

      if (res.status === 200) {
        dispatch({
          type: GET_SIZES_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_SIZES_FAIL,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_SIZES_FAIL,
      });
      console.log(error);
    }
  };

  return {
    state,
    getSizes,
  };
}

//proveer contexto
export function SizesProvider({ children }) {
  const { state, getSizes } = useSizesContext();
  return (
    <SizesContext.Provider value={{ stateSizes: state, getSizes }}>
      {children}
    </SizesContext.Provider>
  );
}
