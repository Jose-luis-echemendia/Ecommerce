import { createContext, useReducer } from "react";
import {
  categoryReducer,
  categoryInitialState,
} from "../redux/reducers/category";
import axios from "axios";
import {
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAIL,
} from "../redux/actions/types";

//creando contexto
export const CategoryContext = createContext();

function useCategoryContext() {
  const [state, dispatch] = useReducer(categoryReducer, categoryInitialState);

  const getCategories = async () => {
    const config = {
      headers: {
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/category/categories`, config
      );

      if (res.status === 200) {
        dispatch({
          type: GET_CATEGORY_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_CATEGORY_FAIL,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_CATEGORY_FAIL,
      });
      console.log(error);
    }
  };

  return {
    state,
    getCategories,
  };
}

//proveer contexto
export function CategoryProvider({ children }) {
  const { state, getCategories } = useCategoryContext();
  return (
    <CategoryContext.Provider value={{ stateCategory: state, getCategories }}>
      {children}
    </CategoryContext.Provider>
  );
}
