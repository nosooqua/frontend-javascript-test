export type User = {
    id: number,
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
        address?: {
        streetAddress: string,
            city: string,
            state: string,
            zip: string
    },
    description?: string
}

export enum UserListSize {
    SHORT = "SHORT",
    LONG = "LONG"
}

export enum UserLink {
    SHORT = "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}",
    LONG = "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"
}

export enum UserActionTypes {
    FETCH_USERS = "FETCH_USERS",
    FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS",
    FETCH_USERS_ERROR = "FETCH_USERS_ERROR",
    ADD_USER = "ADD_USER",
    SEARCH_USER = "SEARCH_USER"
}

export interface UserState {
    users: User[]
    loading: boolean
    error: string | null
    size: UserListSize | null
}

interface FetchUsersAction {
    type: UserActionTypes.FETCH_USERS
    size: UserListSize
}

interface FetchUsersSuccessAction {
    type: UserActionTypes.FETCH_USERS_SUCCESS
    payload: User[]
    size: UserListSize
}

interface FetchUsersErrorAction {
    type: UserActionTypes.FETCH_USERS_ERROR
    payload: string
}

interface AddUserAction {
    type: UserActionTypes.ADD_USER
    payload: User
}

interface SearchUsersAction {
    type: UserActionTypes.SEARCH_USER,
    payload: User[]
}

export type UserAction = FetchUsersAction | FetchUsersErrorAction | FetchUsersSuccessAction | AddUserAction | SearchUsersAction