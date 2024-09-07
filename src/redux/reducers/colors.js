import {
    GET_COLORS_FAIL,
    GET_COLORS_SUCCESS
} from "../actions/types";

export const colorsInitialState = {
    colors: null
}

const UPDATED_STATE_COLORS_BY_ACTION = {
    [GET_COLORS_SUCCESS]: (state, payload) =>{
        return {
            ...state,
            colors: payload.colors
        }
    },
    [GET_COLORS_FAIL]: (state, payload) =>{
        return {
            ...state,
            colors: null
        }
    },
    
}



export const colorsReducer = (state = colorsInitialState, action) => {
    const { type: actionType, payload } = action;
    const updateState = UPDATED_STATE_COLORS_BY_ACTION[actionType]
    return updateState ? updateState(state, payload) : state
}


