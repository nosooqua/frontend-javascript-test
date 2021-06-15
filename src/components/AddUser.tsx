import React from "react";
import {User} from "../types/user";
import useCollapse from 'react-collapsed';
import {
    useFormik
} from "formik";
import * as yup from 'yup';
import {Input} from "../elements/Input";

interface AddUserProps {
    addUserEvent: (user: User) => void
}

const initialValues: User = {email: "", id: 0, lastName: "", phone: "", firstName: "" };

const validationSchema = yup.object({
    id: yup.number()
        .typeError('Но-но! ID - число.')
        .required("Но-но! ID обязательное поле.")
        .positive("Но-но! Ну как ID может быть отрицательным?")
        .moreThan(0, "Но-но! ID не может быть нулевым.")
        .integer("Но-но! ID - это число."),
    firstName: yup.string()
        .required("Но-но! Имя обязательное поле.")
        .matches(/^\s*\S+\s*$/, "Но-но! Введите имя без пробелов."),
    lastName: yup.string()
        .required("Но-но! Фамилия обязательное поле.")
        .matches(/^\s*\S+\s*$/, "Но-но! Введите фамилию без пробелов."),
    email: yup.string()
        .required('Но-но! Поле E-Mail обязательное.')
        .email('Но-но! Введите верный E-Mail.'),
    phone: yup.string()
        .required('Но-но! Поле телефон обязательное.')
        .matches(/^\(?([0-9]{3})\)([0-9]{3})-([0-9]{4})$/ , 'Но-но! Телефон должен быть в формате (ХХХ)ХХХ-ХХХХ.')
});

export const AddUser: React.FC<AddUserProps> = ({ addUserEvent }) => {

    const [isExpanded, setExpanded] = React.useState(false);

    const { getCollapseProps, getToggleProps } = useCollapse()

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
        validateOnChange: true,
        onSubmit: (values) => {
            addUserEvent(values)
            setExpanded(false)
        },
    });

    return (
        <div className="mb-4">
            <div className="row justify-content-end align-items-center row-cols-auto">
                <div className="col">
                    <button {...getToggleProps({
                        onClick: () => setExpanded((prevExpanded) => !prevExpanded),
                    })}
                            className="btn btn-success">
                        {isExpanded ? 'Закрыть' : 'Добавить'}
                    </button>
                </div>
            </div>
            <div {...getCollapseProps()}>
                <div className="card card-body mt-4">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-3 row">
                            <label htmlFor="id" className="col-sm-2 col-form-label">ID</label>
                            <div className="col-sm-10">
                                <Input name="id"
                                       value={formik.values.id}
                                       error={formik.touched.id && Boolean(formik.errors.id)}
                                       helperText={formik.errors.id}
                                       onChange={formik.handleChange}
                                />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="firstName" className="col-sm-2 col-form-label">Имя</label>
                            <div className="col-sm-10">
                                <Input name="firstName"
                                       value={formik.values.firstName}
                                       error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                       helperText={formik.errors.firstName}
                                       onChange={formik.handleChange}
                                />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="lastName" className="col-sm-2 col-form-label">Фамилия</label>
                            <div className="col-sm-10">
                                <Input name="lastName"
                                       value={formik.values.lastName}
                                       error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                       helperText={formik.errors.lastName}
                                       onChange={formik.handleChange}
                                />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="email" className="col-sm-2 col-form-label">E-Mail</label>
                            <div className="col-sm-10">
                                <Input name="email"
                                       value={formik.values.email}
                                       error={formik.touched.email && Boolean(formik.errors.email)}
                                       helperText={formik.errors.email}
                                       onChange={formik.handleChange}
                                />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="phone" className="col-sm-2 col-form-label">Телефон</label>
                            <div className="col-sm-10">
                                <Input name="phone"
                                       value={formik.values.phone}
                                       error={formik.touched.phone && Boolean(formik.errors.phone)}
                                       helperText={formik.errors.phone}
                                       onChange={formik.handleChange}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <label className="col-sm-2 col-form-label"/>
                            <div className="col-sm-10">
                                <button className="btn btn-success" type="submit">Добавить</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}