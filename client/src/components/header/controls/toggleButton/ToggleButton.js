import React from 'react';
import './ToggleButton.css';

const ToggleButton = ({status, label, handler}) => {
    const on = status ? "on" : "";
    return (
        <button type={"button"} className={on} onClick={()=>handler(!status)}>{label}</button>
    );
}

export default ToggleButton;