import React from "react";
import {User} from "../types/user";

interface UserDescriptionProps {
    user: User
}

export const UserDescription: React.FC<UserDescriptionProps> = ({ user }) => {
    return (
        <div className="card">
            <div className="card-body">
                <p>Выбран пользователь <strong>{user.firstName} {user.lastName}</strong></p>
                <p>Описание:</p>
                <textarea className="form-control" value={user.description} />
                <p>Адрес проживания: <strong>{user.address ? user.address.streetAddress : "-"}</strong></p>
                <p>Город: <strong>{user.address ? user.address.city : "-"}</strong></p>
                <p>Провинция/штат: <strong>{user.address ? user.address.state : "-"}</strong></p>
                <p>Индекс: <strong>{user.address ? user.address.zip : "-"}</strong></p>
            </div>
        </div>
    )
}