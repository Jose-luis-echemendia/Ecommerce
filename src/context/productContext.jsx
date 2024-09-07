import { createContext, useReducer } from "react";
import { productReducer, productInitialState } from "../redux/reducers/product";
import axios from "axios";
import {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_FAVORITE_SUCCESS,
  GET_PRODUCTS_FAVORITE_FAIL,
  GET_PRODUCTS_BY_ARRIVAL_SUCCESS,
  GET_PRODUCTS_BY_ARRIVAL_FAIL,
  GET_PRODUCTS_BY_SOLD_SUCCESS,
  GET_PRODUCTS_BY_SOLD_FAIL,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
  SEARCH_PRODUCTS_SUCCESS,
  SEARCH_PRODUCTS_FAIL,
  RELATED_PRODUCTS_SUCCESS,
  RELATED_PRODUCTS_FAIL,
  FILTER_PRODUCTS_SUCCESS,
  FILTER_PRODUCTS_FAIL,
} from "../redux/actions/types";

//creando contexto
export const ProductContext = createContext();

function useProductContext() {
  const [state, dispatch] = useReducer(productReducer, productInitialState);

  const getProducts = async () => {
    const config = {
      headers: {
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/product/get-products`,
        config
      );

      if (res.status === 200) {
        dispatch({
          type: GET_PRODUCTS_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_PRODUCTS_FAIL,
        });
      }
    } catch (error) {
      console.log(error);

      dispatch({
        type: GET_PRODUCTS_FAIL,
      });
    }
  };

  const getProductsFavorite = async () => {
    const config = {
      headers: {
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/api/product/get-products?sortBy=favorite&order=desc&limit=3`,
        config
      );

      if (res.status === 200) {
        dispatch({
          type: GET_PRODUCTS_FAVORITE_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_PRODUCTS_FAVORITE_FAIL,
        });
      }
    } catch (error) {
      console.log(error);

      dispatch({
        type: GET_PRODUCTS_FAVORITE_FAIL,
      });
    }
  };

  const getProductsByArrival = async () => {
    const config = {
      headers: {
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/api/product/get-products?sortBy=date_created&order=desc&limit=3`,
        config
      );

      if (res.status === 200) {
        dispatch({
          type: GET_PRODUCTS_BY_ARRIVAL_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_PRODUCTS_BY_ARRIVAL_FAIL,
        });
      }
    } catch (error) {
      console.log(error);

      dispatch({
        type: GET_PRODUCTS_BY_ARRIVAL_FAIL,
      });
    }
  };

  const getProductsBySold = async () => {
    const config = {
      headers: {
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/api/product/get-products?sortBy=sold&order=desc&limit=3`,
        config
      );

      if (res.status === 200) {
        dispatch({
          type: GET_PRODUCTS_BY_SOLD_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_PRODUCTS_BY_SOLD_FAIL,
        });
      }
    } catch (error) {
      console.log(error);

      dispatch({
        type: GET_PRODUCTS_BY_SOLD_FAIL,
      });
    }
  };

  const getProduct = async (productId) => {
    const config = {
      headers: {
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/api/product/detail/${productId}`,
        config
      );

      if (res.status === 200) {
        dispatch({
          type: GET_PRODUCT_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_PRODUCT_FAIL,
        });
      }
    } catch (error) {
      console.log(error);

      dispatch({
        type: GET_PRODUCT_FAIL,
      });
    }
  };

  const getRelatedProduct = async (productId) => {
    const config = {
      headers: {
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/api/product/related/${productId}`,
        config
      );

      if (res.status === 200) {
        dispatch({
          type: RELATED_PRODUCTS_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: RELATED_PRODUCTS_FAIL,
        });
      }
    } catch (error) {
      console.log(error);

      dispatch({
        type: RELATED_PRODUCTS_FAIL,
      });
    }
  };

  const getFilteredProducts = async (
    category_id,
    price_range,
    sort_by,
    order,
    color,
    sizes
  ) => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    };
    console.log(price_range)
    const body = JSON.stringify({
      category_id,
      price_range,
      sort_by,
      order,
      color,
      sizes,
    });

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/product/by/search`,
        body,
        config
      );

      if (res.status === 200) {
        dispatch({
          type: FILTER_PRODUCTS_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: FILTER_PRODUCTS_FAIL,
        });
      }
    } catch (error) {
      console.log(error);

      dispatch({
        type: FILTER_PRODUCTS_FAIL,
      });
    }
  };

  const getSearchProducts = async (search, category_id) => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    };

    const body = JSON.stringify({search, category_id});

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/product/search`,
        body,
        config
      );

      if (res.status === 200) {
        dispatch({
          type: SEARCH_PRODUCTS_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: SEARCH_PRODUCTS_FAIL,
        });
      }
    } catch (error) {
      console.log(error);

      dispatch({
        type: SEARCH_PRODUCTS_FAIL,
      });
    }
  };

  return {
    state,
    getProducts,
    getProductsFavorite,
    getProductsByArrival,
    getProductsBySold,
    getProduct,
    getRelatedProduct,
    getFilteredProducts,
    getSearchProducts
  };
}

//proveer contexto
export function ProductProvider({ children }) {
  const {
    state,
    getProducts,
    getProductsFavorite,
    getProductsByArrival,
    getProductsBySold,
    getProduct,
    getRelatedProduct,
    getFilteredProducts,
    getSearchProducts
  } = useProductContext();
  return (
    <ProductContext.Provider
      value={{
        stateProduct: state,
        getProducts,
        getProductsFavorite,
        getProductsByArrival,
        getProductsBySold,
        getProduct,
        getRelatedProduct,
        getFilteredProducts,
        getSearchProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
