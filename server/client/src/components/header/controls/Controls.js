import './Controls.css';
import React, { useContext } from 'react';
import ToggleButton from "./toggleButton/ToggleButton";
import DateInput from "./dateInput/DateInput";
import { ControlsContext } from "./ControlsContext";

const Controls = () => {
    const {
        tempToggle, setTempToggle,
        humidityToggle, setHumidityToggle,
        startDate, setStartDate,
        endDate, setEndDate
    } = useContext(ControlsContext);

    return (
        <div className={"controls"}>
            <ToggleButton
                status={tempToggle}
                label={"Temperature"}
                handler={setTempToggle}
            />
            <ToggleButton
                status={humidityToggle}
                label={"Humidity"}
                handler={setHumidityToggle}
            />
            <div className={"dateRangeContainer"}>
                <span className={"rangeLabel"}>Range:</span><DateInput value={startDate} min={"2020-10-15"} handler={setStartDate} />-<DateInput value={endDate} min={startDate} handler={setEndDate} />
            </div>
        </div>
    )
}

export default Controls;