import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATE_SUCCESS,
    ACTIVATE_FAIL,
    SET_AUTH_LOADING,
    REMOVE_AUTH_LOADING,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    GET_PERMISSIONS_USER_SUCCESS,
    GET_PERMISSIONS_USER_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    REFRESH_SUCCESS,
    REFRESH_FAIL,
    LOGOUT,
    RESET_PASSWORD_CONFIRM_SUCCESS,
    RESET_PASSWORD_CONFIRM_FAIL
} from "../actions/types";

export const authInitialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: localStorage.getItem('isAuthenticated'),
    user: JSON.parse(localStorage.getItem('user')) || null,
    loading: false
}

const UPDATED_STATE_AUTH_BY_ACTION = {
    
    [GET_PERMISSIONS_USER_SUCCESS]: (state, payload) => {
        return {
            ...state,
            user: payload
        }
    },
    [GET_PERMISSIONS_USER_FAIL]: (state, payload) => {
        return {
            ...state,
        }
    },

    [SET_AUTH_LOADING]: (state, payload) => {
        return {
            ...state,
            loading: true
        }
    },
    [REMOVE_AUTH_LOADING]: (state, payload) => {
        return {
            ...state,
            loading: false
        }
    },
    [SIGNUP_SUCCESS]: (state, payload) => {

        return {
            ...state,

        }
    },
    [SIGNUP_FAIL]: (state, payload) => {
        localStorage.getItem('access')
        localStorage.getItem('refresh')
        localStorage.getItem('isAuthenticated')

        return {
            ...state,
            access: null,
            refresh: null,
            isAuthenticated: false,
            user: null
        }
    },
    [LOGIN_SUCCESS]: (state, payload) => {
        localStorage.setItem('access', payload.access)
        localStorage.setItem('refresh', payload.refresh)
        localStorage.setItem('isAuthenticated', true)

        return {
            ...state,
            isAuthenticated: localStorage.getItem('isAuthenticated'),
            access: localStorage.getItem('access'),
            refresh: localStorage.getItem('refresh')
        }
    },
    [LOGIN_FAIL]: (state, payload) => {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        localStorage.removeItem('isAuthenticated')

        return {
            ...state,
            access: null,
            refresh: null,
            isAuthenticated: false,
            user: null
        }

    },

    [USER_LOADED_SUCCESS]: (state, payload) => {
        localStorage.setItem('user', JSON.stringify(payload))
        
        return {
            ...state,
            user: JSON.parse(localStorage.getItem('user'))
        }
    },
    [USER_LOADED_FAIL]: (state, payload) => {
        localStorage.removeItem('user')
        return {
            ...state,
            user: null
        }
    },

    [AUTHENTICATED_SUCCESS]: (state, payload) => {
        localStorage.setItem('isAuthenticated', true);
        return {
            ...state,
            isAuthenticated: localStorage.getItem('isAuthenticated')
        }
    },
    [AUTHENTICATED_FAIL]: (state, payload) => {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        localStorage.removeItem('isAuthenticated')
        return {
            ...state,
            isAuthenticated: false,
            access: null,
            refresh: null
        }
    },
    [REFRESH_SUCCESS]: (state, payload) => {
        localStorage.setItem('access', payload.access)
        return {
            ...state,
            access: localStorage.getItem('access')
        }
    },
    [REFRESH_FAIL]: (state, payload) => {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        localStorage.removeItem('isAuthenticated')
        localStorage.removeItem('user')

        return {
            ...state,
            access: null,
            refresh: null,
            isAuthenticated: false,
            user: null
        }
    },

    [ACTIVATE_SUCCESS]: (state, payload) => {
        return {
            ...state
        }
    },
    [ACTIVATE_FAIL]: (state, payload) => {
        return {
            ...state
        }
    },
    [LOGOUT]: (state, payload) => {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        localStorage.removeItem('isAuthenticated')
        localStorage.removeItem('user')
        return {
            ...state,
            access: null,
            refresh: null,
            isAuthenticated: false,
            user: null
        }
    },
    [RESET_PASSWORD_CONFIRM_SUCCESS]: (state, payload) => {
        return {
            ...state
        }
    },
    [RESET_PASSWORD_CONFIRM_FAIL]: (state, payload) => {
        return {
            ...state
        }
    }

}



export const authReducer = (state = authInitialState, action) => {
    const { type: actionType, payload } = action;
    const updateState = UPDATED_STATE_AUTH_BY_ACTION[actionType]
    return updateState ? updateState(state, payload) : state
}


