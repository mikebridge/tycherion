import React from "react";

interface IAlertProps {
    message: string;
}

export const Alert = ({message}: IAlertProps) => {
    return (
        <>
            {message}
        </>
    );
}