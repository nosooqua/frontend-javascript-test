import {UserAction, UserActionTypes, UserState} from "../../types/user";

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
    size: null
}

export const userReducer = (state: UserState = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UserActionTypes.FETCH_USERS:
            return { users: [], loading: true, error: null, size: action.size }
        case UserActionTypes.FETCH_USERS_SUCCESS:
            return { users: action.payload, loading: false, error: null, size: action.size }
        case UserActionTypes.FETCH_USERS_ERROR:
            return { users: [], loading: false, error: action.payload, size: null }
        case UserActionTypes.ADD_USER:
            return { users: [action.payload, ...state.users], loading: false, error: null, size: state.size }
        case UserActionTypes.SEARCH_USER:
            return { users: action.payload, loading: false, error: null, size: state.size }
        default:
            return state
    }
}