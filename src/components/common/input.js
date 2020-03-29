import React from "react";

// Iterface that component Input name, label, value, onChange
const Input = ({name, label, value, onChange})=> {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
                autoFocus
                type="text"
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className="form-control"
                aria-describedby="emailHelp"
            />
        </div>
    )
};

export default Input;
