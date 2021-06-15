import React from "react";
import {useActions} from "./hooks/useActions";
import {useTypedSelector} from "./hooks/useTypedSelector";
import {TablePaginator} from "./components/TablePaginator";
import {User, UserListSize} from "./types/user";
import {UserDescription} from "./components/UserDescription";
import {AddUser} from "./components/AddUser";
import {SortDirection, usePaginationSortableDataWithSearch} from "./hooks/usePaginationSortableDataWithSearch";
import {SearchUser} from "./components/SearchUsers";

export const App: React.FC = () => {

    const {users, loading, error, size } = useTypedSelector(state => state.user)

    const [selectedUser, setSelectedUser] = React.useState<User>()

    const handleUserSelect = (user: User) => (event: React.MouseEvent) => {
        event.preventDefault()
        setSelectedUser(user)
    }

    const {fetchUsersShort, fetchUsersLong, addUser, searchUser} = useActions()

    const {
        items,
        requestSort,
        sortConfig,
        count,
        requestChangeQuery,
        requestChangeRowsPerPage,
        page,
        rowsPerPage,
        requestChangePage
    } = usePaginationSortableDataWithSearch(
        users
        )

    React.useEffect(() => {
        fetchUsersShort()
    }, [])

    const handleFetchUsersShortClick = (e: React.MouseEvent) => {
        e.preventDefault()
        fetchUsersShort()
    }

    const handleFetchUsersLongClick = (e: React.MouseEvent) => {
        e.preventDefault()
        fetchUsersLong()
    }

    const handleAddUser = (user: User) => {
        addUser(user)
    }

    // TODO: РЕФАКТОРИИИИИНГ!!!!!!

    return (
        <div className="app">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container container-lg container-fluid">
                    <a className="navbar-brand" href="#">Тестовое задание Future</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className={`nav-link${size === UserListSize.SHORT ? ' active' :''}`}
                                   href="#"
                                   onClick={handleFetchUsersShortClick}
                                >
                                    Маленький набор данных
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link${size === UserListSize.LONG ? ' active' :''}`}
                                   href="#"
                                   onClick={handleFetchUsersLongClick}
                                >
                                    Большой набор данных
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container container-lg container-fluid mt-4">
                <AddUser addUserEvent={handleAddUser}/>
                <div className="row justify-content-between align-items-center row-cols-auto">
                    <div className="col">
                        <SearchUser searchInputChange={requestChangeQuery} searchInputSend={searchUser}/>
                    </div>
                    <div className="col">
                        <TablePaginator rowsPerPageOptions={[5,20,50]}
                                        count={count}
                                        page={page}
                                        rowsPerPage={rowsPerPage}
                                        onChangePage={requestChangePage}
                                        onChangeRowsPerPage={requestChangeRowsPerPage}
                        />
                    </div>
                </div>
                <table className="table table-hover table-bordered mt-4">
                    {error && <h3>{error}</h3>}
                    {loading && <div className="spinner-border m-3" role="status"><span className="visually-hidden">Loading...</span></div>}
                    <thead>
                    <tr>
                        <th scope="col" onClick={() => requestSort("id")}>
                            ID
                            {sortConfig?.key === "id" ?
                                sortConfig.direction === SortDirection.DESC ?
                                    <i className="bi bi-caret-down-fill"/>
                                    :
                                    <i className="bi bi-caret-up-fill"/>
                                :
                                ""
                            }
                        </th>
                        <th scope="col" onClick={() => requestSort("firstName")}>
                            Имя
                            {sortConfig?.key === "firstName" ?
                                sortConfig.direction === SortDirection.DESC ?
                                    <i className="bi bi-caret-down-fill"/>
                                    :
                                    <i className="bi bi-caret-up-fill"/>
                                :
                                ""
                            }
                        </th>
                        <th scope="col" onClick={() => requestSort("lastName")}>
                            Фамилия
                            {sortConfig?.key === "lastName" ?
                                sortConfig.direction === SortDirection.DESC ?
                                    <i className="bi bi-caret-down-fill"/>
                                    :
                                    <i className="bi bi-caret-up-fill"/>
                                :
                                ""
                            }
                        </th>
                        <th scope="col" onClick={() => requestSort("email")}>
                            E-Mail
                            {sortConfig?.key === "email" ?
                                sortConfig.direction === SortDirection.DESC ?
                                    <i className="bi bi-caret-down-fill"/>
                                    :
                                    <i className="bi bi-caret-up-fill"/>
                                :
                                ""
                            }
                        </th>
                        <th scope="col" onClick={() => requestSort("phone")}>
                            Телефон
                            {sortConfig?.key === "phone" ?
                                sortConfig.direction === SortDirection.DESC ?
                                    <i className="bi bi-caret-down-fill"/>
                                    :
                                    <i className="bi bi-caret-up-fill"/>
                                :
                                ""
                            }
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item, key) =>
                        <tr key={key}
                            onClick={handleUserSelect(item)}
                            className={selectedUser === item ? 'table-active' : ''}>
                            <th scope="row">{item.id}</th>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
                {selectedUser && <UserDescription user={selectedUser}/>}
            </div>
        </div>

    )
}