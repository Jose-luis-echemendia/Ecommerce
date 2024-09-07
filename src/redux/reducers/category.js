import {
    GET_CATEGORY_FAIL,
    GET_CATEGORY_SUCCESS
} from "../actions/types";

export const categoryInitialState = {
    categories: null
}

const UPDATED_STATE_CATEGORY_BY_ACTION = {
    [GET_CATEGORY_SUCCESS]: (state, payload) =>{
        return {
            ...state,
            categories: payload.categories
        }
    },
    [GET_CATEGORY_FAIL]: (state, payload) =>{
        return {
            ...state,
            categories: null
        }
    },
    
}



export const categoryReducer = (state = categoryInitialState, action) => {
    const { type: actionType, payload } = action;
    const updateState = UPDATED_STATE_CATEGORY_BY_ACTION[actionType]
    return updateState ? updateState(state, payload) : state
}


