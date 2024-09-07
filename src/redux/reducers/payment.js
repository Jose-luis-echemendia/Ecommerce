import {
    PAYMENT_SUCCESS,
    PAYMENT_FAIL,
    SET_PAYMENT_LOADING,
    REMOVE_PAYMENT_LOADING,
    RESET_PAYMENT_INFO,
    GET_PAYMENT_TOTAL_SUCCESS,
    GET_PAYMENT_TOTAL_FAIL,
    GET_HISTORY_PAYMENT_FAIL,
    GET_HISTORY_PAYMENT_SUCCESS
} from '../actions/types'

export const paymentInitialState = {
    historyPayment: null,
    madePayment: false,
    originalPrice: 0.0,
    totalAfterCoupon: 0.0,
    totalCost: 0.0,
    totalCompareCost: 0.0,
    estimatedTax: 0.0,
    shippingCost: 0.0,
    loading: false

}

const UPDATED_STATE_PAYMENT_BY_ACTION = {
    [GET_HISTORY_PAYMENT_SUCCESS]: (state, payload)=> {
        return {
            ...state,
            historyPayment: payload.historyPayment
        }
    },
    [GET_HISTORY_PAYMENT_FAIL]: (state, payload)=> {
        return {
            ...state,

        }
    },
    [GET_PAYMENT_TOTAL_SUCCESS]: (state, payload) => {

        return {
            ...state,
            originalPrice: payload.original_price,
            totalAfterCoupon: payload.total_after_coupon,
            totalCost: payload.total_amount,
            totalCompareCost: payload.total_compare_amount,
            estimatedTax: payload.estimated_tax,
            shippingCost: payload.shipping_cost
        }
    },
    [GET_PAYMENT_TOTAL_FAIL]: (state, payload) => {

        return {
            ...state,
            originalPrice: 0.00,
            totalAfterCoupon: 0.00,
            totalCost: 0.00,
            totalCompareCost: 0.00,
            estimatedTax: 0.00,
            shippingCost: 0.00
        }
    },
    [PAYMENT_SUCCESS]: (state, payload) => {
        return {
            ...state,
            madePayment: true
        }
    },
    [PAYMENT_FAIL]: (state, payload) => {
        return {
            ...state,
            madePayment: false
        }
    },
    [SET_PAYMENT_LOADING]: (state, payload) => {
        return {
            ...state,
            loading: true
        }
    },
    [REMOVE_PAYMENT_LOADING]: (state, payload) => {
        return {
            ...state,
            loading: false
        }
    },
    [RESET_PAYMENT_INFO]: (state, payload) => {
        return paymentInitialState
    }

}



export const paymentReducer = (state = paymentInitialState, action) => {
    const { type: actionType, payload } = action;
    const updateState = UPDATED_STATE_PAYMENT_BY_ACTION[actionType]
    return updateState ? updateState(state, payload) : state
}