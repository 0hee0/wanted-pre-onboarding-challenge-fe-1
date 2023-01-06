import {
    SIGNUP_USER,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    LOGIN_USER,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_USER
} from '../actions/types';

export default function(state={}, action) {
    switch(action.type) {
        case SIGNUP_USER: 
            return { ...state, success: false, alert: null, error: null }
        case SIGNUP_SUCCESS:
            return { ...state, success: true, alert: action.payload }
        case SIGNUP_FAILURE:
            return { ...state, error: action.payload, alert: action.payload }
        case LOGIN_USER:
            return { ...state, success: false, auth: false, error: null }
        case LOGIN_SUCCESS:
            return { ...state, success: true, auth: true }
        case LOGIN_FAILURE:
            return { ...state, success: false, error: action.payload }
        case LOGOUT_USER:
            return { ...state, success: true, auth: false }
        default:
            return state;
    }
}