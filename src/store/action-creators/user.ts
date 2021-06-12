import {Dispatch} from "redux";
import {UserAction, UserActionTypes, UserLink} from "../../types/user";

export const fetchUsersShort = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        dispatch({type: UserActionTypes.FETCH_USERS})
        fetch(UserLink.SHORT)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                dispatch({type: UserActionTypes.FETCH_USERS_SUCCESS, payload: data})
            })
            .catch(e => {
                dispatch({
                    type: UserActionTypes.FETCH_USERS_ERROR,
                    payload: "Произошла оишбка при загрузке пользователей"
                })
            })
    }
}

export const fetchUsersLong = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        dispatch({type: UserActionTypes.FETCH_USERS})
        fetch(UserLink.LONG)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                dispatch({type: UserActionTypes.FETCH_USERS_SUCCESS, payload: data})
            })
            .catch(e => {
                dispatch({
                    type: UserActionTypes.FETCH_USERS_ERROR,
                    payload: "Произошла оишбка при загрузке пользователей"
                })
            })
    }
}