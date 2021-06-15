import React from "react";
import {useActions} from "./hooks/useActions";
import {useTypedSelector} from "./hooks/useTypedSelector";
import {TablePaginator} from "./components/TablePaginator";
import {User, UserListSize} from "./types/user";
import {UserDescription} from "./components/UserDescription";
import {AddUser} from "./components/AddUser";
import {SortDirection, usePaginationSortableDataWithSearch} from "./hooks/usePaginationSortableDataWithSearch";
import {SearchUser} from "./components/SearchUsers";
import {Link, Navbar} from "./components/Navbar";
import {Th} from "./components/Th";

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
            <Navbar>
                <Link active={size === UserListSize.SHORT}
                      name="Маленький набор данных"
                      onClick={handleFetchUsersShortClick}
                />
                <Link active={size === UserListSize.LONG}
                      name="Большой набор данных"
                      onClick={handleFetchUsersLongClick}
                />
            </Navbar>
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
                        <Th onClick={() => requestSort("id")}
                            showSort={sortConfig?.key === "id"}
                            desc={sortConfig?.direction === SortDirection.DESC}
                        >
                            ID
                        </Th>
                        <Th onClick={() => requestSort("firstName")}
                            showSort={sortConfig?.key === "firstName"}
                            desc={sortConfig?.direction === SortDirection.DESC}
                        >
                            Имя
                        </Th>
                        <Th onClick={() => requestSort("lastName")}
                            showSort={sortConfig?.key === "lastName"}
                            desc={sortConfig?.direction === SortDirection.DESC}
                        >
                            Фамилия
                        </Th>
                        <Th onClick={() => requestSort("email")}
                            showSort={sortConfig?.key === "email"}
                            desc={sortConfig?.direction === SortDirection.DESC}
                        >
                            E-Mail
                        </Th>
                        <Th onClick={() => requestSort("phone")}
                            showSort={sortConfig?.key === "phone"}
                            desc={sortConfig?.direction === SortDirection.DESC}
                        >
                            Телефон
                        </Th>
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