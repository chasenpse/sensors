import React, { useState, createContext } from 'react';

export const ControlsContext = createContext(null);

const dateToYYYYMMDD = (date) => {
    const v = date ? new Date(date) : new Date()
    return v.toISOString().split('T', 1)[0];
}

export const ControlsProvider = props => {
    const [combo, setCombo] = useState(localStorage.getItem('combo') || "false");
    const [startDate, setStartDate] = useState(dateToYYYYMMDD(new Date().toLocaleDateString()));
    const [endDate, setEndDate] = useState(dateToYYYYMMDD(new Date().toLocaleDateString()));
    return (
        <ControlsContext.Provider value={{
            combo,
            setCombo,
            startDate,
            setStartDate,
            endDate,
            setEndDate
        }}>
            {props.children}
        </ControlsContext.Provider>
    )
}