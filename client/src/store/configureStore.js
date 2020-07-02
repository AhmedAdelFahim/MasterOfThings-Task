import {createStore, combineReducers} from 'redux';
import authReducer from "../reducers/auth";
import appHeadReducer from "../reducers/appHead";

export default () => {
    const store = createStore(combineReducers({
            authReducer,
            appHeadReducer
        })
    );
    return store;
};

