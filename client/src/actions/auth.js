export const SIGNUP_LOADING = 'SIGNUP_LOADING';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export const ADD_NEW_ERROR_SIGN_UP = 'ADD_NEW_ERROR_SIGN_UP';
export const SIGNIN_LOADING = 'SIGNUIN_LOADING';
export const SIGNIN_ERROR = 'SIGNIN_ERROR';
export const LOGOUT = 'LOGOUT';


export const addNewErrorToSignUp = (key, message) => {
    return {
        type: ADD_NEW_ERROR_SIGN_UP,
        key,
        message
    }
};

export const signupLoading = () => {
    return {
        type: SIGNUP_LOADING
    }
};


export const authSuccess = (user) => {
    return {
        type: AUTH_SUCCESS,
        user
    }
};

export const signupError = (errors) => {
    return {
        type: SIGNUP_ERROR,
        errors
    }
};

export const signInLoading = () => {
    return {
        type: SIGNIN_LOADING
    }
};

export const signInError = (errors) => {
    return {
        type: SIGNIN_ERROR,
        errors
    }
};

export const logout = () => {
    return {
        type: LOGOUT
    }
};
