import {
    GET_SIZES_FAIL,
    GET_SIZES_SUCCESS
} from "../actions/types";

export const sizesInitialState = {
    sizes: null
}

const UPDATED_STATE_SIZES_BY_ACTION = {
    [GET_SIZES_SUCCESS]: (state, payload) =>{
        return {
            ...state,
            sizes: payload.sizes
        }
    },
    [GET_SIZES_FAIL]: (state, payload) =>{
        return {
            ...state,
            sizes: null
        }
    },
    
}



export const sizesReducer = (state = sizesInitialState, action) => {
    const { type: actionType, payload } = action;
    const updateState = UPDATED_STATE_SIZES_BY_ACTION[actionType]
    return updateState ? updateState(state, payload) : state
}


