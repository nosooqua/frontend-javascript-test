import {UserAction, UserActionTypes, UserState} from "../../types/user";

const initialState: UserState = {
    users: [],
    loading: false,
    error: null
}

export const userReducer = (state: UserState = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UserActionTypes.FETCH_USERS:
            return { users: [], loading: true, error: null }
        case UserActionTypes.FETCH_USERS_SUCCESS:
            return { users: action.payload, loading: false, error: null }
        case UserActionTypes.FETCH_USERS_ERROR:
            return { users: [], loading: false, error: action.payload }
        case UserActionTypes.ADD_USER:
            return { users: [], loading: false, error: null }
        default:
            return state
    }
}