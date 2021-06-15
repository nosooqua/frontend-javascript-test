import React from "react";

interface TablePaginatorProps {
    rowsPerPageOptions: number[]
    count: number
    page: number
    rowsPerPage: number
    onChangePage: (newPage: number) => void
    onChangeRowsPerPage: (newRowsPerPage: number) => void
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
        onChangePage(newPage)
    }

    const handleMoveLeft = (e: React.MouseEvent) => {
        e.preventDefault();
        onChangePage(page - 1)
    }

    const handleMoveRight = (e: React.MouseEvent) => {
        e.preventDefault();
        onChangePage(page + 1)
    }

    return (
        <>
            <div className="container">
                <div className="row align-items-center row-cols-auto">
                    <div className="col"><p className="mb-0">Записи с {page*rowsPerPage-rowsPerPage+1} по {Math.min(page*rowsPerPage, count)} из {count}.</p></div>
                    <div className="col"><p className="mb-0">Записей на страницу:</p></div>
                    <div className="col">
                        <div className="btn-group">
                            <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                {rowsPerPage}
                            </button>
                            <ul className="dropdown-menu">
                                {rowsPerPageOptions.map((item, key) =>
                                    <li key={key} onClick={() => onChangeRowsPerPage(item)}>
                                        <a className="dropdown-item" href="#">
                                            {item}
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="col">
                        <nav>
                            <ul className="pagination mb-0">
                                {fetchPageNumbers().map((pageNum, key) => {
                                        if(pageNum === -1) return (
                                            <li className="page-item" key={key}>
                                                <a onClick={handleMoveLeft}
                                                   className="page-link"
                                                   aria-label="Previous"
                                                   href="#"
                                                >
                                                    <span aria-hidden="true">&laquo;</span>
                                                </a>
                                            </li>
                                        )
                                        if(pageNum === -5) return (
                                            <li className="page-item" key={key}>
                                                <a onClick={handleMoveRight}
                                                   className="page-link"
                                                   aria-label="Next"
                                                   href="#"
                                                >
                                                    <span aria-hidden="true">&raquo;</span>
                                                </a>
                                            </li>
                                        )
                                        return (
                                            <li className={`page-item ${pageNum === page ? 'active' : ""}`} key={key}>
                                                <a onClick={handleClick(pageNum)}
                                                   className="page-link"
                                                   href="#"
                                                >{pageNum}</a>
                                            </li>
                                        )
                                    }
                                )}

                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>

    )
}