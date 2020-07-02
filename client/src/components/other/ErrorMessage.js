import React from "react";

const ErrorMessage = ({message}) => {
    return (<div className="error">
        <p className="message">{message}</p>
    </div>)
}

export default ErrorMessage
