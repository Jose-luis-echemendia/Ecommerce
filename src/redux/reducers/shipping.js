import {
    GET_SHIPPING_OPTIONS_SUCCESS,
    GET_SHIPPING_OPTIONS_FAIL
} from "../actions/types";

export const shippingInitialState = {
    shipping: null
}

const UPDATED_STATE_SHIPPING_BY_ACTION = {
    [GET_SHIPPING_OPTIONS_SUCCESS]: (state, payload) =>{
        return {
            ...state,
            shipping: payload.shipping_options
        }
    },
    [GET_SHIPPING_OPTIONS_FAIL]: (state, payload) =>{
        return {
            ...state,
            shipping: null
        }
    },
    
}



export const shippingReducer = (state = shippingInitialState, action) => {
    const { type: actionType, payload } = action;
    const updateState = UPDATED_STATE_SHIPPING_BY_ACTION[actionType]
    return updateState ? updateState(state, payload) : state
}


