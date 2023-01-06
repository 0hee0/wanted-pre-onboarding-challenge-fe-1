import axios from 'axios';
import {
    SIGNUP_USER,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    LOGIN_USER,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_USER
} from './types';
import { USER_SERVER } from '../../Config';

const sleep = n => new Promise(resolve => setTimeout(resolve, n));

export function signUpUser(dataToSubmit) {
    return function action(dispatch) {
        dispatch({ type: SIGNUP_USER });

        const request = axios({
            method: "post",
            url: `${USER_SERVER}/users/create`,
            data: dataToSubmit
        });

        return request.then(
            response => {
                if (response?.request?.status === 200) {
                    dispatch(signUpSuccess(response.data.message));
                }
            },
            error => {
                if (error?.response?.data?.details) {
                    dispatch(signUpFailure(error?.response?.data?.details));
                }
            }
        )
    }
}

export async function signUpSuccess(payload) {
    return {
        type: SIGNUP_SUCCESS,
        payload: payload
    }
}

export function signUpFailure(payload) {
    let message = "회원가입에 실패하였습니다. 다시 시도해주세요"
    if (payload) {
        message = payload;
    }

    return {
        type: SIGNUP_FAILURE,
        payload: message
    }
}

export function loginUser(dataToSubmit) {
    return function action(dispatch) {
        dispatch({ type: LOGIN_USER });

        const request = axios({
            method: "post",
            url: `${USER_SERVER}/users/login`,
            data: dataToSubmit
        });

        return request.then(
            response => {
                if (response?.data?.token) {
                    dispatch(loginSuccess(response.data.token));
                }
            },
            error => {
                if (error?.response?.data?.details) {
                    dispatch(loginFailure(error?.response?.data?.details));
                }
            }
        )
    }
}

export function loginSuccess(payload) {
    window.localStorage.setItem("token", payload);
    
    return {
        type: LOGIN_SUCCESS,
        payload: payload
    }
}

export function loginFailure(payload) {
    let message = "로그인에 실패하였습니다. 다시 시도해주세요"
    if (payload) {
        message = payload;
    }

    return {
        type: LOGIN_FAILURE,
        payload: message
    }
}

export function logoutUser() {
    window.localStorage.removeItem('token');

    return {
        type: LOGOUT_USER,
    }
}
