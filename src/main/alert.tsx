import React from "react";

// import "./alert.css";


interface IAlertProps {
    message: string;
}

export const Alert = ({message}: IAlertProps) => {
    return (
        <div className="alert">
            {message}
        </div>
    );
}