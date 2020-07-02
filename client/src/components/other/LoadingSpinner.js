import React from "react";
import PulseLoader from "react-spinners/PulseLoader";

const LoadingSpinner = ({isLoading}) => {
    return (<div className="spinner-container">
        <PulseLoader
            size={15}
            color={"#C63623"}
            loading={isLoading}
        />
    </div>)
}

export default LoadingSpinner
