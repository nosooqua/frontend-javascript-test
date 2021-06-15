import React from "react";

interface InputProps {
    name: string
    label?: string
    value: string | number
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void
    error?: boolean
    helperText?: string
    type?: "text" | "password"
}

export const Input: React.FC<InputProps> = ({
    name,
    label,
    value,
    onChange,
    error = false,
    helperText,
    type = "text"
                                }) => {
    return (
        <>
            <input type={type}
                   className={`form-control ${error ? 'is-invalid' : ''}`}
                   id={name}
                   name={name}
                   onChange={onChange}
                   value={value}
                   placeholder={label}
            />
            <div className="invalid-feedback">
                {helperText}
            </div>
        </>
    )
}