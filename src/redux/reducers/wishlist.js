import {
    GET_WISHLIST_ITEMS_SUCCESS,
    GET_WISHLIST_ITEMS_FAIL,
    ADD_WISHLIST_ITEM_SUCCESS,
    ADD_WISHLIST_ITEM_FAIL,
    GET_WISHLIST_ITEM_TOTAL_SUCCESS,
    GET_WISHLIST_ITEM_TOTAL_FAIL,
    REMOVE_WISHLIST_ITEM_SUCCESS,
    REMOVE_WISHLIST_ITEM_FAIL,
    CLEAR_WISHLIST,
} from '../actions/types'

export const wishlistInitialState = {
    items: null,
    totalItems: 0
}

const UPDATED_STATE_WISHLIST_BY_ACTION = {
    [GET_WISHLIST_ITEMS_SUCCESS]: (state, payload) => {
        return {
            ...state,
            items: payload.wishlist
        }
    },
    [GET_WISHLIST_ITEMS_FAIL]: (state, payload) => {
        return {
            ...state
        }
    },
    [ADD_WISHLIST_ITEM_SUCCESS]: (state, payload) => {
        return {
            ...state,
            items: payload.wishlist
        }
    },
    [ADD_WISHLIST_ITEM_FAIL]: (state, payload) => {
        return {
            ...state
        }
    },
    [GET_WISHLIST_ITEM_TOTAL_SUCCESS]: (state, payload) => {
        return {
            ...state,
            totalItems: payload.total_items
        }
    },
    [GET_WISHLIST_ITEM_TOTAL_FAIL]: (state, payload) => {
        return {
            ...state
        }
    },
    [REMOVE_WISHLIST_ITEM_SUCCESS]: (state, payload) => {
        return {
            ...state,
            items: payload.wishlist
        }
    },
    [REMOVE_WISHLIST_ITEM_FAIL]: (state, payload) => {
        return {
            ...state
        }
    },
    [CLEAR_WISHLIST]: (state, payload) => {
        return {
            ...state,
            items: [],
            totalItems: 0
        }
    },

}



export const wishlistReducer = (state = wishlistInitialState, action) => {
    const { type: actionType, payload } = action;
    const updateState = UPDATED_STATE_WISHLIST_BY_ACTION[actionType]
    return updateState ? updateState(state, payload) : state
}