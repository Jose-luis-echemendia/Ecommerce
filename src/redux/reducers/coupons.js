import {
    GET_COUPON_SUCCESS,
    GET_COUPON_FAIL
} from '../actions/types'

export const couponInitialState = {
    coupon: null,

}

const UPDATED_STATE_COUPON_BY_ACTION = {
    [GET_COUPON_SUCCESS]: (state, payload) => {
        return {
            coupon: payload.coupon
        }
    },
    [GET_COUPON_FAIL]: (state, payload) => {
        return {
            coupon: null
        }
    },

}



export const couponReducer = (state = couponInitialState, action) => {
    const { type: actionType, payload } = action;
    const updateState = UPDATED_STATE_COUPON_BY_ACTION[actionType]
    return updateState ? updateState(state, payload) : state
}