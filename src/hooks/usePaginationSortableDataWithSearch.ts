import React from "react";
import {searchInArray} from "../searchInArray";

export enum SortDirection {
    DESC = "DESC",
    ASC = "ASC"
}

interface Config {
    key: string,
    direction: SortDirection
}

export const usePaginationSortableDataWithSearch = (items: any[],
                                                    config: Config | null = null,
                                                    page: number = 1,
                                                    rowsPerPage: number = 20,
                                                    query: string | null = null)  => {
    const [sortConfig, setSortConfig] = React.useState(config);
    
    const [currentPage, setCurrentPage] = React.useState(page)
    
    const [currentRowsPerPage, setCurrentRowsPerPage] = React.useState(rowsPerPage)

    const [currentQuery, setCurrentQuery] = React.useState(query)

    const sortedItems = React.useMemo(() => {
        let sortableItems = [...items]
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] === b[sortConfig.key]) return 0
                return a[sortConfig.key] < b[sortConfig.key] ?
                    sortConfig.direction === SortDirection.ASC ? -1 : 1
                    :
                    sortConfig.direction === SortDirection.ASC ? 1 : -1
            })
        }
        return sortableItems
    }, [items, sortConfig])

    const requestSort = (key: string) => {
        let direction: SortDirection = SortDirection.ASC
        if (sortConfig && sortConfig.key === key && sortConfig.direction === SortDirection.ASC) {
            direction = SortDirection.DESC
        }
        setSortConfig({ key, direction })
    }

    const paginatedItems = React.useMemo(() => {
        return sortedItems.slice(currentPage*currentRowsPerPage-currentRowsPerPage, currentPage*currentRowsPerPage-currentRowsPerPage+currentRowsPerPage)
    }, [sortedItems, currentPage, currentRowsPerPage])
    
    const requestChangePage = (newPage: number) => {
        setCurrentPage(newPage)
    }

    const requestChangeRowsPerPage = (newRowsPerPage: number) => {
        setCurrentRowsPerPage(newRowsPerPage)
    }

    const queriedItems = React.useMemo(() => {
        if(!currentQuery) return paginatedItems
        return searchInArray(paginatedItems, currentQuery)
    }, [paginatedItems, currentQuery])

    const requestChangeQuery = (newQuery: string) => {
        setCurrentQuery(newQuery)
    }

    return {
        items: queriedItems,
        requestSort, sortConfig,
        requestChangePage,
        requestChangeRowsPerPage,
        requestChangeQuery,
        page: currentPage,
        count: items.length,
        rowsPerPage: currentRowsPerPage
    }
}