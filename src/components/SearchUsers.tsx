import React from "react";
import {
    useFormik
} from "formik";
import {Input} from "../elements/Input";

interface SearchUsersProps {
    searchInputChange: (query: string) => void
    searchInputSend: (query: string) => void
}

interface SearchFormType {
    query: string
}

const initialValues: SearchFormType = {query: ""};

export const SearchUser: React.FC<SearchUsersProps> = ({ searchInputChange, searchInputSend }) => {

    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            searchInputSend(values.query)
        },
    });

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        formik.handleChange(e)
        searchInputChange(e.currentTarget.value)
    }

    return (
        <form onSubmit={formik.handleSubmit} className="input-group mb-0">
            <Input name="query"
                   value={formik.values.query}
                   onChange={handleChange}
                   error={formik.touched.query && Boolean(formik.errors.query)}
                   helperText={formik.errors.query}
                   label="Поиск"
            />
            <button disabled={formik.values.query === "" || !!formik.errors.query} type="submit" className="btn btn-primary">
                Найти
            </button>
        </form>
    )
}