import React from 'react';
import './DateInput.css';

const DateInput = ({value, min=0, handler}) => {
    return (
        <input type={"date"} min={min} max={new Date().toISOString().substring(0, 10)} value={value} onChange={(e)=>handler(e.target.value)} />
    )
};

export default DateInput;