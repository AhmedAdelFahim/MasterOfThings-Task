import {
    SIGNIN_LOADING,
    SIGNIN_ERROR,
    SIGNUP_LOADING,
    SIGNUP_ERROR,
    ADD_NEW_ERROR_SIGN_UP,
    AUTH_SUCCESS,
    SIGNUP_SUCCESS,
    LOGOUT
} from "../actions/auth";

const defaultData = {
    isAuthUser: !!localStorage.getItem("user"),
    isLoadingSignup: false,
    signupErrors: {},
    isLoadingSignin: false,
    signinErrors: {},
    // userId: (JSON.parse(localStorage.getItem("user")) && JSON.parse(localStorage.getItem("user")).userId) || '',
    name: (JSON.parse(localStorage.getItem("user")) && JSON.parse(localStorage.getItem("user")).name) || '',
    sessionId: (JSON.parse(localStorage.getItem("user")) && JSON.parse(localStorage.getItem("user")).sessionId) || ''
}

export default (state = defaultData, action) => {
    switch (action.type) {
        case ADD_NEW_ERROR_SIGN_UP:
            return {
                ...state,
                signupErrors: {...state.signupErrors, [action.key]: action.message}
            }
        case SIGNUP_LOADING:
            return {
                ...state,
                isLoadingSignup: true,
                signupErrors: {}
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isLoadingSignup: false,
                signupErrors: {}
            }
        case SIGNIN_LOADING:
            return {
                ...state,
                isLoadingSignin: true,
                signinErrors: {}
            }
        case AUTH_SUCCESS:
            localStorage.setItem("user", JSON.stringify(action.user));
            return {
                ...state,
                isLoadingSignup: false,
                isLoadingSignin: false,
                signinErrors: {},
                signupErrors: {},
                isAuthUser: true,
                // token: action.user.accessToken,
                // userId: action.user.userId,
                name: action.user.name,
                sessionId: action.user.sessionId,
            }
        case SIGNUP_ERROR:
            return {
                ...state,
                isLoadingSignup: false,
                signupErrors: action.errors
            }
        case SIGNIN_ERROR:
            return {
                ...state,
                isLoadingSignin: false,
                signinErrors: action.errors
            }
        case LOGOUT:
            return {
                ...state,
                isAuthUser: false,
                // token: '',
                // userId: '',
                sessionId:'',
                name: '',
            }
        default:
            return state
    }
}
