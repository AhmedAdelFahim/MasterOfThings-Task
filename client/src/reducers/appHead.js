import {SET_TITLE} from "../actions/appHead";

const defaultData = {
    title: 'NEWS-X'
}

export default (state = defaultData, action) => {
    switch (action.type) {
        case SET_TITLE:
            return {
                ...state,
                title: action.title
            }
        default:
            return state
    }
}
