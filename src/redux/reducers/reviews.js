import {
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAIL,
    GET_REVIEW_SUCCESS,
    GET_REVIEW_FAIL,
    CREATE_REVIEW_SUCCESS,
    CREATE_REVIEW_FAIL,
    UPDATE_REVIEW_SUCCESS,
    UPDATE_REVIEW_FAIL,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    FILTER_REVIEWS_SUCCESS,
    FILTER_REVIEWS_FAIL,
    GET_PERMISSIONS_REVIEW_MAKE_SUCCESS,
    GET_PERMISSIONS_REVIEW_MAKE_FAIL
} from "../actions/types"



export const reviewsInitialState = {
    permissionsMakeReview: null,
    review: null,
    reviews: null
}

const UPDATED_STATE_REVIEWS_BY_ACTION = {
    [GET_PERMISSIONS_REVIEW_MAKE_SUCCESS]: (state, payload) => {
        return {
            ...state,
            permissionsMakeReview: payload.permissionsMakeReview
        }
    },
    [GET_PERMISSIONS_REVIEW_MAKE_FAIL]: (state, payload) => {
        return {
            ...state,
            permissionsMakeReview: null
        }
    },
    [GET_REVIEWS_SUCCESS]: (state, payload) => {
        return {
            ...state,
            reviews: payload.reviews
        }
    },
    [GET_REVIEWS_FAIL]: (state, payload) => {
        return {
            ...state,
            reviews: []
        }
    },
    [GET_REVIEW_SUCCESS]: (state, payload) => {

        if(payload.review == false){
            return {
                ...state,
                review: null
            }
        }
        return {
            ...state,
            review: payload.review
        }
    },
    [GET_REVIEW_FAIL]: (state, payload) => {
        return {
            ...state,
            review: {}
        }
    },
    [CREATE_REVIEW_SUCCESS]: (state, payload) => {
        return {
            ...state,
            review: payload.review,
            reviews: payload.reviews
        }
    },
    [CREATE_REVIEW_FAIL]: (state, payload) => {
        return {
            ...state,
            review: {}
        }
    },
    [UPDATE_REVIEW_SUCCESS]: (state, payload) => {
        return {
            ...state,
            review: payload.review,
            reviews: payload.reviews
        }
    },
    [UPDATE_REVIEW_FAIL]: (state, payload) => {
        return {
            ...state,

        }
    },
    [DELETE_REVIEW_SUCCESS]: (state, payload) => {
        return {
            ...state,
            review: {},
            reviews: payload.reviews
        }
    },
    [DELETE_REVIEW_FAIL]: (state, payload) => {
        return {
            ...state,

        }
    },
    [FILTER_REVIEWS_SUCCESS]: (state, payload) => {
        return {
            ...state,
            reviews: payload.reviews
        }
    },
    [FILTER_REVIEWS_FAIL]: (state, payload) => {
        return {
            ...state,

        }
    },

}



export const reviewsReducer = (state = reviewsInitialState, action) => {
    const { type: actionType, payload } = action;
    const updateState = UPDATED_STATE_REVIEWS_BY_ACTION[actionType]
    return updateState ? updateState(state, payload) : state
}


