import React from "react";

export const Navbar: React.FC = ({ children }) => {
    return (
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
                        {children}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

interface LinkProps {
    active: boolean,
    name: string,
    onClick: React.MouseEventHandler
}

export const Link: React.FC<LinkProps> = ({ active, name, onClick }) => {
    return (
        <li className="nav-item">
            <a className={`nav-link${active ? ' active' :''}`}
               href="#"
               onClick={onClick}
            >
                {name}
            </a>
        </li>
    )
}