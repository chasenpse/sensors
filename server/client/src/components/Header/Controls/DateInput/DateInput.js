import React from 'react';
import './DateInput.css';
import getDate from "../../../../utils/getDate";

const DateInput = ({value, min=0, handler}) => {
    return (
        <input type={"date"} min={min} max={getDate} value={value} onChange={(e)=>handler(e.target.value)} />
    )
};

export default DateInput;