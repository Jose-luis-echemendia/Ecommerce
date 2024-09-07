import {
    GET_USER_PROFILE_SUCCESS,
    GET_USER_PROFILE_FAIL,
    UPDATE_USER_PROFILE_SUCCESS,
    UPDATE_USER_PROFILE_FAIL
} from "../actions/types";

export const profileInitialState = {
    profile: null
}

const UPDATED_STATE_PROFILE_BY_ACTION = {
    [GET_USER_PROFILE_SUCCESS]: (state, payload) => {
        return {
            ...state,
            profile: payload.profile
        }
    },
    [GET_USER_PROFILE_FAIL]: (state, payload) => {
        return {
            ...state
        }
    },
    [UPDATE_USER_PROFILE_SUCCESS]: (state, payload) => {
        return {
            ...state,
            profile: payload.profile
        }
    },
    [UPDATE_USER_PROFILE_FAIL]: (state, payload) => {

        return {
            ...state
        }
    },

}



export const profileReducer = (state = profileInitialState, action) => {
    const { type: actionType, payload } = action;
    const updateState = UPDATED_STATE_PROFILE_BY_ACTION[actionType]
    return updateState ? updateState(state, payload) : state
}


