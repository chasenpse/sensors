import React, { useState, createContext } from 'react';
import getDate, { defaultStartDate } from "../../../utils/getDate";

export const ControlsContext = createContext(null);

export const ControlsProvider = props => {
    const [combo, setCombo] = useState(false);
    const [startDate, setStartDate] = useState(defaultStartDate);
    const [endDate, setEndDate] = useState(getDate);
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