import React from 'react';
import './ToggleButton.css';

const ToggleButton = ({status, label, handler}) => {
    const on = status==="true" ? "on" : "";
    return (
        <button type={"button"} className={on} onClick={handler}>{label}</button>
    );
}

export default ToggleButton;