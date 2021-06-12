import React from "react";

interface TablePaginatorProps {
    rowsPerPageOptions: (number | { label: string, value: number })[]
    count: number
    page: number
    rowsPerPage: number
    onChangePage: (event: React.MouseEvent | null, newPage: number) => void
    onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export const TablePaginator: React.FC<TablePaginatorProps> = ({
                                                                  rowsPerPageOptions,
                                                                  page,
                                                                  count,
                                                                  rowsPerPage,
                                                                  onChangePage,
                                                                  onChangeRowsPerPage}) => {
    const range = (from: number, to: number, step = 1) => {
        let i = from;
        const range = [];

        while (i <= to) {
            range.push(i);
            i += step;
        }

        return range;
    }

    const fetchPageNumbers = () => {
        const totalPages = Math.ceil(count/rowsPerPage)

        /**
         * totalNumbers: кол-во кнопок с номерами страниц
         * totalBlocks: общее кол-во кнопок, в т.ч. стрел очкиобщее кол-во кнопок, в т.ч. стрел очки
         */
        const totalNumbers = 5
        const totalBlocks = totalNumbers + 2

        if (totalPages > totalBlocks) {
            const startPage = Math.max(2, page - 1);
            const endPage = Math.min(totalPages - 1, page + 1);
            let pages = range(startPage, endPage);

            /**
             * hasLeftSpill: имеются ли скрытые страницы слева
             * hasRightSpill: имеются ли скрытые страницы справа
             * spillOffset: скрытые страницы справа или слева
             */
            const hasLeftSpill = startPage > 2;
            const hasRightSpill = (totalPages - endPage) > 1;
            const spillOffset = totalNumbers - (totalPages + 1);

            switch (true) {
                // handle: (1) < {5 6} [7] {8 9} (10)
                case (hasLeftSpill && !hasRightSpill): {
                    const extraPages = range(startPage - spillOffset, startPage - 1);
                    pages = [-1, ...extraPages, ...pages];
                    break;
                }

                // handle: (1) {2 3} [4] {5 6} > (10)
                case (!hasLeftSpill && hasRightSpill): {
                    const extraPages = range(endPage + 1, endPage + spillOffset);
                    pages = [...pages, ...extraPages, -5];
                    break;
                }

                // handle: (1) < {4 5} [6] {7 8} > (10)
                case (hasLeftSpill && hasRightSpill):
                default: {
                    pages = [-1, ...pages, -5];
                    break;
                }
            }

            return [1, ...pages, totalPages]
        }
        return range(1, totalPages)
    }

    const handleClick = (newPage: number) => (e: React.MouseEvent) => {
        e.preventDefault()
        onChangePage(e, newPage)
    }

    const handleMoveLeft = (e: React.MouseEvent) => {
        e.preventDefault();
        onChangePage(e, page - 1)
    }

    const handleMoveRight = (e: React.MouseEvent) => {
        e.preventDefault();
        onChangePage(e, page + 1)
    }

    return (
        <>
            <div className="btn-group">
                <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown"
                        aria-expanded="false">
                    {rowsPerPage}
                </button>
                <ul className="dropdown-menu">
                    {rowsPerPageOptions.map((item, key) =>
                        <li><a className="dropdown-item" href="#">{typeof item === 'number' ? item : item.label}</a></li>
                    )}
                </ul>
            </div>
            <nav>
                <ul className="pagination">
                    {fetchPageNumbers().map((pageNum, key) => {
                            if(pageNum === -1) return (
                                <li className="page-item" key={key}>
                                    <a onClick={handleMoveLeft} className="page-link" href="#" aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                    </a>
                                </li>
                            )
                            if(pageNum === -5) return (
                                <li className="page-item" key={key}>
                                    <a onClick={handleMoveRight} className="page-link" href="#" aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                    </a>
                                </li>
                            )
                            return (
                                <li className="page-item" key={key}>
                                    <a onClick={handleClick(pageNum)} className="page-link" href="#">{pageNum}</a>
                                </li>
                            )
                        }
                    )}

                </ul>
            </nav>
        </>

    )
}