import {
    GET_ORDERS_SUCCESS,
    GET_ORDERS_FAIL,
    GET_ORDER_DETAIL_SUCCESS,
    GET_ORDER_DETAIL_FAIL
} from '../actions/types'

export const ordersInitialState = {
    orders: null,
    orderDetail: null
}

const UPDATED_STATE_ORDERS_BY_ACTION = {
    [GET_ORDERS_SUCCESS]: (state, payload) =>{
        return {
            ...state,
            orders: payload.orders
        }
    },
    [GET_ORDERS_FAIL]: (state, payload) =>{
        return {
            ...state,
            orders: null
        }
    },
    [GET_ORDER_DETAIL_SUCCESS]: (state, payload) =>{
        return {
            ...state,
            orderDetail: payload.order
        }
    },
    [GET_ORDER_DETAIL_FAIL]: (state, payload) =>{
        return {
            ...state,
            orderDetail: null
        }
    },
    
}



export const ordersReducer = (state = ordersInitialState, action) => {
    const { type: actionType, payload } = action;
    const updateState = UPDATED_STATE_ORDERS_BY_ACTION[actionType]
    return updateState ? updateState(state, payload) : state
}