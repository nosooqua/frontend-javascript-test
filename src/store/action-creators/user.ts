import {Dispatch} from "redux";
import {User, UserAction, UserActionTypes, UserLink, UserListSize} from "../../types/user";
import {RootState} from "../reducers";
import {searchInArray} from "../../searchInArray";

export const fetchUsersShort = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        dispatch({type: UserActionTypes.FETCH_USERS, size: UserListSize.SHORT})
        fetch(UserLink.SHORT)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                dispatch({type: UserActionTypes.FETCH_USERS_SUCCESS, payload: data, size: UserListSize.SHORT})
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
        dispatch({type: UserActionTypes.FETCH_USERS, size: UserListSize.LONG})
        fetch(UserLink.LONG)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                dispatch({type: UserActionTypes.FETCH_USERS_SUCCESS, payload: data, size: UserListSize.LONG})
            })
            .catch(e => {
                dispatch({
                    type: UserActionTypes.FETCH_USERS_ERROR,
                    payload: "Произошла оишбка при загрузке пользователей"
                })
            })
    }
}

export const searchUser = (query: string) => (dispatch: Dispatch<UserAction>, getState: () => RootState) => {
    const {users} = getState().user
    dispatch({
        type: UserActionTypes.SEARCH_USER,
        payload: searchInArray(users, query)
    })
}

export const addUser = (user: User) => {
    return {
        type: UserActionTypes.ADD_USER,
        payload: user
    }
}