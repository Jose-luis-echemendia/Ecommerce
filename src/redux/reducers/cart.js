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
} from "../actions/types";

export const cartInitialState = {
    items: null,
    totalCost: 0.00,
    compareTotalCost: 0.00,
    totalItems: 0,
}

const UPDATED_STATE_CART_BY_ACTION = {
    [ADD_ITEM]: (state, payload) => {
        localStorage.setItem('cart', JSON.stringify(payload))
        return {
            ...state,
            items: JSON.parse(localStorage.getItem('cart')),
        }
    },
    [ADD_ITEM_SUCCESS]: (state, payload) => {
        return {
            ...state,
            items: payload.cart,
        }
    },
    [ADD_ITEM_FAIL]: (state, payload) => {
        return {
            ...state,
            items: null,
        }
    },
    [GET_TOTAL]: (state, payload) => {
        return {
            ...state,
            totalCost: payload[0],
            compareTotalCost: payload[1]
        }
    },
    [GET_TOTAL_SUCCESS]: (state, payload) => {
        return {
            ...state,
            totalCost: payload.total_cost,
            compareTotalCost: payload.total_compare_cost
        }
    },
    [GET_TOTAL_FAIL]: (state, payload) => {
        return {
            ...state,
            totalCost: 0.00,
            compareTotalCost: 0.00
        }
    },
    [GET_ITEM_TOTAL]: (state, payload) => {
        return {
            ...state,
            totalItems: payload
        }
    },
    [GET_ITEM_TOTAL_SUCCESS]: (state, payload) => {
        return {
            ...state,
            totalItems: payload.total_items
        }
    },
    [GET_ITEM_TOTAL_FAIL]: (state, payload) => {
        return {
            ...state,
            totalItems: 0
        }
    },
    [GET_ITEMS]: (state, payload) => {
        return {
            ...state,
            items: JSON.parse(localStorage.getItem('cart'))
        }
    },
    [GET_ITEMS_SUCCESS]: (state, payload) => {
        return {
            ...state,
            items: payload.cart
        }
    },
    [GET_ITEMS_FAIL]: (state, payload) => {
        return {
            ...state,
            items: null
        }
    },
    [UPDATE_ITEM]: (state, payload) => {
        localStorage.setItem('cart', JSON.stringify(payload))
        return {
            ...state,
            items: JSON.parse(localStorage.getItem('cart'))
        }
    },
    [UPDATE_ITEM_SUCCESS]: (state, payload) => {
        return {
            ...state,
            items: payload.cart
        }
    },
    [UPDATE_ITEM_FAIL]: (state, payload) => {
        return {
            ...state
        }
    },
    [REMOVE_ITEM]: (state, payload) => {
        localStorage.setItem('cart', JSON.stringify(payload))
        return {
            ...state,
            items: JSON.parse(localStorage.getItem('cart')),
            
            totalItems: state.totalItems - 1
        }
    },
    [REMOVE_ITEM_SUCCESS]: (state, payload) => {
        return {
            ...state,
            items: payload.cart,
            totalItems: state.totalItems - 1
        }
    },
    [REMOVE_ITEM_FAIL]: (state, payload) => {
        return {
            ...state
        }
    },
    [EMPTY_CART]: (state, payload) => {
        return {
            ...state
        }
    },
    [EMPTY_CART_SUCCESS]: (state, payload) => {
        return {
            ...state,
            items: null,
            totalCost: 0.00,
            compareTotalCost: 0.00,
            totalItems: 0
        }
    },
    [EMPTY_CART_FAIL]: (state, payload) => {
        localStorage.removeItem('cart')
        return {
            ...state,
            items: null,
            totalCost: 0.00,
            compareTotalCost: 0.00,
            totalItems: 0
        }
    },
    [SYNCH_CART_SUCCESS]: (state, payload) => {
    },
    [SYNCH_CART_FAIL]: (state, payload) => {
        localStorage.removeItem('cart');
        return {
            ...state
        };
    },

}



export const cartReducer = (state = cartInitialState, action) => {
    const { type: actionType, payload } = action;
    const updateState = UPDATED_STATE_CART_BY_ACTION[actionType]
    return updateState ? updateState(state, payload) : state
}


