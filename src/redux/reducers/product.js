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
} from "../actions/types";

export const productInitialState = {
    product: null,
    products: null,
    productsFavorite: null,
    productsArrival: null,
    productsSold: null,
    searchProducts: null,
    relatedProducts: null,
    filteredProducts: null
}

const UPDATED_STATE_PRODUCTS_BY_ACTION = {
    [GET_PRODUCTS_SUCCESS]: (state, payload) => {
        return {
            ...state,
            products: payload.products
        }
    },
    [GET_PRODUCTS_FAIL]: (state, payload) => {
        return {
            ...state,
            products: null
        }
    },
    [GET_PRODUCTS_FAVORITE_SUCCESS]: (state,payload) => {
        return {
            ...state,
            productsFavorite: payload.products
        }
    },
    [GET_PRODUCTS_FAVORITE_FAIL]: (state,payload) => {
        return {
            ...state,
            productsFavorite: null
        }
    },
    [GET_PRODUCTS_BY_ARRIVAL_SUCCESS]: (state, payload) => {
        return {
            ...state,
            productsArrival: payload.products
        }
    },
    [GET_PRODUCTS_BY_ARRIVAL_FAIL]: (state, payload) => {
        return {
            ...state,
            productsArrival: null
        }
    },
    [GET_PRODUCTS_BY_SOLD_SUCCESS]: (state, payload) => {
        return {
            ...state,
            productsSold: payload.products
        }
    },
    [GET_PRODUCTS_BY_SOLD_FAIL]: (state, payload) => {
        return {
            ...state,
            productsSold: null
        }
    },
    [GET_PRODUCT_SUCCESS]: (state, payload) => {
        return {
            ...state,
            product: payload.product
        }
    },
    [GET_PRODUCT_FAIL]: (state, payload) => {
        return {
            ...state,
            product: null
        }
    },
    [SEARCH_PRODUCTS_SUCCESS]: (state, payload) => {
        return {
            ...state,
            searchProducts: payload.search_products
        }
    },
    [SEARCH_PRODUCTS_FAIL]: (state, payload) => {
        return {
            ...state,
            searchProducts: null
        }
    },
    [RELATED_PRODUCTS_SUCCESS]: (state, payload) => {
        return {
            ...state,
            relatedProducts: payload.related_products
        }
    },
    [RELATED_PRODUCTS_FAIL]: (state, payload) => {
        return {
            ...state,
            relatedProducts: null
        }
    },
    [FILTER_PRODUCTS_SUCCESS]: (state, payload) => {
        return {
            ...state,
            filteredProducts: payload.filtered_products
        }
    },
    [FILTER_PRODUCTS_FAIL]: (state, payload) => {
        return {
            ...state,
            filteredProducts: null
        }
    },
    
}



export const productReducer = (state = productInitialState, action) => {
    const { type: actionType, payload } = action;
    const updateState = UPDATED_STATE_PRODUCTS_BY_ACTION[actionType]
    return updateState ? updateState(state, payload) : state
}


