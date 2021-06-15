import React from "react";

interface ThProps {
    onClick: React.MouseEventHandler
    showSort: boolean
    desc: boolean
}

export const Th: React.FC<ThProps> = ({ onClick, children, desc, showSort }) => {
    return (
        <th scope="col" onClick={onClick}>
            {children}
            {showSort ? desc ?
                    <i className="bi bi-caret-down-fill"/>
                    :
                    <i className="bi bi-caret-up-fill"/>
                : ""
            }
        </th>
    )
}