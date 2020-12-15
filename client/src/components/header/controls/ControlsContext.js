import React, { useState, createContext } from 'react';
import getDate, { defaultStartDate } from "../../../utils/getDate";

export  const ControlsContext = createContext();

export const ControlsProvider = props => {
    const [tempToggle, setTempToggle] = useState(true);
    const [humidityToggle, setHumidityToggle] = useState(true);
    const [startDate, setStartDate] = useState(defaultStartDate);
    const [endDate, setEndDate] = useState(getDate);
    return (
        <ControlsContext.Provider value={[tempToggle, setTempToggle, humidityToggle, setHumidityToggle, startDate, setStartDate, endDate, setEndDate]}>
            {props.children}
        </ControlsContext.Provider>
    )
}